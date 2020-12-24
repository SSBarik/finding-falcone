import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

test('renders footer component', () => {
  render(
    <BrowserRouter>
      <Footer />
    </BrowserRouter>
  );
  expect(screen.getByText('www.geektrust.in/finding-falcone')).toBeInTheDocument();
});
