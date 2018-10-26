import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import TravelerLoginReducer from "./traveler_login";


const rootReducer = combineReducers({
    traveler_login: TravelerLoginReducer,
    form: formReducer
  });
  
  export default rootReducer;