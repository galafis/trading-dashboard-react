import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PerformanceMetrics } from './PerformanceMetrics';

describe('PerformanceMetrics', () => {
  const mockMetrics = {
    sharpeRatio: 1.5,
    maxDrawdown: -0.10,
    winRate: 0.60,
    profitFactor: 2.0,
  };

  it('should render without crashing and display all metrics', () => {
    render(<PerformanceMetrics {...mockMetrics} />);

    expect(screen.getByText('Sharpe Ratio')).toBeInTheDocument();
    expect(screen.getByText('1.50')).toBeInTheDocument();

    expect(screen.getByText('Max Drawdown')).toBeInTheDocument();
    expect(screen.getByText('-10.00%')).toBeInTheDocument();

    expect(screen.getByText('Win Rate')).toBeInTheDocument();
    expect(screen.getByText('60.00%')).toBeInTheDocument();

    expect(screen.getByText('Profit Factor')).toBeInTheDocument();
    expect(screen.getByText('2.00')).toBeInTheDocument();
  });
});

