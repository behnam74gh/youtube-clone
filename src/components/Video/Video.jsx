import React, { useEffect, useState } from "react";
import { AiFillEye } from "react-icons/ai";
import axiosRequest from "../../api";
import moment from "moment";
import numeral from "numeral";
import { LazyLoadImage } from "react-lazy-load-image-component";
// import FakeVideoImage from "../../assets/images/leon.jpg";
// import FakeVideoCompany from "../../assets/images/1byy.jpg";
import "./_Video.scss";
import { useHistory } from "react-router-dom";

const Video = ({ video, channelScreen }) => {
  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  const [channelIcon, setChannelIcon] = useState(null);

  const history = useHistory();

  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      title,
      publishedAt,
      thumbnails: { medium },
      contentDetails,
    },
  } = video;

  const _videoId = id?.videoId || contentDetails?.videoId || id;

  useEffect(() => {
    const getVideoDetails = async () => {
      const {
        data: { items },
      } = await axiosRequest("/videos", {
        params: {
          part: "contentDetails,statistics",
          id: _videoId,
        },
      });

      setDuration(items[0].contentDetails.duration);
      setViews(items[0].statistics.viewCount);
    };

    getVideoDetails();
  }, [_videoId]);

  useEffect(() => {
    const getChannelIcon = async () => {
      const {
        data: { items },
      } = await axiosRequest("/channels", {
        params: {
          part: "snippet",
          id: channelId,
        },
      });

      setChannelIcon(items[0].snippet.thumbnails.default);
    };

    getChannelIcon();
  }, [channelId]);

  const showVideoHandel = () => history.push(`/watch/${_videoId}`);

  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");

  return (
    <div className="video" onClick={showVideoHandel}>
      <div className="video__top">
        {/* <img src={medium.url} alt="video img" /> */}
        <LazyLoadImage src={medium.url} effect="blur" />
        <span className="video__top__duration">{_duration}</span>
      </div>
      <div className="video__title">
        {title || "create app in 5 minutes #made by behnam ghazaghi from iran"}
      </div>
      <div className="video__details">
        <span>
          <AiFillEye /> {numeral(views).format("0.a")} views
        </span>
        <span>{moment(publishedAt).fromNow()}</span>
      </div>
      {!channelScreen && (
        <div className="video__channel">
          {/* <img src={channelIcon?.url} alt="company" /> */}
          <LazyLoadImage src={channelIcon?.url} effect="blur" />
          <p>{channelTitle}</p>
        </div>
      )}
    </div>
  );
};

export default Video;
