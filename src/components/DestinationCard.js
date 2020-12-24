import React from 'react';

import {
  Avatar, 
  Card, 
  CardActions,
  CardContent,
  Fade
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Selector } from './common';
import { 
  useDestinationsDispatch,
  usePlanetsDispatch,
  useVehiclesDispatch 
} from '../contexts'
import { planetsAssets, vehiclesAssets } from '../config/assets';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 'auto',
    boxShadow: '2px 3px 13px -7px grey',
  },
  content: {
    textAlign: 'center',
  },
  media: {
    alignItems: 'center',
    height: 200,
    width: 200,
    paddingTop: '56.25%',
  },
  avatarSmall: {
    display: 'inline-block',
    '&:not(:first-of-type)': {
      marginLeft: -40
    },
    backgroundColor: '#ffffff',
    boxShadow: '2px 3px 13px -7px grey',
    width: theme.spacing(6),
    height: theme.spacing(6),
    padding: '4px'
  },
  avatarLarge: {
    display: 'inline-block',
    width: theme.spacing(20),
    height: theme.spacing(20),
    padding: '6px',
  }
}));

const DestinationCard = ({ destination, planets, vehicles }) => {  
  const classes = useStyles();
  const destinationsDispatch = useDestinationsDispatch();
  const planetsDispatch  = usePlanetsDispatch();
  const vehiclesDispatch  = useVehiclesDispatch();
  
  const handlePlanetsChange = (newValue, prevValue) => {
    planetsDispatch({ type: 'SELECT', task: { prevValue, newValue } });
    const planet = planets.find(planet => planet.name === newValue);
    destinationsDispatch({ 
      type: 'SET_PLANET', 
      task: { id: destination.id, newValue, distance: planet.distance } 
    });
    vehiclesDispatch({ type: 'RESET', task: destination.vehicle });
  };
  
  const handleVehiclesChange = (newValue, prevValue) => {
    vehiclesDispatch({ type: 'SELECT', task: { prevValue, newValue } });
    const vehicle = vehicles.find(vehicle => vehicle.name === newValue);
    destinationsDispatch({ 
      type: 'SET_VEHICLE', 
      task: { id: destination.id, newValue, speed: vehicle.speed }
    });
  };  

  const isDisabledPlanet = destinationPlanet => destinationPlanet.selected;
  
  const isDisabledVehicle = (destinationVehicle) => {
    const planet = planets.find(planet => planet.name === destination.planet);
    return (
      destinationVehicle.total_no < 1 || destinationVehicle.max_distance < planet.distance
    );
  };

  const getAsset = assetName => require(`../assets/${assetName}`).default;

  return (
    <article>
      <Fade in timeout={1000}>
        <Card className={classes.root}>
          <CardContent className={classes.content}>
            <Avatar 
              className={classes.avatarLarge} 
              src={getAsset(planetsAssets.find(asset => asset.name === destination.planet).src)}
              alt={`Planet ${destination.planet}`} 
            />     
            <Avatar 
              className={classes.avatarSmall} 
              src={getAsset(vehiclesAssets.find(asset => asset.name === destination.vehicle).src)} 
              alt={`Vehicle ${destination.vehicle}`}
            />
          </CardContent>
          <CardActions>
            <Selector
              label="Planet" 
              value={destination.planet} 
              menuItems={planets}
              disabledItem={isDisabledPlanet} 
              handleChange={handlePlanetsChange}
            />
          </CardActions>
          <CardActions>
            { destination.planet !== '' && (
              <Selector
                label="Vehicle"
                value={destination.vehicle} 
                menuItems={vehicles}
                itemCountProp="total_no"
                disabledItem={isDisabledVehicle} 
                handleChange={handleVehiclesChange}
              />
            )}         
          </CardActions>
        </Card>   
      </Fade>   
    </article>
  );
}

export default DestinationCard;