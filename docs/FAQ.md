# Frequently Asked Questions (FAQ)

## General Questions

### What is Trading Dashboard React?

Trading Dashboard React is a modern, production-ready dashboard for visualizing trading strategy performance. It's built with React 18, TypeScript, and provides real-time data visualization through WebSocket connections.

### Who should use this dashboard?

- **Quantitative Traders**: Monitor algorithmic trading strategies
- **Portfolio Managers**: Track multiple strategies simultaneously
- **Researchers**: Analyze and compare strategy variations
- **Backtesting Users**: Visualize historical performance data
- **Trading Firms**: Display performance metrics to stakeholders

### Is it free to use?

Yes! This project is licensed under the MIT License, which means you can use it for personal or commercial projects, modify it, and distribute it freely.

## Technical Questions

### What are the system requirements?

- **Node.js**: >= 18.0.0
- **npm**: >= 9.0.0
- **Modern Browser**: Chrome, Firefox, Safari, or Edge (latest versions)
- **Disk Space**: ~500MB for dependencies
- **Memory**: Minimum 4GB RAM recommended

### Does it work with my backend?

Yes! The dashboard is backend-agnostic. It works with:
- Python (Flask, Django, FastAPI)
- Node.js (Express, Nest.js)
- Java (Spring Boot)
- Any backend that can provide REST APIs and WebSocket connections

See the `examples/` directory for integration examples.

### Can I use this without a backend?

Yes! The dashboard includes sample data and works standalone. However, for real-time data and persistence, you'll need a backend.

### What data formats are supported?

The dashboard expects JSON data with the following structures:

**Equity Data:**
```typescript
{
  timestamp: Date | string,
  value: number
}
```

**Trade Data:**
```typescript
{
  id: string,
  symbol: string,
  type: 'BUY' | 'SELL',
  entryPrice: number,
  exitPrice: number,
  profit: number,
  date: Date | string
}
```

**Strategy Performance:**
```typescript
{
  name: string,
  sharpe: number,
  drawdown: number,
  winRate: number,
  profitFactor: number,
  return: number
}
```

## Installation & Setup

### How do I install the dashboard?

```bash
# Clone the repository
git clone https://github.com/galafis/trading-dashboard-react.git
cd trading-dashboard-react

# Install dependencies
npm install

# Start development server
npm run dev
```

### Why do I get node_modules errors?

Try these steps:
1. Delete `node_modules` and `package-lock.json`
2. Run `npm install` again
3. Ensure you're using Node.js >= 18.0.0

### How do I fix TypeScript errors?

```bash
# Run type checking
npm run type-check

# Common issues:
# - Missing type definitions: npm install @types/[package-name]
# - Outdated types: npm update
```

### The build fails with memory errors. What should I do?

Increase Node.js memory limit:
```bash
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

## Usage Questions

### How do I connect to my WebSocket server?

Update the WebSocket URL in `App.tsx`:

```typescript
const { data: wsData, isConnected: wsConnected } = useWebSocket('ws://your-server.com:8000/ws');
```

For production, use secure WebSocket (wss://):
```typescript
const wsUrl = process.env.VITE_WS_URL || 'wss://your-server.com/ws';
const { data: wsData, isConnected: wsConnected } = useWebSocket(wsUrl);
```

### How do I add custom metrics?

1. Add the metric to your `StrategyPerformance` type in `src/types/trading.ts`
2. Update the `PerformanceMetrics` component to display it
3. Add calculation logic in `src/utils/calculations.ts` if needed

Example:
```typescript
// types/trading.ts
export interface StrategyPerformance {
  // ... existing fields
  calmarRatio?: number;
}

// components/PerformanceMetrics.tsx
<div className="metric-card">
  <span>Calmar Ratio</span>
  <span>{calmarRatio?.toFixed(2)}</span>
</div>
```

### How do I customize the charts?

The charts use Recharts. You can customize colors, styles, and behavior:

```typescript
<EquityCurve 
  data={equityData}
  height={400}
  showGrid={true}
  enableZoom={true}
  lineColor="#3b82f6"
  backgroundColor="#1f2937"
/>
```

See the Recharts documentation for more options: https://recharts.org/

### How do I add more strategies to compare?

Simply add more strategy objects to the array:

```typescript
const strategies: StrategyPerformance[] = [
  { name: 'Strategy Alpha', ... },
  { name: 'Strategy Beta', ... },
  { name: 'Strategy Gamma', ... },
  { name: 'Strategy Delta', ... }, // Add more here
];
```

### Can I export data to CSV?

Yes! Add the export functionality:

```typescript
const exportToCSV = (data: Trade[]) => {
  const csv = data.map(row => Object.values(row).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'trades.csv';
  a.click();
};
```

## Customization

### How do I change the theme colors?

Edit `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#your-color',
        success: '#your-color',
        danger: '#your-color',
      },
    },
  },
}
```

### How do I add a light/dark mode toggle?

The dashboard already includes a theme toggle! The `useTheme` hook manages this automatically.

### Can I add more pages/routes?

Yes! Install React Router:

```bash
npm install react-router-dom
```

Then set up routing:

```typescript
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/strategy/:id" element={<StrategyDetail />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}
```

## Deployment

### How do I deploy to Vercel?

```bash
# Install Vercel CLI
npm install -g vercel

# Build the project
npm run build

# Deploy
vercel --prod
```

Or connect your GitHub repository to Vercel for automatic deployments.

### How do I deploy to Netlify?

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build the project
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

### How do I deploy with Docker?

```bash
# Build Docker image
docker build -t trading-dashboard .

# Run container
docker run -d -p 3000:3000 trading-dashboard
```

### What environment variables do I need?

Create a `.env` file:

```env
VITE_API_URL=https://your-api.com
VITE_WS_URL=wss://your-api.com/ws
VITE_API_KEY=your-api-key-here
```

Access them in your code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

## Performance

### The dashboard is slow. How can I optimize it?

1. **Enable code splitting** (already configured in `vite.config.ts`)
2. **Lazy load components**:
   ```typescript
   const StrategyComparison = lazy(() => import('./components/StrategyComparison'));
   ```
3. **Memoize expensive calculations**:
   ```typescript
   const metrics = useMemo(() => calculateMetrics(data), [data]);
   ```
4. **Limit data points**: Show only the last 100-500 points on charts
5. **Use pagination** for large trade tables

### How do I reduce bundle size?

The current configuration already implements:
- Code splitting for vendor libraries
- Tree shaking for unused code
- Minification in production builds

Additional optimizations:
- Remove unused dependencies
- Use dynamic imports for large libraries
- Enable compression (gzip/brotli) on your server

## Troubleshooting

### WebSocket won't connect

Check these common issues:
1. **CORS**: Ensure your backend allows connections from your frontend domain
2. **Protocol**: Use `ws://` for development, `wss://` for production
3. **Port**: Verify the WebSocket server is running and accessible
4. **Firewall**: Check if port is blocked by firewall

### Charts don't render

Possible causes:
1. **Data format**: Ensure data matches expected types
2. **Browser compatibility**: Update to the latest browser version
3. **Console errors**: Check browser console for specific errors
4. **Recharts version**: Ensure Recharts is installed correctly

### Tests fail

Common fixes:
```bash
# Clear cache
npm test -- --clearCache

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Update snapshots (if using snapshots)
npm test -- -u
```

### Build fails

Try these steps:
1. Clear build cache: `rm -rf dist`
2. Check TypeScript errors: `npm run type-check`
3. Verify all imports are correct
4. Ensure all dependencies are installed

## Contributing

### How can I contribute?

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make your changes
4. Add tests for new functionality
5. Run tests: `npm test`
6. Submit a pull request

See [CONTRIBUTING.md](../CONTRIBUTING.md) for detailed guidelines.

### How do I report bugs?

Open an issue on GitHub with:
- Description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Your environment (OS, Node version, browser)

### How do I request features?

Open an issue on GitHub with:
- Clear description of the feature
- Use case and benefits
- Possible implementation approach
- Examples from other projects (if available)

## License & Support

### What is the MIT License?

The MIT License is a permissive open-source license that allows you to:
- Use the software commercially
- Modify the software
- Distribute the software
- Use it privately

You must include the license and copyright notice.

### Is there commercial support available?

This is an open-source project. For commercial support or custom development, contact the project maintainer.

### Where can I get help?

- **Documentation**: Read the docs in the `docs/` directory
- **Issues**: Search existing GitHub issues
- **Discussions**: Use GitHub Discussions for questions
- **Email**: Contact the author (check GitHub profile)

## Roadmap

### What features are planned?

Planned features include:
- Real-time notifications
- Advanced filtering and search
- Export to PDF reports
- Multi-language support (i18n)
- Mobile app version
- Advanced technical indicators
- Portfolio optimization tools

### Can I suggest features?

Absolutely! Open an issue with the "feature request" label.

### How often is the project updated?

The project is actively maintained. Check the [CHANGELOG.md](../CHANGELOG.md) for update history.

---

## Still have questions?

If your question isn't answered here:
1. Check the [documentation](../README.md)
2. Search [GitHub Issues](https://github.com/galafis/trading-dashboard-react/issues)
3. Open a new issue with the "question" label
4. Join discussions on [GitHub Discussions](https://github.com/galafis/trading-dashboard-react/discussions)
