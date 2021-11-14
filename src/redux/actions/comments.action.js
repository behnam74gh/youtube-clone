import {
  COMMENT_LIST_REQUEST,
  COMMENT_LIST_SUCCESS,
  COMMENT_LIST_FAIL,
  //   CREATE_COMMENT_REQUEST,
  //   CREATE_COMMENT_SUCCESS,
  //   CREATE_COMMENT_FAIL,
} from "../types/comments.type";
import axiosRequest from "../../api";

export const getCommentsOfVideoById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: COMMENT_LIST_REQUEST,
    });

    const { data } = await axiosRequest("commentThreads", {
      params: {
        part: "snippet",
        videoId: id,
      },
    });

    dispatch({
      type: COMMENT_LIST_SUCCESS,
      payload: data.items,
    });
  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: COMMENT_LIST_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const addComment = (vId, commentText) => async (dispatch, getState) => {
  const { accessToken } = getState().userLogin;
  try {
    const objData = {
      snippet: {
        videoId: vId,
        topLevelComment: {
          snippet: {
            textOriginal: commentText,
          },
        },
      },
    };

    await axiosRequest("commentThreads", objData, {
      params: {
        part: "snippet",
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    setTimeout(() => dispatch(getCommentsOfVideoById(vId)), 3000);
  } catch (error) {
    console.log(error.response.data);
  }
};
