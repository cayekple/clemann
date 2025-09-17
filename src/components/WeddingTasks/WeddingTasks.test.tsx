import React from 'react';
import { render, screen, within } from '@testing-library/react';
import WeddingTasks from './WeddingTasks';

describe('WeddingTasks', () => {
  test('renders heading and a list of tasks', () => {
    render(<WeddingTasks />);

    const heading = screen.getByRole('heading', { name: /wedding invite website tasks/i });
    expect(heading).toBeInTheDocument();

    const section = screen.getByRole('region', { name: /wedding invite website tasks/i });

    const list = within(section).getByRole('list');
    const items = within(list).getAllByRole('listitem');
    expect(items.length).toBeGreaterThanOrEqual(8);

    // Spot-check a few key tasks
    expect(screen.getByText(/rsvp form/i)).toBeInTheDocument();
    expect(screen.getByText(/schedule and locations/i)).toBeInTheDocument();
    expect(screen.getByText(/analytics and basic seo/i)).toBeInTheDocument();
  });
});
