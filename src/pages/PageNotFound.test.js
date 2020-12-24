import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import PageNotFound from './PageNotFound';

test('renders 404 page', () => {
  render(
    <BrowserRouter>
      <PageNotFound />
    </BrowserRouter>
  );
  expect(screen.getByText(/404/i)).toBeInTheDocument();
  expect(screen.getByRole('button')).toHaveTextContent(/return home/i);
});
