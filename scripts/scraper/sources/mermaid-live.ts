import type { DiagramExample, ScraperConfig } from '../types'
import { RateLimitedFetcher } from '../lib/fetcher'

/**
 * Mermaid Live Examples Scraper
 *
 * Scrapes real examples from:
 * - Mermaid documentation: https://mermaid.js.org/
 * - GitHub examples: https://github.com/mermaid-js/mermaid/tree/develop/packages/mermaid/src/docs
 *
 * These are official examples from the Mermaid project (MIT licensed)
 */

export async function scrapeMermaidLive(config: ScraperConfig): Promise<DiagramExample[]> {
  const fetcher = new RateLimitedFetcher(config)
  const examples: DiagramExample[] = []

  console.log('📥 Fetching Mermaid documentation examples...')

  // Fetch from GitHub API - official Mermaid docs
  const docsUrl = 'https://api.github.com/repos/mermaid-js/mermaid/contents/packages/mermaid/src/docs/syntax'

  try {
    const response = await fetcher.fetchWithRetry(docsUrl)
    const files = await response.json() as Array<{ name: string; download_url: string; type: string }>

    // Filter for markdown files
    const mdFiles = files.filter(f => f.name.endsWith('.md') && f.type === 'file')

    console.log(`Found ${mdFiles.length} documentation files`)

    for (const file of mdFiles.slice(0, 10)) { // Limit to first 10 files
      try {
        console.log(`  Fetching ${file.name}...`)
        const contentResponse = await fetcher.fetchWithRetry(file.download_url)
        const content = await contentResponse.text()

        // Extract code blocks with mermaid syntax
        const codeBlockRegex = /```mermaid\n([\s\S]*?)```/g
        let match

        while ((match = codeBlockRegex.exec(content)) !== null) {
          const code = match[1].trim()

          // Determine diagram type from code
          const type = code.split('\n')[0].trim()
          const category = getCategoryFromType(type)

          // Extract title from surrounding markdown (look for heading before code block)
          const beforeCode = content.substring(0, match.index)
          const headingMatch = beforeCode.match(/###?\s+([^\n]+)\n*$/m)
          const title = headingMatch ? headingMatch[1].trim() : `${category} Example`

          examples.push({
            title,
            description: `Real example from Mermaid.js ${file.name.replace('.md', '')} documentation`,
            source: 'mermaid',
            category,
            type: isLinearDiagram(type) ? 'linear' : 'nonlinear',
            code,
            tags: [category.toLowerCase(), 'mermaid', 'official']
          })
        }
      } catch (error) {
        console.warn(`  Failed to fetch ${file.name}:`, error)
      }
    }

  } catch (error) {
    console.error('Failed to fetch Mermaid examples:', error)
  }

  console.log(`✓ Collected ${examples.length} real Mermaid examples`)
  return examples
}

function getCategoryFromType(type: string): string {
  const typeMap: Record<string, string> = {
    'graph': 'Flowchart',
    'flowchart': 'Flowchart',
    'sequenceDiagram': 'Sequence Diagram',
    'classDiagram': 'Class Diagram',
    'stateDiagram': 'State Diagram',
    'erDiagram': 'ER Diagram',
    'gantt': 'Gantt Chart',
    'pie': 'Pie Chart',
    'journey': 'User Journey',
    'gitGraph': 'Git Graph',
    'quadrantChart': 'Quadrant Chart',
    'requirementDiagram': 'Requirement Diagram',
    'C4Context': 'C4 Diagram',
    'mindmap': 'Mind Map',
    'timeline': 'Timeline',
    'zenuml': 'ZenUML'
  }

  return typeMap[type] || 'Diagram'
}

function isLinearDiagram(type: string): boolean {
  const linearTypes = ['sequenceDiagram', 'gantt', 'journey', 'timeline', 'gitGraph']
  return linearTypes.includes(type)
}
