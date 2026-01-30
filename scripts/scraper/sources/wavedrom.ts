import type { DiagramExample, ScraperConfig } from '../types'
import { RateLimitedFetcher } from '../lib/fetcher'

/**
 * WaveDrom Examples Scraper
 *
 * Scrapes timing diagram examples from WaveDrom
 * https://wavedrom.com/tutorial.html
 *
 * MIT Licensed
 */

export async function scrapeWaveDrom(config: ScraperConfig): Promise<DiagramExample[]> {
  const fetcher = new RateLimitedFetcher(config)
  const examples: DiagramExample[] = []

  console.log('📥 Fetching WaveDrom examples...')

  const tutorialUrl = 'https://wavedrom.com/tutorial.html'

  try {
    const response = await fetcher.fetchWithRetry(tutorialUrl)
    const html = await response.text()

    // Extract WaveDrom scripts from the tutorial
    const scriptRegex = /<script type="WaveDrom">([\s\S]*?)<\/script>/g
    let match
    let exampleNum = 1

    while ((match = scriptRegex.exec(html)) !== null) {
      const code = match[1].trim()

      if (code && code.length > 10) {
        examples.push({
          title: `WaveDrom Timing Diagram ${exampleNum}`,
          description: 'Digital timing diagram from WaveDrom official tutorial',
          source: 'wavedrom',
          category: 'Timing Diagram',
          type: 'linear',
          code,
          tags: ['wavedrom', 'timing', 'digital', 'hardware', 'official']
        })
        exampleNum++
      }

      if (exampleNum > 10) break // Limit to 10 examples
    }

  } catch (error) {
    console.error('Failed to fetch WaveDrom examples:', error)
  }

  console.log(`✓ Collected ${examples.length} WaveDrom examples`)
  return examples
}
