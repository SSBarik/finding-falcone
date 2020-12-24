import React, { useState, useEffect } from 'react';

import AppBar from '@material-ui/core/AppBar';

import LargeScreenNav from './LargeScreenNav';
import SmallScreenNav from './SmallScreenNav';
import { config } from './config';

export default function Navbar() {
  const [state, setState] = useState({
    smallScreen: false,
    drawerOpen: false
  });

  const { smallScreen, drawerOpen } = state;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth<960
        ? setState(prevState => ({ ...prevState, smallScreen: true }))
        : setState(prevState => ({ ...prevState, smallScreen: false }));
    };
    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());

    return() => {
      window.removeEventListener('resize', () => setResponsiveness());
    };
  }, [])

  return (
    <nav>
      <AppBar position="fixed" color="secondary">
        {smallScreen ? (
          <SmallScreenNav 
            drawerOpen={drawerOpen} 
            setState={setState} 
            config={config} 
          />
        ) : (
          <LargeScreenNav config={config} />
        )}
      </AppBar>
    </nav>
  );
}
