import { combineReducers } from "redux";
import { userLoginReducer } from "./auth-reducer";

const rootReducer = combineReducers({
  userLogin: userLoginReducer,
});

export default rootReducer;
