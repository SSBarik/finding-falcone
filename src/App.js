import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import Navbar from './components/navigation/Navbar';
import { ScrollToTop } from './components/common';
import { Footer } from './components';
import { 
  DestinationsProvider, 
  PlanetsProvider, 
  VehiclesProvider 
} from './contexts';
import { routes } from './config/routing/routes';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#f6f6f6"
  }
}));

function App() {
  const classes = useStyles();

  return (
    <DestinationsProvider>
      <PlanetsProvider>
        <VehiclesProvider>
          <BrowserRouter>
            <Navbar />
            <main className={classes.root}>
              <Container>
                <ScrollToTop />
                <Switch>
                  {routes.map( route => (
                    <Route 
                      key={route.path}
                      exact
                      path={route.path} 
                      component={route.component} 
                    />
                  ))}
                </Switch>
              </Container>
            </main>
            <Footer />
          </BrowserRouter>
        </VehiclesProvider>
      </PlanetsProvider>
    </DestinationsProvider>
  );
}

export default App;
