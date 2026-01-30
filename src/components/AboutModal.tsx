import { useState } from 'react'
import { Icon } from './Icon'

export function AboutModal() {
    const [isOpen, setIsOpen] = useState(false)

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-[100] w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all duration-300 hover:shadow-blue-500/50 group border-2 border-white/20"
                title="About & Credits"
            >
                <span className="sr-only">About Dia</span>
                <Icon name="HelpCircle" className="w-7 h-7" />
            </button>
        )
    }

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] animate-fadeIn"
                onClick={() => setIsOpen(false)}
            />

            {/* Modal */}
            <div className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-3xl md:max-h-[90vh] bg-white rounded-2xl shadow-2xl z-[201] overflow-hidden animate-slideUp flex flex-col">
                {/* Header */}
                <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-6 text-white relative overflow-hidden flex-shrink-0">
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
                    <div className="relative">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-3xl font-bold flex items-center gap-3">
                                <Icon name="Workflow" className="w-8 h-8" />
                                Dia
                            </h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                            >
                                <Icon name="X" className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-white/90">
                            <a href="https://dia.ai-prompts.help" target="_blank" rel="noopener" className="hover:text-white hover:underline flex items-center gap-1.5 transition-colors">
                                <Icon name="ExternalLink" className="w-4 h-4" />
                                dia.ai-prompts.help
                            </a>
                            <span className="opacity-50 hidden sm:inline">•</span>
                            <a href="https://github.com/sn0n/dia" target="_blank" rel="noopener" className="hover:text-white hover:underline flex items-center gap-1.5 transition-colors">
                                <Icon name="GitBranch" className="w-4 h-4" />
                                github.com/sn0n/dia
                            </a>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="overflow-y-auto p-6 space-y-8 bg-slate-50 overscroll-contain">

                    {/* Main Description */}
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h3 className="text-xl font-bold mb-3 text-slate-800">What is Dia?</h3>
                        <p className="text-slate-600 leading-relaxed mb-4">
                            Dia is a comprehensive, fully offline-capable library of 398+ workflow patterns and
                            diagram examples. Built as a 100% static site with a REST API - no backend required!
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 mt-6">
                            <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-100">
                                <div className="text-2xl font-bold text-blue-600">398</div>
                                <div className="text-xs font-medium text-blue-600 uppercase tracking-wider mt-1">Diagrams</div>
                            </div>
                            <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-100">
                                <div className="text-2xl font-bold text-purple-600">484</div>
                                <div className="text-xs font-medium text-purple-600 uppercase tracking-wider mt-1">Endpoints</div>
                            </div>
                            <div className="text-center p-3 bg-green-50 rounded-lg border border-green-100">
                                <div className="text-2xl font-bold text-green-600">100%</div>
                                <div className="text-xs font-medium text-green-600 uppercase tracking-wider mt-1">Offline</div>
                            </div>
                        </div>
                    </div>

                    {/* Attributions */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-slate-800 flex items-center gap-2">
                            <Icon name="Award" className="w-5 h-5 text-amber-500" />
                            Data Sources & Attribution
                        </h3>
                        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden divide-y divide-slate-100 shadow-sm">
                            <a href="https://mermaid.js.org/" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 hover:bg-slate-50 transition-colors group">
                                <Icon name="ExternalLink" className="w-5 h-5 text-slate-400 group-hover:text-blue-500 mr-3" />
                                <div className="flex-1">
                                    <span className="font-semibold text-slate-800">Mermaid.js</span>
                                    <span className="ml-2 text-sm text-slate-500">Diagramming and charting tool</span>
                                </div>
                                <span className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded">MIT License</span>
                            </a>

                            <a href="https://plantuml.com/" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 hover:bg-slate-50 transition-colors group">
                                <Icon name="ExternalLink" className="w-5 h-5 text-slate-400 group-hover:text-blue-500 mr-3" />
                                <div className="flex-1">
                                    <span className="font-semibold text-slate-800">PlantUML</span>
                                    <span className="ml-2 text-sm text-slate-500">UML diagram creator</span>
                                </div>
                                <span className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded">GPL/MIT</span>
                            </a>

                            <a href="https://github.com/bpmn-io/bpmn-js-examples" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 hover:bg-slate-50 transition-colors group">
                                <Icon name="ExternalLink" className="w-5 h-5 text-slate-400 group-hover:text-blue-500 mr-3" />
                                <div className="flex-1">
                                    <span className="font-semibold text-slate-800">BPMN.io</span>
                                    <span className="ml-2 text-sm text-slate-500">Business Process diagrams</span>
                                </div>
                                <span className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded">bpmn.io</span>
                            </a>

                            <a href="https://wavedrom.com/" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 hover:bg-slate-50 transition-colors group">
                                <Icon name="ExternalLink" className="w-5 h-5 text-slate-400 group-hover:text-blue-500 mr-3" />
                                <div className="flex-1">
                                    <span className="font-semibold text-slate-800">WaveDrom</span>
                                    <span className="ml-2 text-sm text-slate-500">Digital timing diagrams</span>
                                </div>
                                <span className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded">MIT</span>
                            </a>
                        </div>
                    </div>

                    {/* Copyright Disclaimer */}
                    <div className="p-5 bg-amber-50 border border-amber-200 rounded-xl flex gap-4">
                        <Icon name="AlertCircle" className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <h3 className="text-sm font-bold text-amber-900 mb-1">Copyright & Ownership Disclaimer</h3>
                            <p className="text-sm text-amber-800 leading-relaxed opacity-90">
                                This project claims <strong>no copyright rights or ownership</strong> over the diagram examples
                                and workflow methodologies presented. All content is attributed to its original creators and
                                licensed under their respective open-source licenses. This is an educational resource for
                                learning and reference purposes.
                            </p>
                        </div>
                    </div>

                    {/* AI Credits */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-slate-800 flex items-center gap-2">
                            <Icon name="Heart" className="w-5 h-5 text-rose-500" />
                            Made with AI
                        </h3>
                        <p className="text-sm text-slate-600 mb-4">
                            Built collaboratively with the following AI assistants:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <a href="https://gemini.google.com/" target="_blank" rel="noopener" className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-lg hover:border-blue-400 hover:shadow-sm transition-all group">
                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                                    <Icon name="Sparkles" className="w-4 h-4" />
                                </div>
                                <span className="font-medium text-slate-700">Google Gemini</span>
                            </a>

                            <a href="https://claude.ai/" target="_blank" rel="noopener" className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-lg hover:border-purple-400 hover:shadow-sm transition-all group">
                                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
                                    <Icon name="Sparkles" className="w-4 h-4" />
                                </div>
                                <span className="font-medium text-slate-700">Anthropic Claude</span>
                            </a>

                            <a href="https://github.com/features/copilot" target="_blank" rel="noopener" className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-lg hover:border-green-400 hover:shadow-sm transition-all group">
                                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform">
                                    <Icon name="Sparkles" className="w-4 h-4" />
                                </div>
                                <span className="font-medium text-slate-700">GitHub Copilot</span>
                            </a>

                            <a href="https://openai.com/blog/openai-codex" target="_blank" rel="noopener" className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-lg hover:border-orange-400 hover:shadow-sm transition-all group">
                                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 group-hover:scale-110 transition-transform">
                                    <Icon name="Code" className="w-4 h-4" />
                                </div>
                                <span className="font-medium text-slate-700">OpenAI Codex</span>
                            </a>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="text-center pt-4 border-t border-slate-200">
                        <div className="flex flex-wrap justify-center gap-4 text-xs text-slate-500 mb-2">
                            <span className="flex items-center gap-1"><Icon name="CheckCircle2" className="w-3 h-3 text-green-500" /> React 19</span>
                            <span className="flex items-center gap-1"><Icon name="CheckCircle2" className="w-3 h-3 text-green-500" /> TypeScript</span>
                            <span className="flex items-center gap-1"><Icon name="CheckCircle2" className="w-3 h-3 text-green-500" /> Vite 6</span>
                        </div>
                        <p className="text-xs text-slate-400">
                            Open Source • MIT License • {new Date().getFullYear()}
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
