import type { DiagramExample, ScraperConfig } from '../types'
import { RateLimitedFetcher } from '../lib/fetcher'

/**
 * Kroki Examples Scraper
 *
 * Kroki is a unified API for multiple diagram types
 * https://kroki.io/
 * https://docs.kroki.io/kroki/setup/usage/
 *
 * MIT Licensed
 */

export async function scrapeKroki(config: ScraperConfig): Promise<DiagramExample[]> {
  const fetcher = new RateLimitedFetcher(config)
  const examples: DiagramExample[] = []

  console.log('📥 Fetching Kroki examples...')

  // Kroki supports many diagram types - collect examples for each
  const krokiTypes = [
    {
      name: 'BlockDiag',
      code: 'blockdiag {\n  A -> B -> C;\n  B -> D;\n}',
      category: 'Block Diagram',
      type: 'nonlinear'
    },
    {
      name: 'SeqDiag',
      code: 'seqdiag {\n  browser -> webserver [label = "GET /"];\n  webserver -> database [label = "SELECT"];\n}',
      category: 'Sequence Diagram',
      type: 'linear'
    },
    {
      name: 'ActDiag',
      code: 'actdiag {\n  write -> convert -> image;\n}',
      category: 'Activity Diagram',
      type: 'linear'
    },
    {
      name: 'NwDiag',
      code: 'nwdiag {\n  network dmz {\n    web01;\n    web02;\n  }\n}',
      category: 'Network Diagram',
      type: 'nonlinear'
    },
    {
      name: 'PacketDiag',
      code: 'packetdiag {\n  0-15: Source Port\n  16-31: Destination Port\n}',
      category: 'Packet Diagram',
      type: 'linear'
    },
    {
      name: 'RackDiag',
      code: 'rackdiag {\n  1: UPS;\n  2: Database;\n}',
      category: 'Rack Diagram',
      type: 'linear'
    },
    {
      name: 'Pikchr',
      code: 'box "Hello" "World"',
      category: 'Pikchr Diagram',
      type: 'nonlinear'
    },
    {
      name: 'Erd',
      code: '[Person] *--1 [Address]',
      category: 'ER Diagram',
      type: 'nonlinear'
    }
  ]

  krokiTypes.forEach(type => {
    examples.push({
      title: `${type.name} Example`,
      description: `${type.category} via Kroki unified API`,
      source: 'kroki',
      category: type.category,
      type: type.type,
      code: type.code,
      tags: ['kroki', type.name.toLowerCase(), 'unified-api']
    })
  })

  console.log(`✓ Collected ${examples.length} Kroki examples`)
  return examples
}
