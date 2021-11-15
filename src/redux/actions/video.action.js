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
import axiosRequest from "../../api";

export const getPopularVideos = () => async (dispatch, getState) => {
  const { nextPageToken } = getState().homeVideos;
  try {
    dispatch({
      type: HOME_VIDEO_REQUEST,
    });

    const { data } = await axiosRequest("/videos", {
      params: {
        part: "snippet,contentDetails,statistics",
        chart: "mostPopular",
        regionCode: "US",
        maxResults: 20,
        pageToken: nextPageToken,
      },
    });

    // console.log("=>", data);

    dispatch({
      type: HOME_VIDEO_SUCCESS,
      payload: {
        videos: data.items,
        nextPageToken: data.nextPageToken,
        category: "All",
      },
    });
  } catch (error) {
    console.log(error, error.message);
    dispatch({
      type: HOME_VIDEO_FAIL,
      payload: error.message,
    });
  }
};

export const getVideosByCategory = (keyword) => async (dispatch, getState) => {
  const { nextPageToken } = getState().homeVideos;
  try {
    dispatch({
      type: HOME_VIDEO_REQUEST,
    });

    const { data } = await axiosRequest("/search", {
      params: {
        part: "snippet",
        maxResults: 20,
        pageToken: nextPageToken,
        q: keyword,
        type: "video",
      },
    });

    console.log("=>", data);

    dispatch({
      type: HOME_VIDEO_SUCCESS,
      payload: {
        videos: data.items,
        nextPageToken: data.nextPageToken,
        category: keyword,
      },
    });
  } catch (error) {
    console.log(error, error.message);
    dispatch({
      type: HOME_VIDEO_FAIL,
      payload: error.message,
    });
  }
};

export const getVideoById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: SELECTED_VIDEO_REQUEST,
    });

    const { data } = await axiosRequest("/videos", {
      params: {
        part: "snippet,statistics",
        id: id,
      },
    });

    dispatch({
      type: SELECTED_VIDEO_SUCCESS,
      payload: data?.items[0],
    });
  } catch (error) {
    dispatch({
      type: SELECTED_VIDEO_FAIL,
      payload: error.message,
    });
  }
};

export const getRelatedVideos = (id) => async (dispatch) => {
  try {
    dispatch({
      type: RELATED_VIDEO_REQUEST,
    });

    const { data } = await axiosRequest("/search", {
      params: {
        part: "snippet",
        relatedToVideoId: id,
        maxResults: 15,
        type: "video",
      },
    });

    dispatch({
      type: RELATED_VIDEO_SUCCESS,
      payload: data?.items,
    });
  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: RELATED_VIDEO_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getVideosBySearch = (query) => async (dispatch) => {
  try {
    dispatch({
      type: SEARCH_VIDEO_REQUEST,
    });

    const { data } = await axiosRequest("/search", {
      params: {
        part: "snippet",
        maxResults: 20,
        q: query,
        type: "video,channel",
      },
    });

    console.log("=>", data);

    dispatch({
      type: SEARCH_VIDEO_SUCCESS,
      payload: data.items,
    });
  } catch (error) {
    console.log(error, error.message);
    dispatch({
      type: SEARCH_VIDEO_FAIL,
      payload: error.message,
    });
  }
};

export const getSubscribedChannels = () => async (dispatch, getState) => {
  const { accessToken } = getState().userLogin;

  try {
    dispatch({
      type: SUBSCRIPTIONS_CHANNEL_REQUEST,
    });

    const { data } = await axiosRequest("/subscriptions", {
      params: {
        part: "snippet,contentDetails",
        mine: true,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log("=>", data);

    dispatch({
      type: SUBSCRIPTIONS_CHANNEL_SUCCESS,
      payload: data.items,
    });
  } catch (error) {
    console.log(error, error.message);
    dispatch({
      type: SUBSCRIPTIONS_CHANNEL_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const getVideosByChannel = (id) => async (dispatch) => {
  try {
    dispatch({
      type: CHANNEL_VIDEOS_REQUEST,
    });

    // 1- get upload playlist id
    const {
      data: { items },
    } = await axiosRequest("/channels", {
      params: {
        part: "contentDetails",
        id: id,
      },
    });

    const uploadPlayList = items[0].contentDetails.relatedPlayLists.uploads;

    console.log("=>", items);

    // 2- get videos using the id
    const { data } = await axiosRequest("/playlistItems", {
      params: {
        part: "contentDetails,snippet",
        playlistId: uploadPlayList,
        maxResults: 30,
      },
    });

    dispatch({
      type: CHANNEL_VIDEOS_SUCCESS,
      payload: data.items,
    });
  } catch (error) {
    console.log(error, error.message, error.response.data.message);
    dispatch({
      type: CHANNEL_VIDEOS_FAIL,
      payload: error.response.data.message,
    });
  }
};
