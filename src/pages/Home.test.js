import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Home from './Home';

test('renders home page', () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
  expect(screen.getByAltText(/falconator illustration/i)).toBeInTheDocument();
  expect(screen.getByRole('button')).toHaveTextContent(/find falcone/i);
});
