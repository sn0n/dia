#!/usr/bin/env node

/**
 * AI Diagram Generator
 *
 * Generates custom diagrams for gaps in our library
 * These are marked with ⭐ AI Generated
 */

import { writeFileSync } from 'fs'
import { join } from 'path'

interface DiagramExample {
  title: string
  description: string
  source: string
  category: string
  type: string
  code: string
  tags: string[]
  aiGenerated: boolean
}

console.log('🤖 Generating AI Diagrams...\n')

// Custom Agentic DevOps Diagrams
const agenticDevOpsDiagrams: DiagramExample[] = [
  {
    title: 'AI-Powered CI/CD with Auto-Healing ⭐',
    description: 'Autonomous CI/CD pipeline with AI-driven testing and auto-healing capabilities',
    source: 'mermaid',
    category: 'DevOps',
    type: 'nonlinear',
    code: `graph TB
    A[Code Push] --> B[AI Code Review]
    B --> C{Quality Check}
    C -->|Pass| D[Build]
    C -->|Fail| E[Auto-Fix Suggestions]
    E --> A
    D --> F[AI Test Generation]
    F --> G[Run Tests]
    G --> H{Tests Pass?}
    H -->|No| I[AI Debug & Fix]
    I --> D
    H -->|Yes| J[Deploy]
    J --> K[Monitor]
    K --> L{Anomaly?}
    L -->|Yes| M[Auto-Rollback]
    L -->|No| N[Success]
    M --> O[AI Root Cause]
    O --> A`,
    tags: ['devops', 'ai', 'automation', 'ci-cd', 'agentic'],
    aiGenerated: true
  },
  {
    title: 'Self-Optimizing Infrastructure ⭐',
    description: 'Infrastructure that autonomously optimizes based on load patterns',
    source: 'mermaid',
    category: 'DevOps',
    type: 'nonlinear',
    code: `graph TB
    A[Load Balancer] --> B[AI Load Predictor]
    B --> C{Scale Needed?}
    C -->|Up| D[Auto-Scale Up]
    C -->|Down| E[Auto-Scale Down]
    C -->|Optimal| F[Monitor]
    D --> G[Provision Resources]
    E --> H[Deallocate Resources]
    G --> I[Cost Optimizer]
    H --> I
    I --> J[Performance Analyzer]
    J --> K{Optimize?}
    K -->|Yes| L[AI Configuration Tuning]
    K -->|No| F
    L --> F
    F --> B`,
    tags: ['devops', 'ai', 'auto-scaling', 'optimization', 'agentic'],
    aiGenerated: true
  },
  {
    title: 'Intelligent Deployment Router ⭐',
    description: 'AI agent routes deployments based on risk assessment and canary analysis',
    source: 'mermaid',
    category: 'DevOps',
    type: 'nonlinear',
    code: `graph LR
    A[New Version] --> B[AI Risk Assessment]
    B --> C{Risk Level}
    C -->|Low| D[Full Deploy]
    C -->|Medium| E[Canary 10%]
    C -->|High| F[Manual Review]
    E --> G[AI Monitor Metrics]
    G --> H{Success?}
    H -->|Yes| I[Canary 50%]
    H -->|No| J[Auto-Rollback]
    I --> K[AI Monitor]
    K --> L{Success?}
    L -->|Yes| D
    L -->|No| J
    D --> M[Production]
    J --> N[Alert + Report]`,
    tags: ['devops', 'ai', 'deployment', 'canary', 'agentic'],
    aiGenerated: true
  },
  {
    title: 'Autonomous Security Remediation ⭐',
    description: 'Security system that detects and autonomously remediates vulnerabilities',
    source: 'mermaid',
    category: 'DevOps',
    type: 'nonlinear',
    code: `graph TB
    A[Security Scan] --> B[AI Threat Detection]
    B --> C{Severity}
    C -->|Critical| D[Auto-Patch]
    C -->|High| E[AI Remediation Plan]
    C -->|Medium| F[Schedule Fix]
    C -->|Low| G[Log Only]
    D --> H[Test Patch]
    H --> I{Safe?}
    I -->|Yes| J[Deploy Fix]
    I -->|No| K[Escalate]
    E --> L[Generate PR]
    L --> M[AI Code Review]
    M --> N[Auto-Merge]
    N --> J
    J --> O[Verify Fix]
    O --> P[Update Documentation]`,
    tags: ['devops', 'security', 'ai', 'auto-remediation', 'agentic'],
    aiGenerated: true
  },
  {
    title: 'Multi-Agent Incident Response ⭐',
    description: 'Coordinated AI agents handling incident detection, diagnosis, and resolution',
    source: 'mermaid',
    category: 'DevOps',
    type: 'nonlinear',
    code: `graph TB
    A[Alert] --> B[Triage Agent]
    B --> C[Detection Agent]
    C --> D{Incident Type}
    D -->|Performance| E[Perf Agent]
    D -->|Security| F[Security Agent]
    D -->|Availability| G[HA Agent]
    E --> H[Diagnose]
    F --> H
    G --> H
    H --> I[Root Cause Agent]
    I --> J{Can Auto-Fix?}
    J -->|Yes| K[Remediation Agent]
    J -->|No| L[Escalation Agent]
    K --> M[Apply Fix]
    M --> N[Validation Agent]
    N --> O{Fixed?}
    O -->|Yes| P[Documentation Agent]
    O -->|No| L
    L --> Q[Human Team]
    P --> R[Post-Mortem Agent]`,
    tags: ['devops', 'ai', 'incident-response', 'multi-agent', 'agentic'],
    aiGenerated: true
  }
]

// Gap-filling diagrams for missing categories
const gapFillingDiagrams: DiagramExample[] = [
  {
    title: 'OAuth 2.0 Authorization Code Flow ⭐',
    description: 'Complete OAuth 2.0 authorization code flow with PKCE',
    source: 'mermaid',
    category: 'Authentication',
    type: 'linear',
    code: `sequenceDiagram
    participant User
    participant Client
    participant AuthServer
    participant ResourceServer

    User->>Client: Click Login
    Client->>Client: Generate PKCE
    Client->>AuthServer: Authorization Request + Code Challenge
    AuthServer->>User: Login Page
    User->>AuthServer: Credentials
    AuthServer->>User: Authorization Code
    User->>Client: Code
    Client->>AuthServer: Token Request + Code Verifier
    AuthServer->>Client: Access Token + Refresh Token
    Client->>ResourceServer: Request + Access Token
    ResourceServer->>Client: Protected Resource`,
    tags: ['authentication', 'oauth', 'security', 'pkce'],
    aiGenerated: true
  },
  {
    title: 'Event-Driven Saga Pattern ⭐',
    description: 'Distributed transaction handling using saga pattern with compensating transactions',
    source: 'mermaid',
    category: 'Architecture',
    type: 'nonlinear',
    code: `graph TB
    A[Order Service] --> B{Create Order}
    B -->|Success| C[Payment Service]
    B -->|Fail| D[Order Failed]
    C --> E{Process Payment}
    E -->|Success| F[Inventory Service]
    E -->|Fail| G[Compensate Order]
    F --> H{Reserve Items}
    H -->|Success| I[Shipping Service]
    H -->|Fail| J[Compensate Payment]
    I --> K{Create Shipment}
    K -->|Success| L[Order Complete]
    K -->|Fail| M[Compensate Inventory]
    J --> G
    M --> J
    G --> D`,
    tags: ['saga', 'microservices', 'distributed', 'compensation'],
    aiGenerated: true
  },
  {
    title: 'Machine Learning Pipeline ⭐',
    description: 'End-to-end ML pipeline from data ingestion to model serving',
    source: 'mermaid',
    category: 'Machine Learning',
    type: 'linear',
    code: `graph LR
    A[Data Sources] --> B[Data Ingestion]
    B --> C[Data Validation]
    C --> D[Feature Engineering]
    D --> E[Data Split]
    E --> F[Model Training]
    F --> G[Model Evaluation]
    G --> H{Meets Threshold?}
    H -->|No| I[Hyperparameter Tuning]
    I --> F
    H -->|Yes| J[Model Registry]
    J --> K[Model Serving]
    K --> L[Monitoring]
    L --> M{Drift Detected?}
    M -->|Yes| N[Trigger Retraining]
    M -->|No| K
    N --> B`,
    tags: ['ml', 'mlops', 'pipeline', 'data-science'],
    aiGenerated: true
  },
  {
    title: 'WebSocket Real-time Communication ⭐',
    description: 'WebSocket connection lifecycle and message flow',
    source: 'mermaid',
    category: 'Communication',
    type: 'linear',
    code: `sequenceDiagram
    participant Client
    participant Server
    participant MessageQueue

    Client->>Server: HTTP Upgrade Request
    Server->>Client: 101 Switching Protocols
    Note over Client,Server: WebSocket Connection Established

    loop Message Exchange
        Client->>Server: Send Message
        Server->>MessageQueue: Process
        MessageQueue->>Server: Response
        Server->>Client: Push Update
    end

    alt Heartbeat
        Client->>Server: Ping
        Server->>Client: Pong
    end

    Client->>Server: Close Connection
    Server->>Client: Close Acknowledgment`,
    tags: ['websocket', 'real-time', 'communication', 'protocol'],
    aiGenerated: true
  },
  {
    title: 'Cache Invalidation Strategy ⭐',
    description: 'Multi-level cache with intelligent invalidation',
    source: 'mermaid',
    category: 'Caching',
    type: 'nonlinear',
    code: `graph TB
    A[Request] --> B{L1 Cache Hit?}
    B -->|Yes| C[Return from L1]
    B -->|No| D{L2 Cache Hit?}
    D -->|Yes| E[Return from L2]
    D -->|No| F{L3 Cache Hit?}
    F -->|Yes| G[Return from L3]
    F -->|No| H[Database Query]
    H --> I[Update L3]
    I --> J[Update L2]
    J --> K[Update L1]
    K --> L[Return Data]
    E --> K
    G --> J

    M[Data Update] --> N[Invalidate L1]
    N --> O[Invalidate L2]
    O --> P[Invalidate L3]
    P --> Q[Update DB]`,
    tags: ['caching', 'performance', 'invalidation', 'multi-level'],
    aiGenerated: true
  },
  {
    title: 'GraphQL Resolver Chain ⭐',
    description: 'GraphQL query resolution with dataloader batching',
    source: 'mermaid',
    category: 'API',
    type: 'linear',
    code: `graph LR
    A[GraphQL Query] --> B[Parse]
    B --> C[Validate]
    C --> D[Execute]
    D --> E[Root Resolver]
    E --> F[Field Resolvers]
    F --> G{DataLoader}
    G --> H[Batch Requests]
    H --> I[Database]
    I --> J[Cache Results]
    J --> K[Resolve Fields]
    K --> L[Format Response]
    L --> M[Return JSON]`,
    tags: ['graphql', 'api', 'dataloader', 'resolver'],
    aiGenerated: true
  }
]

const allAIDiagrams = [...agenticDevOpsDiagrams, ...gapFillingDiagrams]

// Save to JSON
const outputPath = join(process.cwd(), 'scraped-data', 'ai-generated-examples.json')
writeFileSync(outputPath, JSON.stringify(allAIDiagrams, null, 2))

console.log(`✅ Generated ${allAIDiagrams.length} AI diagrams:`)
console.log(`   - Agentic DevOps: ${agenticDevOpsDiagrams.length}`)
console.log(`   - Gap Filling: ${gapFillingDiagrams.length}`)
console.log(`   - Saved to: ${outputPath}\n`)

// Show summary
console.log('📊 Categories covered:')
const categories = new Set(allAIDiagrams.map(d => d.category))
categories.forEach(cat => console.log(`   - ${cat}`))
