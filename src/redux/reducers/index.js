import { combineReducers } from "redux";
import { userLoginReducer } from "./auth-reducer";
import { channelDetailsReducer } from "./channel-reducer";
import { commentListReducer } from "./comments-reducer";
import {
  homeVideoReducer,
  relatedVideoReducer,
  selectedVideoReducer,
} from "./video-reducer";

const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  homeVideos: homeVideoReducer,
  selectedVideo: selectedVideoReducer,
  channelDetails: channelDetailsReducer,
  commentList: commentListReducer,
  relatedVideos: relatedVideoReducer,
});

export default rootReducer;
