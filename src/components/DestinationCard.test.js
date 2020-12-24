import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { DestinationsProvider } from '../contexts/destinations-context';
import { PlanetsProvider } from '../contexts/planets-context';
import { VehiclesProvider } from '../contexts/vehicles-context';
import DestinationCard from './DestinationCard';

test('renders DestinationCard component', () => {
  const planets = [
    { name: 'Donlon', distance: '100', selected: false },
    { name: 'Enchai', distance: '200', selected: true },
    { name: 'Jebing', distance: '300', selected: false },
    { name: 'Sapir', distance: '400', selected: false },
    { name: 'Lerbin', distance: '500', selected: false },
    { name: 'Pingasor', distance: '600', selected: false }
  ];
  
  const vehicles = [
    { name: 'Space pod', total_no: 2, max_distance: 200, speed: 2},
    { name: 'Space rocket', total_no: 1, max_distance: 300, speed: 4},
    { name: 'Space shuttle', total_no: 1, max_distance: 400, speed: 5},
    { name: 'Space ship', total_no: 2, max_distance: 600, speed: 10}
  ];
  
  const destination = { 
    id: 'd1', 
    planet: 'Enchai', 
    vehicle: 'Space rocket', 
    distance: 200, 
    speed: 4
  };
  
  render(
    <DestinationsProvider>
      <PlanetsProvider>
        <VehiclesProvider>
          <BrowserRouter>
            <DestinationCard 
              destination={destination} 
              planets={planets} 
              vehicles={vehicles} 
            />
          </BrowserRouter>
        </VehiclesProvider>
      </PlanetsProvider>
    </DestinationsProvider>
  );
  expect(screen.getByAltText(/planet enchai/i)).toBeInTheDocument();
  expect(screen.getByAltText(/vehicle space rocket/i)).toBeInTheDocument();
  expect(screen.getByText(/enchai/i)).toBeInTheDocument();
  expect(screen.getByText(/space rocket/i)).toBeInTheDocument();
});
