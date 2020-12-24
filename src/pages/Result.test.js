import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import Result from './Result';

describe('Result', () => {
  test('renders result page with success details', () => {
    const history = createMemoryHistory();
    const state = { status: 'success', planet_name: 'Enchai', time: 200 }
    history.push('/result', state);
    render(
      <Router history={history}>
        <Result />
      </Router>
    );
    expect(screen.getByText(/accomplished/i)).toBeInTheDocument();
    expect(screen.getByText(/enchai/i)).toBeInTheDocument();
    expect(screen.getByText(/200/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent(/start again/i);
  });

  test('renders result page with failure details', () => {
    const history = createMemoryHistory();
    const state = { status: 'fail', time: 404 }
    history.push('/result', state);
    render(
      <Router history={history}>
        <Result />
      </Router>
    );
    expect(screen.getByText(/failed/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent(/try again/i);
  });
});
