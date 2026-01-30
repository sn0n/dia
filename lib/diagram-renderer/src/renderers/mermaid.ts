/**
 * Mermaid diagram renderer
 */

import type { DiagramRenderer, RenderResult, MermaidOptions } from '../core/types'

export class MermaidRenderer implements DiagramRenderer {
  private mermaidInstance: any = null

  async render(
    code: string,
    container: HTMLElement,
    options?: MermaidOptions
  ): Promise<RenderResult> {
    try {
      // Lazy load Mermaid
      if (!this.mermaidInstance) {
        const mermaid = await import('mermaid')
        this.mermaidInstance = mermaid.default

        this.mermaidInstance.initialize({
          startOnLoad: false,
          theme: options?.theme || 'default',
          securityLevel: 'loose',
          ...options
        })
      }

      // Generate unique ID
      const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`

      // Render
      const { svg } = await this.mermaidInstance.render(id, code)

      // Insert into container
      container.innerHTML = svg

      // Get size
      const svgElement = container.querySelector('svg')
      const width = svgElement?.getAttribute('width') || 0
      const height = svgElement?.getAttribute('height') || 0

      return {
        success: true,
        output: svg,
        metadata: {
          renderTime: 0,
          source: 'mermaid',
          size: {
            width: parseInt(String(width)),
            height: parseInt(String(height))
          }
        }
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error : new Error(String(error))
      }
    }
  }

  validate(code: string): boolean {
    // Basic validation - check for mermaid keywords
    const keywords = ['graph', 'flowchart', 'sequenceDiagram', 'classDiagram', 'stateDiagram', 'erDiagram', 'gantt', 'pie', 'journey', 'gitGraph']
    return keywords.some(keyword => code.trim().startsWith(keyword))
  }

  getDefaultOptions(): MermaidOptions {
    return {
      theme: 'default',
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: 'basis'
      }
    }
  }
}

// Factory function
export function createMermaidRenderer(): DiagramRenderer {
  return new MermaidRenderer()
}
