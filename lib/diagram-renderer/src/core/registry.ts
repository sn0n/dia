/**
 * Renderer registry for managing diagram renderers
 */

import type {
  DiagramRenderer,
  DiagramSource,
  RendererRegistry,
  RenderResult,
  RenderOptions
} from './types'

class RendererRegistryClass {
  private renderers: RendererRegistry = {}
  private aliases: Map<string, string> = new Map()

  /**
   * Register a new diagram renderer
   */
  register(source: DiagramSource, renderer: DiagramRenderer): void {
    this.renderers[source] = renderer
  }

  /**
   * Register an alias for a renderer
   * Example: registerAlias('uml', 'plantuml')
   */
  registerAlias(alias: string, target: DiagramSource): void {
    this.aliases.set(alias, target)
  }

  /**
   * Get renderer by source type
   */
  get(source: DiagramSource): DiagramRenderer | undefined {
    // Check if it's an alias
    const actualSource = this.aliases.get(source) || source
    return this.renderers[actualSource]
  }

  /**
   * Check if a renderer exists
   */
  has(source: DiagramSource): boolean {
    return !!this.get(source)
  }

  /**
   * Unregister a renderer
   */
  unregister(source: DiagramSource): void {
    delete this.renderers[source]
  }

  /**
   * Get all registered sources
   */
  list(): DiagramSource[] {
    return Object.keys(this.renderers)
  }

  /**
   * Clear all renderers
   */
  clear(): void {
    this.renderers = {}
    this.aliases.clear()
  }

  /**
   * Render using the appropriate renderer
   */
  async render(
    source: DiagramSource,
    code: string,
    container: HTMLElement,
    options?: RenderOptions
  ): Promise<RenderResult> {
    const renderer = this.get(source)

    if (!renderer) {
      return {
        success: false,
        error: new Error(`No renderer found for source: ${source}`)
      }
    }

    const startTime = performance.now()

    try {
      // Validate if available
      if (renderer.validate && !renderer.validate(code)) {
        throw new Error(`Invalid ${source} code`)
      }

      // Merge with default options
      const mergedOptions = {
        ...renderer.getDefaultOptions?.(),
        ...options
      }

      const result = await renderer.render(code, container, mergedOptions)

      return {
        ...result,
        metadata: {
          ...result.metadata,
          renderTime: performance.now() - startTime,
          source
        }
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error : new Error(String(error)),
        metadata: {
          renderTime: performance.now() - startTime,
          source
        }
      }
    }
  }
}

// Singleton instance
export const registry = new RendererRegistryClass()

// Helper functions
export function registerRenderer(
  source: DiagramSource,
  renderer: DiagramRenderer
): void {
  registry.register(source, renderer)
}

export function getRenderer(source: DiagramSource): DiagramRenderer | undefined {
  return registry.get(source)
}

export function hasRenderer(source: DiagramSource): boolean {
  return registry.has(source)
}

export function listRenderers(): DiagramSource[] {
  return registry.list()
}
