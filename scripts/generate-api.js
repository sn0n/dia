#!/usr/bin/env node

/**
 * Static API Generator for Dia
 * 
 * Generates JSON files for a static REST API from the diagram data.
 * Run with: npm run generate:api
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Import data (we'll use dynamic imports to handle TypeScript)
async function loadData() {
    const { parseData, rawLinearData, rawNonLinearData, complexWorkflows } = await import('../src/data/workflows.ts')
    const { parseAIWorkflows, aiComplexWorkflows } = await import('../src/data/ai-workflows.ts')

    return {
        linearWorkflows: parseData(rawLinearData, 'linear'),
        nonLinearWorkflows: parseData(rawNonLinearData, 'nonlinear'),
        aiWorkflows: parseAIWorkflows(),
        complexWorkflows,
        aiComplexWorkflows
    }
}

// Helper: Create URL-friendly slug
function slugify(text) {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
}

// Helper: Ensure directory exists
function ensureDir(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true })
    }
}

// Helper: Write JSON file
function writeJSON(filePath, data) {
    ensureDir(path.dirname(filePath))
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
    console.log(`✅ Generated: ${filePath}`)
}

// Transform workflow to API format
function transformWorkflow(workflow, type, complexData) {
    const slug = slugify(workflow.title)
    const advancedData = complexData[workflow.title]

    return {
        id: slug,
        title: workflow.title,
        type,
        category: workflow.category,
        description: workflow.description,
        slug: `${slug}-diagram`,
        url: `/${type}/${slug}-diagram`,
        hasAdvanced: !!advancedData,
        source: advancedData?.source || null
    }
}

// Transform workflow to detailed API format
function transformWorkflowDetailed(workflow, type, complexData) {
    const basic = transformWorkflow(workflow, type, complexData)
    const advancedData = complexData[workflow.title]

    // Extract steps from description
    const steps = workflow.description.split(/→|↔/).map(s => s.trim())

    return {
        ...basic,
        steps,
        advanced: advancedData ? {
            code: advancedData.code || null,
            source: advancedData.source || 'mermaid',
            root: advancedData.root || null
        } : null
    }
}

async function generateAPI() {
    console.log('🚀 Generating Static API...\n')

    const data = await loadData()
    const { linearWorkflows, nonLinearWorkflows, aiWorkflows, complexWorkflows, aiComplexWorkflows } = data

    const outputDir = path.join(__dirname, '..', 'public', 'v1')

    // Clean output directory
    if (fs.existsSync(outputDir)) {
        fs.rmSync(outputDir, { recursive: true })
    }
    ensureDir(outputDir)

    // === 1. Generate /v1/diagrams.json (all diagrams) ===
    const allDiagrams = [
        ...linearWorkflows.map(w => transformWorkflow(w, 'linear', complexWorkflows)),
        ...nonLinearWorkflows.map(w => transformWorkflow(w, 'non-linear', complexWorkflows)),
        ...aiWorkflows.map(w => transformWorkflow(w, 'ai-workflows', aiComplexWorkflows))
    ]

    writeJSON(path.join(outputDir, 'diagrams.json'), {
        total: allDiagrams.length,
        types: {
            linear: linearWorkflows.length,
            'non-linear': nonLinearWorkflows.length,
            ai: aiWorkflows.length
        },
        data: allDiagrams
    })

    // === 2. Generate /v1/diagrams/{type}.json ===
    const diagramsDir = path.join(outputDir, 'diagrams')

    writeJSON(path.join(diagramsDir, 'linear.json'), {
        type: 'linear',
        count: linearWorkflows.length,
        data: linearWorkflows.map(w => transformWorkflow(w, 'linear', complexWorkflows))
    })

    writeJSON(path.join(diagramsDir, 'non-linear.json'), {
        type: 'non-linear',
        count: nonLinearWorkflows.length,
        data: nonLinearWorkflows.map(w => transformWorkflow(w, 'non-linear', complexWorkflows))
    })

    writeJSON(path.join(diagramsDir, 'ai.json'), {
        type: 'ai',
        count: aiWorkflows.length,
        data: aiWorkflows.map(w => transformWorkflow(w, 'ai-workflows', aiComplexWorkflows))
    })

    // === 3. Generate /v1/diagrams/{type}/{slug}.json (individual diagrams) ===
    const linearDir = path.join(diagramsDir, 'linear')
    linearWorkflows.forEach(workflow => {
        const slug = slugify(workflow.title)
        writeJSON(
            path.join(linearDir, `${slug}.json`),
            transformWorkflowDetailed(workflow, 'linear', complexWorkflows)
        )
    })

    const nonLinearDir = path.join(diagramsDir, 'non-linear')
    nonLinearWorkflows.forEach(workflow => {
        const slug = slugify(workflow.title)
        writeJSON(
            path.join(nonLinearDir, `${slug}.json`),
            transformWorkflowDetailed(workflow, 'non-linear', complexWorkflows)
        )
    })

    const aiDir = path.join(diagramsDir, 'ai')
    aiWorkflows.forEach(workflow => {
        const slug = slugify(workflow.title)
        writeJSON(
            path.join(aiDir, `${slug}.json`),
            transformWorkflowDetailed(workflow, 'ai-workflows', aiComplexWorkflows)
        )
    })

    // === 4. Generate /v1/categories.json ===
    const linearCategories = [...new Set(linearWorkflows.map(w => w.category))].sort()
    const nonLinearCategories = [...new Set(nonLinearWorkflows.map(w => w.category))].sort()
    const aiCategories = [...new Set(aiWorkflows.map(w => w.category))].sort()

    writeJSON(path.join(outputDir, 'categories.json'), {
        linear: linearCategories,
        'non-linear': nonLinearCategories,
        ai: aiCategories
    })

    // === 5. Generate /v1/categories/{type}/{category}.json ===
    const categoriesDir = path.join(outputDir, 'categories')

    // Linear categories
    const linearCatDir = path.join(categoriesDir, 'linear')
    linearCategories.forEach(category => {
        const diagrams = linearWorkflows
            .filter(w => w.category === category)
            .map(w => transformWorkflow(w, 'linear', complexWorkflows))

        writeJSON(path.join(linearCatDir, `${slugify(category)}.json`), {
            category,
            type: 'linear',
            count: diagrams.length,
            diagrams
        })
    })

    // Non-linear categories
    const nonLinearCatDir = path.join(categoriesDir, 'non-linear')
    nonLinearCategories.forEach(category => {
        const diagrams = nonLinearWorkflows
            .filter(w => w.category === category)
            .map(w => transformWorkflow(w, 'non-linear', complexWorkflows))

        writeJSON(path.join(nonLinearCatDir, `${slugify(category)}.json`), {
            category,
            type: 'non-linear',
            count: diagrams.length,
            diagrams
        })
    })

    // AI categories
    const aiCatDir = path.join(categoriesDir, 'ai')
    aiCategories.forEach(category => {
        const diagrams = aiWorkflows
            .filter(w => w.category === category)
            .map(w => transformWorkflow(w, 'ai-workflows', aiComplexWorkflows))

        writeJSON(path.join(aiCatDir, `${slugify(category)}.json`), {
            category,
            type: 'ai',
            count: diagrams.length,
            diagrams
        })
    })

    // === 6. Generate /v1/search/index.json ===
    const searchIndex = allDiagrams.map(diagram => ({
        ...diagram,
        keywords: [
            ...diagram.title.toLowerCase().split(/\s+/),
            ...diagram.category.toLowerCase().split(/\s+/),
            diagram.type
        ].filter((v, i, a) => a.indexOf(v) === i) // unique
    }))

    writeJSON(path.join(outputDir, 'search', 'index.json'), {
        index: searchIndex
    })

    // === 7. Generate /v1/stats.json ===
    const countByCategory = (workflows) => {
        return workflows.reduce((acc, w) => {
            acc[w.category] = (acc[w.category] || 0) + 1
            return acc
        }, {})
    }

    const advancedCount = allDiagrams.filter(d => d.hasAdvanced).length

    const sourceCount = allDiagrams.reduce((acc, d) => {
        const source = d.source || 'text'
        acc[source] = (acc[source] || 0) + 1
        return acc
    }, {})

    writeJSON(path.join(outputDir, 'stats.json'), {
        total_diagrams: allDiagrams.length,
        by_type: {
            linear: linearWorkflows.length,
            'non-linear': nonLinearWorkflows.length,
            ai: aiWorkflows.length
        },
        by_category: {
            linear: countByCategory(linearWorkflows),
            'non-linear': countByCategory(nonLinearWorkflows),
            ai: countByCategory(aiWorkflows)
        },
        advanced_diagrams: advancedCount,
        sources: sourceCount
    })

    // === 8. Generate /v1/tags.json ===
    const allCategories = [...linearCategories, ...nonLinearCategories, ...aiCategories]
    const tagCounts = allCategories.reduce((acc, cat) => {
        acc[cat] = (acc[cat] || 0) + 1
        return acc
    }, {})

    const tags = Object.entries(tagCounts).map(([name, count]) => ({ name, count }))

    writeJSON(path.join(outputDir, 'tags.json'), {
        tags: tags.sort((a, b) => b.count - a.count)
    })

    console.log('\n✨ API Generation Complete!')
    console.log(`📊 Total Endpoints: ${allDiagrams.length + linearCategories.length + nonLinearCategories.length + aiCategories.length + 8}`)
    console.log(`📁 Output: ${outputDir}`)
}

// Run generator
generateAPI().catch(error => {
    console.error('❌ Error generating API:', error)
    process.exit(1)
})
