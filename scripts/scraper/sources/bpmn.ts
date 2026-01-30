import type { DiagramExample, ScraperConfig } from '../types'
import { RateLimitedFetcher } from '../lib/fetcher'

/**
 * BPMN.io Examples Scraper
 *
 * Scrapes from BPMN.io demo and examples
 * https://demo.bpmn.io/
 * https://github.com/bpmn-io/bpmn-js-examples
 *
 * MIT Licensed
 */

export async function scrapeBPMN(config: ScraperConfig): Promise<DiagramExample[]> {
  const fetcher = new RateLimitedFetcher(config)
  const examples: DiagramExample[] = []

  console.log('📥 Fetching BPMN.io examples...')

  // Fetch examples from GitHub
  const examplesUrl = 'https://api.github.com/repos/bpmn-io/bpmn-js-examples/contents'

  try {
    const response = await fetcher.fetchWithRetry(examplesUrl)
    const files = await response.json() as Array<{ name: string; type: string }>

    const exampleDirs = files.filter(f => f.type === 'dir').slice(0, 10)

    console.log(`Found ${exampleDirs.length} BPMN example directories`)

    exampleDirs.forEach((dir, idx) => {
      const title = dir.name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

      examples.push({
        title,
        description: `BPMN 2.0 ${title} example from official bpmn-js repository`,
        source: 'bpmn',
        category: 'Business Process',
        type: 'linear',
        imageUrl: `https://github.com/bpmn-io/bpmn-js-examples/tree/master/${dir.name}`,
        tags: ['bpmn', 'business-process', 'workflow', dir.name, 'official']
      })
    })

  } catch (error) {
    console.error('Failed to fetch BPMN examples:', error)
  }

  console.log(`✓ Collected ${examples.length} BPMN examples`)
  return examples
}
