import { useEffect, useRef, useState } from 'react'

interface DiagramRendererProps {
    code: string
    source: string
    title: string
}

export function OfflineDiagramRenderer({ code, source, title }: DiagramRendererProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const container = containerRef.current
        if (!code || !container) return

        const renderDiagram = async () => {
            setIsLoading(true)
            setError(null)

            try {
                switch (source) {
                    case 'mermaid':
                        await renderMermaid(code, container)
                        break
                    case 'graphviz':
                        await renderGraphviz(code, container)
                        break
                    case 'wavedrom':
                        await renderWaveDrom(code, container)
                        break
                    // For unsupported types, show the code as text
                    case 'plantuml':
                    case 'kroki':
                    case 'actdiag':
                    case 'seqdiag':
                    case 'blockdiag':
                    case 'nwdiag':
                    case 'packetdiag':
                    case 'rackdiag':
                    case 'railroad':
                    default:
                        renderAsText(code, container, source)
                }
                setIsLoading(false)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to render diagram')
                setIsLoading(false)
            }
        }

        renderDiagram()
    }, [code, source])

    return (
        <div className="relative">
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
                    <div className="text-sm text-slate-500">Rendering {source}...</div>
                </div>
            )}
            {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                    <strong>Error:</strong> {error}
                </div>
            )}
            <div ref={containerRef} className="diagram-container min-h-[200px]" />
        </div>
    )
}

// Mermaid renderer (already local)
async function renderMermaid(code: string, container: HTMLElement) {
    try {
        const mermaid = (await import('mermaid')).default

        mermaid.initialize({
            startOnLoad: false,
            theme: 'default',
            securityLevel: 'loose',
            logLevel: 'error',
        })

        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`
        const { svg } = await mermaid.render(id, code)
        container.innerHTML = svg
    } catch (error) {
        console.error('Mermaid rendering error:', error)
        throw new Error(`Mermaid failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
}

// Graphviz renderer using @viz-js/viz (local WASM)
async function renderGraphviz(code: string, container: HTMLElement) {
    try {
        const { instance } = await import('@viz-js/viz')
        const viz = await instance()
        const svg = viz.renderString(code)

        container.innerHTML = svg
    } catch (error) {
        throw new Error(`Graphviz rendering failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
}

// WaveDrom renderer (local library)
async function renderWaveDrom(code: string, container: HTMLElement) {
    try {
        // Parse JSON
        let waveData
        try {
            waveData = typeof code === 'string' ? JSON.parse(code) : code
        } catch (parseError) {
            throw new Error(`Invalid WaveDrom JSON: ${parseError instanceof Error ? parseError.message : 'Parse failed'}`)
        }

        // WaveDrom library
        const WaveDrom = (await import('wavedrom')).default

        // Create a temporary div for rendering
        const tempDiv = document.createElement('div')
        tempDiv.style.display = 'inline-block'

        // Render using WaveDrom
        WaveDrom.RenderWaveForm(0, waveData, tempDiv)

        // Extract the SVG
        const svg = tempDiv.querySelector('svg')
        if (svg) {
            container.innerHTML = ''
            container.appendChild(svg)
        } else {
            throw new Error('WaveDrom failed to generate SVG')
        }
    } catch (error) {
        throw new Error(`WaveDrom rendering failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
}

// Fallback: render as formatted text
function renderAsText(code: string, container: HTMLElement, source: string) {
    container.innerHTML = `
    <div class="p-6 bg-amber-50 border border-amber-200 rounded-lg">
      <div class="flex items-center gap-2 mb-3">
        <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span class="text-sm font-bold text-amber-800">Offline Mode</span>
      </div>
      <p class="text-sm text-amber-700 mb-4">
        Diagram type <strong>${source}</strong> requires an internet connection to render.
        <br/>Showing diagram source code instead:
      </p>
      <pre class="text-xs overflow-auto p-4 bg-white rounded border border-amber-200 max-h-96"><code>${escapeHtml(code)}</code></pre>
    </div>
  `
}

function escapeHtml(text: string): string {
    const div = document.createElement('div')
    div.textContent = text
    return div.innerHTML
}
