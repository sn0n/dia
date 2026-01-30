export interface DiagramExample {
  title: string
  description?: string
  source: string        // Library name (e.g., "mermaid")
  category: string      // e.g., "flowchart", "sequence", "network"
  type: string          // "linear" or "nonlinear"
  imageUrl?: string     // Link to rendered image
  code?: string         // Source code
  tags: string[]
}

export interface ScraperConfig {
  source: string
  rateLimit: number     // Requests per second
  concurrent: number    // Max concurrent requests
  retries: number
  timeout: number       // milliseconds
  userAgent: string
}

export interface ScraperSource {
  name: string
  scrape: (config: ScraperConfig) => Promise<DiagramExample[]>
  validate?: (example: DiagramExample) => boolean
}
