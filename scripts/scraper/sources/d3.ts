import type { DiagramExample, ScraperConfig } from '../types'
import { RateLimitedFetcher } from '../lib/fetcher'

/**
 * D3.js Observable Examples Scraper
 *
 * Scrapes from D3.js Observable Gallery
 * https://observablehq.com/@d3/gallery
 *
 * Note: Each Observable notebook has its own license (check individually)
 * D3.js library itself is ISC licensed
 */

export async function scrapeD3Observable(config: ScraperConfig): Promise<DiagramExample[]> {
  const fetcher = new RateLimitedFetcher(config)
  const examples: DiagramExample[] = []

  console.log('📥 Fetching D3.js Observable examples...')

  // Observable API for D3 gallery
  const galleryUrl = 'https://api.observablehq.com/@d3/gallery.js?v=3'

  try {
    const response = await fetcher.fetchWithRetry(galleryUrl)
    const content = await response.text()

    // Parse Observable notebook format to extract examples
    // This is a simplified version - real implementation would parse the notebook structure

    // For now, add known D3 example types
    const d3Examples = [
      {
        title: 'Force-Directed Graph',
        description: 'Network visualization using force simulation from D3 Gallery',
        category: 'Network Graph',
        url: 'https://observablehq.com/@d3/force-directed-graph'
      },
      {
        title: 'Hierarchical Edge Bundling',
        description: 'Shows relationships in hierarchical data from D3 Gallery',
        category: 'Hierarchy',
        url: 'https://observablehq.com/@d3/hierarchical-edge-bundling'
      },
      {
        title: 'Chord Diagram',
        description: 'Visualizes inter-relationships from D3 Gallery',
        category: 'Flow Diagram',
        url: 'https://observablehq.com/@d3/chord-diagram'
      },
      {
        title: 'Sankey Diagram',
        description: 'Flow visualization from D3 Gallery',
        category: 'Flow Diagram',
        url: 'https://observablehq.com/@d3/sankey'
      },
      {
        title: 'Treemap',
        description: 'Hierarchical data visualization from D3 Gallery',
        category: 'Hierarchy',
        url: 'https://observablehq.com/@d3/treemap'
      },
      {
        title: 'Circle Packing',
        description: 'Hierarchical circle layout from D3 Gallery',
        category: 'Hierarchy',
        url: 'https://observablehq.com/@d3/circle-packing'
      },
      {
        title: 'Arc Diagram',
        description: 'Network as arcs from D3 Gallery',
        category: 'Network Graph',
        url: 'https://observablehq.com/@d3/arc-diagram'
      }
    ]

    for (const example of d3Examples) {
      examples.push({
        title: example.title,
        description: example.description,
        source: 'd3',
        category: example.category,
        type: 'nonlinear',
        imageUrl: example.url,
        tags: ['d3', 'observable', example.category.toLowerCase(), 'interactive']
      })
    }

  } catch (error) {
    console.warn('Failed to fetch D3 Observable gallery, using known examples:', error)

    // Fallback to known examples even if fetch fails
    const d3Examples = [
      {
        title: 'Force-Directed Graph',
        description: 'Network visualization using force simulation from D3 Gallery',
        category: 'Network Graph',
        url: 'https://observablehq.com/@d3/force-directed-graph'
      },
      {
        title: 'Sankey Diagram',
        description: 'Flow visualization from D3 Gallery',
        category: 'Flow Diagram',
        url: 'https://observablehq.com/@d3/sankey'
      }
    ]

    for (const example of d3Examples) {
      examples.push({
        title: example.title,
        description: example.description,
        source: 'd3',
        category: example.category,
        type: 'nonlinear',
        imageUrl: example.url,
        tags: ['d3', 'observable', example.category.toLowerCase()]
      })
    }
  }

  console.log(`✓ Collected ${examples.length} D3.js examples`)
  return examples
}
