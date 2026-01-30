#!/usr/bin/env node

import { scrapeMermaidLive } from './sources/mermaid-live'
import { scrapePlantUML } from './sources/plantuml'
import { scrapeExcalidraw } from './sources/excalidraw'
import { scrapeD3Observable } from './sources/d3'
import { scrapeNomnoml } from './sources/nomnoml'
import { saveDiagrams, getDiagramCount } from './lib/storage'
import { defaultConfig } from './lib/fetcher'
import type { ScraperConfig } from './types'

const sources = {
  mermaid: scrapeMermaidLive,
  plantuml: scrapePlantUML,
  excalidraw: scrapeExcalidraw,
  d3: scrapeD3Observable,
  nomnoml: scrapeNomnoml,
  all: async (config: ScraperConfig) => {
    console.log('\n🚀 Scraping ALL sources...\n')
    const allExamples = []
    for (const [name, scraper] of Object.entries(sources)) {
      if (name === 'all') continue
      console.log(`\n--- ${name.toUpperCase()} ---`)
      const examples = await scraper(config)
      allExamples.push(...examples)
    }
    return allExamples
  }
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

    console.log(`\n💾 Saving to database...`)
    const saved = await saveDiagrams(examples)

    const total = await getDiagramCount()

    console.log(`\n✅ Success!`)
    console.log(`   - Collected: ${examples.length} examples`)
    console.log(`   - Saved: ${saved} diagrams`)
    console.log(`   - Total in DB: ${total} diagrams\n`)
  } catch (error) {
    console.error(`\n❌ Error:`, error)
    process.exit(1)
  }
}

main()
