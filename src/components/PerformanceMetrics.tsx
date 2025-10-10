import React from 'react';

interface PerformanceMetricsProps {
  sharpeRatio: number;
  maxDrawdown: number;
  winRate: number;
  profitFactor: number;
}

export const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({
  sharpeRatio,
  maxDrawdown,
  winRate,
  profitFactor,
}) => {
  return (
    <div className="performance-metrics-container grid grid-cols-2 gap-4">
      <div className="metric-card p-4 bg-gray-800 rounded-lg shadow">
        <h4 className="text-lg font-semibold">Sharpe Ratio</h4>
        <p className="text-2xl text-blue-400">{sharpeRatio.toFixed(2)}</p>
      </div>
      <div className="metric-card p-4 bg-gray-800 rounded-lg shadow">
        <h4 className="text-lg font-semibold">Max Drawdown</h4>
        <p className="text-2xl text-red-400">{(maxDrawdown * 100).toFixed(2)}%</p>
      </div>
      <div className="metric-card p-4 bg-gray-800 rounded-lg shadow">
        <h4 className="text-lg font-semibold">Win Rate</h4>
        <p className="text-2xl text-green-400">{(winRate * 100).toFixed(2)}%</p>
      </div>
      <div className="metric-card p-4 bg-gray-800 rounded-lg shadow">
        <h4 className="text-lg font-semibold">Profit Factor</h4>
        <p className="text-2xl text-purple-400">{profitFactor.toFixed(2)}</p>
      </div>
    </div>
  );
};

