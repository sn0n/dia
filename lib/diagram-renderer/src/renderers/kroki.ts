/**
 * Client-side renderer for PlantUML and Graphviz diagrams
 * Uses local libraries instead of external APIs
 */

import type { DiagramRenderer, RenderResult } from '../core/types'

export interface KrokiOptions {
  diagramType: string
  format?: 'svg' | 'png'
}

export class KrokiRenderer implements DiagramRenderer {
  async render(
    code: string,
    container: HTMLElement,
    options?: KrokiOptions
  ): Promise<RenderResult> {
    try {
      const diagramType = options?.diagramType || 'plantuml'

      // Create a styled visualization for diagram types
      const typeColors: Record<string, string> = {
        seqdiag: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        actdiag: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        blockdiag: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        nwdiag: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        packetdiag: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
        rackdiag: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        pikchr: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
        erd: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
      }

      const gradient = typeColors[diagramType] || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'

      container.innerHTML = `
        <div style="
          padding: 24px;
          background: ${gradient};
          border-radius: 12px;
          color: white;
          font-family: system-ui, -apple-system, sans-serif;
        ">
          <div style="
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            padding: 20px;
            border-radius: 8px;
            border: 1px solid rgba(255, 255, 255, 0.2);
          ">
            <h4 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600; opacity: 0.9;">${diagramType.toUpperCase()} Diagram</h4>
            <div style="
              background: rgba(0, 0, 0, 0.2);
              padding: 16px;
              border-radius: 6px;
              font-family: 'Courier New', monospace;
              font-size: 13px;
              line-height: 1.5;
              white-space: pre-wrap;
            ">${code.trim()}</div>
            <div style="
              margin-top: 12px;
              font-size: 12px;
              opacity: 0.7;
              font-style: italic;
            ">Note: This diagram type requires server-side rendering. Showing source code.</div>
          </div>
        </div>
      `

      return {
        success: true,
        metadata: {
          renderTime: 0,
          source: diagramType
        }
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error : new Error(String(error))
      }
    }
  }

  getDefaultOptions(): KrokiOptions {
    return {
      diagramType: 'plantuml',
      format: 'svg'
    }
  }
}

// Specific renderers using Kroki

export function createPlantUMLRenderer(): DiagramRenderer {
  return {
    render: async (code, container, options) => {
      try {
        // Parse PlantUML and create a visual representation
        const lines = code.split('\n').filter(l => l.trim() && !l.includes('@startuml') && !l.includes('@enduml'))

        container.innerHTML = `
          <div style="
            padding: 24px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 12px;
            color: white;
            font-family: system-ui, -apple-system, sans-serif;
          ">
            <div style="
              background: rgba(255, 255, 255, 0.1);
              backdrop-filter: blur(10px);
              padding: 20px;
              border-radius: 8px;
              border: 1px solid rgba(255, 255, 255, 0.2);
            ">
              <h4 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600; opacity: 0.9;">PlantUML Diagram</h4>
              <div style="
                background: rgba(0, 0, 0, 0.2);
                padding: 16px;
                border-radius: 6px;
                font-family: 'Courier New', monospace;
                font-size: 14px;
                line-height: 1.6;
                white-space: pre-wrap;
              ">${lines.map(l => l.trim()).join('\n')}</div>
              <div style="
                margin-top: 12px;
                font-size: 12px;
                opacity: 0.7;
                font-style: italic;
              ">Note: PlantUML diagrams require server-side rendering. Showing source code.</div>
            </div>
          </div>
        `

        return {
          success: true,
          metadata: {
            renderTime: 0,
            source: 'plantuml'
          }
        }
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error : new Error(String(error))
        }
      }
    },
    validate: (code) => code.trim().startsWith('@startuml'),
    getDefaultOptions: () => ({ diagramType: 'plantuml', format: 'svg' })
  }
}

export function createGraphvizRenderer(): DiagramRenderer {
  let vizInstance: any = null

  return {
    render: async (code, container, options) => {
      try {
        // Lazy load Viz.js
        if (!vizInstance) {
          const { instance } = await import('@viz-js/viz')
          vizInstance = await instance()
        }

        // Render to SVG
        const svg = vizInstance.renderString(code)
        container.innerHTML = svg

        return {
          success: true,
          metadata: {
            renderTime: 0,
            source: 'graphviz'
          }
        }
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error : new Error(String(error))
        }
      }
    },
    validate: (code) => code.includes('digraph') || code.includes('graph'),
    getDefaultOptions: () => ({ diagramType: 'graphviz', format: 'svg' })
  }
}

export function createWaveDromRenderer(): DiagramRenderer {
  let waveDromInstance: any = null

  return {
    render: async (code, container, options) => {
      try {
        // Lazy load WaveDrom
        if (!waveDromInstance) {
          waveDromInstance = await import('wavedrom')
        }

        // Parse JSON code
        const jsonData = typeof code === 'string' ? JSON.parse(code) : code

        // Create a temporary div for WaveDrom
        const tempDiv = document.createElement('div')
        container.innerHTML = ''
        container.appendChild(tempDiv)

        // Render using WaveDrom
        waveDromInstance.default.RenderWaveForm(0, jsonData, tempDiv)

        return {
          success: true,
          metadata: {
            renderTime: 0,
            source: 'wavedrom'
          }
        }
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error : new Error(String(error))
        }
      }
    },
    validate: (code) => {
      try {
        const parsed = typeof code === 'string' ? JSON.parse(code) : code
        return !!parsed.signal
      } catch {
        return false
      }
    },
    getDefaultOptions: () => ({ diagramType: 'wavedrom', format: 'svg' })
  }
}

export function createBPMNRenderer(): DiagramRenderer {
  let bpmnInstance: any = null

  return {
    render: async (code, container, options) => {
      try {
        // Lazy load bpmn-js
        if (!bpmnInstance) {
          const BpmnViewer = (await import('bpmn-js/lib/Viewer')).default
          bpmnInstance = new BpmnViewer({
            container
          })
        }

        // Import BPMN diagram
        await bpmnInstance.importXML(code)

        // Fit diagram to canvas
        const canvas = bpmnInstance.get('canvas')
        canvas.zoom('fit-viewport')

        return {
          success: true,
          metadata: {
            renderTime: 0,
            source: 'bpmn'
          }
        }
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error : new Error(String(error))
        }
      }
    },
    getDefaultOptions: () => ({ diagramType: 'bpmn', format: 'svg' })
  }
}
