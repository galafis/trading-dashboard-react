import React from 'react';
import { StrategyPerformance } from '../types/trading';

interface StrategyComparisonProps {
  strategies: StrategyPerformance[];
  metrics: Array<keyof StrategyPerformance>;
}

export const StrategyComparison: React.FC<StrategyComparisonProps> = ({
  strategies,
  metrics,
}) => {
  return (
    <div className="strategy-comparison-container">
      <h3 className="text-xl font-bold mb-4">Strategy Comparison</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 rounded-lg shadow">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">Strategy</th>
              {metrics.map((metric) => (
                <th key={metric as string} className="px-4 py-2 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                  {metric.charAt(0).toUpperCase() + metric.slice(1)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {strategies.map((strategy) => (
              <tr key={strategy.name}>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-200">{strategy.name}</td>
                {metrics.map((metric) => (
                  <td key={`${strategy.name}-${metric as string}`} className="px-4 py-2 whitespace-nowrap text-sm text-gray-200">
                    {typeof strategy[metric] === 'number' ? (strategy[metric] as number).toFixed(2) : strategy[metric]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

