# Diagram Scraper Framework

This framework provides templates for collecting diagram examples from various libraries and tools.

## ⚠️ Important Legal Note

Before scraping any website:
1. Check the website's `robots.txt` file
2. Review their Terms of Service
3. Respect rate limits
4. Consider using official APIs when available

## Architecture

```
scripts/scraper/
├── sources/           # Individual scraper implementations
│   ├── mermaid.ts    # Mermaid diagram examples
│   ├── d3.ts         # D3.js examples
│   └── ...
├── lib/              # Shared utilities
│   ├── fetcher.ts    # HTTP client with rate limiting
│   ├── parser.ts     # HTML/DOM parsing utilities
│   └── storage.ts    # Save to database
└── index.ts          # Main runner
```

## Usage

### 1. Manual Import (Recommended)

For sites that require authentication or have strict ToS:

```bash
npm run import -- --source mermaid --file examples.json
```

### 2. API Integration

For services with official APIs:

```bash
npm run scrape -- --source mermaid --api
```

### 3. Automated Scraping (Use Carefully)

Only for sites that explicitly allow it:

```bash
npm run scrape -- --source excalidraw --auto
```

## Data Format

All scrapers should output diagrams in this format:

```typescript
interface DiagramExample {
  title: string
  description?: string
  source: string        // Library name (e.g., "mermaid")
  category: string      // e.g., "flowchart", "sequence"
  type: string          // "linear" or "nonlinear"
  imageUrl?: string     // Link to rendered image
  code?: string         // Source code
  tags: string[]
}
```

## Adding a New Source

1. Create a new file in `sources/` directory
2. Implement the scraper interface
3. Add the source to `index.ts`
4. Test with a small sample first

Example template:

```typescript
// sources/your-library.ts
import type { DiagramExample } from '../types'

export async function scrapeYourLibrary(): Promise<DiagramExample[]> {
  // Implementation
  return []
}
```

## Respecting Websites

- **Rate Limiting**: Max 1 request per second
- **User Agent**: Identifies as a bot
- **Caching**: Stores responses to avoid re-scraping
- **Incremental**: Only fetches new content

## Legal Compliance

This tool is provided for:
- Educational purposes
- Personal research
- Building training datasets with permission

**Not for:**
- Bypassing paywalls
- Circumventing access controls
- Commercial use without permission
- Violating Terms of Service

## Recommended Approach

1. **Check for official examples repo** - Many projects have example galleries
2. **Use APIs** - Preferred method when available
3. **Manual collection** - For small datasets
4. **Ask permission** - Contact maintainers for bulk access

## Example Sources

### With Official Examples/APIs
- Mermaid: https://github.com/mermaid-js/mermaid/tree/develop/packages/mermaid/src/docs
- PlantUML: https://plantuml.com/
- Excalidraw: https://github.com/excalidraw/excalidraw/tree/master/examples

### Require Manual Collection
- Lucidchart (commercial, requires account)
- Figma (API available with auth)
- Visio (Microsoft, proprietary)

## Rate Limits

Default settings:
- Requests per second: 1
- Concurrent requests: 2
- Retry attempts: 3
- Timeout: 10 seconds

## Ethics

When in doubt, DON'T scrape. Instead:
1. Use official documentation
2. Create your own examples
3. Ask for permission
4. Use public datasets
