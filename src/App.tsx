import React, { useState, useEffect } from 'react';
import { EquityCurve } from './components/EquityCurve';
import { PerformanceMetrics } from './components/PerformanceMetrics';
import { TradeTable } from './components/TradeTable';
import { StrategyComparison } from './components/StrategyComparison';
import { useTheme } from './hooks/useTheme';
import { useWebSocket } from './hooks/useWebSocket';
import { EquityPoint, Trade, StrategyPerformance } from './types/trading';
import './App.css';

// Sample Data
const sampleEquityData: EquityPoint[] = Array.from({ length: 100 }, (_, i) => ({
  timestamp: new Date(2024, 0, i + 1),
  value: 10000 + Math.random() * 5000 + i * 50
}));

const sampleTrades: Trade[] = [
  { id: '1', symbol: 'AAPL', type: 'BUY', entryPrice: 150.00, exitPrice: 155.00, profit: 5.00, date: new Date('2024-01-15') },
  { id: '2', symbol: 'GOOG', type: 'SELL', entryPrice: 100.00, exitPrice: 95.00, profit: 5.00, date: new Date('2024-01-20') },
  { id: '3', symbol: 'MSFT', type: 'BUY', entryPrice: 300.00, exitPrice: 302.50, profit: 2.50, date: new Date('2024-02-01') },
  { id: '4', symbol: 'AMZN', type: 'SELL', entryPrice: 140.00, exitPrice: 138.00, profit: 2.00, date: new Date('2024-02-10') },
];

const sampleStrategyPerformance: StrategyPerformance[] = [
  { name: 'Strategy Alpha', sharpe: 1.85, drawdown: -0.15, winRate: 0.62, profitFactor: 2.1, return: 0.25 },
  { name: 'Strategy Beta', sharpe: 1.50, drawdown: -0.10, winRate: 0.58, profitFactor: 1.8, return: 0.20 },
  { name: 'Strategy Gamma', sharpe: 1.20, drawdown: -0.08, winRate: 0.55, profitFactor: 1.5, return: 0.15 },
];

function App() {
  const { theme, toggleTheme } = useTheme();
  const { data: wsData, isConnected: wsConnected } = useWebSocket('ws://localhost:8000/ws');

  const [equityData, setEquityData] = useState<EquityPoint[]>(sampleEquityData);
  const [trades, setTrades] = useState<Trade[]>(sampleTrades);
  const [strategies, setStrategies] = useState<StrategyPerformance[]>(sampleStrategyPerformance);

  // Example of how to use WebSocket data (adjust based on actual data structure)
  useEffect(() => {
    if (wsData) {
      console.log('WebSocket data received:', wsData);
      // Update state based on wsData, e.g., setEquityData, setTrades
    }
  }, [wsData]);

  const handleTradeSort = (key: keyof Trade) => {
    const sortedTrades = [...trades].sort((a, b) => {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    });
    setTrades(sortedTrades);
  };

  const handleTradeFilter = (filter: string) => {
    const filteredTrades = sampleTrades.filter(trade => 
      trade.symbol.toLowerCase().includes(filter.toLowerCase()) ||
      trade.type.toLowerCase().includes(filter.toLowerCase())
    );
    setTrades(filteredTrades);
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <header className="bg-gray-800 text-white p-6 shadow-md flex justify-between items-center">
        <h1 className="text-3xl font-bold">Trading Strategy Dashboard</h1>
        <div className="flex items-center space-x-4">
          <span className={`text-sm ${wsConnected ? 'text-green-400' : 'text-red-400'}`}>
            WebSocket: {wsConnected ? 'Connected' : 'Disconnected'}
          </span>
          <button 
            onClick={toggleTheme}
            className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200"
          >
            Toggle {theme === 'dark' ? 'Light' : 'Dark'} Mode
          </button>
        </div>
      </header>
      
      <main className="container mx-auto p-6 space-y-8">
        <PerformanceMetrics 
          sharpeRatio={sampleStrategyPerformance[0].sharpe}
          maxDrawdown={sampleStrategyPerformance[0].drawdown}
          winRate={sampleStrategyPerformance[0].winRate}
          profitFactor={sampleStrategyPerformance[0].profitFactor}
        />

        <div className="bg-gray-800 p-6 rounded-lg shadow">
          <EquityCurve data={equityData} height={400} />
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow">
          <TradeTable trades={trades} onSort={handleTradeSort} onFilter={handleTradeFilter} />
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow">
          <StrategyComparison 
            strategies={strategies}
            metrics={['sharpe', 'drawdown', 'winRate', 'profitFactor', 'return']}
          />
        </div>
      </main>
    </div>
  );
}

export default App;

