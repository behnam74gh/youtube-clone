import {
  HOME_VIDEO_REQUEST,
  HOME_VIDEO_SUCCESS,
  HOME_VIDEO_FAIL,
} from "../types/video.type";
// import axiosRequest from "../../api";

export const getPopularVideos = () => async (dispatch) => {
  try {
    dispatch({
      type: HOME_VIDEO_REQUEST,
    });

    // const {data} = await axiosRequest("/videos", {
    //   params: {
    //     part: "snippet,contentDetails,statistics",
    //     chart: "mostPopular",
    //     regionCode: "IR",
    //     maxResults: 20,
    //     pageToken: "",
    //   },
    // });

    // console.log(res);

    // dispatch({
    //   type: HOME_VIDEO_SUCCESS,
    //   payload: {
    //       videos: data.items,
    //       nextPageToken: data.nextPageToken
    //   },
    // });
  } catch (error) {
    dispatch({
      type: HOME_VIDEO_FAIL,
      payload: error.message,
    });
  }
};
