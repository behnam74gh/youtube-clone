import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Video from "../../components/Video/Video";
import { getVideosByChannel } from "../../redux/actions/video.action";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { getChannelDetails } from "../../redux/actions/channel.action";
import numeral from "numeral";
import "./_ChannelScreen.scss";

const ChannelScreen = () => {
  const { channelId } = useParams();

  const { videos, loading } = useSelector((state) => state.channelVideos);
  const { snippet, statistics } = useSelector(
    (state) => state.channelDetails.channel
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideosByChannel(channelId));

    dispatch(getChannelDetails(channelId));
  }, [dispatch, channelId]);

  return (
    <React.Fragment>
      <div className="px-5 py-2 my-2 d-flex justify-content-between align-items-center channelHeader">
        <div className="d-flex align-items-center channelHeader__left">
          <img src={snippet?.thumbnails?.default?.url} alt="" />

          <div className="channelHeader__details">
            <h3>{snippet?.title}</h3>

            <span>
              {numeral(statistics?.subscriberCount).format("0.a")} subscribers
            </span>
          </div>
        </div>

        <button>Subscribe</button>
      </div>

      <Container>
        <Row>
          {loading
            ? [...Array(20)].map((item, i) => (
                <Col md={4} lg={3} key={i}>
                  <SkeletonTheme baseColor="#343a40" highlightColor="#3c4147">
                    <Skeleton width="100%" height="140px" />
                  </SkeletonTheme>
                </Col>
              ))
            : videos?.map((item) => (
                <Col md={4} lg={3} key={item.id}>
                  <Video video={item} channelScreen />
                </Col>
              ))}
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default ChannelScreen;
