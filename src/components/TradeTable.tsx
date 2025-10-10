import React from 'react';
import { Trade } from '../types/trading';

interface TradeTableProps {
  trades: Trade[];
  onSort: (key: keyof Trade) => void;
  onFilter: (filter: string) => void;
}

export const TradeTable: React.FC<TradeTableProps> = ({
  trades,
  onSort,
  onFilter,
}) => {
  const [filterText, setFilterText] = React.useState('');

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
    onFilter(event.target.value);
  };

  return (
    <div className="trade-table-container">
      <h3 className="text-xl font-bold mb-4">Trade History</h3>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Filter trades..."
          className="p-2 border rounded w-full bg-gray-700 border-gray-600 text-white"
          value={filterText}
          onChange={handleFilterChange}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 rounded-lg shadow">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                  onClick={() => onSort('id')}>ID</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                  onClick={() => onSort('symbol')}>Symbol</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                  onClick={() => onSort('type')}>Type</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                  onClick={() => onSort('entryPrice')}>Entry Price</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                  onClick={() => onSort('exitPrice')}>Exit Price</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                  onClick={() => onSort('profit')}>Profit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {trades.map((trade) => (
              <tr key={trade.id}>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-200">{trade.id}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-200">{trade.symbol}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-200">{trade.type}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-200">{trade.entryPrice.toFixed(2)}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-200">{trade.exitPrice.toFixed(2)}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-200">{trade.profit.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

