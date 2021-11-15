import React, { useEffect, useState } from "react";
import moment from "moment";
import numeral from "numeral";
import { AiFillEye } from "react-icons/ai";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Col, Row } from "react-bootstrap";
import axiosRequest from "../../api";
import "./_VideoHorizontal.scss";
import { useHistory } from "react-router-dom";

const VideoHorizontal = ({ video, searchScreen, subScreen }) => {
  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  const [channelIcon, setChannelIcon] = useState(null);

  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      description,
      title,
      publishedAt,
      thumbnails: { medium },
      resourceId,
    },
  } = video;

  const isVideo = id.kind === "youtube#video" || subScreen;

  const history = useHistory();

  useEffect(() => {
    const getVideoDetails = async () => {
      const {
        data: { items },
      } = await axiosRequest("/videos", {
        params: {
          part: "contentDetails,statistics",
          id: id.videoId,
        },
      });

      setDuration(items[0].contentDetails.duration);
      setViews(items[0].statistics.viewCount);
    };

    if (isVideo) {
      getVideoDetails();
    }
  }, [id, isVideo]);

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

  const _channelId = resourceId?.channelId || channelId;

  const viewRelatedVideoHandler = () => {
    isVideo
      ? history.push(`/watch/${id.videoId}`)
      : history.push(`/channel/${_channelId}`);
  };

  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");

  return (
    <Row
      className="videoHorizontal m-1 py-2 align-items-center"
      onClick={viewRelatedVideoHandler}
    >
      <Col
        lg={6}
        md={searchScreen || subScreen ? 4 : 6}
        className="videoHorizontal__left"
      >
        <LazyLoadImage
          src={medium.url}
          effect="blur"
          className={`videoHorizontal__thumbnail ${
            !isVideo && "videoHorizontal__thumbnail__channel"
          }`}
          wrapperClassName="videoHorizontal__thumbnail__wrapper"
        />
        {isVideo && (
          <span className="videoHorizontal__duration">{_duration}</span>
        )}
      </Col>
      <Col
        lg={6}
        md={searchScreen || subScreen ? 8 : 6}
        className="videoHorizontal__right p-0"
      >
        <p className="videoHorizontal__title mb-1">{title}</p>

        {isVideo && (
          <div className="videoHorizontal__details">
            <AiFillEye /> {numeral(views).format("0.a")} Views
            {moment(publishedAt).fromNow()}
          </div>
        )}

        {isVideo && (searchScreen || subScreen) && (
          <p className="mt-1 videoHorizontal__desc">{description}</p>
        )}

        <div className="videoHorizontal__channel d-flex align-items-center my-1">
          {isVideo && <LazyLoadImage src={channelIcon?.url} effect="blur" />}
          <p className="mb-0">{channelTitle}</p>
        </div>
        {subScreen && <p>{video.contentDetails.totalItemCount} Videos</p>}
      </Col>
    </Row>
  );
};

export default VideoHorizontal;
