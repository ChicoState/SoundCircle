import React from 'react';
import { render, screen } from '@testing-library/react';
import SoundCircle from './SoundCircle';

test('renders learn react link', () => {
  render(<SoundCircle />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
