# Diagram Library Sources

A comprehensive list of diagram libraries and apps with their licensing, accessibility, and scraping considerations.

## ✅ Open Source / Scrapable (With Attribution)

### Mermaid
- **Website**: https://mermaid.js.org/
- **License**: MIT
- **Examples**: https://github.com/mermaid-js/mermaid/tree/develop/packages/mermaid/src/docs
- **Types**: Flowchart, Sequence, Class, State, ER, Gantt, Pie, Journey, Git Graph
- **Scraping**: ✅ Allowed (open source examples)
- **API**: No official API, but GitHub API for examples
- **Notes**: Excellent documentation with many examples

### PlantUML
- **Website**: https://plantuml.com/
- **License**: GPL/Apache/LGPL/MIT (various components)
- **Examples**: https://plantuml.com/
- **Types**: Sequence, Use Case, Class, Activity, Component, State, Object, Deployment, Timing
- **Scraping**: ✅ Allowed (public examples)
- **API**: Has a server API for rendering
- **Notes**: Extensive example gallery

### Excalidraw
- **Website**: https://excalidraw.com/
- **License**: MIT
- **Examples**: https://github.com/excalidraw/excalidraw/tree/master/examples
- **Types**: Hand-drawn style diagrams, wireframes, sketches
- **Scraping**: ✅ Allowed (open source)
- **API**: Libraries available for integration
- **Notes**: Community libraries available

### Nomnoml
- **Website**: http://nomnoml.com/
- **License**: MIT
- **Examples**: On website
- **Types**: UML diagrams from simple text
- **Scraping**: ✅ Allowed (simple examples on site)
- **API**: JavaScript library
- **Notes**: Minimalist syntax

### Railroad Diagrams
- **Website**: https://github.com/tabatkins/railroad-diagrams
- **License**: CC0 (Public Domain)
- **Examples**: On GitHub
- **Types**: Syntax diagrams for grammar specification
- **Scraping**: ✅ Allowed (public domain)
- **API**: JavaScript library
- **Notes**: Used for programming language documentation

## ⚠️ Requires Attribution / Limited Use

### D3.js Gallery
- **Website**: https://observablehq.com/@d3/gallery
- **License**: ISC (library), Examples vary
- **Examples**: Observable notebooks
- **Types**: Network graphs, hierarchies, force layouts, custom visualizations
- **Scraping**: ⚠️ Check individual notebook licenses
- **API**: Observable API available
- **Notes**: Each example has its own license

### Cytoscape.js Examples
- **Website**: https://js.cytoscape.org/
- **License**: MIT (library)
- **Examples**: https://github.com/cytoscape/cytoscape.js/tree/master/documentation/demos
- **Types**: Network graphs, biological pathways, social networks
- **Scraping**: ✅ Allowed (MIT licensed examples)
- **API**: JavaScript library
- **Notes**: Great for complex networks

### Graphviz Gallery
- **Website**: https://graphviz.org/gallery/
- **License**: EPL (Eclipse Public License)
- **Examples**: Official gallery
- **Types**: DOT language graphs, hierarchies, networks
- **Scraping**: ✅ Allowed (with attribution)
- **API**: Command-line tool
- **Notes**: Classic graph visualization

## 🔒 Requires API / Authentication

### Lucidchart
- **Website**: https://www.lucidchart.com/
- **License**: Commercial (Proprietary)
- **Examples**: Template gallery (requires account)
- **Types**: Flowcharts, UML, wireframes, org charts, network diagrams
- **Scraping**: ❌ Not allowed (ToS violation)
- **API**: ✅ Official API available (requires auth)
- **Notes**: Must use official API or manual export

### Figma / FigJam
- **Website**: https://www.figma.com/
- **License**: Commercial (Proprietary)
- **Examples**: Community files (public)
- **Types**: Wireframes, flowcharts, design systems, diagrams
- **Scraping**: ❌ Not allowed
- **API**: ✅ Official API available (requires auth)
- **Notes**: Use Figma API for programmatic access

### Miro
- **Website**: https://miro.com/
- **License**: Commercial (Proprietary)
- **Examples**: Template gallery (requires account)
- **Types**: Flowcharts, mind maps, journey maps, brainstorming
- **Scraping**: ❌ Not allowed
- **API**: ✅ Official REST API available
- **Notes**: Must use official API

### Microsoft Visio
- **Website**: https://www.microsoft.com/en-us/microsoft-365/visio/
- **License**: Commercial (Microsoft)
- **Examples**: Template gallery (requires license)
- **Types**: Professional diagramming, floor plans, network diagrams, BPMN
- **Scraping**: ❌ Not allowed
- **API**: Limited (Microsoft Graph API)
- **Notes**: Enterprise software, restricted access

## 📦 Download & Use Locally

### Draw.io / Diagrams.net
- **Website**: https://www.diagrams.net/
- **License**: Apache 2.0
- **Examples**: Built-in templates and examples
- **Types**: Everything (very comprehensive library)
- **Scraping**: ✅ Open source (use GitHub repo)
- **API**: Electron app / Web app
- **GitHub**: https://github.com/jgraph/drawio
- **Notes**: Massive shape library, local first

### yEd
- **Website**: https://www.yworks.com/products/yed
- **License**: Freeware (not open source)
- **Examples**: Sample files included
- **Types**: Flowcharts, UML, BPMN, family trees, networks
- **Scraping**: ⚠️ Check license (freeware but proprietary)
- **API**: GraphML format (XML)
- **Notes**: Powerful auto-layout algorithms

## 🔧 Specialized Tools

### BPMN.io
- **Website**: https://bpmn.io/
- **License**: MIT
- **Examples**: https://demo.bpmn.io/
- **Types**: BPMN 2.0, DMN
- **Scraping**: ✅ Allowed (open source)
- **API**: JavaScript toolkit
- **Notes**: Industry-standard BPMN

### Camunda Modeler
- **Website**: https://camunda.com/
- **License**: MIT (modeler), Commercial (platform)
- **Examples**: On website
- **Types**: BPMN, DMN, CMMN
- **Scraping**: ✅ Allowed (open source modeler)
- **API**: Camunda Platform API
- **Notes**: Enterprise workflow automation

### Structurizr
- **Website**: https://structurizr.com/
- **License**: Apache 2.0
- **Examples**: https://structurizr.com/share/
- **Types**: C4 model diagrams (architecture as code)
- **Scraping**: ✅ Public workspace examples
- **API**: Structurizr API
- **Notes**: Software architecture diagrams

### WaveDrom
- **Website**: https://wavedrom.com/
- **License**: MIT
- **Examples**: https://wavedrom.com/tutorial.html
- **Types**: Digital timing diagrams, waveforms
- **Scraping**: ✅ Allowed (open source)
- **API**: JavaScript library
- **Notes**: Specialized for hardware/digital logic

## 🌐 Text-to-Diagram Services

### Kroki
- **Website**: https://kroki.io/
- **License**: MIT
- **Examples**: Supports 20+ diagram types
- **Types**: Mermaid, PlantUML, GraphViz, and more
- **Scraping**: ✅ Open source unified API
- **API**: ✅ REST API for rendering
- **Notes**: Converts text to diagrams via API

### Flowchart.fun
- **Website**: https://flowchart.fun/
- **License**: Commercial (with free tier)
- **Examples**: Interactive editor
- **Types**: Quick flowcharts from indented text
- **Scraping**: ❌ Not allowed
- **API**: Limited
- **Notes**: Very fast for simple diagrams

### Markmap
- **Website**: https://markmap.js.org/
- **License**: MIT
- **Examples**: On website
- **Types**: Mind maps from Markdown
- **Scraping**: ✅ Allowed (open source)
- **API**: JavaScript library
- **Notes**: Great for hierarchical data

## 🎓 Academic / Research

### NetworkX (Python)
- **Website**: https://networkx.org/
- **License**: BSD
- **Examples**: https://networkx.org/documentation/stable/auto_examples/
- **Types**: Network analysis and visualization
- **Scraping**: ✅ Allowed (open source examples)
- **API**: Python library
- **Notes**: Extensive academic network examples

### Diagrams (Python)
- **Website**: https://diagrams.mingrammer.com/
- **License**: MIT
- **Examples**: https://diagrams.mingrammer.com/docs/getting-started/examples
- **Types**: Cloud architecture (AWS, GCP, Azure, Kubernetes)
- **Scraping**: ✅ Allowed (open source)
- **API**: Python library
- **Notes**: Code-based diagram generation

### Schemdraw (Python)
- **Website**: https://schemdraw.readthedocs.io/
- **License**: MIT
- **Examples**: In documentation
- **Types**: Circuit diagrams, logic diagrams
- **Scraping**: ✅ Allowed (open source)
- **API**: Python library
- **Notes**: Specialized for electronics

## 📊 Summary Matrix

| Source | License | Scraping | API | Best For |
|--------|---------|----------|-----|----------|
| Mermaid | MIT | ✅ | GitHub | Text-based diagrams |
| PlantUML | Various OSS | ✅ | Server | UML diagrams |
| Excalidraw | MIT | ✅ | Library | Hand-drawn style |
| D3.js | Varies | ⚠️ | Observable | Custom visualizations |
| Lucidchart | Proprietary | ❌ | ✅ | Professional diagrams |
| Figma | Proprietary | ❌ | ✅ | Design + diagrams |
| Draw.io | Apache 2.0 | ✅ | Desktop | Everything |
| BPMN.io | MIT | ✅ | Toolkit | Business processes |
| Structurizr | Apache 2.0 | ✅ | API | Software architecture |
| Kroki | MIT | ✅ | ✅ | Unified API |

## 🚀 Recommended Collection Strategy

### Phase 1: Open Source Examples (Safe & Legal)
1. ✅ Mermaid documentation
2. ✅ PlantUML gallery
3. ✅ Excalidraw examples
4. ✅ BPMN.io demos
5. ✅ Structurizr public workspaces

### Phase 2: API Integration (Requires Auth)
1. Figma Community (read-only via API)
2. Lucidchart public templates (via API)
3. Observable notebooks (via API)

### Phase 3: Manual Curation (Best Quality)
1. Create your own examples
2. User-submitted diagrams
3. Community contributions
4. Curated collections

## 📝 Attribution Requirements

When using examples, always include:

```markdown
**Source**: [Library Name]
**License**: [License Type]
**Original**: [Link to original]
**Modified**: [Yes/No and how]
```

Example:
```markdown
**Source**: Mermaid.js
**License**: MIT
**Original**: https://github.com/mermaid-js/mermaid/blob/develop/packages/mermaid/src/docs/syntax/flowchart.md
**Modified**: Simplified for clarity
```

## ⚖️ Legal Considerations

1. **Copyright**: Respect all copyright notices
2. **Licenses**: Comply with license terms (MIT, GPL, etc.)
3. **ToS**: Never violate Terms of Service
4. **Rate Limits**: Respect API rate limits
5. **Attribution**: Always credit original authors
6. **Commercial Use**: Some licenses prohibit it
7. **Derived Works**: Check if modifications are allowed

## 🤝 Contributing

To add a new source:

1. Verify the license allows usage
2. Check `robots.txt` and ToS
3. Create scraper in `scripts/scraper/sources/`
4. Document attribution requirements
5. Add to this file

---

**Remember**: When in doubt, ask for permission or use official APIs. Respecting content creators builds better tools for everyone.
