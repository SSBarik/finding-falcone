import React from 'react';
import { Redirect, Link, useLocation } from 'react-router-dom';

import { 
  Avatar,
  Button,
  Grid,
  Typography,
  Fade,
  Grow,
  Zoom
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ReplayIcon from '@material-ui/icons/Replay';

import { planetsAssets } from '../config/assets';
import { DASHBOARD } from '../config/routing/paths';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh', 
    textAlign: 'center'
  },
  result: {
    fontWeight: 'bold',
    fontSize: '3em',
    '@media (max-width: 600px)': {
      fontSize: '1.5em',
    },
    marginTop: '20px',
    fontFamily: 'monospace',
    letterSpacing: 3,
  },
  button: {
    marginTop: '20px'
  },
  avatar: {
    display: 'inline-block',
    boxShadow: '2px 3px 13px -7px grey',
    width: theme.spacing(20),
    height: theme.spacing(20),
  }
}));

const Result = () => {
  const classes = useStyles();
  const { state } = useLocation();
  
  const getAsset = assetName => require(`../assets/${assetName}`).default;

  return(
    <section>
      {typeof state === "undefined" ? (
        <Redirect to="/dashboard" /> 
      ) : (
        <Grid
          container
          spacing={0}
          direction="column"
          justify="center"
          className={classes.root}
        >
          <Grid item xs={12}>
            {state.status === "success" ? (
              <Fade in timeout={500}>
                <article>
                  <Zoom in timeout={1000}>
                    <Avatar
                      className={classes.avatar}
                      src={getAsset(planetsAssets.find(asset => asset.name === state.planet_name).src)} 
                      alt={`Planet ${state.planet_name}`}
                    />
                  </Zoom>
                  <Typography component="h1" color="primary" className={classes.result}>
                    MISSION ACCOMPLISHED 
                  </Typography>
                  <Typography component="p" variant="h6"> Planet: {state.planet_name} </Typography>
                  <Typography component="p" variant="h6"> Time taken: {state.time} hours</Typography>
                </article>
              </Fade>
            ) : (
              <Grow in timeout={500}>
                <article>
                  <Typography component="h1" color="error" className={classes.result}>
                    MISSION FAILED 
                  </Typography>
                  <Typography component="p" variant="h6"> Better luck next time! </Typography>
                </article>
              </Grow>
            )}
            <Fade in timeout={1500}>
              <Button
                className={classes.button}
                component={Link} 
                to={DASHBOARD}
                variant="contained"
                color="secondary"
                startIcon={<ReplayIcon color="primary" />}
              >
                {state.status === "success" ? "Start Again" : "Try Again"}
              </Button>
            </Fade>
          </Grid>   
        </Grid> 
      )}
    </section>
  );
};

export default Result;