# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2024-10-13

### Added
- Comprehensive documentation suite
  - Architecture overview with system diagrams (docs/ARCHITECTURE.md)
  - Frequently Asked Questions guide (docs/FAQ.md)
  - Best practices guide (docs/BEST_PRACTICES.md)
- GitHub Actions CI/CD pipeline (.github/workflows/ci.yml)
  - Automated testing on Node.js 18 and 20
  - Security audit integration
  - Build verification
  - Code coverage reporting
- ESLint 9.x configuration (eslint.config.js)
- Prettier configuration for code formatting (.prettierrc)
- Node.js backend example (examples/nodejs-backend-example.ts)
- Enhanced README with:
  - Quick Start section
  - "How It Works" diagrams
  - Roadmap section
  - Performance metrics
  - FAQ section
  - Contributing guidelines
- Package.json improvements:
  - Additional scripts (format, type-check, test:watch, lint:fix)
  - Keywords for npm discoverability
  - Repository, bugs, and homepage URLs
  - Node.js engine requirements

### Changed
- Optimized Vite build configuration
  - Code splitting for react-vendor and chart-vendor
  - Reduced bundle size from 533KB to 141KB + 382KB (chunks)
  - Configured chunk size warning limit
- Updated console.log statements to only run in development mode
- Improved .gitignore to exclude node_modules and coverage from commits
- Enhanced both English and Portuguese README sections

### Fixed
- PostCSS configuration syntax error (changed from ES6 export to CommonJS)
- Console warnings in production builds
- Bundle size optimization

### Performance
- Bundle size reduced by ~70% through code splitting
- Lazy loading configuration for vendor libraries
- Optimized chunk distribution

## [1.0.0] - 2024-10-11

### Added
- Initial release of Trading Strategy Dashboard
- Interactive equity curve component with Recharts
- Performance metrics display (Sharpe Ratio, Max Drawdown, Win Rate, Profit Factor)
- Sortable and filterable trade table
- Strategy comparison component for multi-strategy analysis
- Custom hooks for WebSocket integration and theme management
- Comprehensive utility functions for financial calculations
- Full TypeScript support with strict type checking
- Responsive design with TailwindCSS
- Dark mode support with theme toggle
- Jest testing setup with 100% coverage
- Complete documentation and examples
- Bilingual documentation (English and Portuguese)

### Components
- `EquityCurve`: Interactive line chart for portfolio value visualization
- `PerformanceMetrics`: Key performance indicators display
- `TradeTable`: Sortable and filterable trade history
- `StrategyComparison`: Side-by-side strategy comparison

### Hooks
- `useWebSocket`: WebSocket connection management
- `useTheme`: Theme switching (light/dark mode)

### Utilities
- `calculateSharpeRatio`: Sharpe ratio calculation
- `calculateMaxDrawdown`: Maximum drawdown calculation
- `calculateWinRate`: Win rate calculation
- `calculateProfitFactor`: Profit factor calculation
- `calculateTotalReturn`: Total return calculation
- `calculateVolatility`: Volatility calculation
- `calculatePerformanceMetrics`: Complete metrics calculation
- `formatCurrency`: Currency formatting
- `formatPercentage`: Percentage formatting

### Development
- Vite build setup for fast development
- TypeScript configuration with strict mode
- Jest testing framework with @testing-library/react
- Comprehensive test coverage (100% statements, 94.28% branches)
- Python Flask backend example
- Documentation in docs/ directory:
  - API.md: Complete API reference
  - DEPLOYMENT.md: Multi-platform deployment guide
  - TROUBLESHOOTING.md: Problem resolution guide

### Documentation
- Complete installation and usage guide
- Component usage examples
- Hook documentation
- API integration examples
- Deployment guides for Vercel, Netlify, Docker, AWS
- Contributing guidelines
- Security policy

## [Unreleased]

### Planned Features
- Real-time notifications system
- Export to PDF reports
- Advanced filtering and search capabilities
- Multi-language support (i18n)
- Portfolio optimization tools
- Advanced technical indicators
- Mobile app version (React Native)
- Backtesting integration
- Error boundaries for better error handling
- Loading states for async operations
- Improved accessibility (WCAG 2.1 AA compliance)
- Husky pre-commit hooks
- End-to-end testing with Playwright
- Service Worker for PWA support

---

For more details on each release, see the [GitHub Releases](https://github.com/galafis/trading-dashboard-react/releases) page.

### Documentation
- Complete README with installation and usage instructions
- Bilingual documentation (English and Portuguese)
- Contributing guidelines
- Code of Conduct
- Component usage examples
- API integration examples

## [Unreleased]

### Planned Features
- Real-time data streaming integration
- Additional chart types (candlestick, bar charts)
- Export functionality (CSV, PNG)
- More performance metrics (Calmar ratio, Sortino ratio)
- Trade analytics and insights
- Portfolio optimization tools
- Historical data import
- Custom indicator support
- Alert and notification system
- Multi-currency support
- Advanced filtering and search
- Responsive mobile improvements
- Accessibility enhancements

---

[1.0.0]: https://github.com/galafis/trading-dashboard-react/releases/tag/v1.0.0
