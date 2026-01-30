import type { ScraperConfig } from '../types'

export class RateLimitedFetcher {
  private lastRequestTime: number = 0
  private config: ScraperConfig

  constructor(config: ScraperConfig) {
    this.config = config
  }

  async fetch(url: string): Promise<Response> {
    await this.waitForRateLimit()

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout)

    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': this.config.userAgent
        },
        signal: controller.signal
      })

      clearTimeout(timeoutId)
      return response
    } catch (error) {
      clearTimeout(timeoutId)
      throw error
    }
  }

  async fetchWithRetry(url: string): Promise<Response> {
    let lastError: Error | null = null

    for (let i = 0; i < this.config.retries; i++) {
      try {
        return await this.fetch(url)
      } catch (error) {
        lastError = error as Error
        console.warn(`Attempt ${i + 1} failed for ${url}:`, error)

        if (i < this.config.retries - 1) {
          // Exponential backoff
          await this.sleep(Math.pow(2, i) * 1000)
        }
      }
    }

    throw lastError || new Error('All retries failed')
  }

  private async waitForRateLimit() {
    const minDelay = 1000 / this.config.rateLimit
    const elapsed = Date.now() - this.lastRequestTime

    if (elapsed < minDelay) {
      await this.sleep(minDelay - elapsed)
    }

    this.lastRequestTime = Date.now()
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

// Default configuration
export const defaultConfig: ScraperConfig = {
  source: '',
  rateLimit: 1,       // 1 request per second
  concurrent: 2,      // 2 concurrent requests
  retries: 3,
  timeout: 10000,     // 10 seconds
  userAgent: 'DiagramCollectorBot/1.0 (+https://github.com/yourusername/dia; Educational/Research Purpose)'
}
