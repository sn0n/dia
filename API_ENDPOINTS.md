# Dia Static API v1

## Overview
This is a fully static REST API that serves diagram data as pre-generated JSON files. All endpoints are located under `/v1/` and can be accessed without any backend server.

## Base URL
```
https://your-domain.com/v1/
```

## Endpoints

### 📋 Diagrams

#### List All Diagrams
```
GET /v1/diagrams.json
```
Returns all diagrams across all types (linear, non-linear, AI).

**Response:**
```json
{
  "total": 500,
  "types": {
    "linear": 112,
    "non-linear": 235,
    "ai": 51
  },
  "data": [
    {
      "id": "graphql-resolver-chain",
      "title": "GraphQL Resolver Chain",
      "type": "linear",
      "category": "API",
      "description": "GraphQL query resolution with dataloader batching...",
      "slug": "graphql-resolver-chain-diagram",
      "url": "/linear/graphql-resolver-chain-diagram",
      "hasAdvanced": true,
      "source": "mermaid"
    }
  ]
}
```

#### List Linear Diagrams
```
GET /v1/diagrams/linear.json
```

#### List Non-Linear Diagrams
```
GET /v1/diagrams/non-linear.json
```

#### List AI Workflows
```
GET /v1/diagrams/ai.json
```

#### Get Specific Diagram
```
GET /v1/diagrams/{type}/{slug}.json
```
Example: `/v1/diagrams/linear/graphql-resolver-chain.json`

**Response:**
```json
{
  "id": "graphql-resolver-chain",
  "title": "GraphQL Resolver Chain",
  "type": "linear",
  "category": "API",
  "description": "GraphQL query resolution with dataloader batching. This sequential approach provides a clear framework for api scenarios, helping you navigate complexity with confidence.",
  "slug": "graphql-resolver-chain-diagram",
  "url": "/linear/graphql-resolver-chain-diagram",
  "steps": [
    "GraphQL Query",
    "Parse",
    "Validate",
    "Execute",
    "Root Resolver",
    "Field Resolvers",
    "Post-Verify",
    "Batch Requests",
    "Dataloader",
    "Cache Results",
    "Resolve Batch",
    "Format Response",
    "Return JSON"
  ],
  "hasAdvanced": true,
  "advanced": {
    "code": "...",
    "source": "mermaid"
  }
}
```

### 📁 Categories

#### List All Categories
```
GET /v1/categories.json
```

**Response:**
```json
{
  "linear": [
    "API",
    "Agile",
    "Communication",
    "Creativity",
    "Decision Making",
    "DevOps",
    "Diagrams",
    "Learning",
    "Problem Solving",
    "Productivity",
    "Strategy",
    "Thinking"
  ],
  "non-linear": [
    "API",
    "Architecture",
    "Data Visualization",
    "Diagrams",
    "Innovation",
    "Learning",
    "Thinking",
    "Visualization"
  ],
  "ai": [
    "AI Agents",
    "Deep Learning",
    "Deployment",
    "Generative AI",
    "LLM Pattern",
    "MLOps",
    "Optimization",
    "Training"
  ]
}
```

#### Get Diagrams by Category
```
GET /v1/categories/{type}/{category}.json
```
Example: `/v1/categories/linear/devops.json`

**Response:**
```json
{
  "category": "DevOps",
  "type": "linear",
  "count": 5,
  "diagrams": [...]
}
```

### 🔍 Search

#### Search All Diagrams
```
GET /v1/search/index.json
```
Pre-built search index for client-side filtering.

**Response:**
```json
{
  "index": [
    {
      "id": "neural-network-training",
      "title": "Neural Network Training",
      "type": "ai",
      "category": "Deep Learning",
      "keywords": ["neural", "training", "backpropagation", "gradient", "descent"],
      "description": "..."
    }
  ]
}
```

### 📊 Statistics

#### Get Statistics
```
GET /v1/stats.json
```

**Response:**
```json
{
  "total_diagrams": 398,
  "by_type": {
    "linear": 112,
    "non-linear": 235,
    "ai": 51
  },
  "by_category": {
    "linear": { "API": 3, "DevOps": 5, ... },
    "non-linear": { "Architecture": 12, ... },
    "ai": { "Deep Learning": 15, ... }
  },
  "advanced_diagrams": 150,
  "sources": {
    "mermaid": 350,
    "graphviz": 20,
    "wavedrom": 5,
    "offline_notice": 23
  }
}
```

### 🏷️ Tags

#### Get All Tags
```
GET /v1/tags.json
```

**Response:**
```json
{
  "tags": [
    { "name": "AI Agents", "count": 5 },
    { "name": "Deep Learning", "count": 15 },
    { "name": "API", "count": 8 }
  ]
}
```

## File Structure
```
public/
└── v1/
    ├── diagrams.json                    # All diagrams
    ├── diagrams/
    │   ├── linear.json                  # All linear diagrams
    │   ├── non-linear.json              # All non-linear diagrams
    │   ├── ai.json                      # All AI diagrams
    │   ├── linear/
    │   │   ├── graphql-resolver-chain.json
    │   │   ├── oauth-flow.json
    │   │   └── ...
    │   ├── non-linear/
    │   │   ├── event-driven-saga.json
    │   │   └── ...
    │   └── ai/
    │       ├── neural-network-training.json
    │       └── ...
    ├── categories.json                  # All categories
    ├── categories/
    │   ├── linear/
    │   │   ├── api.json
    │   │   ├── devops.json
    │   │   └── ...
    │   ├── non-linear/
    │   │   └── ...
    │   └── ai/
    │       └── ...
    ├── search/
    │   └── index.json                   # Search index
    ├── stats.json                       # Statistics
    └── tags.json                        # All tags
```

## CORS & Headers
Since this is a static site, ensure your hosting provider (Vercel/Netlify/etc.) sets appropriate CORS headers:

```
Access-Control-Allow-Origin: *
Content-Type: application/json
```

## Usage Examples

### JavaScript/TypeScript
```typescript
// Fetch all linear diagrams
const response = await fetch('/v1/diagrams/linear.json')
const data = await response.json()

// Get specific diagram
const diagram = await fetch('/v1/diagrams/ai/neural-network-training.json')
const aiWorkflow = await diagram.json()
```

### cURL
```bash
curl https://your-domain.com/v1/diagrams.json
curl https://your-domain.com/v1/categories/ai/deep-learning.json
```

## Generation
All JSON files are generated via:
```bash
npm run generate:api
```

This script reads the source data and generates all API endpoint files.
