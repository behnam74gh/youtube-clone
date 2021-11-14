import {
  COMMENT_LIST_REQUEST,
  COMMENT_LIST_SUCCESS,
  COMMENT_LIST_FAIL,
  //   CREATE_COMMENT_REQUEST,
  //   CREATE_COMMENT_SUCCESS,
  //   CREATE_COMMENT_FAIL
} from "../types/comments.type";

const initialState = {
  loading: false,
  comments: null,
  errorText: "",
};

export const commentListReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case COMMENT_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case COMMENT_LIST_SUCCESS:
      return {
        loading: false,
        comments: payload,
        errorText: "",
      };
    case COMMENT_LIST_FAIL:
      return {
        ...state,
        loading: false,
        errorText: payload,
      };
    default:
      return state;
  }
};
