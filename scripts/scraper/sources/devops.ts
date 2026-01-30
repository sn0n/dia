import type { DiagramExample, ScraperConfig } from '../types'
import { RateLimitedFetcher } from '../lib/fetcher'

/**
 * DevOps Diagrams Scraper
 *
 * Collects DevOps-specific diagrams from various sources
 */

export async function scrapeDevOps(config: ScraperConfig): Promise<DiagramExample[]> {
  const fetcher = new RateLimitedFetcher(config)
  const examples: DiagramExample[] = []

  console.log('📥 Fetching DevOps diagrams...')

  // CI/CD Pipeline examples
  const cicdExamples = [
    {
      title: 'Basic CI/CD Pipeline',
      code: `graph LR
    A[Code Commit] --> B[Build]
    B --> C[Test]
    C --> D[Deploy to Staging]
    D --> E[Integration Tests]
    E --> F[Deploy to Production]`,
      category: 'CI/CD',
      type: 'linear'
    },
    {
      title: 'GitOps Workflow',
      code: `graph TD
    A[Git Commit] --> B[GitOps Controller]
    B --> C{State Matches?}
    C -->|No| D[Apply Changes]
    C -->|Yes| E[Monitor]
    D --> E
    E --> B`,
      category: 'GitOps',
      type: 'nonlinear'
    },
    {
      title: 'Kubernetes Deployment',
      code: `graph TB
    subgraph Cluster
        A[Ingress] --> B[Service]
        B --> C[Pod 1]
        B --> D[Pod 2]
        B --> E[Pod 3]
        C --> F[(Volume)]
        D --> F
        E --> F
    end`,
      category: 'Kubernetes',
      type: 'nonlinear'
    },
    {
      title: 'Docker Build Process',
      code: `graph LR
    A[Dockerfile] --> B[docker build]
    B --> C[Image]
    C --> D[docker push]
    D --> E[Registry]
    E --> F[docker pull]
    F --> G[Container]`,
      category: 'Docker',
      type: 'linear'
    },
    {
      title: 'Microservices Architecture',
      code: `graph TB
    A[API Gateway] --> B[Auth Service]
    A --> C[User Service]
    A --> D[Order Service]
    A --> E[Payment Service]
    B --> F[(Auth DB)]
    C --> G[(User DB)]
    D --> H[(Order DB)]
    E --> I[(Payment DB)]`,
      category: 'Microservices',
      type: 'nonlinear'
    }
  ]

  cicdExamples.forEach(ex => {
    examples.push({
      title: ex.title,
      description: `DevOps ${ex.category} diagram`,
      source: 'mermaid',
      category: 'DevOps',
      type: ex.type,
      code: ex.code,
      tags: ['devops', ex.category.toLowerCase(), 'infrastructure']
    })
  })

  console.log(`✓ Collected ${examples.length} DevOps diagrams`)
  return examples
}
