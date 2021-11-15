import {
  HOME_VIDEO_REQUEST,
  HOME_VIDEO_SUCCESS,
  HOME_VIDEO_FAIL,
  SELECTED_VIDEO_REQUEST,
  SELECTED_VIDEO_SUCCESS,
  SELECTED_VIDEO_FAIL,
  RELATED_VIDEO_REQUEST,
  RELATED_VIDEO_SUCCESS,
  RELATED_VIDEO_FAIL,
  SEARCH_VIDEO_REQUEST,
  SEARCH_VIDEO_SUCCESS,
  SEARCH_VIDEO_FAIL,
  SUBSCRIPTIONS_CHANNEL_REQUEST,
  SUBSCRIPTIONS_CHANNEL_SUCCESS,
  SUBSCRIPTIONS_CHANNEL_FAIL,
  CHANNEL_VIDEOS_REQUEST,
  CHANNEL_VIDEOS_SUCCESS,
  CHANNEL_VIDEOS_FAIL,
} from "../types/video.type";

const initialState1 = {
  videos: [],
  loading: false,
  nextPageToken: null,
  errorText: "",
  activeCategory: "",
};

export const homeVideoReducer = (state = initialState1, action) => {
  switch (action.type) {
    case HOME_VIDEO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case HOME_VIDEO_SUCCESS:
      return {
        ...state,
        videos:
          state.activeCategory === action.payload.category
            ? [...state.videos, ...action.payload.videos]
            : action.payload.videos,
        nextPageToken: action.payload.nextPageToken,
        activeCategory: action.payload.category,
        loading: false,
        errorText: "",
      };
    case HOME_VIDEO_FAIL:
      return {
        ...state,
        loading: false,
        errorText: action.payload,
      };
    default:
      return state;
  }
};

const initialState2 = {
  loading: false,
  video: null,
  errorText: "",
};

export const selectedVideoReducer = (state = initialState2, action) => {
  const { type, payload } = action;

  switch (type) {
    case SELECTED_VIDEO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SELECTED_VIDEO_SUCCESS:
      return {
        loading: false,
        video: payload,
        errorText: "",
      };
    case SELECTED_VIDEO_FAIL:
      return {
        loading: false,
        video: null,
        errorText: payload,
      };
    default:
      return state;
  }
};

const initialState3 = {
  loading: false,
  videos: [],
  errorText: "",
};

export const relatedVideoReducer = (state = initialState3, action) => {
  const { type, payload } = action;

  switch (type) {
    case RELATED_VIDEO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case RELATED_VIDEO_SUCCESS:
      return {
        loading: false,
        videos: payload,
        errorText: "",
      };
    case RELATED_VIDEO_FAIL:
      return {
        ...state,
        loading: false,
        errorText: payload,
      };
    default:
      return state;
  }
};

const initialState4 = {
  loading: false,
  videos: [],
  errorText: "",
};

export const searchedVideosReducer = (state = initialState4, action) => {
  const { type, payload } = action;

  switch (type) {
    case SEARCH_VIDEO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SEARCH_VIDEO_SUCCESS:
      return {
        loading: false,
        videos: payload,
        errorText: "",
      };
    case SEARCH_VIDEO_FAIL:
      return {
        ...state,
        loading: false,
        errorText: payload,
      };
    default:
      return state;
  }
};

const initialState5 = {
  loading: false,
  videos: [],
  errorText: "",
};

export const subscriptionsChannelReducer = (state = initialState5, action) => {
  const { type, payload } = action;

  switch (type) {
    case SUBSCRIPTIONS_CHANNEL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SUBSCRIPTIONS_CHANNEL_SUCCESS:
      return {
        loading: false,
        videos: payload,
        errorText: "",
      };
    case SUBSCRIPTIONS_CHANNEL_FAIL:
      return {
        ...state,
        loading: false,
        errorText: payload,
      };
    default:
      return state;
  }
};

const initialState6 = {
  loading: false,
  videos: [],
  errorText: "",
};

export const channelVideosReducer = (state = initialState6, action) => {
  const { type, payload } = action;

  switch (type) {
    case CHANNEL_VIDEOS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CHANNEL_VIDEOS_SUCCESS:
      return {
        loading: false,
        videos: payload,
        errorText: "",
      };
    case CHANNEL_VIDEOS_FAIL:
      return {
        ...state,
        loading: false,
        errorText: payload,
      };
    default:
      return state;
  }
};
