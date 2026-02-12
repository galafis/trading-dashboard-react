# Trading Strategy Dashboard - Project Overview

## Project Status

The dashboard is functional and includes documentation in English and Portuguese.

## Key Metrics

- **Tests**: 40 tests across 7 suites (all passing)
- **Statement Coverage**: 100%
- **Branch Coverage**: ~94%
- **TypeScript**: Strict mode enabled, no errors
- **Documentation**: English & Portuguese

## Project Structure

```
trading-dashboard-react/
├── Configuration
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── jest.config.cjs
│   ├── .eslintrc.json
│   └── .gitignore
│
├── Documentation
│   ├── README.md
│   ├── CONTRIBUTING.md
│   ├── SECURITY.md
│   ├── docs/
│   │   ├── API.md
│   │   ├── DEPLOYMENT.md
│   │   ├── TROUBLESHOOTING.md
│   │   └── images/
│   │       └── dashboard-main-view.png
│   └── examples/
│       ├── README.md
│       └── python-backend-example.py
│
├── Source Code
│   ├── src/
│   │   ├── components/
│   │   │   ├── EquityCurve.tsx
│   │   │   ├── PerformanceMetrics.tsx
│   │   │   ├── TradeTable.tsx
│   │   │   └── StrategyComparison.tsx
│   │   ├── hooks/
│   │   │   ├── useWebSocket.ts
│   │   │   └── useTheme.ts
│   │   ├── utils/
│   │   │   └── calculations.ts
│   │   ├── types/
│   │   │   └── trading.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── App.css
│   │   └── index.css
│
├── Tests
│   ├── src/components/*.test.tsx (4 files)
│   ├── src/hooks/*.test.ts (2 files)
│   ├── src/utils/*.test.ts (1 file)
│   └── setupTests.ts
│
├── Assets
│   └── public/
│       └── favicon.svg
│
└── Build Output
    └── dist/
```

## Quick Start

```bash
git clone https://github.com/galafis/trading-dashboard-react.git
cd trading-dashboard-react
npm install
```

### Development

```bash
npm run dev          # Start dev server (http://localhost:5173)
npm test            # Run tests
npm test -- --watch # Run tests in watch mode
npm run build       # Build for production
npm run preview     # Preview production build
```

## Features

### Components
- **EquityCurve**: Interactive line chart with Recharts
- **PerformanceMetrics**: Sharpe ratio, drawdown, win rate, profit factor
- **TradeTable**: Sortable, filterable trade history
- **StrategyComparison**: Side-by-side strategy analysis

### Functionality
- **Real-time updates**: WebSocket integration
- **Dark mode**: Theme switching
- **Responsive design**: Mobile-first approach with TailwindCSS
- **Type safety**: Full TypeScript support
- **Memoization**: React.memo and useMemo for performance

## Documentation

### For Users
- [README.md](./README.md) — Installation and usage guide
- [API.md](./docs/API.md) — API endpoints and WebSocket integration
- [DEPLOYMENT.md](./docs/DEPLOYMENT.md) — Deploy to Vercel, Netlify, Docker, AWS

### For Developers
- [CONTRIBUTING.md](./CONTRIBUTING.md) — How to contribute
- [TROUBLESHOOTING.md](./docs/TROUBLESHOOTING.md) — Common issues and solutions
- [examples/](./examples/) — Backend integration examples

### Security
- [SECURITY.md](./SECURITY.md) — Security policy and best practices

## Test Coverage

```
File                     | % Stmts | % Branch | % Funcs | % Lines
-------------------------|---------|----------|---------|----------
All files                |     100 |    94.28 |     100 |     100
 components              |     100 |    83.33 |     100 |     100
  EquityCurve.tsx        |     100 |      100 |     100 |     100
  PerformanceMetrics.tsx |     100 |      100 |     100 |     100
  StrategyComparison.tsx |     100 |       50 |     100 |     100
  TradeTable.tsx         |     100 |      100 |     100 |     100
 hooks                   |     100 |      100 |     100 |     100
  useTheme.ts            |     100 |      100 |     100 |     100
  useWebSocket.ts        |     100 |      100 |     100 |     100
 utils                   |     100 |       96 |     100 |     100
  calculations.ts        |     100 |       96 |     100 |     100
```

7 test suites, 40 tests (all passing).

## Technology Stack

### Frontend
- React 18
- TypeScript 5
- Vite 5
- TailwindCSS 3
- Recharts 2

### Development
- Jest (testing framework)
- Testing Library (React testing utilities)
- ESLint (linting)

### Libraries
- Axios (HTTP client)
- WebSocket API (real-time communication)

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Deployment

Deployment guides available for:
- Vercel
- Netlify
- Docker
- AWS (S3 + CloudFront)
- Any static file host

See [DEPLOYMENT.md](./docs/DEPLOYMENT.md) for details.

## Security

- Security policy documented
- HTTPS recommended for production
- WSS for WebSocket connections
- Environment variables for secrets
- CORS configuration guidance included

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development setup, coding standards, and pull request guidelines.

## License

MIT License — see [LICENSE](./LICENSE).

## Author

**Gabriel Demetrios Lafis**

---

**Version**: 1.0.0
