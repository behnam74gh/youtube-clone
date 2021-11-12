import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOG_OUT,
  LOAD_PROFILE,
} from "../types/auth.type";

const initialState = {
  accessToken: sessionStorage.getItem("ytc-access-token") || null,
  user: JSON.parse(sessionStorage.getItem("ytc-profile")) || null,
  loading: false,
  errorText: "",
};

export const userLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        accessToken: action.payload,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        accessToken: null,
        errorText: action.payload,
      };
    case LOAD_PROFILE:
      return {
        ...state,
        user: action.payload,
      };
    case LOG_OUT:
      return {};
    default:
      return state;
  }
};
