/**
 * Trading data types
 */

export interface EquityPoint {
  timestamp: Date;
  value: number;
}

export interface Trade {
  id: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  entryPrice: number;
  exitPrice: number;
  profit: number;
  date: Date;
}

export interface StrategyPerformance {
  name: string;
  sharpe: number;
  drawdown: number;
  winRate: number;
  profitFactor: number;
  return: number;
  // Add other relevant metrics as needed
}

// Keeping the original PerformanceMetrics and Strategy interfaces for now, 
// as they might be used elsewhere or represent a different level of abstraction.
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

