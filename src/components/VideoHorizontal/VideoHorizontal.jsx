import React, { useEffect, useState } from "react";
import moment from "moment";
import numeral from "numeral";
import { AiFillEye } from "react-icons/ai";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Col, Row } from "react-bootstrap";
import axiosRequest from "../../api";
import "./_VideoHorizontal.scss";
import { useHistory } from "react-router-dom";

const VideoHorizontal = ({ video }) => {
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
    },
  } = video;

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

    getVideoDetails();
  }, [id]);

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

  const viewRelatedVideoHandler = () => history.push(`/watch/${id.videoId}`);

  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");

  return (
    <Row
      className="videoHorizontal m-1 py-2 align-items-center"
      onClick={viewRelatedVideoHandler}
    >
      <Col lg={6} md={6} className="videoHorizontal__left">
        <LazyLoadImage
          src={medium.url}
          effect="blur"
          className="videoHorizontal__thumbnail"
          wrapperClassName="videoHorizontal__thumbnail__wrapper"
        />
        <span className="videoHorizontal__duration">{_duration}</span>
      </Col>
      <Col lg={6} md={6} className="videoHorizontal__right p-0">
        <p className="videoHorizontal__title mb-1">{title}</p>

        <div className="videoHorizontal__details">
          <AiFillEye /> {numeral(views).format("0.a")} Views
          {moment(publishedAt).fromNow()}
        </div>

        <div className="videoHorizontal__channel d-flex align-items-center my-1">
          {/*<LazyLoadImage src={FakeVideoImage} effect="blur" />*/}
          <p className="mb-0">{channelTitle}</p>
        </div>
      </Col>
    </Row>
  );
};

export default VideoHorizontal;