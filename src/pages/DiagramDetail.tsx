import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { DiagramRenderer } from '../components/DiagramRenderer'
import { complexWorkflows, rawLinearData, rawNonLinearData, parseData } from '../data/workflows'

const linearWorkflows = parseData(rawLinearData, 'linear')
const nonLinearWorkflows = parseData(rawNonLinearData, 'nonlinear')

export default function DiagramDetail() {
  const { slug } = useParams<{ slug: string }>()
  const location = useLocation()
  const navigate = useNavigate()

  // Extract type from pathname
  const type = location.pathname.startsWith('/linear') ? 'linear' : 'non-linear'
  const allWorkflows = type === 'linear' ? linearWorkflows : nonLinearWorkflows

  // Remove -diagram suffix from slug to match with title
  const slugWithoutSuffix = slug?.replace(/-diagram$/, '') || ''
  const workflow = allWorkflows.find(w => slugify(w.title) === slugWithoutSuffix)

  if (!workflow) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-4">Diagram Not Found</h1>
          <button
            onClick={() => navigate('/')}
            className="text-emerald-600 hover:text-emerald-700"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    )
  }

  const isLinear = type === 'linear'
  const advancedData = (complexWorkflows as any)[workflow.title]
  const hasCode = advancedData?.code

  return (
    <div className={`min-h-screen transition-colors ${isLinear ? 'bg-slate-50' : 'bg-zinc-950'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 backdrop-blur-md border-b ${
        isLinear ? 'bg-white/90 border-slate-200' : 'bg-zinc-900/90 border-zinc-800'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate(`/${type}`)}
            className={`flex items-center gap-2 transition-colors ${
              isLinear
                ? 'text-slate-600 hover:text-slate-900'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Icon name="ArrowLeft" className="w-5 h-5" />
            <span>Back to {isLinear ? 'Linear' : 'Non-Linear'} Workflows</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Title Section */}
        <div className="mb-8">
          <div className="flex items-start gap-4 mb-4">
            <div className={`p-3 rounded-xl ${
              isLinear ? 'bg-emerald-100' : 'bg-purple-900/30'
            }`}>
              <Icon
                name={isLinear ? 'CheckCircle2' : 'GitBranch'}
                className={`w-8 h-8 ${
                  isLinear ? 'text-emerald-600' : 'text-purple-400'
                }`}
              />
            </div>
            <div className="flex-1">
              <h1 className={`text-4xl font-bold mb-2 ${
                isLinear ? 'text-slate-900' : 'text-white'
              }`}>
                {workflow.title}
              </h1>
              <div className="flex items-center gap-3 flex-wrap">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  isLinear
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-purple-900/30 text-purple-300'
                }`}>
                  {workflow.category}
                </span>
                <span className={`text-sm ${isLinear ? 'text-slate-500' : 'text-zinc-500'}`}>
                  {isLinear ? 'Linear & Sequential' : 'Non-Linear & Systemic'}
                </span>
              </div>
            </div>
          </div>

          {/* Generated Description */}
          <div className={`prose max-w-none ${isLinear ? 'prose-slate' : 'prose-invert'}`}>
            <p className={`text-lg leading-relaxed ${
              isLinear ? 'text-slate-700' : 'text-zinc-300'
            }`}>
              {generateDescription(workflow.title, workflow.description, workflow.category, isLinear)}
            </p>
          </div>
        </div>

        {/* Diagram Visualization */}
        <div className={`rounded-2xl border p-8 mb-8 ${
          isLinear
            ? 'bg-white border-slate-200 shadow-lg'
            : 'bg-zinc-900/40 border-zinc-800 shadow-xl shadow-purple-900/10'
        }`}>
          <h2 className={`text-2xl font-bold mb-6 ${
            isLinear ? 'text-slate-900' : 'text-white'
          }`}>
            Diagram
          </h2>

          {hasCode ? (
            <DiagramRenderer
              code={advancedData.code}
              source={advancedData.source || 'mermaid'}
              title={workflow.title}
            />
          ) : (
            <div className="space-y-4">
              {workflow.description.split(/→|↔/).map((step, idx, arr) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    isLinear
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-purple-900/30 text-purple-300'
                  }`}>
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <p className={`text-lg ${
                      isLinear ? 'text-slate-700' : 'text-zinc-300'
                    }`}>
                      {step.trim()}
                    </p>
                  </div>
                  {idx < arr.length - 1 && (
                    <Icon
                      name="ArrowDown"
                      className={`w-5 h-5 ${
                        isLinear ? 'text-slate-400' : 'text-zinc-600'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Use Cases */}
        <div className={`rounded-2xl border p-8 ${
          isLinear
            ? 'bg-white border-slate-200'
            : 'bg-zinc-900/40 border-zinc-800'
        }`}>
          <h2 className={`text-2xl font-bold mb-4 ${
            isLinear ? 'text-slate-900' : 'text-white'
          }`}>
            When to Use This {isLinear ? 'Workflow' : 'Pattern'}
          </h2>
          <ul className={`space-y-2 ${
            isLinear ? 'text-slate-700' : 'text-zinc-300'
          }`}>
            {generateUseCases(workflow.title, workflow.category, isLinear).map((useCase, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <Icon
                  name="CheckCircle2"
                  className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                    isLinear ? 'text-emerald-600' : 'text-purple-400'
                  }`}
                />
                <span>{useCase}</span>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  )
}

// Helper function to create URL-friendly slugs
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Generate descriptive text for each diagram
function generateDescription(title: string, description: string, category: string, isLinear: boolean): string {
  const baseDesc = description.replace(/→|↔/g, '→')

  const contexts: Record<string, string> = {
    'Productivity': `This ${isLinear ? 'linear workflow' : 'systematic approach'} helps you organize and execute tasks efficiently. ${baseDesc}. By following this structured methodology, you can improve focus, reduce overwhelm, and accomplish more in less time.`,
    'Problem Solving': `A structured ${isLinear ? 'process' : 'framework'} for analyzing and resolving complex issues. ${baseDesc}. This approach ensures thorough investigation and prevents jumping to conclusions before understanding root causes.`,
    'Strategy': `A strategic ${isLinear ? 'planning tool' : 'decision framework'} used by organizations worldwide. ${baseDesc}. This methodology helps leaders make informed decisions by considering multiple perspectives and potential outcomes.`,
    'Creativity': `${isLinear ? 'A creative process' : 'An innovation framework'} designed to unlock new ideas and solutions. ${baseDesc}. This technique encourages divergent thinking while providing structure to channel creative energy productively.`,
    'DevOps': `${isLinear ? 'A deployment pipeline' : 'An infrastructure pattern'} commonly used in modern software development. ${baseDesc}. This approach enables faster delivery, better quality, and improved collaboration between development and operations teams.`,
    'Learning': `An evidence-based ${isLinear ? 'learning strategy' : 'educational framework'} proven to enhance retention. ${baseDesc}. Research shows this method significantly improves long-term memory and deep understanding of complex subjects.`,
    'Diagrams': `A visual ${isLinear ? 'representation method' : 'modeling technique'} used in software engineering and system design. ${baseDesc}. This diagram type helps teams communicate complex architectures and processes clearly.`,
  }

  return contexts[category] || `${baseDesc}. This ${isLinear ? 'sequential approach' : 'systemic pattern'} provides a clear framework for ${category.toLowerCase()} scenarios, helping you navigate complexity with confidence.`
}

// Generate use cases for each diagram
function generateUseCases(title: string, category: string, isLinear: boolean): string[] {
  // Generic use cases based on category
  const useCasesByCategory: Record<string, string[]> = {
    'Productivity': [
      'Managing multiple projects with competing priorities',
      'Breaking down large goals into actionable steps',
      'Maintaining focus in environments with frequent interruptions',
      'Tracking progress and staying accountable'
    ],
    'Problem Solving': [
      'Identifying root causes of recurring issues',
      'Making decisions with incomplete information',
      'Resolving conflicts between stakeholders',
      'Improving processes that are underperforming'
    ],
    'Strategy': [
      'Planning long-term business initiatives',
      'Evaluating competitive positioning',
      'Allocating resources across multiple opportunities',
      'Adapting to market changes and disruptions'
    ],
    'DevOps': [
      'Automating deployment pipelines',
      'Ensuring system reliability and uptime',
      'Managing infrastructure at scale',
      'Implementing continuous integration and delivery'
    ],
    'Diagrams': [
      'Documenting system architecture for new team members',
      'Planning migrations and infrastructure changes',
      'Communicating technical concepts to non-technical stakeholders',
      'Identifying bottlenecks and optimization opportunities'
    ],
  }

  return useCasesByCategory[category] || [
    `When you need a structured approach to ${category.toLowerCase()}`,
    `For teams collaborating on complex ${category.toLowerCase()} challenges`,
    `During planning phases where clarity is essential`,
    `When teaching or documenting ${category.toLowerCase()} best practices`
  ]
}
