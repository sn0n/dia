import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { DiagramRenderer } from '../components/DiagramRenderer'
import { aiComplexWorkflows, parseAIWorkflows } from '../data/ai-workflows'

const aiWorkflows = parseAIWorkflows()

interface WorkflowItem {
    id: string
    title: string
    description: string
    category: string
    type: string
}

// Helper function to create URL-friendly slugs
function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
}

const Card: React.FC<{ item: WorkflowItem; isAdvanced: boolean }> = ({ item, isAdvanced }) => {
    const advancedData = (aiComplexWorkflows as any)[item.title]
    const showAdvanced = isAdvanced && advancedData
    const navigate = useNavigate()

    // Create slug for routing
    const slug = `${slugify(item.title)}-diagram`

    return (
        <div
            onClick={() => navigate(`/ai-workflows/${slug}`)}
            className="group relative p-6 rounded-2xl transition-all duration-500 border backdrop-blur-sm h-full flex flex-col cursor-pointer
      bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 hover:border-purple-400 hover:shadow-xl hover:shadow-purple-100/50
    ">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors shrink-0">
                    <Icon name="Cpu" className="w-5 h-5 text-purple-600 group-hover:text-purple-700 transition-colors" />
                </div>
                <div className="flex-1">
                    <h3 className="text-lg font-bold leading-tight transition-colors text-purple-900 group-hover:text-purple-950">
                        {item.title}
                    </h3>
                </div>
            </div>

            <div className="flex-1">
                {showAdvanced ? (
                    <div className="mt-4 pt-4 border-t border-dashed border-purple-200 fade-in">
                        {advancedData.code ? (
                            <DiagramRenderer
                                code={advancedData.code}
                                source={advancedData.source || 'text'}
                                title={item.title}
                            />
                        ) : advancedData.root ? (
                            <div className="text-sm text-purple-600">Tree visualization available</div>
                        ) : (
                            <div className="text-sm text-purple-500">No advanced view available</div>
                        )}
                    </div>
                ) : (
                    <div className="mt-4 relative">
                        <div className="absolute left-2 top-2 bottom-2 w-0.5 rounded-full bg-purple-200" />
                        <div className="space-y-3">
                            {item.description.split(/→|↔/).map((step, idx) => (
                                <div key={idx} className="relative flex items-start group/step">
                                    <div className="absolute left-0 w-4 h-4 rounded-full border-2 z-10 flex items-center justify-center bg-white
                    border-purple-300 text-purple-300 group-hover/step:border-purple-500 group-hover/step:text-purple-500
                  ">
                                        <div className="w-1.5 h-1.5 rounded-full transition-colors duration-300 bg-purple-300 group-hover/step:bg-purple-500" />
                                    </div>

                                    <div className="ml-8 text-sm transition-all duration-300 text-purple-600 group-hover/step:text-purple-900">
                                        <span className="block font-medium mb-0.5">
                                            {step.trim()}
                                        </span>

                                        {idx < item.description.split(/→|↔/).length - 1 && (
                                            <div className="mt-1 mb-1 opacity-40 flex items-center gap-1 text-purple-400">
                                                <Icon name="ArrowDown" size={12} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-6 pt-4 border-t border-purple-100 flex justify-between items-center">
                <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded
          bg-purple-100 text-purple-500 group-hover:bg-purple-200 group-hover:text-purple-700
        ">
                    #{item.category}
                </span>
                {showAdvanced && (
                    <span className="text-[10px] text-purple-600 font-bold flex items-center gap-1">
                        <Icon name="Zap" size={12} /> Advanced View
                    </span>
                )}
            </div>
        </div>
    )
}

export default function AIWorkflowsPage() {
    const [search, setSearch] = useState('')
    const [isAdvanced, setIsAdvanced] = useState(false)
    const navigate = useNavigate()

    const groupedData = useMemo(() => {
        let activeData = aiWorkflows

        if (isAdvanced) {
            activeData = aiWorkflows.filter(item => !!(aiComplexWorkflows as any)[item.title])
        }

        const groups: Record<string, WorkflowItem[]> = {}
        const sortedCats = new Set(activeData.map(i => i.category))
        const catsArray = Array.from(sortedCats).sort()

        catsArray.forEach(cat => {
            groups[cat] = activeData.filter(item => item.category === cat)
        })
        return groups
    }, [isAdvanced])

    const filteredGroups = useMemo(() => {
        const filtered: Record<string, WorkflowItem[]> = {}
        Object.keys(groupedData).forEach(cat => {
            const items = groupedData[cat].filter(item =>
                item.title.toLowerCase().includes(search.toLowerCase()) ||
                item.description.toLowerCase().includes(search.toLowerCase())
            )
            if (items.length > 0) {
                filtered[cat] = items
            }
        })
        return filtered
    }, [groupedData, search])

    const categories = Object.keys(filteredGroups)

    return (
        <div className="min-h-screen transition-colors duration-500 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
            <header className="sticky top-0 z-50 backdrop-blur-md border-b flex flex-col bg-white/90 border-purple-200">
                <div className="px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/')}
                            className="p-2 rounded-full transition-colors hover:bg-purple-100 text-purple-600"
                        >
                            <Icon name="ArrowLeft" className="w-5 h-5" />
                        </button>
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg shadow-lg">
                                <Icon name="Brain" className="w-6 h-6 text-white" />
                            </div>
                            <h1 className="text-xl font-bold flex items-center gap-2 text-purple-900">
                                AI-Powered Workflows
                            </h1>
                            <button
                                onClick={() => setIsAdvanced(!isAdvanced)}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all border
                  ${isAdvanced
                                        ? 'bg-purple-100 text-purple-700 border-purple-200'
                                        : 'bg-gray-100 text-gray-500 border-transparent hover:bg-gray-200'
                                    }
                `}
                            >
                                {isAdvanced ? <Icon name="Maximize2" size={12} /> : <Icon name="Minimize2" size={12} />}
                                {isAdvanced ? 'Advanced' : 'Simple'}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center px-4 py-2 rounded-full border focus-within:ring-2 transition-all
              bg-purple-50 border-transparent focus-within:border-purple-400 focus-within:ring-purple-100
            ">
                            <Icon name="Search" className="w-4 h-4 mr-2 text-purple-400" size={16} />
                            <input
                                type="text"
                                placeholder="Search AI workflows..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="bg-transparent outline-none text-sm w-32 md:w-48 text-purple-800 placeholder:text-purple-400"
                            />
                        </div>
                    </div>
                </div>

                <div className="px-6 py-3 border-t border-purple-100 bg-purple-50/50">
                    <div className="flex flex-wrap gap-3">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => {
                                    const element = document.getElementById(`category-${cat.toLowerCase().replace(/\s+/g, '-')}`)
                                    element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                                }}
                                className="text-xs font-bold tracking-wide transition-colors hover:underline decoration-2 underline-offset-4
                  text-purple-500 hover:text-purple-700 hover:decoration-purple-500
                "
                            >
                                #{cat}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto p-6 space-y-16 pb-24">
                <div className="text-center mb-12 mt-8">
                    <p className="text-lg text-purple-700 max-w-3xl mx-auto">
                        Explore workflows and patterns from Deep Learning, Large Language Models, MLOps, and AI Agents.
                        From neural network training to production deployment pipelines.
                    </p>
                </div>

                {Object.keys(filteredGroups).length === 0 && (
                    <div className="text-center py-20 opacity-50">
                        <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                            <Icon name="Brain" className="text-purple-300" size={64} />
                        </div>
                        <p className="text-purple-500">
                            {isAdvanced ? 'No Advanced AI Workflows found.' : 'No AI workflows found matching your criteria.'}
                        </p>
                    </div>
                )}

                {Object.keys(filteredGroups).map(category => (
                    <section
                        key={category}
                        id={`category-${category.toLowerCase().replace(/\s+/g, '-')}`}
                        className="space-y-6"
                        style={{ scrollMarginTop: '140px' }}
                    >
                        <div className="flex items-center gap-3 border-b pb-4 border-purple-200">
                            <h2 className="text-2xl font-bold tracking-tight text-purple-900">
                                {category}
                            </h2>
                            <span className="px-2 py-1 rounded-full text-xs font-bold bg-purple-200 text-purple-700">
                                {filteredGroups[category].length}
                            </span>
                        </div>

                        <div className={`grid grid-cols-1 gap-6
              ${isAdvanced ? 'lg:grid-cols-1' : 'md:grid-cols-2 lg:grid-cols-3'}
            `}>
                            {filteredGroups[category].map(item => (
                                <Card key={item.id} item={item} isAdvanced={isAdvanced} />
                            ))}
                        </div>
                    </section>
                ))}
            </main>
        </div>
    )
}
