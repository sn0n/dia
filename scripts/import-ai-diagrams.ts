#!/usr/bin/env node

/**
 * Import ALL scraped diagrams (including AI-generated) into scraped-diagrams.ts
 */

import { readdirSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

console.log('📥 Importing all scraped diagrams...\n')

const scrapedDataDir = join(process.cwd(), 'scraped-data')
const files = readdirSync(scrapedDataDir).filter(f => f.endsWith('.json') && f !== 'scraped-diagrams.json')

let allDiagrams: any[] = []

// Read all JSON files
for (const file of files) {
  try {
    const filePath = join(scrapedDataDir, file)
    const data = JSON.parse(readFileSync(filePath, 'utf-8'))
    const diagrams = Array.isArray(data) ? data : []
    console.log(`   ✓ ${file}: ${diagrams.length} diagrams`)
    allDiagrams = [...allDiagrams, ...diagrams]
  } catch (e) {
    console.log(`   ✗ ${file}: Error reading file`)
  }
}

// Write merged to scraped-diagrams.json
const scrapedDiagramsPath = join(scrapedDataDir, 'scraped-diagrams.json')
writeFileSync(scrapedDiagramsPath, JSON.stringify(allDiagrams, null, 2))

console.log(`\n✅ Total diagrams merged: ${allDiagrams.length}`)

// Now generate the TypeScript file
const linearDiagrams = allDiagrams
  .filter(d => d.type === 'linear')
  .map(d => {
    // Remove existing star if present, then add if AI-generated
    const title = d.title.replace(/ ⭐/g, '')
    const aiMarker = d.aiGenerated ? ' ⭐' : ''
    return `  "${title}${aiMarker}|${d.description}|${d.category}"`
  })

const nonLinearDiagrams = allDiagrams
  .filter(d => d.type === 'nonlinear')
  .map(d => {
    // Remove existing star if present, then add if AI-generated
    const title = d.title.replace(/ ⭐/g, '')
    const aiMarker = d.aiGenerated ? ' ⭐' : ''
    return `  "${title}${aiMarker}|${d.description}|${d.category}"`
  })

const scrapedDiagramsWithCode = allDiagrams
  .filter(d => d.code)
  .reduce((acc, d) => {
    // Remove existing star if present, then add if AI-generated
    const title = d.title.replace(/ ⭐/g, '')
    const aiMarker = d.aiGenerated ? ' ⭐' : ''
    acc[`${title}${aiMarker}`] = {
      code: d.code,
      source: d.source
    }
    return acc
  }, {} as Record<string, any>)

const tsContent = `// Auto-generated from scraped examples
// Generated: ${new Date().toISOString()}

export const scrapedLinearData = [
${linearDiagrams.join(',\n')}
];

export const scrapedNonLinearData = [
${nonLinearDiagrams.join(',\n')}
];

export const scrapedDiagrams = ${JSON.stringify(scrapedDiagramsWithCode, null, 2)};
`

const tsPath = join(process.cwd(), 'src', 'data', 'scraped-diagrams.ts')
writeFileSync(tsPath, tsContent)

console.log(`\n📝 TypeScript file generated: ${tsPath}`)
console.log(`   - Linear diagrams: ${linearDiagrams.length}`)
console.log(`   - Non-linear diagrams: ${nonLinearDiagrams.length}`)
console.log(`   - Diagrams with code: ${Object.keys(scrapedDiagramsWithCode).length}`)
console.log('\n✨ Done!\n')
