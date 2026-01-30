import type { DiagramExample, ScraperConfig } from '../types'
import { RateLimitedFetcher } from '../lib/fetcher'

/**
 * Cytoscape.js Examples Scraper
 *
 * Scrapes from Cytoscape.js GitHub demos
 * https://github.com/cytoscape/cytoscape.js/tree/master/documentation/demos
 *
 * MIT Licensed
 */

export async function scrapeCytoscape(config: ScraperConfig): Promise<DiagramExample[]> {
  const fetcher = new RateLimitedFetcher(config)
  const examples: DiagramExample[] = []

  console.log('📥 Fetching Cytoscape.js examples...')

  // Fetch demo list from GitHub
  const demosUrl = 'https://api.github.com/repos/cytoscape/cytoscape.js/contents/documentation/demos'

  try {
    const response = await fetcher.fetchWithRetry(demosUrl)
    const files = await response.json() as Array<{ name: string; download_url: string; type: string }>

    // Filter for directories (each demo)
    const demos = files.filter(f => f.type === 'dir').slice(0, 8)

    console.log(`Found ${demos.length} Cytoscape demos`)

    for (const demo of demos) {
      try {
        console.log(`  Processing ${demo.name}...`)

        examples.push({
          title: demo.name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
          description: `Cytoscape.js ${demo.name} demo from official repository`,
          source: 'cytoscape',
          category: 'Network Graph',
          type: 'nonlinear',
          imageUrl: `https://github.com/cytoscape/cytoscape.js/tree/master/documentation/demos/${demo.name}`,
          tags: ['cytoscape', 'network', 'graph', demo.name]
        })
      } catch (error) {
        console.warn(`  Failed to process ${demo.name}:`, error)
      }
    }

  } catch (error) {
    console.error('Failed to fetch Cytoscape demos:', error)
  }

  console.log(`✓ Collected ${examples.length} Cytoscape examples`)
  return examples
}
