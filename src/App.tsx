import { useState, useMemo } from 'react'
import { Routes, Route, Link, useNavigate, useParams } from 'react-router-dom'
import { Icon } from './components/Icon'
import { DiagramRenderer } from './components/DiagramRenderer'
import { AboutModal } from './components/AboutModal'
import { complexWorkflows, rawLinearData, rawNonLinearData, parseData } from './data/workflows'
import DiagramDetail from './pages/DiagramDetail'
import AIWorkflowsPage from './pages/AIWorkflows'
import AIWorkflowDetail from './pages/AIWorkflowDetail'

const linearWorkflows = parseData(rawLinearData, 'linear');
const nonLinearWorkflows = parseData(rawNonLinearData, 'nonlinear');

export default function App() {
  return (
    <>
      <AboutModal />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/linear" element={<ListView type="linear" data={linearWorkflows} />} />
        <Route path="/non-linear" element={<ListView type="nonlinear" data={nonLinearWorkflows} />} />
        <Route path="/ai-workflows" element={<AIWorkflowsPage />} />
        <Route path="/linear/:slug" element={<DiagramDetail />} />
        <Route path="/non-linear/:slug" element={<DiagramDetail />} />
        <Route path="/ai-workflows/:slug" element={<AIWorkflowDetail />} />
      </Routes>
    </>
  )
}

// TreeNode Component
interface TreeNodeData {
  label: string
  type: string
  color?: string
  note?: string
  loop?: boolean
  next?: TreeNodeData
  branches?: Array<{ label: string; path: TreeNodeData }>
}

const TreeNode: React.FC<{ node: TreeNodeData | null; isBranch?: boolean; isLastBranch?: boolean }> = ({ node }) => {
  if (!node) return null

  const getBorderColor = (color?: string) => {
    const map: Record<string, string> = {
      emerald: 'border-emerald-500 bg-emerald-50 text-emerald-700',
      red: 'border-red-500 bg-red-50 text-red-700',
      amber: 'border-amber-500 bg-amber-50 text-amber-700',
      blue: 'border-blue-500 bg-blue-50 text-blue-700',
      zinc: 'border-zinc-500 bg-zinc-50 text-zinc-700',
      purple: 'border-purple-500 bg-purple-50 text-purple-700'
    }
    return map[color || ''] || 'border-slate-300 bg-white text-slate-700'
  }

  const isDecision = node.type === 'decision'

  return (
    <div className="flex flex-col items-center">
      <div className={`
        relative px-4 py-2 rounded-lg border-2 text-xs font-medium text-center z-10 transition-all shadow-sm
        ${isDecision ? 'rounded-full px-6 border-dashed border-slate-400 bg-slate-50' : getBorderColor(node.color)}
        ${node.loop ? 'ring-2 ring-offset-2 ring-purple-400' : ''}
      `}>
        {node.label}
        {node.note && <div className="text-[10px] opacity-70 font-normal mt-0.5">{node.note}</div>}
        {node.loop && (
          <div className="absolute -top-1.5 -right-1.5 bg-white text-purple-500 rounded-full shadow-sm border border-purple-200">
            <Icon name="RefreshCw" size={12} />
          </div>
        )}
      </div>

      {(node.next || (node.branches && node.branches.length > 0)) && (
        <div className="h-4 w-0.5 bg-slate-300"></div>
      )}

      {isDecision && node.branches && (
        <div className="flex gap-4 relative">
          <div className="absolute top-0 left-1/4 right-1/4 h-0.5 bg-slate-300 -translate-y-full"></div>
          {node.branches.map((branch, idx) => (
            <div key={idx} className="flex flex-col items-center relative">
              <div className="bg-white px-1.5 text-[10px] text-slate-400 -mt-2.5 z-20 mb-1 border border-slate-100 rounded">
                {branch.label}
              </div>
              <TreeNode node={branch.path} isBranch />
            </div>
          ))}
        </div>
      )}

      {node.next && <TreeNode node={node.next} />}
    </div>
  )
}

// FlowVisualizer Component
const FlowVisualizer: React.FC<{ description: string; type: string }> = ({ description, type }) => {
  const steps = description.split(/→|↔/).map(s => s.trim())
  const isLoop = description.toLowerCase().includes('(loop)') || description.includes('Loop')

  return (
    <div className="mt-4 relative">
      <div className={`absolute left-2 top-2 bottom-2 w-0.5 rounded-full
        ${type === 'linear' ? 'bg-slate-200' : 'bg-zinc-800'}`}
      />
      <div className="space-y-3">
        {steps.map((step, idx) => (
          <div key={idx} className="relative flex items-start group/step">
            <div className={`absolute left-0 w-4 h-4 rounded-full border-2 z-10 flex items-center justify-center bg-white dark:bg-zinc-950 transition-colors duration-300
              ${type === 'linear'
                ? 'border-slate-300 text-slate-300 group-hover/step:border-emerald-500 group-hover/step:text-emerald-500'
                : 'border-zinc-700 text-zinc-700 group-hover/step:border-purple-500 group-hover/step:text-purple-500'
              }
            `}>
              <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-300
                 ${type === 'linear' ? 'bg-slate-300 group-hover/step:bg-emerald-500' : 'bg-zinc-700 group-hover/step:bg-purple-500'}
              `} />
            </div>

            <div className={`ml-8 text-sm transition-all duration-300
              ${type === 'linear' ? 'text-slate-600 group-hover/step:text-slate-900' : 'text-zinc-400 group-hover/step:text-zinc-200'}
            `}>
              <span className="block font-medium mb-0.5">
                {step.replace(/\(Loop\)/gi, '').replace('Loop', '')}
              </span>

              {idx < steps.length - 1 && (
                <div className={`mt-1 mb-1 opacity-40 flex items-center gap-1 ${type === 'linear' ? 'text-slate-400' : 'text-zinc-600'}`}>
                  <Icon name="ArrowDown" size={12} />
                </div>
              )}

              {idx === steps.length - 1 && isLoop && (
                <div className={`flex items-center gap-2 mt-1 text-xs font-bold uppercase tracking-wider ${type === 'linear' ? 'text-emerald-600' : 'text-purple-400'}`}>
                  <Icon name="RefreshCw" size={12} /> Recursive
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Helper function to create URL slug
function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

// Card Component
interface WorkflowItem {
  id: string
  title: string
  description: string
  category: string
  type: string
}

const Card: React.FC<{ item: WorkflowItem; isAdvanced: boolean }> = ({ item, isAdvanced }) => {
  const advancedData = (complexWorkflows as any)[item.title]
  const showAdvanced = isAdvanced && advancedData
  const navigate = useNavigate()

  const slug = `${slugify(item.title)}-diagram`
  const url = item.type === 'linear' ? `/linear/${slug}` : `/non-linear/${slug}`

  return (
    <div
      onClick={() => navigate(url)}
      className={`group relative p-6 rounded-2xl transition-all duration-500 border backdrop-blur-sm h-full flex flex-col cursor-pointer
      ${item.type === 'linear'
          ? 'bg-white hover:bg-slate-50 border-slate-200 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-100/50'
          : 'bg-zinc-900/40 hover:bg-zinc-900 border-zinc-800 hover:border-purple-500 hover:shadow-xl hover:shadow-purple-900/20'
        }
    `}>
      <div className="flex items-center gap-3 mb-4">
        {item.type === 'linear'
          ? <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-emerald-100 transition-colors shrink-0">
            <Icon name="CheckCircle2" className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 transition-colors" />
          </div>
          : <div className="p-2 bg-zinc-800 rounded-lg group-hover:bg-purple-900/30 transition-colors shrink-0">
            <Icon name="GitBranch" className="w-5 h-5 text-zinc-500 group-hover:text-purple-400 transition-colors" />
          </div>
        }
        <div className="flex-1">
          <h3 className={`text-lg font-bold leading-tight transition-colors
            ${item.type === 'linear' ? 'text-slate-800 group-hover:text-emerald-900' : 'text-zinc-100 group-hover:text-white'}
          `}>
            {item.title}
          </h3>
        </div>
      </div>

      <div className="flex-1">
        {showAdvanced ? (
          <div className="mt-4 pt-4 border-t border-dashed border-slate-200 dark:border-zinc-800 fade-in">
            {advancedData.code ? (
              <DiagramRenderer
                code={advancedData.code}
                source={advancedData.source || 'text'}
                title={item.title}
              />
            ) : advancedData.root ? (
              <div className="flex justify-center">
                <TreeNode node={advancedData.root} />
              </div>
            ) : (
              <div className="text-sm text-slate-500">No advanced view available</div>
            )}
          </div>
        ) : (
          <FlowVisualizer description={item.description} type={item.type} />
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-zinc-800/50 flex justify-between items-center">
        <span className={`text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded
          ${item.type === 'linear'
            ? 'bg-slate-100 text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600'
            : 'bg-zinc-800 text-zinc-500 group-hover:bg-purple-900/20 group-hover:text-purple-300'
          }
        `}>
          #{item.category}
        </span>
        {showAdvanced && (
          <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-1">
            <Icon name="Zap" size={12} /> Advanced View
          </span>
        )}
      </div>
    </div>
  )
}

// LandingPage Component
const LandingPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden relative">
      {/* Floating AI Brain Icon - Glassmorphic */}
      <button
        onClick={() => navigate('/ai-workflows')}
        className="fixed left-1/2 -translate-x-1/2 z-50 group"
        style={{ top: '10%' }}
        title="AI-Powered Workflows"
      >
        <div className="relative">
          {/* Outer glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-full blur-3xl opacity-40 group-hover:opacity-70 transition-all duration-500 scale-110 animate-pulse" />

          {/* Glassmorphic container */}
          <div className="relative w-48 h-48 rounded-full backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl flex items-center justify-center transform group-hover:scale-105 transition-all duration-500">
            {/* Inner gradient glow */}
            <div className="absolute inset-4 bg-gradient-to-br from-purple-400/30 via-pink-400/30 to-blue-400/30 rounded-full blur-xl" />

            {/* Brain icon */}
            <div className="relative">
              <Icon name="Brain" className="w-24 h-24 text-white drop-shadow-2xl" />
            </div>

            {/* Animated rings */}
            <div className="absolute inset-0 rounded-full border-2 border-purple-300/30 animate-ping" style={{ animationDuration: '3s' }} />
            <div className="absolute inset-8 rounded-full border border-pink-300/20" />
          </div>
        </div>

        {/* Label */}
        <div className="mt-4 text-sm font-bold text-white bg-gradient-to-r from-purple-500/80 to-pink-500/80 backdrop-blur-md px-6 py-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/30">
          AI Workflows
        </div>
      </button>

      <div
        onClick={() => navigate('/linear')}
        className="relative flex-1 group cursor-pointer overflow-hidden transition-all duration-700 hover:flex-[1.5] bg-slate-50 flex flex-col justify-center items-center p-8 border-r border-slate-200"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:24px_24px] opacity-50 group-hover:opacity-100 transition-opacity" />

        <div className="relative z-10 text-center space-y-6">
          <div className="w-20 h-20 mx-auto bg-white rounded-full shadow-lg flex items-center justify-center border border-slate-100 group-hover:scale-110 transition-transform duration-300">
            <Icon name="List" className="w-8 h-8 text-slate-700" size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">The Straight Path</h2>
            <p className="text-slate-500 font-medium tracking-wide">LINEAR & SEQUENTIAL</p>
          </div>
          <p className="max-w-md text-slate-400 text-sm opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
            For clarity, efficiency, and execution. Step-by-step frameworks that get things done.
          </p>
          <button className="flex items-center gap-2 mx-auto text-emerald-600 font-semibold opacity-0 group-hover:opacity-100 transition-all delay-100">
            Keep things simple <Icon name="ArrowRight" size={16} />
          </button>
        </div>
      </div>

      <div
        onClick={() => navigate('/non-linear')}
        className="relative flex-1 group cursor-pointer overflow-hidden transition-all duration-700 hover:flex-[1.5] bg-zinc-950 flex flex-col justify-center items-center p-8"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-zinc-950/50 to-zinc-950 opacity-50 group-hover:opacity-100 transition-opacity" />

        <div className="relative z-10 text-center space-y-6">
          <div className="w-20 h-20 mx-auto bg-zinc-900 rounded-full shadow-2xl flex items-center justify-center border border-zinc-800 group-hover:scale-110 transition-transform duration-300 shadow-purple-900/20">
            <Icon name="Activity" className="w-8 h-8 text-purple-400" size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white tracking-tight mb-2">Fork in the Road</h2>
            <p className="text-purple-400 font-medium tracking-wide">NON-LINEAR & SYSTEMIC</p>
          </div>
          <p className="max-w-md text-zinc-500 text-sm opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
            For complexity, chaos, and evolution. Loops, branches, and feedback systems.
          </p>
          <button className="flex items-center gap-2 mx-auto text-purple-400 font-semibold opacity-0 group-hover:opacity-100 transition-all delay-100">
            Dive into Complexity <Icon name="GitBranch" size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

// ListView Component
const ListView: React.FC<{ type: 'linear' | 'nonlinear'; data: WorkflowItem[] }> = ({ type, data }) => {
  const [search, setSearch] = useState('')
  const [isAdvanced, setIsAdvanced] = useState(false)
  const navigate = useNavigate()

  const groupedData = useMemo(() => {
    let activeData = data

    if (isAdvanced) {
      activeData = data.filter(item => !!(complexWorkflows as any)[item.title])
    }

    const groups: Record<string, WorkflowItem[]> = {}
    const sortedCats = new Set(activeData.map(i => i.category))
    const catsArray = Array.from(sortedCats).sort()

    catsArray.forEach(cat => {
      groups[cat] = activeData.filter(item => item.category === cat)
    })
    return groups
  }, [data, isAdvanced])

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
  const isLinear = type === 'linear'

  const scrollToCategory = (cat: string) => {
    const element = document.getElementById(cat)
    if (element) {
      const offset = 140
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isLinear ? 'bg-slate-50' : 'bg-zinc-950'}`}>
      <header className={`sticky top-0 z-50 backdrop-blur-md border-b flex flex-col
        ${isLinear ? 'bg-white/90 border-slate-200' : 'bg-zinc-900/90 border-zinc-800'}
      `}>
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className={`p-2 rounded-full transition-colors ${isLinear ? 'hover:bg-slate-100 text-slate-600' : 'hover:bg-zinc-800 text-zinc-400'}`}
            >
              <Icon name="ArrowLeft" className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <h1 className={`text-xl font-bold flex items-center gap-2 ${isLinear ? 'text-slate-900' : 'text-white'}`}>
                {isLinear ? 'The Straight Path' : 'The Forked Road'}
              </h1>
              <button
                onClick={() => setIsAdvanced(!isAdvanced)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all border
                   ${isAdvanced
                    ? (isLinear ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-purple-900/50 text-purple-300 border-purple-500')
                    : (isLinear ? 'bg-slate-100 text-slate-500 border-transparent hover:bg-slate-200' : 'bg-zinc-800 text-zinc-500 border-transparent hover:bg-zinc-700')
                  }
                 `}
              >
                {isAdvanced ? <Icon name="Maximize2" size={12} /> : <Icon name="Minimize2" size={12} />}
                {isAdvanced ? 'Advanced' : 'Simple'}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">

            <div className={`hidden md:flex items-center px-4 py-2 rounded-full border focus-within:ring-2 transition-all
              ${isLinear
                ? 'bg-slate-100 border-transparent focus-within:border-emerald-500 focus-within:ring-emerald-100'
                : 'bg-zinc-900 border-transparent focus-within:border-purple-500 focus-within:ring-purple-900/30'
              }
            `}>
              <Icon name="Search" className={`w-4 h-4 mr-2 ${isLinear ? 'text-slate-400' : 'text-zinc-500'}`} size={16} />
              <input
                type="text"
                placeholder="Filter..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`bg-transparent outline-none text-sm w-32 md:w-48 ${isLinear ? 'text-slate-800 placeholder:text-slate-400' : 'text-zinc-200 placeholder:text-zinc-600'}`}
              />
            </div>
          </div>
        </div>

        <div className={`px-6 py-3 border-t
           ${isLinear ? 'border-slate-100 bg-slate-50/50' : 'border-zinc-800 bg-zinc-900/50'}
        `}>
          <div className="flex flex-wrap gap-3">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => scrollToCategory(cat)}
                className={`text-xs font-bold tracking-wide transition-colors hover:underline decoration-2 underline-offset-4
                    ${isLinear
                    ? 'text-slate-500 hover:text-emerald-600 hover:decoration-emerald-500'
                    : 'text-zinc-500 hover:text-purple-400 hover:decoration-purple-500'
                  }
                  `}
              >
                #{cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 space-y-16 pb-24">
        {Object.keys(filteredGroups).length === 0 && (
          <div className="text-center py-20 opacity-50">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Icon name="Workflow" className={`${isLinear ? 'text-slate-300' : 'text-zinc-700'}`} size={64} />
            </div>
            <p className={isLinear ? 'text-slate-500' : 'text-zinc-500'}>
              {isAdvanced ? 'No Advanced Workflows found for this view.' : 'No workflows found matching your criteria.'}
            </p>
          </div>
        )}

        {Object.keys(filteredGroups).map(category => (
          <section
            key={category}
            id={category}
            className="space-y-6"
            style={{ scrollMarginTop: '140px' }}
          >
            <div className={`flex items-center gap-3 border-b pb-4
              ${isLinear ? 'border-slate-200' : 'border-zinc-800'}
            `}>
              <h2 className={`text-2xl font-bold tracking-tight
                ${isLinear ? 'text-slate-900' : 'text-white'}
              `}>
                {category}
              </h2>
              <span className={`px-2 py-1 rounded-full text-xs font-bold
                ${isLinear ? 'bg-slate-200 text-slate-600' : 'bg-zinc-800 text-zinc-400'}
              `}>
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
