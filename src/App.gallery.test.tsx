/* eslint-disable import/first */
import React from 'react';
import { render, screen } from '@testing-library/react';

// Mock the gallery helper to supply predictable images
jest.mock('./gallery', () => ({
  getGalleryImages: () => ([
    { src: '/_mocked/2.jpeg', alt: 'Gallery photo: 2' },
    { src: '/_mocked/3.jpeg', alt: 'Gallery photo: 3' },
  ]),
}));

import App from './App';

describe('Gallery', () => {
  test('renders tiles when images are provided', () => {
    render(<App />);
    // Gallery tiles are buttons with aria-label "Open photo: ..."
    const tiles = screen.getAllByRole('button', { name: /open photo:/i });
    expect(tiles).toHaveLength(2);
  });
});
