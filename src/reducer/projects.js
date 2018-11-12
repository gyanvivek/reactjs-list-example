import { GET_PROJECT_LIST_SUCCESS } from "../actions/type";

const INITIAL_STATE = {
    projects: []
}

  
  
  export default (state = INITIAL_STATE, action) => {
    console.log(action);
    switch (action.type) {
        case GET_PROJECT_LIST_SUCCESS:
          return{...state, projects: action.payload}
      default:
        return state;
    }
  };
  
