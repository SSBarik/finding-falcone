import { render, screen } from '@testing-library/react';
import Selector from './Selector';

describe("Selector", () => {
  test('renders Selector component', () => {
    const planets = [
      { name: 'Donlon', distance: 100 },
      { name: 'Enchai', distance: 200 },
      { name: 'Pingasor', distance: 600 }
    ];

    const destination = { 
      id: 'd1', 
      planet: 'Enchai', 
      vehicle: 'Space Rocket',
      distance: 200, 
      speed: 4 
    }

    const handlePlanetsChange = jest.fn();
    const isDisabledPlanet = jest.fn();

    render(
      <Selector 
        label="Planet" 
        value={destination.planet}
        menuItems={planets}
        disabledItem={isDisabledPlanet} 
        handleChange={handlePlanetsChange}
      />
    );
    expect(screen.getByLabelText(/planet/i)).toBeInTheDocument();
    expect(screen.getByText(/enchai/i)).toBeInTheDocument();
  });
});
