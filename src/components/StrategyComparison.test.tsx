import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { StrategyComparison } from './StrategyComparison';
import { StrategyPerformance } from '../types/trading';

describe('StrategyComparison', () => {
  const mockStrategies: StrategyPerformance[] = [
    { name: 'Strategy A', sharpe: 1.5, drawdown: -0.1, winRate: 0.6, profitFactor: 2.0, return: 0.2 },
    { name: 'Strategy B', sharpe: 1.2, drawdown: -0.08, winRate: 0.55, profitFactor: 1.8, return: 0.15 },
  ];

  const mockMetrics: Array<keyof StrategyPerformance> = ['sharpe', 'drawdown', 'return'];

  it('should render without crashing and display strategy data', () => {
    render(<StrategyComparison strategies={mockStrategies} metrics={mockMetrics} />);

    expect(screen.getByText('Strategy Comparison')).toBeInTheDocument();
    expect(screen.getByText('Strategy A')).toBeInTheDocument();
    expect(screen.getByText('Strategy B')).toBeInTheDocument();
    expect(screen.getByText('Sharpe')).toBeInTheDocument();
    expect(screen.getByText('Drawdown')).toBeInTheDocument();
    expect(screen.getByText('Return')).toBeInTheDocument();
    expect(screen.getByText('1.50')).toBeInTheDocument();
    expect(screen.getByText('-0.10')).toBeInTheDocument();
    expect(screen.getByText('0.20')).toBeInTheDocument();
  });
});

