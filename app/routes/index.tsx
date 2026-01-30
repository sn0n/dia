import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useMemo } from 'react'
import { Icon } from '~/components/Icon'
import { complexWorkflows, rawLinearData, rawNonLinearData, parseData } from '~/data/workflows'

export const Route = createFileRoute('/')({
  component: Home,
})

const linearWorkflows = parseData(rawLinearData, 'linear');
const nonLinearWorkflows = parseData(rawNonLinearData, 'nonlinear');

function Home() {
  const [view, setView] = useState<'home' | 'linear' | 'nonlinear' | 'ai'>('home')

  if (view === 'home') {
    return <LandingPage onSelect={setView} />
  }

  if (view === 'ai') {
    return <ListView type="ai" data={aiWorkflows} onBack={() => setView('home')} />
  }

  const data = view === 'linear' ? linearWorkflows : nonLinearWorkflows
  return <ListView type={view} data={data} onBack={() => setView('home')} />
}

// Simple AI workflows data
const rawAIData = [
  "Chain of Thought (CoT)|Prompt → Reason Step-by-Step → Conclusion|Generative AI",
  "RAG Pipeline|Query → Embed → Retrieve → Augment → Generate|Generative AI",
  "RLHF Loop|Pre-train → Reward Model → PPO Optimization → Loop|Training",
  "Transformer Architecture|Embedding → Self-Attention → Feed Forward → Output|Deep Learning",
  "Generative Adversarial Network|Generator (Create) ↔ Discriminator (Judge) → Loop|Deep Learning",
  "Stable Diffusion|Noise → Latent Diffusion (UNet) → Denoise → Image|Generative AI",
  "Prompt Engineering|Instruction → Context → Input Data → Output Indicator|Engineering",
  "Constitutional AI|Critique → Revise → Supervised Learning → RLAIF|Alignment",
  "Attention Mechanism|Query × Key → Softmax → × Value → Output|Deep Learning",
  "Backpropagation|Forward Pass → Calculate Loss → Backward Pass (Gradients) → Update Weights|Training"
];

const aiWorkflows = parseData(rawAIData, 'ai');

function BrainHub({ onSelect }: { onSelect: (view: 'linear' | 'nonlinear' | 'ai') => void }) {
  return (
    <div
      onClick={() => onSelect('ai')}
      className="absolute left-1/2 top-[20%] -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer group"
    >
      {/* Ring 2 (Purple) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40">
        <div className="w-full h-full border border-purple-500/30 rounded-full transition-colors duration-500" style={{ animation: 'spin2 12s linear infinite', transform: 'rotate(0deg) rotateX(-60deg) rotateY(20deg)' }}>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-white/90 backdrop-blur-sm shadow-sm border border-slate-200 text-purple-600 p-1 rounded-full">
            <Icon name="GitBranch" size={16} />
          </div>
        </div>
      </div>

      {/* Ring 3 (Emerald) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32">
        <div className="w-full h-full border border-emerald-500/30 rounded-full transition-colors duration-500" style={{ animation: 'spin3 15s linear infinite' }}>
          <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm shadow-sm border border-slate-200 text-emerald-600 p-1 rounded-full">
            <Icon name="List" size={16} />
          </div>
        </div>
      </div>

      {/* Brain Core */}
      <div className="relative w-24 h-24 bg-white/90 backdrop-blur-sm rounded-full border-2 border-cyan-500 shadow-[0_0_30px_rgba(6,182,212,0.3)] flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-500 z-10">
        <div className="text-cyan-500" style={{ animation: 'float 3s ease-in-out infinite' }}>
          <Icon name="Brain" size={48} />
        </div>
        <div className="absolute inset-0 bg-cyan-400/5 animate-pulse"></div>
      </div>

      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-cyan-600 text-xs font-bold tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-white/90 backdrop-blur px-2 py-1 rounded">
        NEURAL WORKFLOWS
      </div>
    </div>
  );
}

function Home() {
  const [view, setView] = useState<'home' | 'linear' | 'nonlinear' | 'ai'>('home')

  if (view === 'home') {
    return (
      <div className="relative">
        <LandingPage onSelect={setView} />
        <BrainHub onSelect={setView} />
        <style>{`
          @keyframes spin2 {
            from { transform: rotate(0deg) rotateX(-60deg) rotateY(20deg); }
            to { transform: rotate(360deg) rotateX(-60deg) rotateY(20deg); }
          }
          @keyframes spin3 {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
        `}</style>
        {/* OLD BRAIN BUTTON - REMOVING */}
        <button
          onClick={() => setView('ai')}
          className="hidden fixed bottom-[25%] right-8 w-32 h-32 flex items-center justify-center hover:scale-110 transition-all duration-300 z-50 group"
        >
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Atomic Rings - Blue */}
            <g className="animate-spin-slow" style={{ transformOrigin: '100px 100px', animation: 'spin 20s linear infinite' }}>
              <ellipse cx="100" cy="100" rx="90" ry="40" fill="none" stroke="#3b82f6" strokeWidth="2" opacity="0.7" />
              <ellipse cx="100" cy="100" rx="90" ry="40" fill="none" stroke="#60a5fa" strokeWidth="2" opacity="0.7" transform="rotate(60 100 100)" />
              <ellipse cx="100" cy="100" rx="90" ry="40" fill="none" stroke="#93c5fd" strokeWidth="2" opacity="0.7" transform="rotate(120 100 100)" />

              {/* Embedded icons on rings */}
              <circle cx="190" cy="100" r="4" fill="#3b82f6" className="animate-pulse" />
              <rect x="145" y="60" width="6" height="6" fill="#60a5fa" className="animate-pulse" style={{ animationDelay: '0.3s' }} />
              <polygon points="55,140 58,145 52,145" fill="#3b82f6" className="animate-pulse" style={{ animationDelay: '0.6s' }} />
              <circle cx="55" cy="60" r="4" fill="#93c5fd" className="animate-pulse" style={{ animationDelay: '0.9s' }} />
            </g>

            {/* Wireframe Brain - Brown-Grey */}
            <g className="group-hover:drop-shadow-glow">
              {/* Left Hemisphere */}
              <path d="M 70 80 Q 60 70 55 60 Q 52 50 55 40 Q 60 30 70 25 Q 80 22 90 25"
                    fill="none" stroke="#78716c" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 70 80 Q 65 90 60 100 Q 58 110 60 120 Q 65 130 75 135"
                    fill="none" stroke="#78716c" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 90 25 Q 85 35 85 45 Q 85 55 88 65"
                    fill="none" stroke="#a8a29e" strokeWidth="2" strokeLinecap="round" />
              <path d="M 75 135 Q 82 130 88 120 Q 92 110 92 100"
                    fill="none" stroke="#a8a29e" strokeWidth="2" strokeLinecap="round" />

              {/* Right Hemisphere */}
              <path d="M 130 80 Q 140 70 145 60 Q 148 50 145 40 Q 140 30 130 25 Q 120 22 110 25"
                    fill="none" stroke="#78716c" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 130 80 Q 135 90 140 100 Q 142 110 140 120 Q 135 130 125 135"
                    fill="none" stroke="#78716c" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 110 25 Q 115 35 115 45 Q 115 55 112 65"
                    fill="none" stroke="#a8a29e" strokeWidth="2" strokeLinecap="round" />
              <path d="M 125 135 Q 118 130 112 120 Q 108 110 108 100"
                    fill="none" stroke="#a8a29e" strokeWidth="2" strokeLinecap="round" />

              {/* Central Connection */}
              <path d="M 92 100 Q 100 95 108 100"
                    fill="none" stroke="#57534e" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 88 65 Q 100 60 112 65"
                    fill="none" stroke="#57534e" strokeWidth="2" strokeLinecap="round" />

              {/* Neural nodes - Subtle colors */}
              <circle cx="70" cy="80" r="2.5" fill="#78716c" className="animate-pulse" />
              <circle cx="130" cy="80" r="2.5" fill="#78716c" className="animate-pulse" style={{ animationDelay: '0.2s' }} />
              <circle cx="100" cy="95" r="2.5" fill="#57534e" className="animate-pulse" style={{ animationDelay: '0.4s' }} />
              <circle cx="85" cy="45" r="2" fill="#a8a29e" className="animate-pulse" style={{ animationDelay: '0.6s' }} />
              <circle cx="115" cy="45" r="2" fill="#a8a29e" className="animate-pulse" style={{ animationDelay: '0.8s' }} />
            </g>

            {/* Gradient Definitions */}
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
          </svg>

          <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            AI DIAGRAMS
          </span>
        </button>

        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .drop-shadow-glow {
            filter: drop-shadow(0 0 8px rgba(16, 185, 129, 0.5));
          }
        `}</style>
      </div>
    )
  }

  if (view === 'ai') {
    return <AIArchitecturePage onBack={() => setView('home')} />
  }

  const data = view === 'linear' ? linearWorkflows : nonLinearWorkflows
  return <ListView type={view} data={data} onBack={() => setView('home')} />
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

  return (
    <div className={`group relative p-6 rounded-2xl transition-all duration-500 border backdrop-blur-sm h-full flex flex-col
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
           <div className="mt-4 pt-4 border-t border-dashed border-slate-200 dark:border-zinc-800 flex justify-center fade-in">
             <TreeNode node={advancedData.root} />
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

// AIArchitecturePage Component
const AIArchitecturePage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const diagrams = [
    {
      title: "1. The Architecture Diagram",
      description: "This high-level overview shows how the Agent Wrapper sits between the User, the File System, and the LLM API, acting as the translation layer.",
      code: `graph TD
    User([User / Developer]) -->|Intent & Request| Wrapper

    subgraph "Agent Wrapper (The Body)"
        Context[Context Manager<br/>(Working Memory)]
        Tools[Tool Executor<br/>(Motor Control)]
        Parser[Parser & Guardrails<br/>(Inhibitory Control)]
    end

    Wrapper -->|Prompt + Context| LLM(LLM API<br/>The Brain)
    LLM -->|Token Generation<br/>Thoughts & Actions| Wrapper

    Tools -->|Read/Write| FS[(File System<br/>Local Disk)]
    FS -->|File Content| Tools

    classDef agent fill:#f9f,stroke:#333,stroke-width:2px;
    class Wrapper,Context,Tools,Parser agent;`
    },
    {
      title: "2. The Executive Loop (OODA)",
      description: "Visualizes the \"consciousness\" of the agent—the continuous `while` loop that processes inputs and decides on actions.",
      code: `stateDiagram-v2
    direction LR
    [*] --> Observe

    state "The Executive Loop" as Loop {
        state "Observe (Senses)" as Observe
        state "Orient (Context)" as Orient
        state "Decide (Inference)" as Decide
        state "Act (Motor Control)" as Act

        Observe --> Orient : File Change / Event
        Orient --> Decide : Update Memory & Prompt
        Decide --> Act : LLM Output -> Tool Call
        Act --> Observe : Tool Output / Feedback
    }

    note right of Observe: Watchdog / File System Events
    note right of Decide: Call Gemini/Claude API`
    },
    {
      title: "3. The Illusion of Continuity",
      description: "Demonstrates how the wrapper creates a continuous session from discrete, stateless LLM API calls by maintaining a persistent memory object.",
      code: `sequenceDiagram
    participant U as User
    participant W as Agent Wrapper (Memory)
    participant L as LLM (Stateless)

    Note over W: Memory = []

    U->>W: "Refactor server.py"
    Note over W: Memory.append(UserMsg)
    W->>L: Send Full History (1 msg)
    L-->>W: "I need to read the file."

    Note over W: Memory.append(LLM_Response)
    W->>W: Execute Tool: Read server.py
    Note over W: Memory.append(Tool_Output)

    W->>L: Send Full History (3 msgs)
    L-->>W: "Okay, here is the new code..."

    Note over U,L: The LLM thinks it remembers, but the Wrapper is just re-telling the story every time.`
    },
    {
      title: "4. The Wrapper as Prefrontal Cortex",
      description: "A mapping of biological executive functions to their technical implementations within your agent's code.",
      code: `graph LR
    subgraph "Human Brain"
        WM(Working Memory)
        MC(Motor Control)
        IC(Inhibitory Control)
        SM(Self-Monitoring)
    end

    subgraph "Agent Wrapper"
        CM(Context Manager)
        TE(Tool Executor)
        GR(Guardrails & Parsers)
        RL(Retry Loop)
    end

    WM -.->|Maps to| CM
    MC -.->|Maps to| TE
    IC -.->|Maps to| GR
    SM -.->|Maps to| RL

    style WM fill:#e1f5fe
    style CM fill:#e1f5fe
    style MC fill:#fff3e0
    style TE fill:#fff3e0`
    },
    {
      title: "5. The Pipeline (Intent to I/O)",
      description: "The linear step-by-step flow of a single CRUD operation, from the user's initial request to the final disk write.",
      code: `graph LR
    A[User Intent] -->|Request| B(Context Collection)
    B -->|Prompt| C{LLM Generation}
    C -->|Raw Text| D[Code Extraction]
    D -->|Regex Parse| E[File I/O Execution]
    E -->|Write| F[(Disk)]

    subgraph "The 'Magic' Step"
    C
    end

    subgraph "The 'Hands' Step"
    D
    E
    end`
    },
    {
      title: "6. The \"Thinking\" Behind the Scenes (ReAct)",
      description: "The internal monologue process (Reasoning + Acting) where the agent plans, uses tools, and observes results before writing final code.",
      code: `flowchart TD
    Start((Start)) --> Plan[Planner: Analyze Request]
    Plan --> Tool{Need Info?}

    Tool -- Yes --> CallTool[Tool Use: Read File/Search]
    CallTool --> Obs[Observation: Receive Data]
    Obs --> Plan

    Tool -- No (Have Context) --> Code[Coding: Generate Edit]
    Code --> Stop((End))

    style Plan fill:#d1c4e9
    style CallTool fill:#ffcc80
    style Obs fill:#b2dfdb`
    },
    {
      title: "7. The Mechanics of CRUD (Method B: Diffs)",
      description: "The logic flow for the \"Search and Replace\" method, showing how the agent locates code blocks using fuzzy matching instead of overwriting files.",
      code: `graph TD
    LLM[LLM Output] -->|Emits| Block

    subgraph "The Diff Block"
        Block[Search/Replace Block]
        Search["<<<< SEARCH<br/>def old_func():..."]
        Replace["==== REPLACE<br/>def new_func():..."]
        Block --- Search
        Block --- Replace
    end

    Search -->|Fuzzy Match| TargetFile[Target File Content]
    TargetFile -->|Locate Text| Swap[Swap Operation]
    Replace -->|Insert New Text| Swap
    Swap -->|Save| Disk[(Updated File)]`
    },
    {
      title: "8. The \"Agent\" Loop",
      description: "A simplified view of the core autonomous cycle: Read, Think, Parse, Execute.",
      code: `graph TD
    Read(READ: Context Injection) --> Think(THINK: LLM Inference)
    Think --> Parse(PARSE: Extract Instructions)
    Parse --> Execute(EXECUTE: File I/O)
    Execute -->|Feedback Loop| Read

    linkStyle default stroke-width:2px,fill:none,stroke:#333;`
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-emerald-50">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-slate-200">
        <div className="px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors"
            >
              <Icon name="ArrowLeft" className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-emerald-100 to-purple-100 rounded-lg">
                <Icon name="Brain" className="w-6 h-6 text-purple-600" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  AI Architecture Diagrams
                </h1>
                <p className="text-xs text-slate-500">The Agent Wrapper Design Patterns</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6 space-y-12 pb-24">
        {diagrams.map((diagram, idx) => (
          <section key={idx} className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-purple-500 px-6 py-4">
              <h2 className="text-xl font-bold text-white">{diagram.title}</h2>
              <p className="text-sm text-white/90 mt-1">{diagram.description}</p>
            </div>
            <div className="p-6">
              <pre className="bg-slate-50 rounded-lg p-4 overflow-x-auto border border-slate-200">
                <code className="text-sm text-slate-700 font-mono">{diagram.code}</code>
              </pre>
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-blue-800">
                  <strong>Note:</strong> Copy this Mermaid code into a Mermaid-compatible viewer (like mermaid.live, GitHub markdown, or Notion) to see the rendered diagram.
                </p>
              </div>
            </div>
          </section>
        ))}

        <section className="bg-gradient-to-br from-emerald-100 to-purple-100 rounded-2xl shadow-lg border border-purple-200 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Icon name="Zap" className="text-purple-600" size={28} />
            A Next Step for You
          </h2>
          <p className="text-slate-700 leading-relaxed">
            You mentioned previously that you are working on a <strong>personal assistant AI core</strong>.
            Would you like me to create a specific <strong>folder structure</strong> or a <strong>`requirements.txt`</strong> breakdown
            for that Python/System Tray project to get this architecture set up?
          </p>
        </section>

        {/* Footer Attribution */}
        <section className="text-center py-8">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-purple-500 rounded-full shadow-lg">
            <span className="text-white font-medium">Made with</span>
            <svg className="w-5 h-5 text-pink-200 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            <span className="text-white font-medium">by</span>
            <span className="text-white font-bold">Claude, Gemini & fogserv.cloud</span>
          </div>
        </section>
      </main>
    </div>
  )
}

// LandingPage Component - Updated with AI Brain Button
const LandingPage: React.FC<{ onSelect: (view: 'linear' | 'nonlinear' | 'ai') => void }> = ({ onSelect }) => {
  return (
    <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden relative">
      {/* About Link */}
      <Link
        to="/about"
        className="absolute top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-slate-200 hover:border-purple-300 hover:shadow-xl transition-all text-slate-600 hover:text-purple-600 text-sm font-medium"
      >
        <Icon name="HelpCircle" size={16} />
        About
      </Link>
      <div
        onClick={() => onSelect('linear')}
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
        onClick={() => onSelect('nonlinear')}
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
const ListView: React.FC<{ type: 'linear' | 'nonlinear'; data: WorkflowItem[]; onBack: () => void }> = ({ type, data, onBack }) => {
  const [search, setSearch] = useState('')
  const [isAdvanced, setIsAdvanced] = useState(false)

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
              onClick={onBack}
              className={`p-2 rounded-full transition-colors ${isLinear ? 'hover:bg-slate-100 text-slate-600' : 'hover:bg-zinc-800 text-zinc-400'}`}
            >
              <Icon name="ArrowLeft" className="w-5 h-5" />
            </button>
            <div>
              <h1 className={`text-xl font-bold flex items-center gap-2 ${isLinear ? 'text-slate-900' : 'text-white'}`}>
                {isLinear ? 'The Straight Path' : 'The Forked Road'}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
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
              {isAdvanced ? 'Advanced Mode' : 'Simple Mode'}
            </button>

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

        <div className={`px-6 py-2 border-t overflow-x-auto whitespace-nowrap hide-scrollbar
           ${isLinear ? 'border-slate-100 bg-slate-50/50' : 'border-zinc-800 bg-zinc-900/50'}
        `}>
           <div className="flex gap-4">
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
          <section key={category} id={category} className="space-y-6 scroll-mt-40">
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
