import React, { createContext, useReducer, useContext } from 'react';
import destinationReducers from '../reducers/destination-reducers';
import { defaultDestinations } from '../config/dashboard';

const DestinationsStateContext = createContext();
const DestinationsDispatchContext = createContext();

function DestinationsProvider(props) {
  const [destinations, dispatch] = useReducer(destinationReducers, defaultDestinations);

  return(
    <DestinationsStateContext.Provider value={destinations}>
       <DestinationsDispatchContext.Provider value={dispatch}>
        {props.children}
      </DestinationsDispatchContext.Provider>
    </DestinationsStateContext.Provider>
  );
}

function useDestinationsState() {
  const context = useContext(DestinationsStateContext)
  if (context === undefined) {
    throw new Error('useDestinationsState must be used within a DestinationsProvider')
  }
  return context;
}
function useDestinationsDispatch() {
  const context = useContext(DestinationsDispatchContext)
  if (context === undefined) {
    throw new Error('useDestinationsDispatch must be used within a DestinationsProvider')
  }
  return context;
}
export { DestinationsProvider, useDestinationsState, useDestinationsDispatch }