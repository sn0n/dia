/**
 * Core types for the diagram renderer library
 */

export type DiagramSource =
  | 'mermaid'
  | 'plantuml'
  | 'graphviz'
  | 'wavedrom'
  | 'bpmn'
  | 'd3'
  | 'cytoscape'
  | 'railroad'
  | 'kroki'
  | 'vega'
  | 'sequence'
  | string // Allow custom types

export type ExportFormat = 'svg' | 'png' | 'pdf' | 'json'

export type Theme = 'light' | 'dark' | 'neutral' | string

export interface RenderOptions {
  theme?: Theme
  width?: number | string
  height?: number | string
  backgroundColor?: string
  responsive?: boolean
  pan?: boolean
  zoom?: boolean
  // Renderer-specific options
  mermaid?: MermaidOptions
  plantuml?: PlantUMLOptions
  graphviz?: GraphvizOptions
  wavedrom?: WaveDromOptions
  [key: string]: any
}

export interface MermaidOptions {
  theme?: 'default' | 'dark' | 'forest' | 'neutral'
  themeVariables?: Record<string, string>
  flowchart?: {
    useMaxWidth?: boolean
    htmlLabels?: boolean
    curve?: 'basis' | 'linear' | 'cardinal'
  }
  sequence?: {
    actorMargin?: number
    messageMargin?: number
  }
  [key: string]: any
}

export interface PlantUMLOptions {
  server?: string // Kroki or PlantUML server URL
  format?: 'svg' | 'png'
}

export interface GraphvizOptions {
  engine?: 'dot' | 'neato' | 'fdp' | 'sfdp' | 'twopi' | 'circo'
  format?: 'svg' | 'png' | 'pdf'
}

export interface WaveDromOptions {
  skin?: 'default' | 'narrow' | 'lowkey'
}

export interface DiagramConfig {
  container: HTMLElement
  source: DiagramSource
  code: string
  options?: RenderOptions
}

export interface RenderResult {
  success: boolean
  output?: string | HTMLElement
  error?: Error
  metadata?: {
    renderTime: number
    source: DiagramSource
    size?: { width: number; height: number }
  }
}

export interface DiagramRenderer {
  /**
   * Render diagram code into the provided container
   */
  render(
    code: string,
    container: HTMLElement,
    options?: any
  ): Promise<RenderResult>

  /**
   * Validate diagram code before rendering (optional)
   */
  validate?(code: string): boolean

  /**
   * Get default options for this renderer
   */
  getDefaultOptions?(): any

  /**
   * Export diagram to specified format
   */
  export?(code: string, format: ExportFormat, options?: any): Promise<Blob>
}

export interface RendererRegistry {
  [key: string]: DiagramRenderer
}

export interface ThemeConfig {
  [source: string]: any
}

export interface CacheOptions {
  enabled: boolean
  maxSize: number
  ttl: number // Time to live in milliseconds
}

export interface LibraryConfig {
  cache?: CacheOptions
  defaultTheme?: Theme
  krokiServer?: string
  renderers?: RendererRegistry
}
