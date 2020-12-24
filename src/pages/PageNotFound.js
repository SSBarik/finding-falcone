import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { Button, Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { HOME } from '../config/routing/paths';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh', 
    textAlign: 'center',
    paddingTop: '150px'
  },   
  text: {
    fontWeight: 'bold',
    fontSize: '2.5em',
    '@media (max-width: 600px)': {
      fontSize: '1.5em',
    },
    marginBottom: '20px'
  }
}));

const PageNotFound = () => {
  const classes = useStyles();
  const[redirect, setRedirect] = useState(false);

  return (
    <section>
      {redirect && <Redirect to={HOME} />}
      
      <Container className={classes.root}>
        <Typography variant="h1" color="error">404</Typography>
        <Typography component="p" className={classes.text} color="textSecondary">
          Seems like you're LOST!
        </Typography>
        <Button 
          variant="contained" 
          color="secondary"
          startIcon={<ExitToAppIcon color="primary" />}
          onClick={() => setRedirect(true)}
        >
          Return Home
        </Button>
      </Container>
    </section>
  );
};

export default PageNotFound;