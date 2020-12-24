import React from 'react';
import { Link } from 'react-router-dom';

import {
  Button,
  Grid,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MyLocationIcon from '@material-ui/icons/MyLocation';

import useProgressiveImg from '../hooks/useProgressiveImg';
import falconator from '../assets/falconator.svg';
import tinyFalconator from '../assets/tiny-falconator.png';
import { DASHBOARD } from '../config/routing/paths';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minHeight: '100vh'
  },
  headingSection: {
    '@media (max-width: 900px)': {
      textAlign: 'center'
    },
  },
  heading: {
    fontWeight: 'bold',
    '@media (max-width: 900px)': {
      marginTop: '100px',
      fontSize: '2.5em',
    },
    marginBottom: '15px'
  },
  span: {
    color: theme.palette.primary.main
  },
  illustrationSection: {
    textAlign: 'center'
  }
}));

const Home = () => {
  const classes = useStyles();
  const [src, {blur}] = useProgressiveImg(tinyFalconator, falconator);

  return(
    <>
      <Grid 
        container 
        spacing={0} 
        direction="row" 
        alignItems="center" 
        justify="center"  
        className={classes.root}
      >
        <Grid item md={5} sm={12} xs={12}>
          <section className={classes.headingSection}>
            <Typography component="h1" variant="h2" color="textPrimary" className={classes.heading}>
              Let's find Queen <span className={classes.span}>AI Falcone</span>.
            </Typography>
            <Button 
              variant="outlined" 
              startIcon={<MyLocationIcon color="primary"/>} 
              color="secondary" 
              component={Link} 
              to={DASHBOARD}
            >
              Find Falcone
            </Button>
          </section>
        </Grid>
        <Grid item md={5} sm={12} xs={12}>
          <section className={classes.illustrationSection}>
            <img
              src={src}
              style={{
                width: '100%',
                height: '100%',
                filter: blur
                  ? 'blur(20px)'
                  : 'none',
                transition: blur
                  ? 'none'
                  : 'filter 0.3s ease-out'
              }}
              alt="Falconator illustration"
            />
          </section>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;