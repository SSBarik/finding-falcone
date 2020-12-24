import React, { createContext, useReducer, useContext } from 'react';
import planetReducers from '../reducers/planet-reducers';

const PlanetsStateContext = createContext();
const PlanetsDispatchContext = createContext();

function PlanetsProvider(props) {
  const [planets, dispatch] = useReducer(planetReducers, []);

  return(
    <PlanetsStateContext.Provider value={planets}>
      <PlanetsDispatchContext.Provider value={dispatch}>
        {props.children}
      </PlanetsDispatchContext.Provider>
    </PlanetsStateContext.Provider>
  );
}

function usePlanetsState() {
  const context = useContext(PlanetsStateContext)
  if (context === undefined) {
    throw new Error('usePlanetsState must be used within a PlanetsProvider')
  }
  return context;
}
function usePlanetsDispatch() {
  const context = useContext(PlanetsDispatchContext)
  if (context === undefined) {
    throw new Error('usePlanetsDispatch must be used within a PlanetsProvider')
  }
  return context;
}
export { PlanetsProvider, usePlanetsState, usePlanetsDispatch }