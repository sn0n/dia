import type { DiagramExample, ScraperConfig } from '../types'
import { RateLimitedFetcher } from '../lib/fetcher'

/**
 * Mermaid Diagram Scraper
 *
 * This scraper collects example diagrams from Mermaid's official documentation
 * and examples repository. Mermaid is open-source (MIT licensed) and their
 * documentation is publicly available.
 *
 * Sources:
 * - Official docs: https://mermaid.js.org/
 * - GitHub examples: https://github.com/mermaid-js/mermaid/tree/develop/packages/mermaid/src/docs
 *
 * License: MIT (Open Source)
 * Permission: Publicly documented examples
 */

export async function scrapeMermaid(config: ScraperConfig): Promise<DiagramExample[]> {
  const fetcher = new RateLimitedFetcher(config)
  const examples: DiagramExample[] = []

  // Mermaid example types with their categories
  const mermaidTypes = [
    { name: 'flowchart', category: 'Flowchart', type: 'linear' },
    { name: 'sequence', category: 'Sequence Diagram', type: 'linear' },
    { name: 'class', category: 'Class Diagram', type: 'nonlinear' },
    { name: 'state', category: 'State Diagram', type: 'nonlinear' },
    { name: 'er', category: 'Entity Relationship', type: 'nonlinear' },
    { name: 'gantt', category: 'Gantt Chart', type: 'linear' },
    { name: 'pie', category: 'Pie Chart', type: 'linear' },
    { name: 'journey', category: 'User Journey', type: 'linear' },
  ]

  // Sample examples (in production, these would be fetched from the docs)
  const sampleExamples: Record<string, DiagramExample[]> = {
    flowchart: [
      {
        title: 'Simple Flowchart',
        description: 'A basic flowchart showing a simple decision process',
        source: 'mermaid',
        category: 'Flowchart',
        type: 'linear',
        code: `graph TD
    A[Start] --> B{Is it?}
    B -->|Yes| C[OK]
    C --> D[End]
    B -->|No| E[Not OK]
    E --> D`,
        tags: ['flowchart', 'decision', 'basic']
      },
      {
        title: 'Process Flow',
        description: 'A flowchart representing a process with multiple steps',
        source: 'mermaid',
        category: 'Flowchart',
        type: 'linear',
        code: `graph LR
    A[Input] --> B[Process]
    B --> C{Check}
    C -->|Pass| D[Output]
    C -->|Fail| B`,
        tags: ['flowchart', 'process', 'loop']
      }
    ],
    sequence: [
      {
        title: 'Simple Sequence',
        description: 'A sequence diagram showing communication between two actors',
        source: 'mermaid',
        category: 'Sequence Diagram',
        type: 'linear',
        code: `sequenceDiagram
    participant Alice
    participant Bob
    Alice->>Bob: Hello Bob, how are you?
    Bob-->>Alice: Great!`,
        tags: ['sequence', 'communication', 'actors']
      }
    ],
    class: [
      {
        title: 'Class Diagram',
        description: 'A class diagram showing inheritance and relationships',
        source: 'mermaid',
        category: 'Class Diagram',
        type: 'nonlinear',
        code: `classDiagram
    Animal <|-- Duck
    Animal <|-- Fish
    Animal : +int age
    Animal : +String gender
    Animal: +isMammal()
    class Duck{
      +String beakColor
      +swim()
      +quack()
    }`,
        tags: ['class', 'inheritance', 'oop']
      }
    ]
  }

  // In a real implementation, you would:
  // 1. Fetch from GitHub API or docs site
  // 2. Parse HTML/Markdown for code blocks
  // 3. Extract metadata from context

  // For now, return sample data
  for (const [key, value] of Object.entries(sampleExamples)) {
    examples.push(...value)
  }

  console.log(`✓ Collected ${examples.length} Mermaid examples`)
  return examples
}

/**
 * To implement full scraping:
 *
 * 1. Fetch from GitHub API:
 *    const response = await fetcher.fetchWithRetry(
 *      'https://api.github.com/repos/mermaid-js/mermaid/contents/packages/mermaid/src/docs'
 *    )
 *
 * 2. Parse markdown files for code blocks:
 *    - Look for ```mermaid code blocks
 *    - Extract surrounding text for descriptions
 *    - Categorize based on file path
 *
 * 3. Validate examples:
 *    - Check syntax
 *    - Ensure complete examples
 *    - Filter out fragments
 */
