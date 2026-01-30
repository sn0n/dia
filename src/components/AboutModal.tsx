import { useState } from 'react'
import { Icon } from './Icon'

export function AboutModal() {
    const [isOpen, setIsOpen] = useState(false)

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all duration-300 hover:shadow-blue-500/50 group"
                title="About & Credits"
            >
                <Icon name="HelpCircle" className="w-6 h-6" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
            </button>
        )
    }

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-fadeIn"
                onClick={() => setIsOpen(false)}
            />

            {/* Modal */}
            <div className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-3xl md:max-h-[90vh] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden animate-slideUp">
                {/* Header */}
                <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-6 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
                    <div className="relative">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-3xl font-bold">About Dia</h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                            >
                                <Icon name="X" className="w-6 h-6" />
                            </button>
                        </div>
                        <p className="text-white/90">Workflow & Diagram Library</p>
                    </div>
                </div>

                {/* Content */}
                <div className="overflow-y-auto max-h-[calc(90vh-180px)] p-6">
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                            <div className="text-3xl font-bold text-blue-600">398</div>
                            <div className="text-sm text-gray-600">Diagrams</div>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                            <div className="text-3xl font-bold text-purple-600">484</div>
                            <div className="text-sm text-gray-600">API Endpoints</div>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                            <div className="text-3xl font-bold text-green-600">100%</div>
                            <div className="text-sm text-gray-600">Offline</div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                        <h3 className="text-xl font-bold mb-3 text-gray-900">What is Dia?</h3>
                        <p className="text-gray-700 leading-relaxed mb-3">
                            Dia is a comprehensive, fully offline-capable library of 398+ workflow patterns and
                            diagram examples. Built as a 100% static site with a REST API - no backend required!
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            Browse mental models, productivity frameworks, system patterns, AI/ML workflows,
                            and technical diagrams. All data is available via a static JSON API for integration
                            with your own applications.
                        </p>
                    </div>

                    {/* Attributions */}
                    <div className="mb-6">
                        <h3 className="text-xl font-bold mb-3 text-gray-900 flex items-center gap-2">
                            <Icon name="Award" className="w-5 h-5 text-blue-500" />
                            Data Sources & Attribution
                        </h3>
                        <div className="space-y-2 text-sm">
                            <p className="text-gray-700">
                                Diagram examples were ethically collected from the following open-source projects and documentation:
                            </p>
                            <ul className="space-y-2 ml-4">
                                <li className="flex items-start gap-2">
                                    <Icon name="ExternalLink" className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                                    <div>
                                        <a href="https://mermaid.js.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
                                            Mermaid.js
                                        </a>
                                        <span className="text-gray-600"> - Diagramming and charting tool (MIT License)</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Icon name="ExternalLink" className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                                    <div>
                                        <a href="https://plantuml.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
                                            PlantUML
                                        </a>
                                        <span className="text-gray-600"> - UML diagram creator (Open Source)</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Icon name="ExternalLink" className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                                    <div>
                                        <a href="https://github.com/bpmn-io/bpmn-js-examples" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
                                            BPMN.io Examples
                                        </a>
                                        <span className="text-gray-600"> - Business Process diagrams (bpmn.io license)</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Icon name="ExternalLink" className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                                    <div>
                                        <a href="https://wavedrom.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
                                            WaveDrom
                                        </a>
                                        <span className="text-gray-600"> - Digital timing diagrams (MIT License)</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Icon name="ExternalLink" className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                                    <div>
                                        <a href="https://blockdiag.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
                                            blockdiag
                                        </a>
                                        <span className="text-gray-600"> - Block diagram generator (Apache License 2.0)</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Copyright Disclaimer */}
                    <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <h3 className="text-lg font-bold mb-2 text-yellow-900 flex items-center gap-2">
                            <Icon name="AlertCircle" className="w-5 h-5" />
                            Copyright & Ownership
                        </h3>
                        <p className="text-sm text-yellow-800 leading-relaxed">
                            This project claims <strong>no copyright rights or ownership</strong> over the diagram examples
                            and workflow methodologies presented. All content is attributed to its original creators and
                            licensed under their respective open-source licenses. This is an educational resource for
                            learning and reference purposes.
                        </p>
                    </div>

                    {/* Made With Love */}
                    <div className="mb-6">
                        <h3 className="text-xl font-bold mb-3 text-gray-900 flex items-center gap-2">
                            <Icon name="Heart" className="w-5 h-5 text-red-500" />
                            Made With ❤️ By
                        </h3>
                        <p className="text-sm text-gray-700 mb-3">
                            This project was collaboratively built with the help of various AI assistants:
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <a
                                href="https://gemini.google.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors flex items-center gap-2"
                            >
                                <Icon name="Sparkles" className="w-4 h-4" />
                                Google Gemini
                            </a>
                            <a
                                href="https://claude.ai/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium hover:bg-purple-200 transition-colors flex items-center gap-2"
                            >
                                <Icon name="Sparkles" className="w-4 h-4" />
                                Anthropic Claude
                            </a>
                            <a
                                href="https://github.com/features/copilot"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium hover:bg-green-200 transition-colors flex items-center gap-2"
                            >
                                <Icon name="Sparkles" className="w-4 h-4" />
                                GitHub Copilot
                            </a>
                            <a
                                href="https://openai.com/blog/openai-codex"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium hover:bg-orange-200 transition-colors flex items-center gap-2"
                            >
                                <Icon name="Sparkles" className="w-4 h-4" />
                                OpenAI Codex
                            </a>
                        </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="mb-6">
                        <h3 className="text-xl font-bold mb-3 text-gray-900 flex items-center gap-2">
                            <Icon name="Code" className="w-5 h-5 text-purple-500" />
                            Built With
                        </h3>
                        <div className="flex flex-wrap gap-2 text-sm">
                            <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full">React 19</span>
                            <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full">TypeScript</span>
                            <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full">Vite 6</span>
                            <span className="px-3 py-1 bg-cyan-50 text-cyan-700 rounded-full">Tailwind CSS 4</span>
                            <span className="px-3 py-1 bg-pink-50 text-pink-700 rounded-full">Mermaid v11</span>
                            <span className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full">Viz.js (Graphviz WASM)</span>
                        </div>
                    </div>

                    {/* Open Source */}
                    <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                        <p className="text-sm font-medium text-gray-700 mb-2">
                            <Icon name="Heart" className="w-4 h-4 inline text-red-500" /> Open Source • MIT License
                        </p>
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline text-sm font-medium"
                        >
                            View on GitHub →
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}
