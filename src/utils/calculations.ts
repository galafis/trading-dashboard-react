import { EquityPoint, Trade, PerformanceMetrics } from '../types/trading';

/**
 * Calculate Sharpe Ratio
 * @param returns Array of returns
 * @param riskFreeRate Risk-free rate (default 0.02)
 * @returns Sharpe ratio
 */
export const calculateSharpeRatio = (
  returns: number[],
  riskFreeRate: number = 0.02
): number => {
  if (returns.length === 0) return 0;
  
  const avgReturn = returns.reduce((sum, r) => sum + r, 0) / returns.length;
  const variance = returns.reduce((sum, r) => sum + Math.pow(r - avgReturn, 2), 0) / returns.length;
  const stdDev = Math.sqrt(variance);
  
  if (stdDev === 0) return 0;
  
  return (avgReturn - riskFreeRate) / stdDev;
};

/**
 * Calculate Maximum Drawdown
 * @param equityData Array of equity points
 * @returns Maximum drawdown as a decimal (e.g., -0.15 for 15% drawdown)
 */
export const calculateMaxDrawdown = (equityData: EquityPoint[]): number => {
  if (equityData.length === 0) return 0;
  
  let maxDrawdown = 0;
  let peak = equityData[0].value;
  
  equityData.forEach(point => {
    if (point.value > peak) {
      peak = point.value;
    }
    const drawdown = (point.value - peak) / peak;
    if (drawdown < maxDrawdown) {
      maxDrawdown = drawdown;
    }
  });
  
  return maxDrawdown;
};

/**
 * Calculate Win Rate
 * @param trades Array of trades
 * @returns Win rate as a decimal (e.g., 0.65 for 65%)
 */
export const calculateWinRate = (trades: Trade[]): number => {
  if (trades.length === 0) return 0;
  
  const winningTrades = trades.filter(trade => trade.profit > 0).length;
  return winningTrades / trades.length;
};

/**
 * Calculate Profit Factor
 * @param trades Array of trades
 * @returns Profit factor (gross profit / gross loss)
 */
export const calculateProfitFactor = (trades: Trade[]): number => {
  if (trades.length === 0) return 0;
  
  const grossProfit = trades
    .filter(trade => trade.profit > 0)
    .reduce((sum, trade) => sum + trade.profit, 0);
    
  const grossLoss = Math.abs(trades
    .filter(trade => trade.profit < 0)
    .reduce((sum, trade) => sum + trade.profit, 0));
  
  if (grossLoss === 0) return grossProfit > 0 ? Infinity : 0;
  
  return grossProfit / grossLoss;
};

/**
 * Calculate Total Return
 * @param equityData Array of equity points
 * @returns Total return as a decimal (e.g., 0.25 for 25% return)
 */
export const calculateTotalReturn = (equityData: EquityPoint[]): number => {
  if (equityData.length < 2) return 0;
  
  const initialValue = equityData[0].value;
  const finalValue = equityData[equityData.length - 1].value;
  
  return (finalValue - initialValue) / initialValue;
};

/**
 * Calculate Volatility (standard deviation of returns)
 * @param equityData Array of equity points
 * @returns Annualized volatility
 */
export const calculateVolatility = (equityData: EquityPoint[]): number => {
  if (equityData.length < 2) return 0;
  
  const returns: number[] = [];
  for (let i = 1; i < equityData.length; i++) {
    const ret = (equityData[i].value - equityData[i - 1].value) / equityData[i - 1].value;
    returns.push(ret);
  }
  
  const avgReturn = returns.reduce((sum, r) => sum + r, 0) / returns.length;
  const variance = returns.reduce((sum, r) => sum + Math.pow(r - avgReturn, 2), 0) / returns.length;
  
  // Annualize assuming daily data (252 trading days)
  return Math.sqrt(variance * 252);
};

/**
 * Calculate all performance metrics for a strategy
 * @param equityData Array of equity points
 * @param trades Array of trades
 * @returns Complete performance metrics
 */
export const calculatePerformanceMetrics = (
  equityData: EquityPoint[],
  trades: Trade[]
): PerformanceMetrics => {
  const returns = equityData.slice(1).map((point, i) => 
    (point.value - equityData[i].value) / equityData[i].value
  );
  
  return {
    sharpeRatio: calculateSharpeRatio(returns),
    maxDrawdown: calculateMaxDrawdown(equityData),
    winRate: calculateWinRate(trades),
    profitFactor: calculateProfitFactor(trades),
    totalReturn: calculateTotalReturn(equityData),
    volatility: calculateVolatility(equityData),
  };
};

/**
 * Format number as currency
 * @param value Number to format
 * @param currency Currency code (default USD)
 * @returns Formatted currency string
 */
export const formatCurrency = (value: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(value);
};

/**
 * Format number as percentage
 * @param value Number to format (e.g., 0.15 for 15%)
 * @param decimals Number of decimal places (default 2)
 * @returns Formatted percentage string
 */
export const formatPercentage = (value: number, decimals: number = 2): string => {
  return `${(value * 100).toFixed(decimals)}%`;
};
