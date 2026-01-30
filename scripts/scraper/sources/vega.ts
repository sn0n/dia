import type { DiagramExample, ScraperConfig } from '../types'
import { RateLimitedFetcher } from '../lib/fetcher'

/**
 * Vega/Vega-Lite Examples Scraper
 *
 * Scrapes from Vega examples
 * https://vega.github.io/vega/examples/
 * https://vega.github.io/vega-lite/examples/
 *
 * BSD-3-Clause Licensed
 */

export async function scrapeVega(config: ScraperConfig): Promise<DiagramExample[]> {
  const fetcher = new RateLimitedFetcher(config)
  const examples: DiagramExample[] = []

  console.log('📥 Fetching Vega examples...')

  // Fetch from Vega examples API
  const examplesUrl = 'https://api.github.com/repos/vega/vega/contents/docs/examples'

  try {
    const response = await fetcher.fetchWithRetry(examplesUrl)
    const files = await response.json() as Array<{ name: string; download_url: string }>

    // Get .vg.json files (Vega specs)
    const vegaFiles = files.filter(f => f.name.endsWith('.vg.json')).slice(0, 10)

    console.log(`Found ${vegaFiles.length} Vega example files`)

    for (const file of vegaFiles) {
      const title = file.name.replace('.vg.json', '').split('-').map(w =>
        w.charAt(0).toUpperCase() + w.slice(1)
      ).join(' ')

      examples.push({
        title,
        description: `Vega visualization: ${title}`,
        source: 'vega',
        category: 'Data Visualization',
        type: 'nonlinear',
        imageUrl: file.download_url,
        tags: ['vega', 'visualization', 'data', file.name.replace('.vg.json', '')]
      })
    }

  } catch (error) {
    console.error('Failed to fetch Vega examples:', error)
  }

  console.log(`✓ Collected ${examples.length} Vega examples`)
  return examples
}
