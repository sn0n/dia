import type { DiagramExample, ScraperConfig } from '../types'
import { RateLimitedFetcher } from '../lib/fetcher'

/**
 * Excalidraw Examples Scraper
 *
 * Scrapes from Excalidraw's official library and examples
 * https://libraries.excalidraw.com/
 * https://github.com/excalidraw/excalidraw/tree/master/excalidraw-app/data
 *
 * MIT Licensed - Open source
 */

export async function scrapeExcalidraw(config: ScraperConfig): Promise<DiagramExample[]> {
  const fetcher = new RateLimitedFetcher(config)
  const examples: DiagramExample[] = []

  console.log('📥 Fetching Excalidraw library examples...')

  // Fetch from Excalidraw libraries API
  const librariesUrl = 'https://libraries.excalidraw.com/libraries'

  try {
    const response = await fetcher.fetchWithRetry(librariesUrl)
    const data = await response.json() as Array<{
      name: string
      description: string
      url: string
      author: string
    }>

    console.log(`Found ${data.length} Excalidraw libraries`)

    // Take first 5 popular libraries
    for (const library of data.slice(0, 5)) {
      try {
        console.log(`  Fetching library: ${library.name}...`)
        const libResponse = await fetcher.fetchWithRetry(library.url)
        const libData = await libResponse.json()

        examples.push({
          title: library.name,
          description: library.description || `Excalidraw library by ${library.author}`,
          source: 'excalidraw',
          category: 'Hand-drawn Diagram',
          type: 'nonlinear',
          imageUrl: library.url,
          tags: ['excalidraw', 'hand-drawn', 'sketchy', library.author]
        })

      } catch (error) {
        console.warn(`  Failed to fetch ${library.name}:`, error)
      }
    }

  } catch (error) {
    console.error('Failed to fetch Excalidraw libraries:', error)
  }

  console.log(`✓ Collected ${examples.length} real Excalidraw examples`)
  return examples
}
