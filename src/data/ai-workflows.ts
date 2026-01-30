// AI-Powered Workflow Systems and Patterns
export const aiWorkflowsData = [
    "Neural Network Training|Initialize Weights → Forward Pass → Calculate Loss → Backward Pass (Backpropagation) → Update Weights → Repeat|Deep Learning",
    "Transformer Architecture|Input Embedding → Positional Encoding → Multi-Head Attention → Add & Norm → Feed Forward → Add & Norm → Output|Architecture",
    "Reinforcement Learning|Observe State → Select Action (Policy) → Receive Reward → Update Q-Table → Explore/Exploit → Loop|Training",
    "Attention Mechanism|Query → Key → Value → Similarity Score → Softmax → Weighted Sum → Context Vector|Architecture",
    "GANs (Generative Adversarial Networks)|Generator Creates → Discriminator Judges → Real/Fake Decision → Backprop Both → Adversarial Training|Generative AI",
    "Transfer Learning|Pre-trained Model → Freeze Layers → Add Custom Head → Fine-tune Top Layers → Train on New Data|Training",
    "Data Augmentation Pipeline|Load Image → Random Crop → Random Flip → Color Jitter → Normalize → Batch → Train|Data Processing",
    "Gradient Descent|Initialize Parameters → Calculate Gradient → Update Parameters → Check Convergence → Loop|Optimization",
    "Convolutional Neural Network|Input Image → Conv Layer → ReLU → Pooling → Flatten → Dense → Softmax → Classification|Computer Vision",
    "Recurrent Neural Network|Input Sequence → Hidden State → Process Token → Update State → Next Token → Loop|Sequence Processing",
    "LSTM (Long Short-Term Memory)|Input → Forget Gate → Input Gate → Cell State Update → Output Gate → Hidden State|Architecture",
    "Encoder-Decoder|Encode Input → Context Vector → Decode → Generate Output → Attention Bridge|Sequence-to-Sequence",
    "Beam Search|Start Token → Generate K Candidates → Score → Keep Top K → Expand → Repeat → Best Path|Decoding",
    "Batch Normalization|Batch Input → Calculate Mean/Variance → Normalize → Scale & Shift → Output|Normalization",
    "Dropout Regularization|Forward Pass → Randomly Drop Neurons → Train → Test (All Active) → Prevent Overfitting|Regularization",
    "Adam Optimizer|Gradient → First Moment (Momentum) → Second Moment → Bias Correction → Parameter Update|Optimization",
    "Cross Validation|Split Data K-Folds → Train on K-1 → Validate on 1 → Rotate → Average Performance|Validation",
    "Early Stopping|Train Model → Monitor Validation Loss → Patience Counter → Stop if No Improvement → Best Model|Training",
    "Hyperparameter Tuning|Define Search Space → Random/Grid Search → Train → Evaluate → Select Best → Repeat|Optimization",
    "Model Ensembling|Train Multiple Models → Predictions → Voting/Averaging → Final Prediction|Ensemble",
    "Feature Engineering|Raw Data → Extract Features → Select Important → Transform → Normalize → Model Input|Preprocessing",
    "Embedding Layer|Token ID → Lookup Table → Dense Vector → Positional Encoding → Model Input|Representation",
    "Autoencoder|Encode → Bottleneck (Latent Space) → Decode → Reconstruction Loss → Train|Unsupervised Learning",
    "Diffusion Model|Add Noise (Forward) → Learn Reverse → Denoise Step-by-Step → Generate Sample|Generative AI",
    "CLIP (Vision-Language)|Image Encoder → Text Encoder → Contrastive Learning → Shared Embedding Space|Multimodal",
    "RAG (Retrieval Augmented Generation)|Query → Retrieve Documents → Embed Context → Generate Response → LLM Output|LLM Pattern",
    "Chain of Thought|Problem → Step 1 → Step 2 → ... → Step N → Final Answer|Prompting",
    "Few-Shot Learning|Task Description → Example 1 → Example 2 → Example 3 → Your Turn → Response|Prompting",
    "Constitutional AI|Generate Response → Self-Critique → Revise → Principle Alignment → Final Output|Safety",
    "RLHF (Reinforcement Learning from Human Feedback)|Generate → Human Ranks → Train Reward Model → PPO Training → Aligned Model|Alignment",
    "Active Learning|Label Small Sample → Train Model → Find Uncertain Examples → Human Labels → Retrain → Loop|Training",
    "Curriculum Learning|Easy Examples → Medium Examples → Hard Examples → Progressive Training|Training Strategy",
    "Knowledge Distillation|Teacher Model → Soft Labels → Student Model → Match Distributions → Compressed Model|Compression",
    "Pruning|Train Full Model → Identify Important Weights → Remove Low-Magnitude → Fine-tune → Smaller Model|Compression",
    "Quantization|FP32 Weights → INT8 Conversion → Calibration → Quantized Model → Faster Inference|Compression",
    "Model Deployment|Export Model → ONNX/TensorRT → Container → Load Balancer → Serve → Monitor|MLOps",
    "A/B Testing for Models|Model A → 50% Traffic → Model B → 50% Traffic → Compare Metrics → Winner|Deployment",
    "Feature Store|Raw Data → Feature Engineering → Store → Serve (Train/Inference) → Version Control|MLOps",
    "Model Monitoring|Production Model → Log Predictions → Detect Drift → Alert → Retrain Trigger|MLOps",
    "Continuous Training|New Data → Trigger → Retrain → Validate → Deploy → Monitor → Loop|MLOps",
    "Shadow Deployment|New Model → Mirror Production → Compare Results → No User Impact → Validation|Deployment",
    "Multi-Task Learning|Shared Layers → Task-Specific Heads → Joint Training → Transfer Knowledge|Training",
    "Meta-Learning|Learn to Learn → Inner Loop (Task) → Outer Loop (Meta) → Fast Adaptation|Advanced",
    "Neural Architecture Search|Search Space → Train Candidates → Evaluate → Select Best → Evolve|AutoML",
    "Explainable AI (SHAP)|Model Prediction → SHAP Values → Feature Importance → Visualization → Interpretation|Interpretability",
    "Adversarial Training|Generate Adversarial Examples → Train on Both → Robust Model|Robustness",
    "Self-Supervised Learning|Unlabeled Data → Create Pretext Task → Train → Fine-tune → Downstream Task|Training",
    "Contrastive Learning|Augment Sample → Positive Pairs → Negative Pairs → Contrastive Loss → Representations|Training",
    "Prompt Engineering|System Prompt → User Input → Few-Shot Examples → Instructions → LLM Response|Prompting",
    "Agent Loop|Observe → Think (Reasoning) → Act (Tool Use) → Observe Result → Loop|AI Agents",
    "ReAct Pattern|Thought → Action → Observation → Thought → Action → ... → Answer|AI Agents"
]

export const aiComplexWorkflows = {
    "Neural Network Training": {
        type: "linear",
        root: {
            label: "Initialize Weights",
            type: "start",
            next: {
                label: "Forward Pass",
                type: "action",
                next: {
                    label: "Calculate Loss",
                    type: "action",
                    next: {
                        label: "Backward Pass",
                        note: "(Backpropagation)",
                        type: "action",
                        next: {
                            label: "Update Weights",
                            type: "action",
                            next: {
                                label: "Converged?",
                                type: "decision",
                                branches: [
                                    { label: "No", path: { label: "Next Epoch", type: "action", loop: true } },
                                    { label: "Yes", path: { label: "Trained Model", type: "end", color: "emerald" } }
                                ]
                            }
                        }
                    }
                }
            }
        }
    },
    "Reinforcement Learning": {
        type: "nonlinear",
        root: {
            label: "Observe State",
            type: "start",
            next: {
                label: "Explore or Exploit?",
                type: "decision",
                branches: [
                    {
                        label: "Explore",
                        path: {
                            label: "Random Action",
                            type: "action",
                            next: {
                                label: "Receive Reward",
                                type: "action",
                                next: {
                                    label: "Update Q-Table",
                                    type: "action",
                                    next: { label: "Next State", type: "action", loop: true }
                                }
                            }
                        }
                    },
                    {
                        label: "Exploit",
                        path: {
                            label: "Best Action (Policy)",
                            type: "action",
                            next: {
                                label: "Receive Reward",
                                type: "action",
                                next: {
                                    label: "Update Q-Table",
                                    type: "action",
                                    next: { label: "Next State", type: "action", loop: true }
                                }
                            }
                        }
                    }
                ]
            }
        }
    },
    "Transformer Architecture": {
        code: `graph TB
    A[Input Tokens] --> B[Token Embedding]
    B --> C[Positional Encoding]
    C --> D[Multi-Head Attention]
    D --> E[Add & Normalize]
    E --> F[Feed Forward Network]
    F --> G[Add & Normalize]
    G --> H{More Layers?}
    H -->|Yes| D
    H -->|No| I[Output Layer]
    I --> J[Softmax]
    J --> K[Prediction]`,
        source: "mermaid"
    },
    "RAG (Retrieval Augmented Generation)": {
        code: `graph LR
    A[User Query] --> B[Embed Query]
    B --> C[Vector Search]
    C --> D[Retrieve Top-K Docs]
    D --> E[Rank by Relevance]
    E --> F[Build Context]
    F --> G[Prompt LLM]
    G --> H[Generate Response]
    H --> I[Cite Sources]
    I --> J[Return to User]`,
        source: "mermaid"
    },
    "Agent Loop": {
        code: `graph TB
    A[Task Input] --> B[Observe Environment]
    B --> C[LLM Reasoning]
    C --> D{Need Tool?}
    D -->|Yes| E[Select Tool]
    D -->|No| F[Direct Answer]
    E --> G[Execute Tool]
    G --> H[Observe Result]
    H --> C
    F --> I[Final Response]`,
        source: "mermaid"
    },
    "RLHF Pipeline": {
        code: `graph TB
    A[Base LLM] --> B[Generate Responses]
    B --> C[Human Ranking]
    C --> D[Train Reward Model]
    D --> E[PPO Training]
    E --> F{Performance?}
    F -->|Good| G[Aligned Model]
    F -->|Poor| H[More Data]
    H --> B`,
        source: "mermaid"
    },
    "Chain of Thought": {
        code: `graph LR
    A[Complex Problem] --> B[Step 1: Break Down]
    B --> C[Step 2: Analyze]
    C --> D[Step 3: Calculate]
    D --> E[Step 4: Verify]
    E --> F[Final Answer]`,
        source: "mermaid"
    }
}

export function parseAIWorkflows() {
    return aiWorkflowsData.map((item, index) => {
        const [title, description, category] = item.split('|')
        return {
            id: `ai-${index}`,
            title,
            description,
            category: category || 'AI Systems',
            type: 'nonlinear'
        }
    })
}
