import type { DiagramExample, ScraperConfig } from '../types'
import { RateLimitedFetcher } from '../lib/fetcher'

/**
 * Nomnoml Examples Scraper
 *
 * Scrapes from Nomnoml's official site and GitHub
 * http://nomnoml.com/
 * https://github.com/skanaar/nomnoml
 *
 * MIT Licensed
 */

export async function scrapeNomnoml(config: ScraperConfig): Promise<DiagramExample[]> {
  const fetcher = new RateLimitedFetcher(config)
  const examples: DiagramExample[] = []

  console.log('📥 Fetching Nomnoml examples...')

  // Fetch from Nomnoml GitHub README
  const readmeUrl = 'https://raw.githubusercontent.com/skanaar/nomnoml/master/README.md'

  try {
    const response = await fetcher.fetchWithRetry(readmeUrl)
    const content = await response.text()

    // Extract code blocks
    const codeBlockRegex = /```(?:nomnoml)?\n([\s\S]*?)```/g
    let match
    let exampleNum = 1

    while ((match = codeBlockRegex.exec(content)) !== null) {
      const code = match[1].trim()

      // Only include if it looks like nomnoml syntax
      if (code.includes('[') && code.includes(']')) {
        examples.push({
          title: `Nomnoml UML Example ${exampleNum}`,
          description: 'Official example from Nomnoml documentation',
          source: 'nomnoml',
          category: 'UML Diagram',
          type: 'nonlinear',
          code,
          tags: ['nomnoml', 'uml', 'class-diagram', 'official']
        })
        exampleNum++
      }
    }

  } catch (error) {
    console.error('Failed to fetch Nomnoml examples:', error)
  }

  console.log(`✓ Collected ${examples.length} real Nomnoml examples`)
  return examples
}
