/**
 * Trading data types
 */

export interface Trade {
  id: string;
  timestamp: Date;
  symbol: string;
  side: 'BUY' | 'SELL';
  price: number;
  quantity: number;
  pnl: number;
}

export interface EquityPoint {
  timestamp: Date;
  value: number;
}

export interface PerformanceMetrics {
  sharpeRatio: number;
  maxDrawdown: number;
  winRate: number;
  profitFactor: number;
  totalReturn: number;
  volatility: number;
}

export interface Strategy {
  id: string;
  name: string;
  description: string;
  metrics: PerformanceMetrics;
  equity: EquityPoint[];
  trades: Trade[];
}
