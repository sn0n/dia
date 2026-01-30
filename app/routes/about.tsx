import { createFileRoute, Link } from '@tanstack/react-router'
import { Icon } from '~/components/Icon'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-purple-50">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-slate-200">
        <div className="px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
          <Link to="/" className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors">
            <Icon name="ArrowLeft" className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </Link>
          <h1 className="text-xl font-bold text-slate-900">About & Credits</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-8 space-y-12">
        {/* Project Overview */}
        <section className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-4 flex items-center gap-3">
            <Icon name="Workflow" className="text-purple-600" size={32} />
            Workflow Explorer
          </h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            A comprehensive collection of mental models, decision-making frameworks, and workflow patterns organized into two categories:
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                <Icon name="List" size={20} className="text-emerald-600" />
                The Straight Path
              </h3>
              <p className="text-sm text-slate-600">Linear & Sequential workflows for clarity, efficiency, and execution</p>
            </div>
            <div className="p-4 bg-zinc-900 rounded-lg border border-zinc-700">
              <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                <Icon name="GitBranch" size={20} className="text-purple-400" />
                Fork in the Road
              </h3>
              <p className="text-sm text-zinc-300">Non-Linear & Systemic workflows for complexity, chaos, and evolution</p>
            </div>
          </div>
        </section>

        {/* AI Architecture Section */}
        <section className="bg-gradient-to-br from-emerald-50 to-purple-50 rounded-2xl shadow-lg border border-purple-200 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
            <Icon name="Brain" className="text-purple-600" size={28} />
            AI Architecture Diagrams
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            The AI section features 8 Mermaid diagrams illustrating agent wrapper design patterns, including:
          </p>
          <ul className="space-y-2 text-slate-600">
            <li className="flex items-start gap-2">
              <Icon name="Check" className="text-emerald-600 mt-1" size={16} />
              <span>Agent Architecture & System Design</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="Check" className="text-emerald-600 mt-1" size={16} />
              <span>Executive Loop (OODA) & State Management</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="Check" className="text-emerald-600 mt-1" size={16} />
              <span>ReAct Patterns & Tool Usage Workflows</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="Check" className="text-emerald-600 mt-1" size={16} />
              <span>CRUD Operations & Diff-based Editing</span>
            </li>
          </ul>
        </section>

        {/* Credits & Sources */}
        <section className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Credits & Sources</h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-slate-900 mb-3">Workflow Frameworks</h3>
              <p className="text-sm text-slate-600 mb-3">
                The workflow data in this application has been curated from various publicly available sources including:
              </p>
              <ul className="space-y-2 text-sm text-slate-600 ml-4">
                <li>• Productivity methodology resources (GTD, PARA, Zettelkasten)</li>
                <li>• Design thinking frameworks (Double Diamond, Design Sprint)</li>
                <li>• Software development patterns (Agile, DevOps, CI/CD)</li>
                <li>• Decision-making models (OODA, Cynefin, First Principles)</li>
                <li>• Learning methodologies (Feynman, Spaced Repetition)</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 mb-3">Technology Stack</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-lg">
                  <p className="font-medium text-slate-900 text-sm">React & TanStack</p>
                  <p className="text-xs text-slate-500">UI Framework & Routing</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <p className="font-medium text-slate-900 text-sm">Tailwind CSS</p>
                  <p className="text-xs text-slate-500">Styling & Design System</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <p className="font-medium text-slate-900 text-sm">Vite</p>
                  <p className="text-xs text-slate-500">Build Tool & Dev Server</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <p className="font-medium text-slate-900 text-sm">TypeScript</p>
                  <p className="text-xs text-slate-500">Type-Safe Development</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 mb-3">Design Resources</h3>
              <ul className="space-y-2 text-sm text-slate-600 ml-4">
                <li>• Lucide Icons - Open source icon library</li>
                <li>• Mermaid.js - Diagram and flowchart syntax</li>
                <li>• Color palettes inspired by modern design systems</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 mb-3">Acknowledgments</h3>
              <p className="text-sm text-slate-600 mb-2">
                This project aggregates knowledge from various domains including productivity science,
                cognitive psychology, software engineering, and systems thinking. We acknowledge the
                original creators of these methodologies and frameworks.
              </p>
              <p className="text-sm text-slate-600">
                Special thanks to the open-source community for providing the tools and libraries that made this project possible.
              </p>
            </div>
          </div>
        </section>

        {/* License & Usage */}
        <section className="bg-slate-50 rounded-2xl shadow-lg border border-slate-200 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">License & Usage</h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            This project is intended for educational and reference purposes. The workflows and frameworks
            presented here are compiled from publicly available information. Users are encouraged to explore
            the original sources for deeper understanding and proper attribution.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            While the code for this application is original, the methodologies and frameworks belong to
            their respective creators and communities.
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
          <p className="mt-4 text-xs text-slate-400">
            Version 1.0 • 2026
          </p>
        </section>
      </main>
    </div>
  )
}
