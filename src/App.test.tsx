import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders core wedding sections', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /our gallery/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /program of the day/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /reception/i })).toBeInTheDocument();
});
