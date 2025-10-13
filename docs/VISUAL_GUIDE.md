# Visual Guide & Usage Examples

This guide provides visual examples and detailed usage instructions for the Trading Dashboard components.

## Table of Contents

1. [Component Showcase](#component-showcase)
2. [Common Use Cases](#common-use-cases)
3. [Integration Patterns](#integration-patterns)
4. [Styling & Theming](#styling--theming)
5. [Data Flow Diagrams](#data-flow-diagrams)

## Component Showcase

### Equity Curve Component

The `EquityCurve` component displays portfolio value over time with interactive features.

**Basic Usage:**
```tsx
import { EquityCurve } from './components/EquityCurve';

const equityData = [
  { timestamp: new Date('2024-01-01'), value: 10000 },
  { timestamp: new Date('2024-01-02'), value: 10250 },
  { timestamp: new Date('2024-01-03'), value: 10500 },
  // ... more data points
];

function Dashboard() {
  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Portfolio Performance</h2>
      <EquityCurve data={equityData} height={400} />
    </div>
  );
}
```

**Visual Layout:**
```
┌────────────────────────────────────────────────────────┐
│  Portfolio Performance                                  │
├────────────────────────────────────────────────────────┤
│                                                         │
│  12,000 ┤                              ╭─────╮         │
│         │                      ╭───────╯     │         │
│  11,000 ┤              ╭───────╯             │         │
│         │      ╭───────╯                     │         │
│  10,000 ┤──────╯                             ╰─        │
│         │                                              │
│         └──────┬───────┬───────┬───────┬───────┬──    │
│              Jan     Feb     Mar     Apr     May       │
│                                                         │
│  [Hover for details] [Zoom] [Pan]                     │
└────────────────────────────────────────────────────────┘
```

**Advanced Features:**
```tsx
<EquityCurve 
  data={equityData}
  height={400}
  showGrid={true}
  enableZoom={true}
  lineColor="#3b82f6"
  fillColor="rgba(59, 130, 246, 0.1)"
  tooltipFormatter={(value) => `$${value.toLocaleString()}`}
/>
```

### Performance Metrics Component

Display key performance indicators in an organized card layout.

**Basic Usage:**
```tsx
import { PerformanceMetrics } from './components/PerformanceMetrics';

function Dashboard() {
  return (
    <PerformanceMetrics
      sharpeRatio={1.85}
      maxDrawdown={-0.15}
      winRate={0.62}
      profitFactor={2.1}
    />
  );
}
```

**Visual Layout:**
```
┌──────────────┬──────────────┬──────────────┬──────────────┐
│ Sharpe Ratio │ Max Drawdown │   Win Rate   │Profit Factor │
├──────────────┼──────────────┼──────────────┼──────────────┤
│              │              │              │              │
│    1.85      │   -15.0%     │    62.0%     │     2.1      │
│              │              │              │              │
│   ⭐ Good    │  ⚠️ Moderate │   ✅ Good    │   ⭐ Great   │
└──────────────┴──────────────┴──────────────┴──────────────┘
```

**With Custom Formatting:**
```tsx
<PerformanceMetrics
  sharpeRatio={1.85}
  maxDrawdown={-0.15}
  winRate={0.62}
  profitFactor={2.1}
  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
  cardClassName="bg-gradient-to-br from-gray-800 to-gray-900"
/>
```

### Trade Table Component

Interactive table for displaying trade history with sorting and filtering.

**Basic Usage:**
```tsx
import { TradeTable } from './components/TradeTable';

const trades = [
  {
    id: '1',
    symbol: 'AAPL',
    type: 'BUY',
    entryPrice: 150.00,
    exitPrice: 155.00,
    profit: 5.00,
    date: new Date('2024-01-15')
  },
  // ... more trades
];

function Dashboard() {
  const handleSort = (key: keyof Trade) => {
    console.log('Sorting by:', key);
    // Implement sorting logic
  };

  const handleFilter = (filter: string) => {
    console.log('Filtering:', filter);
    // Implement filter logic
  };

  return (
    <TradeTable
      trades={trades}
      onSort={handleSort}
      onFilter={handleFilter}
    />
  );
}
```

**Visual Layout:**
```
┌────────────────────────────────────────────────────────────┐
│  Trade History                       [Search: _____] [↕]   │
├─────┬────────┬──────┬───────┬─────────┬────────┬──────────┤
│ ID  │ Symbol │ Type │ Entry │  Exit   │ Profit │   Date   │
├─────┼────────┼──────┼───────┼─────────┼────────┼──────────┤
│ 001 │  AAPL  │ BUY  │150.00 │ 155.00  │ +5.00  │01/15/24 │
│ 002 │  GOOG  │ SELL │100.00 │  95.00  │ +5.00  │01/20/24 │
│ 003 │  MSFT  │ BUY  │300.00 │ 302.50  │ +2.50  │02/01/24 │
├─────┴────────┴──────┴───────┴─────────┴────────┴──────────┤
│  Showing 3 of 150 trades                     [1] 2 3 ... │
└────────────────────────────────────────────────────────────┘
```

### Strategy Comparison Component

Compare multiple trading strategies side-by-side.

**Basic Usage:**
```tsx
import { StrategyComparison } from './components/StrategyComparison';

const strategies = [
  {
    name: 'Strategy Alpha',
    sharpe: 1.85,
    drawdown: -0.15,
    winRate: 0.62,
    profitFactor: 2.1,
    return: 0.25
  },
  {
    name: 'Strategy Beta',
    sharpe: 1.50,
    drawdown: -0.10,
    winRate: 0.58,
    profitFactor: 1.8,
    return: 0.20
  },
];

function Dashboard() {
  return (
    <StrategyComparison
      strategies={strategies}
      metrics={['sharpe', 'drawdown', 'winRate', 'profitFactor', 'return']}
    />
  );
}
```

**Visual Layout:**
```
┌────────────────────────────────────────────────────────────┐
│  Strategy Comparison                                        │
├─────────────────┬──────────────────┬──────────────────────┤
│                 │  Strategy Alpha  │   Strategy Beta      │
├─────────────────┼──────────────────┼──────────────────────┤
│ Sharpe Ratio    │      1.85 ████   │      1.50 ███        │
│ Max Drawdown    │    -15.0% ███    │    -10.0% ██         │
│ Win Rate        │     62.0% ████   │     58.0% ███        │
│ Profit Factor   │      2.1  █████  │      1.8  ████       │
│ Total Return    │     25.0% █████  │     20.0% ████       │
└─────────────────┴──────────────────┴──────────────────────┘
```

## Common Use Cases

### Use Case 1: Real-Time Strategy Monitoring

Monitor a live trading strategy with WebSocket updates.

```tsx
import { useState, useEffect } from 'react';
import { useWebSocket } from './hooks/useWebSocket';
import { EquityCurve } from './components/EquityCurve';
import { PerformanceMetrics } from './components/PerformanceMetrics';

function LiveMonitor() {
  const [equityData, setEquityData] = useState<EquityPoint[]>([]);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  
  const { data, isConnected } = useWebSocket('wss://api.example.com/ws');

  useEffect(() => {
    if (data) {
      // Update equity curve
      setEquityData(prev => [...prev, {
        timestamp: new Date(data.timestamp),
        value: data.equity
      }]);

      // Update metrics
      setMetrics(data.metrics);
    }
  }, [data]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Live Strategy Monitor</h1>
        <div className={`px-3 py-1 rounded ${
          isConnected ? 'bg-green-500' : 'bg-red-500'
        }`}>
          {isConnected ? '● Connected' : '● Disconnected'}
        </div>
      </div>

      {metrics && (
        <PerformanceMetrics
          sharpeRatio={metrics.sharpe}
          maxDrawdown={metrics.drawdown}
          winRate={metrics.winRate}
          profitFactor={metrics.profitFactor}
        />
      )}

      <div className="bg-gray-800 p-6 rounded-lg">
        <EquityCurve data={equityData} height={400} />
      </div>
    </div>
  );
}
```

**Data Flow:**
```
WebSocket Server → useWebSocket Hook → Component State → UI Update
      ↓                   ↓                   ↓              ↓
   New Data          data object         equityData      Re-render
```

### Use Case 2: Backtesting Results Visualization

Display historical backtest results with comprehensive analysis.

```tsx
import { useState, useEffect } from 'react';
import axios from 'axios';

function BacktestResults({ backtestId }: { backtestId: string }) {
  const [results, setResults] = useState<BacktestData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`/api/backtests/${backtestId}`);
        setResults(response.data);
      } catch (error) {
        console.error('Failed to fetch backtest:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [backtestId]);

  if (loading) return <LoadingSpinner />;
  if (!results) return <ErrorMessage />;

  return (
    <div className="space-y-8">
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Equity Curve</h2>
        <EquityCurve data={results.equityCurve} height={400} />
      </div>

      <PerformanceMetrics {...results.metrics} />

      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Trade History</h2>
        <TradeTable trades={results.trades} />
      </div>
    </div>
  );
}
```

### Use Case 3: Multi-Strategy Portfolio Dashboard

Compare and analyze multiple strategies simultaneously.

```tsx
function PortfolioDashboard() {
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Strategy selector */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Strategies</h2>
          <StrategyList
            strategies={strategies}
            selected={selectedStrategy}
            onSelect={setSelectedStrategy}
          />
        </div>

        {/* Quick stats */}
        <div className="lg:col-span-2">
          <PerformanceMetrics {...calculatePortfolioMetrics(strategies)} />
        </div>
      </div>

      {/* Comparison chart */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <StrategyComparison
          strategies={strategies}
          metrics={['sharpe', 'return', 'drawdown']}
        />
      </div>

      {/* Selected strategy details */}
      {selectedStrategy && (
        <StrategyDetails strategyId={selectedStrategy} />
      )}
    </div>
  );
}
```

## Integration Patterns

### Pattern 1: API Integration with React Query

```tsx
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchStrategy = async (id: string) => {
  const { data } = await axios.get(`/api/strategies/${id}`);
  return data;
};

function StrategyView({ strategyId }: { strategyId: string }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['strategy', strategyId],
    queryFn: () => fetchStrategy(strategyId),
    refetchInterval: 5000, // Refresh every 5 seconds
  });

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;

  return (
    <div>
      <PerformanceMetrics {...data.metrics} />
      <EquityCurve data={data.equityCurve} />
    </div>
  );
}
```

### Pattern 2: Context-Based State Management

```tsx
import { createContext, useContext, useState } from 'react';

interface DashboardContextType {
  strategies: Strategy[];
  selectedStrategy: string | null;
  setSelectedStrategy: (id: string) => void;
  refreshData: () => void;
}

const DashboardContext = createContext<DashboardContextType | null>(null);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null);

  const refreshData = async () => {
    const data = await fetchStrategies();
    setStrategies(data);
  };

  return (
    <DashboardContext.Provider value={{
      strategies,
      selectedStrategy,
      setSelectedStrategy,
      refreshData
    }}>
      {children}
    </DashboardContext.Provider>
  );
}

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) throw new Error('useDashboard must be used within DashboardProvider');
  return context;
};
```

## Styling & Theming

### Custom Theme Configuration

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Brand colors
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
        // Trading-specific colors
        profit: '#10b981',
        loss: '#ef4444',
        neutral: '#6b7280',
      },
      // Custom chart colors
      chart: {
        line: '#3b82f6',
        fill: 'rgba(59, 130, 246, 0.1)',
        grid: '#374151',
      }
    }
  }
}
```

### Dark Mode Implementation

```tsx
function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
        <button
          onClick={toggleTheme}
          className="fixed top-4 right-4 p-2 rounded-lg bg-gray-200 dark:bg-gray-800"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        
        <Dashboard />
      </div>
    </div>
  );
}
```

## Data Flow Diagrams

### Complete Application Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                      User Interface                          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│  │  Equity  │ │ Metrics  │ │  Trades  │ │ Strategy │      │
│  │  Curve   │ │  Cards   │ │  Table   │ │ Compare  │      │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘      │
│       │            │            │            │              │
└───────┼────────────┼────────────┼────────────┼──────────────┘
        │            │            │            │
        └────────────┴────────────┴────────────┘
                         │
                    ┌────▼─────┐
                    │ App State│
                    └────┬─────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
   ┌────▼────┐     ┌────▼────┐     ┌────▼────┐
   │  REST   │     │  WebS   │     │ Local   │
   │  API    │     │  ocket  │     │ Storage │
   └─────────┘     └─────────┘     └─────────┘
```

### WebSocket Data Flow

```
Backend Server                     Frontend App
     │                                  │
     │    1. Client connects            │
     │◄─────────────────────────────────│
     │                                  │
     │    2. Send welcome message       │
     ├─────────────────────────────────►│
     │                                  │
     │    3. Client subscribes          │
     │◄─────────────────────────────────│
     │                                  │
     │    4. Stream data updates        │
     ├─────────────────────────────────►│
     │         (every 5s)               │
     ├─────────────────────────────────►│
     │                                  │
     │    5. Client disconnects         │
     │◄─────────────────────────────────│
     │                                  │
```

### Component Re-render Optimization

```
Data Change
     │
     ▼
useMemo / useCallback
     │
     ▼
Props Comparison
     │
     ├──► Changed? ──► Re-render Component
     │
     └──► Same? ──► Skip Re-render
```

---

## Tips for Best Results

1. **Performance**: Use `useMemo` and `useCallback` for expensive calculations
2. **Data Freshness**: Implement proper cache invalidation strategies
3. **Error Handling**: Always wrap API calls in try-catch blocks
4. **Loading States**: Show loading indicators during data fetches
5. **Empty States**: Handle empty data gracefully with friendly messages
6. **Responsive Design**: Test on various screen sizes
7. **Accessibility**: Ensure keyboard navigation and screen reader support

For more examples and patterns, check the [examples/](../examples/) directory.
