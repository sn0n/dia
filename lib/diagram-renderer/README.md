# Diagram Renderer Library

A comprehensive, extensible diagram rendering library that supports multiple diagram formats and rendering engines.

## Features

- ✅ **Multi-format support**: Mermaid, PlantUML, Graphviz, WaveDrom, and more
- ✅ **Extensible**: Easy to add new diagram types
- ✅ **Customizable**: Override styles, themes, and rendering options
- ✅ **Type-safe**: Full TypeScript support
- ✅ **Framework agnostic**: Works with React, Vue, vanilla JS
- ✅ **Lightweight**: Tree-shakeable, load only what you need

## Installation

```bash
npm install @your-org/diagram-renderer
```

## Quick Start

### React

```tsx
import { DiagramRenderer } from '@your-org/diagram-renderer/react'

function App() {
  const code = `graph TD
    A[Start] --> B[Process]
    B --> C[End]`

  return <DiagramRenderer source="mermaid" code={code} />
}
```

### Vanilla JS

```javascript
import { renderDiagram } from '@your-org/diagram-renderer'

const container = document.getElementById('diagram')
await renderDiagram({
  container,
  source: 'mermaid',
  code: `graph TD; A-->B;`
})
```

## Supported Formats

| Format | Type | Renderer | Status |
|--------|------|----------|--------|
| Mermaid | Text-to-diagram | Client-side | ✅ |
| PlantUML | UML | Kroki API | ✅ |
| Graphviz | DOT | Kroki API | ✅ |
| WaveDrom | Timing | Kroki API | ✅ |
| BPMN | Business Process | bpmn.js | ✅ |
| D3 | Data viz | Custom | 🚧 |
| Cytoscape | Networks | cytoscape.js | 🚧 |

## API Reference

### DiagramRenderer (React)

```tsx
interface DiagramRendererProps {
  source: DiagramSource
  code: string
  options?: RenderOptions
  onRender?: (result: RenderResult) => void
  onError?: (error: Error) => void
}
```

### renderDiagram (Core)

```typescript
function renderDiagram(config: DiagramConfig): Promise<RenderResult>

interface DiagramConfig {
  container: HTMLElement
  source: DiagramSource
  code: string
  options?: RenderOptions
}
```

### RenderOptions

```typescript
interface RenderOptions {
  theme?: 'light' | 'dark' | 'neutral'
  width?: number | string
  height?: number | string
  backgroundColor?: string
  responsive?: boolean
  // Source-specific options
  mermaid?: MermaidOptions
  plantuml?: PlantUMLOptions
  // ... etc
}
```

## Extending

### Add a New Diagram Type

```typescript
import { registerRenderer } from '@your-org/diagram-renderer'

registerRenderer('my-diagram', {
  async render(code: string, container: HTMLElement, options?: any) {
    // Your rendering logic
    const result = await myDiagramLib.parse(code)
    container.innerHTML = result
    return { success: true }
  },

  validate(code: string): boolean {
    // Optional: validate code before rendering
    return code.includes('my-diagram')
  },

  getDefaultOptions() {
    return { theme: 'light' }
  }
})
```

### Custom Theme

```typescript
import { setTheme } from '@your-org/diagram-renderer'

setTheme('my-theme', {
  mermaid: {
    theme: 'base',
    themeVariables: {
      primaryColor: '#ff6b6b',
      primaryTextColor: '#fff',
      primaryBorderColor: '#ff5252',
    }
  },
  graphviz: {
    bgcolor: '#f5f5f5',
    fontcolor: '#333'
  }
})
```

## Examples

### Mermaid Flowchart

```tsx
<DiagramRenderer
  source="mermaid"
  code={`
    graph LR
      A[User] --> B{Decision}
      B -->|Yes| C[Success]
      B -->|No| D[Failure]
  `}
  options={{ theme: 'dark' }}
/>
```

### PlantUML Sequence

```tsx
<DiagramRenderer
  source="plantuml"
  code={`
    @startuml
    Alice -> Bob: Hello
    Bob --> Alice: Hi!
    @enduml
  `}
/>
```

### Graphviz DOT

```tsx
<DiagramRenderer
  source="graphviz"
  code={`
    digraph G {
      A -> B -> C;
      B -> D;
    }
  `}
/>
```

## Advanced Usage

### Multiple Renderers

```tsx
import { DiagramGrid } from '@your-org/diagram-renderer/react'

const diagrams = [
  { source: 'mermaid', code: '...' },
  { source: 'plantuml', code: '...' },
  { source: 'graphviz', code: '...' }
]

<DiagramGrid diagrams={diagrams} columns={3} />
```

### Lazy Loading

```tsx
import { LazyDiagramRenderer } from '@your-org/diagram-renderer/react'

// Only loads rendering engine when diagram enters viewport
<LazyDiagramRenderer
  source="mermaid"
  code="..."
  placeholder={<Skeleton />}
/>
```

### Export

```tsx
import { exportDiagram } from '@your-org/diagram-renderer'

const result = await exportDiagram({
  source: 'mermaid',
  code: '...',
  format: 'svg' // or 'png', 'pdf'
})

// Download
const blob = new Blob([result], { type: 'image/svg+xml' })
saveAs(blob, 'diagram.svg')
```

## Performance

- **Code splitting**: Each renderer is lazy-loaded
- **Caching**: Rendered diagrams are cached
- **Debouncing**: Live preview with debounced rendering
- **Web Workers**: Heavy parsing in background threads

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions

## License

MIT

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md)
