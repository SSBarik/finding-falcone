const planetReducers = (state, action) => {
  switch(action.type) {
    case 'UPDATE':
      return action.task;

    case 'SELECT': {
      const selectedVehicles = state.map((vehicle) => {
        if(vehicle.name === action.task.prevValue) {
          vehicle = {...vehicle, total_no: vehicle.total_no + 1};
        }
        if(vehicle.name === action.task.newValue) {
          return {...vehicle, total_no: vehicle.total_no - 1};
        }
        return vehicle;
      });
      return selectedVehicles;
    }

    case 'RESET': {
      const resetVehicles = state.map((vehicle) => {
        if(vehicle.name === action.task) {
          return {...vehicle, total_no: vehicle.total_no + 1};
        }
        return vehicle;
      });
      return resetVehicles;
    }
    default: 
      return state;
  }
}

export default planetReducers;
