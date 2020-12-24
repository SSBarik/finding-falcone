import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import { 
  MenuItem,
  Toolbar,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    fontSize: '2em',
    fontFamily: 'monospace',
    letterSpacing: 6,
    color: theme.palette.primary.main,
    textDecoration: 'none'
  },
  toolbar: {
    paddingRight: '80px',
    paddingLeft: '120px',
  },
  active: {
    color: theme.palette.primary.main
  }
}));

export default function LargeScreenNav({config}) {
  const classes = useStyles();

  return (
    <Toolbar className={classes.toolbar}>
      <Typography component={Link} to="/" className={classes.title}>
          Falconator
      </Typography>
      {config.map((item, i) => (
        <MenuItem
          key={i}
          component={NavLink}
          exact
          to={item.path}
          color="inherit"
          activeClassName={classes.active}
        >
          {item.label}
        </MenuItem>
      ))}
    </Toolbar>
  );
}
