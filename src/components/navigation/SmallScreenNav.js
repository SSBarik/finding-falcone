import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import { 
  Drawer,
  IconButton,
  MenuItem,
  Toolbar,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingLeft: '20px'
  },
  title: {
    flexGrow: 1,
    fontSize: '2em',
    fontFamily: 'monospace',
    letterSpacing: 3,
    color: theme.palette.primary.main,
    textDecoration: 'none'
  },

  paper: {
    padding: '30px 35px',
    background: 'transparent',
    backdropFilter:  `blur(10px)`,
    border: '1px outset rgba(255, 255, 255, 0.2)',
    borderRadius: '50px 0px 0px 50px'

  },
  active: {
    backgroundColor: theme.palette.primary.main,
  },

  inactive: {
    border: '2px outset #22b59d'
  }

}));

export default function SmallScreenNav({ drawerOpen, setState, config }) {
  const classes = useStyles();

  const handleDrawerOpen = () => setState(prevState => ({ ...prevState, drawerOpen: true }));
  const handleDrawerClose = () => setState(prevState => ({ ...prevState, drawerOpen: false }));

  return (
    <>
      <Toolbar className={classes.toolbar}>
        <Typography component={Link} to="/" className={classes.title}>
          Falconator
        </Typography>
        <IconButton 
          edge="start" 
          className={classes.menuButton} 
          color="inherit" 
          aria-label="menu"
          onClick={handleDrawerOpen}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
        
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerClose} 
        classes={{ paper: classes.paper }}
      >
        {/* <div className={classes.drawerContainer}> */}
          {config.map((item, i) => (
            <MenuItem 
              key={i} 
              exact 
              to={item.path}  
              component={NavLink} 
              style={{marginBottom: '15px', fontSize: 'large', fontWeight: 'bold', color: '#ffffff', borderRadius: '50px'}}
              className={classes.inactive}
              activeClassName={classes.active}
              onClick={handleDrawerClose}
            >
              {item.label}
            </MenuItem>
          ))} 
        {/* </div> */}
      </Drawer>
    </>
  );
}
