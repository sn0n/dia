# Scraped Diagram Examples

## ✅ Successfully Scraped Sources

### Mermaid.js (15 examples)
**Source**: Official Mermaid documentation from GitHub
**License**: MIT
**URL**: https://github.com/mermaid-js/mermaid

**Examples Include**:
- Block Diagrams
- Class Diagrams
- Flowcharts
- Gantt Charts
- Entity Relationship Diagrams

**Sample Code**:
```mermaid
block
  columns 3
  Frontend blockArrowId6<[" "]>(right) Backend
  space:2 down<[" "]>(down)
  Disk left<[" "]>(left) Database[("Database")]
```

### PlantUML (15 examples)
**Source**: Official PlantUML documentation
**License**: GPL/Apache/LGPL/MIT (various components)
**URL**: https://plantuml.com/

**Examples Include**:
- Sequence Diagrams
- Use Case Diagrams
- Class Diagrams
- Activity Diagrams
- Component Diagrams

**Sample Code**:
```plantuml
@startuml
Alice -> Bob: Authentication Request
Bob --> Alice: Authentication Response
@enduml
```

## 📊 Total Collected

- **Total Examples**: 30
- **Sources Scraped**: 2
- **Format**: JSON files in `scraped-data/` directory

## 📁 Files Generated

```
scraped-data/
├── mermaid-examples.json (15 examples)
└── plantuml-examples.json (15 examples)
```

## 🔄 Next Steps

To add more sources, run:

```bash
# Scrape D3.js Observable examples
npx tsx scripts/scraper/run-scraper.ts --source=d3

# Scrape Excalidraw libraries
npx tsx scripts/scraper/run-scraper.ts --source=excalidraw

# Scrape Nomnoml examples
npx tsx scripts/scraper/run-scraper.ts --source=nomnoml
```

## 📝 Example Structure

Each scraped example contains:

```json
{
  "title": "Introduction to Block Diagrams",
  "description": "Real example from Mermaid.js block documentation",
  "source": "mermaid",
  "category": "Diagram",
  "type": "nonlinear",
  "code": "block\n  columns 3\n  Frontend ...",
  "tags": ["diagram", "mermaid", "official"]
}
```

## ⚖️ Legal Compliance

All examples were scraped from:
- ✅ Open source projects with permissive licenses
- ✅ Official documentation and examples
- ✅ Public GitHub repositories
- ✅ With proper attribution and license respect

**Attribution**:
- Mermaid examples © Mermaid.js contributors (MIT License)
- PlantUML examples © PlantUML project (Multiple licenses)

## 🎯 Quality Assurance

- ✅ Real examples from official sources (not generated)
- ✅ Working code snippets
- ✅ Properly categorized
- ✅ Tagged for search
- ✅ License-compliant

---

**Generated**: 2026-01-22
**Scraper Version**: 1.0
**Method**: Automated scraping with rate limiting and ethical guidelines
