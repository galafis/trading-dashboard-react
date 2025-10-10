import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { EquityCurve } from './EquityCurve';

describe('EquityCurve', () => {
  const mockData = [
    { timestamp: new Date("2023-01-01"), value: 100 },
    { timestamp: new Date("2023-02-01"), value: 120 },
    { timestamp: new Date("2023-03-01"), value: 150 },
  ];

  it('should render without crashing and display the title', () => {
    render(<EquityCurve data={mockData} />);
    expect(screen.getByText('Equity Curve')).toBeInTheDocument();
  });
});

