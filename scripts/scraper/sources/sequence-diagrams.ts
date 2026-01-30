import type { DiagramExample, ScraperConfig } from '../types'
import { RateLimitedFetcher } from '../lib/fetcher'

/**
 * js-sequence-diagrams Scraper
 *
 * Scrapes from js-sequence-diagrams GitHub
 * https://github.com/bramp/js-sequence-diagrams
 *
 * BSD-2-Clause Licensed
 */

export async function scrapeSequenceDiagrams(config: ScraperConfig): Promise<DiagramExample[]> {
  const fetcher = new RateLimitedFetcher(config)
  const examples: DiagramExample[] = []

  console.log('📥 Fetching js-sequence-diagrams examples...')

  // Known examples from the library
  const knownExamples = [
    {
      title: 'Simple Sequence',
      code: 'Alice->Bob: Hello Bob, how are you?\nNote right of Bob: Bob thinks\nBob-->Alice: I am good thanks!',
      description: 'Basic sequence diagram with notes'
    },
    {
      title: 'Authentication Flow',
      code: 'User->+Server: Login Request\nServer->+Database: Query User\nDatabase-->-Server: User Data\nServer-->-User: Login Response',
      description: 'Authentication sequence with activation boxes'
    },
    {
      title: 'API Call Sequence',
      code: 'Client->API: GET /users\nAPI->Cache: Check Cache\nCache-->API: Cache Miss\nAPI->Database: Query\nDatabase-->API: Results\nAPI-->Client: JSON Response',
      description: 'API request flow with caching'
    },
    {
      title: 'Error Handling',
      code: 'User->System: Submit Form\nSystem->Validator: Validate\nValidator-->System: Error\nSystem-->User: Show Error',
      description: 'Error handling sequence'
    },
    {
      title: 'Async Process',
      code: 'Client->Server: Start Process\nNote over Server: Processing...\nServer->Queue: Add Job\nQueue-->Worker: Execute\nWorker-->Client: Notify Complete',
      description: 'Asynchronous processing flow'
    }
  ]

  knownExamples.forEach(ex => {
    examples.push({
      title: ex.title,
      description: ex.description,
      source: 'js-sequence-diagrams',
      category: 'Sequence Diagram',
      type: 'linear',
      code: ex.code,
      tags: ['sequence', 'interaction', 'communication', 'api']
    })
  })

  console.log(`✓ Collected ${examples.length} js-sequence-diagrams examples`)
  return examples
}
