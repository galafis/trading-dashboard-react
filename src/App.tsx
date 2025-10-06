import React from 'react';
import { EquityCurve } from './components/EquityCurve';
import { EquityPoint } from './types/trading';
import './App.css';

// Sample data
const sampleEquityData: EquityPoint[] = Array.from({ length: 100 }, (_, i) => ({
  timestamp: new Date(2024, 0, i + 1),
  value: 10000 + Math.random() * 5000 + i * 50
}));

function App() {
  return (
    <div className="App">
      <header className="bg-gray-900 text-white p-6">
        <h1 className="text-3xl font-bold">Trading Strategy Dashboard</h1>
        <p className="text-gray-400 mt-2">Monitor and analyze your trading strategies</p>
      </header>
      
      <main className="container mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-600 text-sm">Sharpe Ratio</h3>
            <p className="text-3xl font-bold text-green-600">1.85</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-600 text-sm">Max Drawdown</h3>
            <p className="text-3xl font-bold text-red-600">-15.2%</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-600 text-sm">Win Rate</h3>
            <p className="text-3xl font-bold text-blue-600">62.5%</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <EquityCurve data={sampleEquityData} height={400} />
        </div>
      </main>
    </div>
  );
}

export default App;
