import { useParams, useNavigate } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { DiagramRenderer } from '../components/DiagramRenderer'
import { aiComplexWorkflows, parseAIWorkflows } from '../data/ai-workflows'

const aiWorkflows = parseAIWorkflows()

export default function AIWorkflowDetail() {
    const { slug } = useParams<{ slug: string }>()
    const navigate = useNavigate()

    // Remove -diagram suffix from slug to match with title
    const slugWithoutSuffix = slug?.replace(/-diagram$/, '') || ''
    const workflow = aiWorkflows.find(w => slugify(w.title) === slugWithoutSuffix)

    if (!workflow) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-purple-900 mb-4">AI Workflow Not Found</h1>
                    <button
                        onClick={() => navigate('/ai-workflows')}
                        className="text-purple-600 hover:text-purple-700"
                    >
                        ← Back to AI Workflows
                    </button>
                </div>
            </div>
        )
    }

    const advancedData = (aiComplexWorkflows as any)[workflow.title]
    const hasCode = advancedData?.code

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
            {/* Header */}
            <header className="sticky top-0 z-50 backdrop-blur-md border-b bg-white/90 border-purple-200">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <button
                        onClick={() => navigate('/ai-workflows')}
                        className="flex items-center gap-2 text-purple-600 hover:text-purple-900 transition-colors"
                    >
                        <Icon name="ArrowLeft" className="w-5 h-5" />
                        <span>Back to AI Workflows</span>
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-12">
                {/* Title Section */}
                <div className="mb-8">
                    <div className="flex items-start gap-4 mb-4">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg">
                            <Icon name="Cpu" className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                            <h1 className="text-4xl font-bold mb-2 text-purple-900">
                                {workflow.title}
                            </h1>
                            <div className="flex items-center gap-3 flex-wrap">
                                <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-700">
                                    {workflow.category}
                                </span>
                                <span className="text-sm text-purple-600">
                                    AI & Machine Learning
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Generated Description */}
                    <div className="prose max-w-none prose-purple">
                        <p className="text-lg leading-relaxed text-purple-900">
                            {generateAIDescription(workflow.title, workflow.description, workflow.category)}
                        </p>
                    </div>
                </div>

                {/* Diagram Visualization */}
                <div className="rounded-2xl border border-purple-200 bg-white p-8 mb-8 shadow-lg">
                    <h2 className="text-2xl font-bold mb-6 text-purple-900">
                        Workflow Diagram
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
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-bold text-sm text-white shadow">
                                        {idx + 1}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-lg text-purple-800">
                                            {step.trim()}
                                        </p>
                                    </div>
                                    {idx < arr.length - 1 && (
                                        <Icon name="ArrowDown" className="w-5 h-5 text-purple-400" />
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Use Cases */}
                <div className="rounded-2xl border border-purple-200 bg-white p-8 mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-purple-900">
                        When to Use This AI Workflow
                    </h2>
                    <ul className="space-y-2 text-purple-800">
                        {generateAIUseCases(workflow.title, workflow.category).map((useCase, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                                <Icon name="CheckCircle2" className="w-5 h-5 mt-0.5 flex-shrink-0 text-purple-600" />
                                <span>{useCase}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Key Techniques */}
                <div className="rounded-2xl border border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 p-8">
                    <h2 className="text-2xl font-bold mb-4 text-purple-900">
                        Key Techniques & Concepts
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        {generateKeyTechniques(workflow.category).map((technique, idx) => (
                            <div key={idx} className="flex items-start gap-3 p-4 rounded-lg bg-white border border-purple-100">
                                <Icon name="Zap" className="w-5 h-5 mt-0.5 flex-shrink-0 text-purple-500" />
                                <span className="text-purple-800">{technique}</span>
                            </div>
                        ))}
                    </div>
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

// Generate descriptive text for AI workflows
function generateAIDescription(title: string, description: string, category: string): string {
    const baseDesc = description.replace(/→|↔/g, '→')

    const contexts: Record<string, string> = {
        'Deep Learning': `A fundamental deep learning workflow that powers modern AI systems. ${baseDesc}. This approach is essential for training neural networks that can learn complex patterns from data, enabling breakthrough capabilities in computer vision, natural language processing, and beyond.`,
        'LLM Pattern': `A large language model pattern used in cutting-edge AI applications. ${baseDesc}. This technique leverages the power of transformer-based models to understand and generate human-like text, enabling sophisticated conversational AI and content generation.`,
        'MLOps': `A production-grade MLOps workflow for deploying and maintaining AI systems at scale. ${baseDesc}. This methodology ensures that machine learning models are reliable, reproducible, and continuously improving in real-world environments.`,
        'AI Agents': `An AI agent pattern that enables autonomous decision-making and action. ${baseDesc}. This framework allows AI systems to perceive their environment, reason about it, and take actions to achieve specific goals with minimal human intervention.`,
        'Generative AI': `A generative AI technique for creating new content and solving creative problems. ${baseDesc}. This approach enables AI systems to generate novel outputs—from images and text to music and code—that didn't exist in the training data.`,
        'Optimization': `An optimization strategy for improving AI model performance and efficiency. ${baseDesc}. This method focuses on making models faster, smaller, and more resource-efficient without sacrificing accuracy.`,
        'Training': `A training methodology for developing robust and accurate AI models. ${baseDesc}. This systematic approach ensures models learn effectively from data while avoiding common pitfalls like overfitting.`,
        'Deployment': `A deployment pattern for bringing AI models into production environments. ${baseDesc}. This workflow handles the complexities of serving models at scale while maintaining performance and reliability.`,
    }

    return contexts[category] || `${baseDesc}. This AI workflow provides a structured approach to ${category.toLowerCase()}, helping you build and deploy sophisticated machine learning systems with confidence.`
}

// Generate use cases for AI workflows
function generateAIUseCases(title: string, category: string): string[] {
    const useCasesByCategory: Record<string, string[]> = {
        'Deep Learning': [
            'Training convolutional neural networks for image recognition',
            'Building recurrent networks for sequence prediction',
            'Developing attention-based models for complex tasks',
            'Creating custom architectures for domain-specific problems'
        ],
        'LLM Pattern': [
            'Building conversational AI and chatbots',
            'Implementing retrieval-augmented generation systems',
            'Creating context-aware text generation applications',
            'Developing few-shot learning solutions'
        ],
        'MLOps': [
            'Automating model training and deployment pipelines',
            'Monitoring model performance in production',
            'Managing model versions and experimentation',
            'Ensuring model reliability and reproducibility'
        ],
        'AI Agents': [
            'Creating autonomous decision-making systems',
            'Building multi-agent collaborative environments',
            'Implementing reasoning and planning capabilities',
            'Developing self-improving agent architectures'
        ],
        'Generative AI': [
            'Generating synthetic training data',
            'Creating artistic and creative content',
            'Building text-to-image or image-to-image systems',
            'Developing novel molecular structures or designs'
        ],
        'Optimization': [
            'Reducing model size for edge deployment',
            'Improving inference speed for real-time applications',
            'Optimizing training efficiency for large datasets',
            'Balancing accuracy and computational cost'
        ],
    }

    return useCasesByCategory[category] || [
        `When building AI systems for ${category.toLowerCase()} tasks`,
        `For production ML applications requiring ${category.toLowerCase()}`,
        `During research and experimentation with ${category.toLowerCase()}`,
        `When scaling ${category.toLowerCase()} solutions to production`
    ]
}

// Generate key techniques
function generateKeyTechniques(category: string): string[] {
    const techniquesByCategory: Record<string, string[]> = {
        'Deep Learning': ['Backpropagation', 'Gradient Descent', 'Activation Functions', 'Regularization'],
        'LLM Pattern': ['Transformer Architecture', 'Attention Mechanism', 'Tokenization', 'Fine-tuning'],
        'MLOps': ['CI/CD for ML', 'Model Registry', 'Feature Store', 'A/B Testing'],
        'AI Agents': ['Reinforcement Learning', 'Policy Gradient', 'Multi-Agent Systems', 'Planning'],
        'Generative AI': ['VAEs', 'GANs', 'Diffusion Models', 'Prompt Engineering'],
        'Optimization': ['Quantization', 'Pruning', 'Knowledge Distillation', 'Neural Architecture Search'],
        'Training': ['Batch Normalization', 'Learning Rate Scheduling', 'Early Stopping', 'Data Augmentation'],
        'Deployment': ['Model Serving', 'Containerization', 'Load Balancing', 'Monitoring'],
    }

    return techniquesByCategory[category] || ['Neural Networks', 'Training Data', 'Model Architecture', 'Evaluation Metrics']
}
