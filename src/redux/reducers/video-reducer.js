import {
  HOME_VIDEO_REQUEST,
  HOME_VIDEO_SUCCESS,
  HOME_VIDEO_FAIL,
} from "../types/video.type";

const initialState = {
  videos: [],
  loading: false,
  nextPageToken: null,
  errorText: "",
};

export const homeVideoReducer = (state = initialState, action) => {
  switch (action.type) {
    case HOME_VIDEO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case HOME_VIDEO_SUCCESS:
      return {
        loading: false,
        videos: action.payload.videos,
        nextPageToken: action.payload.nextPageToken,
        errorText: "",
      };
    case HOME_VIDEO_FAIL:
      return {
        loading: false,
        videos: [],
        nextPageToken: null,
        errorText: action.payload,
      };
    default:
      return state;
  }
};
