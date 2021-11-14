import {
  CHANNEL_DETAILS_REQUEST,
  CHANNEL_DETAILS_SUCCESS,
  CHANNEL_DETAILS_FAIL,
  SET_SUBSCRIPTION_STATUS,
} from "../types/channel.type";
import axiosRequest from "../../api";

export const getChannelDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: CHANNEL_DETAILS_REQUEST,
    });

    const { data } = await axiosRequest("/channels", {
      params: {
        part: "snippet,statistics,contentDetails",
        id: id,
      },
    });

    dispatch({
      type: CHANNEL_DETAILS_SUCCESS,
      payload: data?.items[0],
    });
  } catch (error) {
    dispatch({
      type: CHANNEL_DETAILS_FAIL,
      payload: error.response.data,
    });
  }
};

export const checkSubscriptionStatus = (id) => async (dispatch, getState) => {
  const { accessToken } = getState().userLogin;
  try {
    const { data } = await axiosRequest("/subscriptions", {
      params: {
        part: "snippet",
        forChannelId: id,
        mine: true,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log(data);
    dispatch({
      type: SET_SUBSCRIPTION_STATUS,
      payload: data?.items?.length !== 0,
    });
  } catch (error) {
    console.log(error, error.response);
    // dispatch({
    //   type: CHANNEL_DETAILS_FAIL,
    //   payload: error.response.data,
    // });
  }
};
