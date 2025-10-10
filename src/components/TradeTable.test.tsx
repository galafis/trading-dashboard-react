import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TradeTable } from './TradeTable';
import { Trade } from '../types/trading';

describe('TradeTable', () => {
  const mockTrades: Trade[] = [
    { id: '1', symbol: 'AAPL', type: 'BUY', entryPrice: 150.00, exitPrice: 155.00, profit: 5.00, date: new Date() },
    { id: '2', symbol: 'GOOG', type: 'SELL', entryPrice: 100.00, exitPrice: 95.00, profit: 5.00, date: new Date() },
  ];

  const mockOnSort = jest.fn();
  const mockOnFilter = jest.fn();

  it('should render without crashing and display trade data', () => {
    render(<TradeTable trades={mockTrades} onSort={mockOnSort} onFilter={mockOnFilter} />);

    expect(screen.getByText('Trade History')).toBeInTheDocument();
    expect(screen.getByText('AAPL')).toBeInTheDocument();
    expect(screen.getByText('GOOG')).toBeInTheDocument();
    expect(screen.getByText('155.00')).toBeInTheDocument();
    expect(screen.getByText('95.00')).toBeInTheDocument();
  });

  it('should call onSort when a table header is clicked', () => {
    render(<TradeTable trades={mockTrades} onSort={mockOnSort} onFilter={mockOnFilter} />);
    fireEvent.click(screen.getByText('Symbol'));
    expect(mockOnSort).toHaveBeenCalledWith('symbol');
  });

  it('should call onFilter when the filter input changes', () => {
    render(<TradeTable trades={mockTrades} onSort={mockOnSort} onFilter={mockOnFilter} />);
    const filterInput = screen.getByPlaceholderText('Filter trades...');
    fireEvent.change(filterInput, { target: { value: 'AAPL' } });
    expect(mockOnFilter).toHaveBeenCalledWith('AAPL');
  });
});

