#!/usr/bin/env node

import { scrapeMermaidLive } from './sources/mermaid-live'
import { scrapePlantUML } from './sources/plantuml'
import { scrapeExcalidraw } from './sources/excalidraw'
import { scrapeD3Observable } from './sources/d3'
import { scrapeNomnoml } from './sources/nomnoml'
import { scrapeCytoscape } from './sources/cytoscape'
import { scrapeWaveDrom } from './sources/wavedrom'
import { scrapeGraphviz } from './sources/graphviz'
import { scrapeBPMN } from './sources/bpmn'
import { scrapeRailroad } from './sources/railroad'
import { scrapeKroki } from './sources/kroki'
import { scrapeVega } from './sources/vega'
import { scrapeSequenceDiagrams } from './sources/sequence-diagrams'
import { defaultConfig } from './lib/fetcher'
import type { ScraperConfig, DiagramExample } from './types'
import { writeFileSync } from 'fs'
import { join } from 'path'

const sources = {
  mermaid: scrapeMermaidLive,
  plantuml: scrapePlantUML,
  excalidraw: scrapeExcalidraw,
  d3: scrapeD3Observable,
  nomnoml: scrapeNomnoml,
  cytoscape: scrapeCytoscape,
  wavedrom: scrapeWaveDrom,
  graphviz: scrapeGraphviz,
  bpmn: scrapeBPMN,
  railroad: scrapeRailroad,
  kroki: scrapeKroki,
  vega: scrapeVega,
  'js-sequence': scrapeSequenceDiagrams,
}

async function main() {
  const args = process.argv.slice(2)
  const sourceArg = args.find(arg => arg.startsWith('--source='))
  const sourceName = sourceArg ? sourceArg.split('=')[1] : 'mermaid'

  console.log(`\n🔍 Diagram Scraper\n`)
  console.log(`Source: ${sourceName}`)
  console.log(`================\n`)

  const scraper = sources[sourceName as keyof typeof sources]

  if (!scraper) {
    console.error(`❌ Unknown source: ${sourceName}`)
    console.log(`\nAvailable sources:`)
    Object.keys(sources).forEach(name => console.log(`  - ${name}`))
    process.exit(1)
  }

  const config: ScraperConfig = {
    ...defaultConfig,
    source: sourceName
  }

  try {
    console.log(`📥 Collecting examples from ${sourceName}...`)
    const examples = await scraper(config)

    // Save to JSON file
    const outputPath = join(process.cwd(), 'scraped-data', `${sourceName}-examples.json`)
    writeFileSync(outputPath, JSON.stringify(examples, null, 2))

    console.log(`\n✅ Success!`)
    console.log(`   - Collected: ${examples.length} examples`)
    console.log(`   - Saved to: ${outputPath}\n`)

    // Show sample
    if (examples.length > 0) {
      console.log(`📋 Sample:`)
      console.log(`   Title: ${examples[0].title}`)
      console.log(`   Category: ${examples[0].category}`)
      console.log(`   Type: ${examples[0].type}`)
      if (examples[0].code) {
        console.log(`   Code: ${examples[0].code.substring(0, 100)}...`)
      }
      console.log()
    }
  } catch (error) {
    console.error(`\n❌ Error:`, error)
    process.exit(1)
  }
}

main()
