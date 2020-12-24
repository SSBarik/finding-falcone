const planetReducers = (state, action) => {
  switch(action.type) {
    case 'UPDATE': 
      return action.task.map( planet => ({...planet, selected: false}) );

    case 'SELECT': {
      const selectedPlanets = state.map( planet => {
        if(planet.name === action.task.prevValue) {
          planet = {...planet, selected: false};
        }
        if(planet.name === action.task.newValue) {
          return {...planet, selected: true};
        }
        return planet;
      });
      return selectedPlanets;
    }
    
    case 'RESET': 
      return (state.map( planet => (planet.name === action.task ? {...planet, selected: false} : planet )));

    default: 
      return state;
  }
}

export default planetReducers;
