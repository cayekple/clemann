import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('Theme toggle (dark mode)', () => {
  test('toggles dark class on documentElement and updates accessible label', async () => {
    render(<App />);

    // Starts in light mode by default in jsdom environment
    const toggle = screen.getByRole('button', { name: /switch to dark mode/i });
    await userEvent.click(toggle);

    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(screen.getByRole('button', { name: /switch to light mode/i })).toBeInTheDocument();
  });
});
