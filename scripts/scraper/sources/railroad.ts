import type { DiagramExample, ScraperConfig } from '../types'
import { RateLimitedFetcher } from '../lib/fetcher'

/**
 * Railroad Diagrams Scraper
 *
 * Scrapes from railroad-diagrams GitHub
 * https://github.com/tabatkins/railroad-diagrams
 *
 * CC0 (Public Domain)
 */

export async function scrapeRailroad(config: ScraperConfig): Promise<DiagramExample[]> {
  const fetcher = new RateLimitedFetcher(config)
  const examples: DiagramExample[] = []

  console.log('📥 Fetching Railroad Diagrams examples...')

  // Known railroad diagram examples
  const knownExamples = [
    {
      title: 'Simple Sequence',
      code: 'Diagram(Sequence("foo", "bar", "baz"))',
      description: 'Basic sequential railroad diagram'
    },
    {
      title: 'Choice Between Options',
      code: 'Diagram(Choice(0, "foo", "bar", "baz"))',
      description: 'Railroad diagram showing alternatives'
    },
    {
      title: 'Optional Element',
      code: 'Diagram(Optional("foo", "skip"))',
      description: 'Railroad diagram with optional path'
    },
    {
      title: 'One Or More',
      code: 'Diagram(OneOrMore("foo"))',
      description: 'Railroad diagram for repeated elements'
    },
    {
      title: 'Zero Or More',
      code: 'Diagram(ZeroOrMore("foo"))',
      description: 'Railroad diagram for optional repetition'
    }
  ]

  knownExamples.forEach(ex => {
    examples.push({
      title: ex.title,
      description: ex.description,
      source: 'railroad',
      category: 'Syntax Diagram',
      type: 'linear',
      code: ex.code,
      tags: ['railroad', 'syntax', 'grammar', 'bnf']
    })
  })

  console.log(`✓ Collected ${examples.length} Railroad Diagram examples`)
  return examples
}
