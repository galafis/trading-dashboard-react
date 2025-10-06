import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { EquityPoint } from '../types/trading';

interface EquityCurveProps {
  data: EquityPoint[];
  height?: number;
  showGrid?: boolean;
  enableZoom?: boolean;
}

export const EquityCurve: React.FC<EquityCurveProps> = ({ 
  data, 
  height = 400, 
  showGrid = true,
  enableZoom = false 
}) => {
  const chartData = data.map(point => ({
    timestamp: point.timestamp.toLocaleDateString(),
    value: point.value
  }));

  return (
    <div className="equity-curve-container">
      <h3 className="text-xl font-bold mb-4">Equity Curve</h3>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={chartData}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" />}
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#3b82f6" 
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
