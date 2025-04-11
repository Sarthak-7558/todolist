const initialState = {
    tasks: [],
    weather: null,
    error: null,
  };
  
  const taskReducer = (state = initialState, action) => {
    switch (action.type) {
      case "ADD_TASK":
        return {
          ...state,
          tasks: [...state.tasks, action.payload],
        };
  
      case "DELETE_TASK":
        const updated = [...state.tasks];
        updated.splice(action.payload, 1);
        return {
          ...state,
          tasks: updated,
        };
  
      case "LOAD_TASKS":
        return {
          ...state,
          tasks: action.payload,
        };
  
      case "FETCH_WEATHER_SUCCESS":
        return {
          ...state,
          weather: action.payload,
          error: null,
        };
  
      case "FETCH_WEATHER_FAIL":
        return {
          ...state,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  
  export default taskReducer;
  