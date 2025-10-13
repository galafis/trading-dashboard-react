# Architecture Diagram

## System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                     Trading Dashboard Frontend                       │
│                         (React + TypeScript)                         │
└─────────────────────────────────────────────────────────────────────┘
                                   │
                    ┌──────────────┴──────────────┐
                    │                             │
            ┌───────▼──────┐              ┌──────▼──────┐
            │   REST API   │              │  WebSocket  │
            │ (HTTP/HTTPS) │              │   (ws://)   │
            └───────┬──────┘              └──────┬──────┘
                    │                             │
                    └──────────────┬──────────────┘
                                   │
                    ┌──────────────▼──────────────┐
                    │     Backend Server          │
                    │   (Flask/Node.js/Django)    │
                    └──────────────┬──────────────┘
                                   │
                    ┌──────────────▼──────────────┐
                    │     Data Sources            │
                    │  - Trading API              │
                    │  - Database                 │
                    │  - Historical Data          │
                    └─────────────────────────────┘
```

## Component Architecture

```
┌───────────────────────────────────────────────────────────────┐
│                           App.tsx                              │
│  - Main application component                                  │
│  - Theme management                                            │
│  - WebSocket connection                                        │
│  - State management                                            │
└────────────┬──────────────────────────────────────────────────┘
             │
    ┌────────┴────────┬────────────┬────────────┐
    │                 │            │            │
┌───▼───────┐  ┌──────▼──────┐ ┌──▼────────┐ ┌▼─────────────┐
│ Equity    │  │ Performance │ │  Trade    │ │  Strategy    │
│ Curve     │  │  Metrics    │ │  Table    │ │  Comparison  │
└───────────┘  └─────────────┘ └───────────┘ └──────────────┘
```

## Data Flow

```
┌─────────────────┐
│   WebSocket     │◄────────── Real-time updates
│   Connection    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   State Update  │
│   (useState)    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Component     │◄────────── Props
│   Re-render     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Chart Update  │
│   (Recharts)    │
└─────────────────┘
```

## Hook Architecture

```
┌──────────────────────────────────────────────┐
│             Custom Hooks                      │
├──────────────────────────────────────────────┤
│                                               │
│  ┌─────────────────┐  ┌──────────────────┐  │
│  │  useWebSocket   │  │    useTheme      │  │
│  │                 │  │                  │  │
│  │  - Connect      │  │  - Toggle theme  │  │
│  │  - Disconnect   │  │  - Persist       │  │
│  │  - Data state   │  │  - Apply styles  │  │
│  │  - Error handle │  │                  │  │
│  └─────────────────┘  └──────────────────┘  │
│                                               │
└──────────────────────────────────────────────┘
```

## Technology Stack

```
Frontend Layer
├── React 18         (UI Framework)
├── TypeScript 5     (Type Safety)
├── TailwindCSS 3    (Styling)
├── Recharts 2.12    (Charts)
└── Axios            (HTTP Client)

Development Tools
├── Vite 5           (Build Tool)
├── Jest             (Testing)
├── ESLint           (Linting)
└── Prettier         (Formatting)

Deployment
├── Vercel           (Primary)
├── Netlify          (Alternative)
├── Docker           (Containerization)
└── AWS S3/CloudFront (Static Hosting)
```

## State Management

```
┌─────────────────────────────────────────────┐
│          Application State                   │
├─────────────────────────────────────────────┤
│                                              │
│  equityData: EquityPoint[]                  │
│  trades: Trade[]                             │
│  strategies: StrategyPerformance[]           │
│  theme: 'light' | 'dark'                    │
│  wsConnected: boolean                        │
│  wsData: any                                 │
│                                              │
└─────────────────────────────────────────────┘
```

## Component Props Flow

```
App (Root)
│
├─► PerformanceMetrics
│   ├── sharpeRatio: number
│   ├── maxDrawdown: number
│   ├── winRate: number
│   └── profitFactor: number
│
├─► EquityCurve
│   ├── data: EquityPoint[]
│   └── height: number
│
├─► TradeTable
│   ├── trades: Trade[]
│   ├── onSort: (key) => void
│   └── onFilter: (filter) => void
│
└─► StrategyComparison
    ├── strategies: StrategyPerformance[]
    └── metrics: string[]
```

## Testing Strategy

```
Unit Tests (Jest + Testing Library)
├── Components
│   ├── EquityCurve.test.tsx
│   ├── PerformanceMetrics.test.tsx
│   ├── TradeTable.test.tsx
│   └── StrategyComparison.test.tsx
│
├── Hooks
│   ├── useWebSocket.test.ts
│   └── useTheme.test.ts
│
└── Utils
    └── calculations.test.ts

Coverage: 100% (40 tests passing)
```

## Build & Deployment Flow

```
┌─────────────┐
│  Developer  │
│   Commits   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Git Push   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  CI/CD      │
│  (GitHub    │
│  Actions)   │
└──────┬──────┘
       │
       ├─► Run Tests
       ├─► Run Linter
       ├─► Type Check
       ├─► Build
       │
       ▼
┌─────────────┐
│  Deploy to  │
│  Platform   │
└─────────────┘
```

## Security Considerations

```
Frontend Security
├── Input Validation
├── XSS Prevention
├── CORS Configuration
├── Secure WebSocket (wss://)
├── Environment Variables
└── Content Security Policy

Backend Security
├── Authentication
├── Rate Limiting
├── API Key Management
├── Data Validation
└── Error Handling
```
