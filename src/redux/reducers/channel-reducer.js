import {
  CHANNEL_DETAILS_REQUEST,
  CHANNEL_DETAILS_SUCCESS,
  CHANNEL_DETAILS_FAIL,
  SET_SUBSCRIPTION_STATUS,
} from "../types/channel.type";

const initialState = {
  loading: false,
  channel: {},
  errorText: "",
  subscriptionStatus: false,
};

export const channelDetailsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CHANNEL_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CHANNEL_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        channel: payload,
        errorText: "",
      };
    case CHANNEL_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        errorText: payload,
        channel: {},
      };
    case SET_SUBSCRIPTION_STATUS:
      return {
        ...state,
        subscriptionStatus: payload,
      };
    default:
      return state;
  }
};
