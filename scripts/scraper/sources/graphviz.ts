import type { DiagramExample, ScraperConfig } from '../types'
import { RateLimitedFetcher } from '../lib/fetcher'

/**
 * Graphviz Gallery Scraper
 *
 * Scrapes from Graphviz official gallery
 * https://graphviz.org/gallery/
 *
 * EPL (Eclipse Public License)
 */

export async function scrapeGraphviz(config: ScraperConfig): Promise<DiagramExample[]> {
  const fetcher = new RateLimitedFetcher(config)
  const examples: DiagramExample[] = []

  console.log('📥 Fetching Graphviz examples...')

  const galleryUrl = 'https://graphviz.org/gallery/'

  try {
    const response = await fetcher.fetchWithRetry(galleryUrl)
    const html = await response.text()

    // Extract gallery items
    // Look for code blocks with DOT syntax
    const dotRegex = /```dot\n([\s\S]*?)```/g
    let match
    let exampleNum = 1

    while ((match = dotRegex.exec(html)) !== null) {
      const code = match[1].trim()

      examples.push({
        title: `Graphviz Graph ${exampleNum}`,
        description: 'Graph visualization from Graphviz official gallery',
        source: 'graphviz',
        category: 'Graph Diagram',
        type: 'nonlinear',
        code,
        tags: ['graphviz', 'dot', 'graph', 'official']
      })
      exampleNum++

      if (exampleNum > 10) break
    }

    // If no markdown blocks found, add known examples
    if (examples.length === 0) {
      const knownExamples = [
        {
          title: 'Simple Graph',
          code: 'graph G {\n  A -- B;\n  B -- C;\n  C -- A;\n}',
          category: 'Graph Diagram'
        },
        {
          title: 'Directed Graph',
          code: 'digraph G {\n  A -> B;\n  B -> C;\n  C -> A;\n}',
          category: 'Graph Diagram'
        },
        {
          title: 'Cluster Example',
          code: 'digraph G {\n  subgraph cluster_0 {\n    A -> B;\n  }\n  subgraph cluster_1 {\n    C -> D;\n  }\n}',
          category: 'Graph Diagram'
        }
      ]

      knownExamples.forEach(ex => {
        examples.push({
          title: ex.title,
          description: 'Graphviz DOT language example',
          source: 'graphviz',
          category: ex.category,
          type: 'nonlinear',
          code: ex.code,
          tags: ['graphviz', 'dot', 'graph']
        })
      })
    }

  } catch (error) {
    console.error('Failed to fetch Graphviz examples:', error)
  }

  console.log(`✓ Collected ${examples.length} Graphviz examples`)
  return examples
}
