import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';

import { 
  Button,
  CircularProgress,
  Grid,
  Typography,
  Box
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import Skeleton from '@material-ui/lab/Skeleton';
import { Notify } from '../components/common';
import { DestinationCard } from '../components';
import { 
  useDestinationsState, 
  useDestinationsDispatch,
  usePlanetsState, 
  usePlanetsDispatch,
  useVehiclesState, 
  useVehiclesDispatch 
} from '../contexts'
import { getPlanets, getVehicles, getToken, getResult } from '../api';
import { RESULT } from '../config/routing/paths';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minHeight: '100vh', 
    paddingTop: '100px',
    paddingBottom: '20px'
  },
  actionsGrid: {
    marginTop: '30px', 
    marginBottom: '30px', 
    textAlign: 'center'
  },
  time: {
    marginTop: '20px',
    marginBottom: '20px',
    fontFamily: 'monospace',
    letterSpacing: 6,
    fontSize: '20px',
    fontWeight: 'bold'
  },
  tx: {
    transitionProperty: 'fade',
    transitionDuration: 5,
    transitionDelay: 2,
  }
}));

export default function Dashboard() {
  const classes = useStyles();
  const history = useHistory();
  const destinations = useDestinationsState();
  const dispatch = useDestinationsDispatch();
  const planets = usePlanetsState();
  const planetsDispatch  = usePlanetsDispatch();
  const vehicles = useVehiclesState();
  const vehiclesDispatch  = useVehiclesDispatch();  
  const [time, setTime] = useState(0);
  const [timeX, setTimeX] = useState(0);
  const [skeleton, setSkeleton] = useState(false);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState({ status: false, msg: '' });
  const source = useRef();

  useEffect(() => {
    source.current = axios.CancelToken.source();
    const fetchData = async () => {
      setError(error => ({ ...error, status: false, msg: '' }));
      try {
        const planetsResponse = await getPlanets(source.current.token);
        const vehiclesResponse = await getVehicles(source.current.token);
        planetsDispatch({ type: 'UPDATE', task: planetsResponse.data });
        vehiclesDispatch({ type: 'UPDATE', task: vehiclesResponse.data });
        setSkeleton(false);
      } catch (e) {
        if(axios.isCancel(e)) {
          console.log('Request Cancelled!');
        } else {
          setError(error => ({ ...error, status: true, msg: 'Unable to fetch data! Please try again.' }));
          console.log(e);
        }
      }
    }
    if(planets.length === 0) {
      setSkeleton(true);
      fetchData();
    }

    return () => {
      source.current.cancel();
    };
  }, [planets.length, planetsDispatch, vehiclesDispatch])
  
  useEffect(() => {
    let timeTaken = 0;
    destinations.forEach(destination => {
      if(destination.vehicle !== '') {
        timeTaken += (destination.distance/destination.speed); 
      }
    })
    setTimeX(timeTaken);
    if(timeX < timeTaken) {
      for(let i = timeX; i < timeTaken; i++) {
        setTimeout(() => {
          setTime(i);
        }, 0);
      }   
      
      setTimeout(() => {
        setTime(timeTaken);
      }, 1000);
    } else {
      for(let i = timeX; i > timeTaken; i--) {
        setTimeout(() => {
          setTime(i);
        }, 0);
      }
      setTimeout(() => {
        setTime(timeTaken);
      }, 1000);
    }

  }, [destinations]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError(error => ({ ...error, status: false, msg: '' }));
  };

  const reset = () => {
    setTimeX(10);
    const resetDestinations = destinations.map(destination => {
      if(destination.vehicle !== '') {
        vehiclesDispatch({ type: 'RESET', task: destination.vehicle })
        planetsDispatch({ type: 'RESET', task: destination.planet })
        return { ...destination, planet: '', vehicle: '', distance: 0, speed: 0 };
      }
      else if(destination.planet !== '') {
        planetsDispatch({ type: 'RESET', task: destination.planet })
        return { ...destination, planet: '', distance: 0 };
      } 
      return destination;
    });
    dispatch({ type: 'RESET', task: resetDestinations });
  };

  const setData = data => {
    destinations.forEach(destination => {
      data.planet_names.push(destination.planet);
      data.vehicle_names.push(destination.vehicle);
    })
    return data;
  }

  const findFalcone = async() => {
    setLoader(true);
    setError(error => ({ ...error, status: false, msg: '' }));
    const findData = setData({ planet_names: [], vehicle_names: [] });
    try{
      const token = await getToken(source.current.token);
      const result = await getResult({ ...findData, token: token.data.token }, source.current.token);
      reset();
      setLoader(false);
      history.push(RESULT, { ...result.data, time });
    } catch(e) {
      if(axios.isCancel(e)) {
        console.log('Request Cancelled!');
      } else {
        setLoader(false);
        setError(error => ({ ...error, status: true, msg: 'Server Error! Please try again.' }));
        console.log(e);
      }
    }
  }

  function CircularProgressWithLabel(props) {
    return (
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress variant="determinate" {...props} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="caption" component="div" color="text.secondary">
            {`${Math.round(props.value)}%`}
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <section className={classes.root}> 
      <Grid container spacing={4}  justify="center">
        {destinations.map(destination => (
          <Grid 
            key={destination.id} 
            item md={3} 
            sm={6} 
            xs={12}
          >
            {skeleton ? (
              <Skeleton 
                variant="rect" 
                width="auto" 
                height={300} 
                animation="wave" 
              />
            ) : (
              <DestinationCard 
                destination={destination} 
                planets={planets} 
                vehicles={vehicles} 
              />
            )}
          </Grid> 
        ))}
      </Grid> 
      <Grid
        container 
        spacing={0} 
        justify="center" 
        alignItems="center"
        className={classes.actionsGrid} 
      >
        <Grid item sm={4} xs={12}>
          <Button 
            variant="contained" 
            color="default"
            startIcon={<RotateLeftIcon color="secondary"/>}
            disabled={destinations.find(destination => destination.planet !== '')? false : true}
            onClick={reset}
          >
            Reset
          </Button>
        </Grid>
        <Grid item sm={4} xs={12}>
          {!skeleton && 
           <Typography variant="h6" color="textSecondary" className={classes.time}>
              Time taken: <span className={classes.tx} >{time}</span> 
            </Typography>
          }
        </Grid> 
        <Grid item sm={4} xs={12}>
          <Button 
            variant="contained" 
            color="secondary"
            size="large"
            startIcon={<MyLocationIcon color="primary"/>}
            disabled={destinations.find(destination => destination.vehicle === '') ? true : false || loader}
            onClick={findFalcone}
          >
            {loader ? <>Finding...<CircularProgress /></> : <>Find Falcone</>}
          </Button>
        </Grid> 
      </Grid>

      <Notify 
        severity="error" 
        open={error.status} 
        message={error.msg}  
        handleClose={handleClose} 
      />
    </section>
  )
}
