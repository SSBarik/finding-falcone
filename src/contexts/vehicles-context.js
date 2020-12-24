import React, { createContext, useReducer, useContext } from 'react';
import vehicleReducers from '../reducers/vehicle-reducers';

const VehiclesStateContext = createContext();
const VehiclesDispatchContext = createContext();

function VehiclesProvider(props) {
  const [vehicles, dispatch] = useReducer(vehicleReducers, []);

  return(
    <VehiclesStateContext.Provider value={vehicles}>
      <VehiclesDispatchContext.Provider value={dispatch}>
        {props.children}
      </VehiclesDispatchContext.Provider>
    </VehiclesStateContext.Provider>
  );
}

function useVehiclesState() {
  const context = useContext(VehiclesStateContext)
  if (context === undefined) {
    throw new Error('useVehiclesState must be used within a VehiclesProvider')
  }
  return context;
}
function useVehiclesDispatch() {
  const context = useContext(VehiclesDispatchContext)
  if (context === undefined) {
    throw new Error('useVehiclesDispatch must be used within a VehiclesProvider')
  }
  return context;
}
export { VehiclesProvider, useVehiclesState, useVehiclesDispatch }