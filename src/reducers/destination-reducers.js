const destinationReducers = (state, action) => {
  switch(action.type) {
 
    case 'SET_PLANET':
      return (state.map( destination => (
        destination.id === action.task.id 
        ? {...destination, planet: action.task.newValue, vehicle: '', distance: action.task.distance, speed: 0} 
        : destination
      )));

    case 'SET_VEHICLE': 
      return (state.map( destination => (
        destination.id === action.task.id 
        ? {...destination, vehicle: action.task.newValue, speed: action.task.speed} 
        : destination
      )));
    
    case 'RESET': 
      return action.task;  
        
    default: 
      return state;
  }
}

export default destinationReducers;
