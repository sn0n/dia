/**
 * Main entry point for diagram-renderer library
 */

// Core
export * from './core/types'
export { registry, registerRenderer, getRenderer, hasRenderer, listRenderers } from './core/registry'

// Renderers
export { createMermaidRenderer } from './renderers/mermaid'
export {
  createPlantUMLRenderer,
  createGraphvizRenderer,
  createWaveDromRenderer,
  createBPMNRenderer,
  KrokiRenderer
} from './renderers/kroki'

// Initialize default renderers
import { registry } from './core/registry'
import { createMermaidRenderer } from './renderers/mermaid'
import {
  createPlantUMLRenderer,
  createGraphvizRenderer,
  createWaveDromRenderer,
  createBPMNRenderer
} from './renderers/kroki'

// Auto-register default renderers
export function initializeDefaultRenderers(krokiServer?: string) {
  registry.register('mermaid', createMermaidRenderer())
  registry.register('plantuml', createPlantUMLRenderer(krokiServer))
  registry.register('graphviz', createGraphvizRenderer(krokiServer))
  registry.register('wavedrom', createWaveDromRenderer(krokiServer))
  registry.register('bpmn', createBPMNRenderer(krokiServer))

  // Aliases
  registry.registerAlias('uml', 'plantuml')
  registry.registerAlias('dot', 'graphviz')
}

// Main render function
export async function renderDiagram(config: {
  container: HTMLElement
  source: string
  code: string
  options?: any
}) {
  return registry.render(config.source, config.code, config.container, config.options)
}
