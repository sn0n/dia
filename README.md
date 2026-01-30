# Dia - Workflow & Diagram Library

A comprehensive, **fully offline-capable** library of 398+ workflow patterns and diagram examples. Built as a 100% static site with a REST API - no backend required!

### 🔗 Links
- **Live Demo:** [dia.ai-prompts.help](https://dia.ai-prompts.help)
- **Repository:** [github.com/sn0n/dia](https://github.com/sn0n/dia)

## ✨ Highlights

- 🎯 **398 Diagrams**: Linear workflows, non-linear patterns, and AI/ML workflows
- 🔌 **100% Offline**: Works in airgapped environments without internet
- 🌐 **Static REST API**: 484 JSON endpoints, pre-generated, backend-free
- 🎨 **Beautiful UI**: Purple/pink AI theme, green/slate classic themes
- 🧠 **AI Workflows**: 51 machine learning and AI patterns with detail pages
- 📊 **Advanced Diagrams**: Mermaid, Graphviz (WASM), and more
- 🚀 **Blazing Fast**: Pure static files, CDN-ready

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Visit http://localhost:5173
```

## 📊 What's Inside

### Diagram Collections

- **112 Linear Workflows**: Step-by-step processes (DevOps, Agile, Productivity, etc.)
- **235 Non-Linear Patterns**: Systems, loops, and complex flows
- **51 AI Workflows**: Deep learning, LLMs, MLOps, AI Agents

### Categories

**Linear & Sequential:**
- Productivity (GTD, Pomodoro, Eisenhower Matrix, Kanban)
- Problem Solving (5 Whys, DMAIC, Fishbone, First Principles)
- Strategy (SWOT, OODA Loop, Blue Ocean, Porter's Five Forces)
- Creativity (Design Thinking, SCAMPER, Six Thinking Hats)
- Learning (Feynman Technique, Spaced Repetition, Zettelkasten)
- DevOps (CI/CD, Deployment Pipelines)
- Diagrams (UML, BPMN, Sequence, Activity)

**Non-Linear & Systemic:**
- Architecture (Microservices, Event-Driven, CQRS, Saga)
- Systems (Feedback Loops, Theory of Constraints)
- Logic (Decision Trees, Binary Search, Fault Tree Analysis)
- Data Visualization (D3.js examples, Network Graphs, Sankey, Treemaps)
- Diagrams (Class, Component, ERD, State Machines)

**AI & Machine Learning:**
- Deep Learning (Neural Networks, CNNs, RNNs, Transformers)
- LLM Patterns (RAG, Few-Shot, Chain of Thought, Prompting)
- MLOps (CI/CD for ML, Feature Stores, Model Monitoring)
- AI Agents (ReAct, Multi-Agent Systems, Reasoning)
- Generative AI (GANs, Diffusion Models)
- Optimization (Pruning, Quantization, Knowledge Distillation)
- Training (Backprop, Gradient Descent, Regularization)
- Deployment (Model Serving, A/B Testing, Shadow Deployment)

## 🎨 Features

### 🎭 Three Beautiful Themes
- **Linear Workflows**: Clean green/slate design
- **Non-Linear Patterns**: Dark purple/zinc theme  
- **AI Workflows**: Vibrant purple/pink gradient theme

### 📱 Interactive UI
- Split-screen landing page
- Searchable diagram collections
- Category-based filtering
- Advanced mode with tree visualizations
- Clickable cards leading to detail pages

### 🖼️ Detail Pages
Each diagram has its own page with:
- Full description and context
- "When to Use" guidelines
- Step-by-step breakdowns
- Advanced diagram visualization
- Category badges and metadata

### 🌐 Static REST API

**484 pre-generated JSON endpoints** serving all diagram data:

```javascript
// Get all diagrams
const diagrams = await fetch('/v1/diagrams.json')

// Get AI workflows
const ai = await fetch('/v1/diagrams/ai.json')

// Get specific diagram
const neuralNet = await fetch('/v1/diagrams/ai/neural-network-training.json')

// Search
const search = await fetch('/v1/search/index.json')

// Statistics
const stats = await fetch('/v1/stats.json')
```

**API Features:**
- 398+ individual diagram endpoints
- Category filtering (by type and category)
- Full-text search index with keywords
- Statistics and analytics
- Tag cloud data
- 100% static - works offline
- CDN-friendly

See [API Documentation](API_ENDPOINTS.md) for complete details.

### 🎯 Diagram Rendering (Offline-First)

**Fully Local Rendering:**
- ✅ **Mermaid** - Flowcharts, sequence diagrams, class diagrams, etc.
- ✅ **Graphviz** - Using @viz-js/viz WASM (no internet needed!)
- ✅ **WaveDrom** - Timing diagrams
- ✅ **Railroad Diagrams** - Syntax diagrams

**Graceful Offline Fallback:**
- PlantUML, ActDiag, SeqDiag, etc. show formatted source code
- Clear "Offline Mode" notices
- Perfect for airgapped environments

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript + Vite 6
- **Styling**: Tailwind CSS 4
- **Routing**: React Router v7
- **Diagram Rendering**: Mermaid v11, Viz.js (Graphviz WASM)
- **Icons**: Custom Lucide React icons
- **Deployment**: 100% static site generation

## 📦 Scripts

```bash
# Development
npm run dev              # Start dev server (http://localhost:5173)

# Building
npm run build            # Build for production
npm run preview          # Preview production build

# API Generation
npm run generate:api     # Generate all 484 JSON API endpoints

# Testing
npm run test:diagrams    # Run Playwright diagram tests (98%+ pass rate)

# Database (Legacy - Not Currently Used)
npm run db:generate      # Generate Prisma client
npm run db:push          # Push schema to database
npm run db:seed          # Seed database
```

## 🌐 API Usage

### Generate API Files

```bash
npm run generate:api
```

This creates 475 files in `public/v1/`:

```
public/v1/
├── diagrams.json                    # All 398 diagrams
├── diagrams/
│   ├── linear.json                  # 112 linear workflows
│   ├── non-linear.json              # 235 non-linear patterns
│   ├── ai.json                      # 51 AI workflows
│   ├── linear/                      # 112 individual files
│   ├── non-linear/                  # 235 individual files
│   └── ai/                          # 51 individual files
├── categories.json                  # Category index
├── categories/
│   ├── linear/                      # Per-category filtering
│   ├── non-linear/
│   └── ai/
├── search/
│   └── index.json                   # Full search index
├── stats.json                       # Statistics
└── tags.json                        # Tag cloud data
```

### Example Usage

```javascript
// Fetch all linear diagrams
const linear = await fetch('/v1/diagrams/linear.json').then(r => r.json())
console.log(`${linear.count} linear workflows`)

// Get specific AI workflow
const react = await fetch('/v1/diagrams/ai/react-pattern.json').then(r => r.json())
console.log(react.title)
console.log(react.steps)
console.log(react.advanced.code) // Mermaid/diagram code

// Search by keyword
const index = await fetch('/v1/search/index.json').then(r => r.json())
const devOps = index.index.filter(d => d.keywords.includes('devops'))

// Get statistics
const stats = await fetch('/v1/stats.json').then(r => r.json())
console.log(`Total: ${stats.total_diagrams}`)
console.log(`Advanced: ${stats.advanced_diagrams}`)
```

### Try the Demo

Visit [dia.ai-prompts.help/api-demo.html](https://dia.ai-prompts.help/api-demo.html) for an interactive API demo!

## 📁 Project Structure

```
Dia/
├── src/
│   ├── components/
│   │   ├── Icon.tsx              # SVG icon system
│   │   └── DiagramRenderer.tsx   # Offline-first diagram rendering
│   ├── pages/
│   │   ├── DiagramDetail.tsx     # Linear/Non-linear detail pages
│   │   ├── AIWorkflows.tsx       # AI workflows listing
│   │   └── AIWorkflowDetail.tsx  # AI workflow detail pages
│   ├── data/
│   │   ├── workflows.ts          # 347 Linear/Non-linear definitions
│   │   ├── ai-workflows.ts       # 51 AI workflow definitions
│   │   └── scraped-diagrams.ts   # Additional diagram examples
│   ├── App.tsx                   # Main app with routing
│   ├── main.tsx                  # Entry point
│   └── index.css                 # Global styles
├── scripts/
│   ├── generate-api.js           # Static API generator
│   └── test-diagrams.ts          # Playwright diagram tests
├── public/
│   ├── v1/                       # Generated API (475 JSON files)
│   └── api-demo.html             # Interactive API demo
├── API_ENDPOINTS.md              # Complete API documentation
├── STATIC_API_SUMMARY.md         # API implementation guide
└── PROJECT_SUMMARY.md            # Detailed project overview
```

## 🚀 Deployment

### Static Hosting (Recommended)

```bash
# Build the site
npm run build

# Generate API endpoints
npm run generate:api
```

Deploy the `dist/` folder to:
- ✅ **Vercel** - Automatic deployments
- ✅ **Netlify** - One-click deploy
- ✅ **GitHub Pages** - Free hosting
- ✅ **Cloudflare Pages** - Global CDN
- ✅ **Any Static Host** - Just upload `dist/`

### CORS Configuration

For API access from external domains, ensure your host sets:

```
Access-Control-Allow-Origin: *
Content-Type: application/json
```

Most modern static hosts (Vercel/Netlify) handle this automatically.

## 🧪 Testing

### Diagram Rendering Tests

```bash
npm run test:diagrams
```

Playwright tests verify:
- ✅ All 398 diagrams render correctly
- ✅ 99.0% success rate (394/398 working)
- ✅ Mermaid, Graphviz, and offline rendering
- ✅ Error handling for unsupported types

### Manual Testing

1. Visit each workflow type (Linear, Non-Linear, AI)
2. Click on diagram cards
3. Verify detail pages load
4. Test search functionality
5. Check category filtering
6. Test API endpoints at `/api-demo.html`

## 🎯 Use Cases

### 1. Learning Resource
Browse 398+ workflow patterns and mental models across productivity, strategy, AI, and more.

### 2. Reference Library
Quick lookup for UML diagrams, system patterns, and AI architectures.

### 3. API for External Apps
Embed diagrams in your own applications using the static JSON API.

### 4. Offline Documentation
Works 100% offline - perfect for airgapped environments or poor connectivity.

### 5. Educational Tool
Teach workflows, algorithms, and AI concepts with visual diagrams.

## 🌟 Key Innovations

### Fully Offline Architecture
- No external API dependencies (removed Kroki)
- Local Mermaid rendering
- Viz.js WASM for Graphviz (runs in browser)
- Graceful degradation for unsupported types

### Static REST API
- 484 pre-generated JSON endpoints
- No backend server required
- Works with static hosting
- CDN-friendly and cacheable
- Perfect for serverless

### Beautiful Detail Pages
- Every diagram has its own page
- Rich descriptions tuned per category
- "When to Use" sections
- Key techniques and concepts
- Consistent theming across type

### AI Workflows Collection
- 51 cutting-edge AI/ML patterns
- From neural network training to deployment
- LLM patterns (RAG, few-shot, prompting)
- MLOps best practices
- Dedicated purple/pink theme

## 🔧 Configuration

### Environment Variables

Create `.env` (optional - database not actively used):

```env
# DATABASE_URL="postgresql://..." # Optional, not required for static site
```

The app works entirely without a database!

## 📚 Documentation

- **[API_ENDPOINTS.md](API_ENDPOINTS.md)** - Complete API reference
- **[STATIC_API_SUMMARY.md](STATIC_API_SUMMARY.md)** - API implementation guide
- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Detailed project overview
- **[public/v1/README.md](public/v1/README.md)** - API quick start

## 🤝 Contributing

### Adding Workflows

Edit data files:

```typescript
// src/data/workflows.ts - Linear/Non-linear
"Workflow Name|Step 1 → Step 2 → Step 3|Category"

// src/data/ai-workflows.ts - AI workflows
"AI Workflow|Step 1 → Step 2|Category"
```

Then regenerate the API:

```bash
npm run generate:api
```

### Adding Advanced Diagrams

For complex diagrams with Mermaid/Graphviz:

```typescript
// In complexWorkflows or aiComplexWorkflows
"Workflow Name": {
  code: `graph TD\n  A --> B`,
  source: "mermaid"
}
```

## 🙏 Acknowledgments

- **Workflow Methodologies**: Various authors and established frameworks
- **Diagram Libraries**: Mermaid.js, Viz.js, WaveDrom
- **UI Inspiration**: Modern productivity and AI tools
- **Icons**: Lucide React

## 📄 License

MIT License - See LICENSE file

## 🔗 Useful Links

- [Mermaid.js Docs](https://mermaid.js.org/)
- [Graphviz](https://graphviz.org/)
- [Viz.js](https://github.com/mdaines/viz.js/)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

**Built with ❤️ for workflow enthusiasts, diagram lovers, and AI practitioners**

Current Status: ✅ **Production Ready** | 398 Diagrams | 99% Test Pass Rate | 100% Offline Capable
