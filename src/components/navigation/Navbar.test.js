import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';

test('renders Navbar component', () => {
  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
  expect(screen.getByText(/Falconator/i)).toBeInTheDocument();
  expect(screen.getByText(/home/i)).toBeInTheDocument();
  expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
});
