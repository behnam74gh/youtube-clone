import { combineReducers } from "redux";
import { userLoginReducer } from "./auth-reducer";
import { homeVideoReducer } from "./video-reducer";

const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  homeVideos: homeVideoReducer,
});

export default rootReducer;
