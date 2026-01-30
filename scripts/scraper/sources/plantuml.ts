import type { DiagramExample, ScraperConfig } from '../types'
import { RateLimitedFetcher } from '../lib/fetcher'

/**
 * PlantUML Examples Scraper
 *
 * Scrapes from PlantUML's official example pages
 * https://plantuml.com/ - Public examples
 *
 * PlantUML is GPL/Apache/LGPL/MIT licensed depending on components
 */

export async function scrapePlantUML(config: ScraperConfig): Promise<DiagramExample[]> {
  const fetcher = new RateLimitedFetcher(config)
  const examples: DiagramExample[] = []

  console.log('📥 Fetching PlantUML examples...')

  // PlantUML example pages
  const examplePages = [
    { url: 'https://plantuml.com/sequence-diagram', category: 'Sequence Diagram', type: 'linear' },
    { url: 'https://plantuml.com/use-case-diagram', category: 'Use Case Diagram', type: 'nonlinear' },
    { url: 'https://plantuml.com/class-diagram', category: 'Class Diagram', type: 'nonlinear' },
    { url: 'https://plantuml.com/activity-diagram-beta', category: 'Activity Diagram', type: 'linear' },
    { url: 'https://plantuml.com/component-diagram', category: 'Component Diagram', type: 'nonlinear' },
    { url: 'https://plantuml.com/state-diagram', category: 'State Diagram', type: 'nonlinear' },
    { url: 'https://plantuml.com/deployment-diagram', category: 'Deployment Diagram', type: 'nonlinear' },
    { url: 'https://plantuml.com/timing-diagram', category: 'Timing Diagram', type: 'linear' }
  ]

  for (const page of examplePages.slice(0, 5)) { // Limit to 5 pages
    try {
      console.log(`  Fetching ${page.category}...`)
      const response = await fetcher.fetchWithRetry(page.url)
      const html = await response.text()

      // Extract PlantUML code blocks from <pre> or <code> tags
      const codeRegex = /@startuml[\s\S]*?@enduml/g
      const matches = html.match(codeRegex)

      if (matches) {
        matches.slice(0, 3).forEach((code, idx) => {
          examples.push({
            title: `${page.category} Example ${idx + 1}`,
            description: `Official example from PlantUML documentation`,
            source: 'plantuml',
            category: page.category,
            type: page.type,
            code: code.trim(),
            tags: [page.category.toLowerCase(), 'plantuml', 'uml', 'official']
          })
        })
      }

    } catch (error) {
      console.warn(`  Failed to fetch ${page.category}:`, error)
    }
  }

  console.log(`✓ Collected ${examples.length} real PlantUML examples`)
  return examples
}
