# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
- Jest testing setup with high coverage (96%+)
- Complete documentation and examples

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
- ESLint and TypeScript configuration
- Jest testing framework with @testing-library/react
- Comprehensive test coverage (96.55% statements, 94.28% branches)

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
