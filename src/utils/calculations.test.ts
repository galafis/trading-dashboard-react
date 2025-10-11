import {
  calculateSharpeRatio,
  calculateMaxDrawdown,
  calculateWinRate,
  calculateProfitFactor,
  calculateTotalReturn,
  calculateVolatility,
  calculatePerformanceMetrics,
  formatCurrency,
  formatPercentage,
} from './calculations';
import { EquityPoint, Trade } from '../types/trading';

describe('calculations', () => {
  describe('calculateSharpeRatio', () => {
    it('should calculate Sharpe ratio correctly', () => {
      const returns = [0.01, 0.02, -0.01, 0.03, 0.01];
      const sharpe = calculateSharpeRatio(returns);
      expect(typeof sharpe).toBe('number');
      expect(sharpe).toBeCloseTo(-0.603, 1);
    });

    it('should return 0 for empty array', () => {
      expect(calculateSharpeRatio([])).toBe(0);
    });

    it('should return 0 for zero standard deviation', () => {
      const returns = [0.01, 0.01, 0.01];
      expect(calculateSharpeRatio(returns)).toBe(0);
    });
  });

  describe('calculateMaxDrawdown', () => {
    it('should calculate maximum drawdown correctly', () => {
      const equityData: EquityPoint[] = [
        { timestamp: new Date('2024-01-01'), value: 10000 },
        { timestamp: new Date('2024-01-02'), value: 11000 },
        { timestamp: new Date('2024-01-03'), value: 9000 },
        { timestamp: new Date('2024-01-04'), value: 9500 },
      ];
      const maxDD = calculateMaxDrawdown(equityData);
      expect(maxDD).toBeCloseTo(-0.1818, 3); // (9000-11000)/11000
    });

    it('should return 0 for empty array', () => {
      expect(calculateMaxDrawdown([])).toBe(0);
    });

    it('should return 0 for always increasing equity', () => {
      const equityData: EquityPoint[] = [
        { timestamp: new Date('2024-01-01'), value: 10000 },
        { timestamp: new Date('2024-01-02'), value: 11000 },
        { timestamp: new Date('2024-01-03'), value: 12000 },
      ];
      expect(calculateMaxDrawdown(equityData)).toBe(0);
    });
  });

  describe('calculateWinRate', () => {
    it('should calculate win rate correctly', () => {
      const trades: Trade[] = [
        { id: '1', symbol: 'AAPL', type: 'BUY', entryPrice: 100, exitPrice: 105, profit: 5, date: new Date() },
        { id: '2', symbol: 'GOOG', type: 'SELL', entryPrice: 200, exitPrice: 195, profit: 5, date: new Date() },
        { id: '3', symbol: 'MSFT', type: 'BUY', entryPrice: 150, exitPrice: 145, profit: -5, date: new Date() },
      ];
      expect(calculateWinRate(trades)).toBeCloseTo(0.6667, 3);
    });

    it('should return 0 for empty array', () => {
      expect(calculateWinRate([])).toBe(0);
    });
  });

  describe('calculateProfitFactor', () => {
    it('should calculate profit factor correctly', () => {
      const trades: Trade[] = [
        { id: '1', symbol: 'AAPL', type: 'BUY', entryPrice: 100, exitPrice: 110, profit: 10, date: new Date() },
        { id: '2', symbol: 'GOOG', type: 'SELL', entryPrice: 200, exitPrice: 205, profit: 5, date: new Date() },
        { id: '3', symbol: 'MSFT', type: 'BUY', entryPrice: 150, exitPrice: 145, profit: -5, date: new Date() },
      ];
      expect(calculateProfitFactor(trades)).toBe(3); // 15/5
    });

    it('should return 0 for empty array', () => {
      expect(calculateProfitFactor([])).toBe(0);
    });

    it('should return Infinity when there are no losses', () => {
      const trades: Trade[] = [
        { id: '1', symbol: 'AAPL', type: 'BUY', entryPrice: 100, exitPrice: 110, profit: 10, date: new Date() },
      ];
      expect(calculateProfitFactor(trades)).toBe(Infinity);
    });

    it('should return 0 when there are no profits', () => {
      const trades: Trade[] = [
        { id: '1', symbol: 'AAPL', type: 'BUY', entryPrice: 100, exitPrice: 95, profit: -5, date: new Date() },
      ];
      expect(calculateProfitFactor(trades)).toBe(0);
    });
  });

  describe('calculateTotalReturn', () => {
    it('should calculate total return correctly', () => {
      const equityData: EquityPoint[] = [
        { timestamp: new Date('2024-01-01'), value: 10000 },
        { timestamp: new Date('2024-01-02'), value: 11000 },
        { timestamp: new Date('2024-01-03'), value: 12000 },
      ];
      expect(calculateTotalReturn(equityData)).toBe(0.2); // (12000-10000)/10000
    });

    it('should return 0 for insufficient data', () => {
      const equityData: EquityPoint[] = [
        { timestamp: new Date('2024-01-01'), value: 10000 },
      ];
      expect(calculateTotalReturn(equityData)).toBe(0);
    });
  });

  describe('calculateVolatility', () => {
    it('should calculate volatility correctly', () => {
      const equityData: EquityPoint[] = [
        { timestamp: new Date('2024-01-01'), value: 10000 },
        { timestamp: new Date('2024-01-02'), value: 10100 },
        { timestamp: new Date('2024-01-03'), value: 10050 },
        { timestamp: new Date('2024-01-04'), value: 10200 },
      ];
      const volatility = calculateVolatility(equityData);
      expect(volatility).toBeGreaterThan(0);
    });

    it('should return 0 for insufficient data', () => {
      const equityData: EquityPoint[] = [
        { timestamp: new Date('2024-01-01'), value: 10000 },
      ];
      expect(calculateVolatility(equityData)).toBe(0);
    });
  });

  describe('calculatePerformanceMetrics', () => {
    it('should calculate all metrics correctly', () => {
      const equityData: EquityPoint[] = [
        { timestamp: new Date('2024-01-01'), value: 10000 },
        { timestamp: new Date('2024-01-02'), value: 10500 },
        { timestamp: new Date('2024-01-03'), value: 11000 },
      ];
      const trades: Trade[] = [
        { id: '1', symbol: 'AAPL', type: 'BUY', entryPrice: 100, exitPrice: 105, profit: 5, date: new Date() },
        { id: '2', symbol: 'GOOG', type: 'SELL', entryPrice: 200, exitPrice: 195, profit: 5, date: new Date() },
      ];

      const metrics = calculatePerformanceMetrics(equityData, trades);
      
      expect(metrics).toHaveProperty('sharpeRatio');
      expect(metrics).toHaveProperty('maxDrawdown');
      expect(metrics).toHaveProperty('winRate');
      expect(metrics).toHaveProperty('profitFactor');
      expect(metrics).toHaveProperty('totalReturn');
      expect(metrics).toHaveProperty('volatility');
      expect(metrics.winRate).toBe(1);
      expect(metrics.totalReturn).toBe(0.1);
    });
  });

  describe('formatCurrency', () => {
    it('should format currency correctly', () => {
      expect(formatCurrency(1234.56)).toBe('$1,234.56');
    });

    it('should handle different currencies', () => {
      const formatted = formatCurrency(1234.56, 'EUR');
      expect(formatted).toContain('1,234.56');
    });
  });

  describe('formatPercentage', () => {
    it('should format percentage correctly', () => {
      expect(formatPercentage(0.1234)).toBe('12.34%');
    });

    it('should respect decimal places', () => {
      expect(formatPercentage(0.123456, 3)).toBe('12.346%');
    });
  });
});
