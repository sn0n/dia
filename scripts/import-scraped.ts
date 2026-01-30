#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

interface DiagramExample {
  title: string
  description?: string
  source: string
  category: string
  type: string
  imageUrl?: string
  code?: string
  tags: string[]
}

// Read scraped data
const mermaidExamples = JSON.parse(
  readFileSync(join(process.cwd(), 'scraped-data/mermaid-examples.json'), 'utf-8')
) as DiagramExample[]

const plantumlExamples = JSON.parse(
  readFileSync(join(process.cwd(), 'scraped-data/plantuml-examples.json'), 'utf-8')
) as DiagramExample[]

const d3Examples = JSON.parse(
  readFileSync(join(process.cwd(), 'scraped-data/d3-examples.json'), 'utf-8')
) as DiagramExample[]

const cytoscapeExamples = JSON.parse(
  readFileSync(join(process.cwd(), 'scraped-data/cytoscape-examples.json'), 'utf-8')
) as DiagramExample[]

const wavedromExamples = JSON.parse(
  readFileSync(join(process.cwd(), 'scraped-data/wavedrom-examples.json'), 'utf-8')
) as DiagramExample[]

const graphvizExamples = JSON.parse(
  readFileSync(join(process.cwd(), 'scraped-data/graphviz-examples.json'), 'utf-8')
) as DiagramExample[]

const bpmnExamples = JSON.parse(
  readFileSync(join(process.cwd(), 'scraped-data/bpmn-examples.json'), 'utf-8')
) as DiagramExample[]

const railroadExamples = JSON.parse(
  readFileSync(join(process.cwd(), 'scraped-data/railroad-examples.json'), 'utf-8')
) as DiagramExample[]

const krokiExamples = JSON.parse(
  readFileSync(join(process.cwd(), 'scraped-data/kroki-examples.json'), 'utf-8')
) as DiagramExample[]

const vegaExamples = JSON.parse(
  readFileSync(join(process.cwd(), 'scraped-data/vega-examples.json'), 'utf-8')
) as DiagramExample[]

const jsSequenceExamples = JSON.parse(
  readFileSync(join(process.cwd(), 'scraped-data/js-sequence-examples.json'), 'utf-8')
) as DiagramExample[]

const allExamples = [
  ...mermaidExamples,
  ...plantumlExamples,
  ...d3Examples,
  ...cytoscapeExamples,
  ...wavedromExamples,
  ...graphvizExamples,
  ...bpmnExamples,
  ...railroadExamples,
  ...krokiExamples,
  ...vegaExamples,
  ...jsSequenceExamples
]

console.log(`📥 Importing ${allExamples.length} scraped examples...`)

// Convert to workflow format
const linearData: string[] = []
const nonLinearData: string[] = []
const complexWorkflows: Record<string, any> = {}

allExamples.forEach((example, idx) => {
  const title = `${example.title} (${example.source})`
  const description = example.description || 'Diagram example'
  const category = example.category

  // Create workflow string
  const workflowString = `${title}|${description}|${category}`

  if (example.type === 'linear') {
    linearData.push(workflowString)
  } else {
    nonLinearData.push(workflowString)
  }

  // Add code as complex workflow if available
  if (example.code) {
    complexWorkflows[title] = {
      type: example.type,
      source: example.source,
      code: example.code,
      tags: example.tags
    }
  }
})

console.log(`  - Linear: ${linearData.length}`)
console.log(`  - Non-linear: ${nonLinearData.length}`)
console.log(`  - With code: ${Object.keys(complexWorkflows).length}`)

// Generate the new data file
const output = `// Auto-generated from scraped examples
// Generated: ${new Date().toISOString()}

export const scrapedLinearData = ${JSON.stringify(linearData, null, 2)};

export const scrapedNonLinearData = ${JSON.stringify(nonLinearData, null, 2)};

export const scrapedDiagrams = ${JSON.stringify(complexWorkflows, null, 2)};
`

writeFileSync(
  join(process.cwd(), 'src/data/scraped-diagrams.ts'),
  output
)

console.log(`\n✅ Generated: src/data/scraped-diagrams.ts`)
console.log(`   Total: ${allExamples.length} diagrams imported\n`)
