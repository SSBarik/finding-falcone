import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  footer: {
    position: 'relative',
    bottom: '0',
    textAlign: 'center',
    marginTop: '20px',
    paddingBottom: '20px'
  }
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Typography variant="body2">
        Coding Problem -
        <Link to={{ pathname: 'https://www.geektrust.com/challenge/space' }} target="_blank">
          www.geektrust.com/challenge/space
        </Link>
      </Typography>
    </footer>
  );
}