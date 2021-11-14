import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Comments from "../../components/Comments/Comments";
import VideoHorizontal from "../../components/VideoHorizontal/VideoHorizontal";
import VideoMetaData from "../../components/VideoMetaData/VideoMetaData";
import {
  getRelatedVideos,
  getVideoById,
} from "../../redux/actions/video.action";
import "./_WatchScreen.scss";

const WatchScreen = () => {
  const { id } = useParams();

  const { loading, video } = useSelector((state) => state.selectedVideo);
  const { loading: relatedVideosLoading, videos } = useSelector(
    (state) => state.relatedVideos
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideoById(id));

    dispatch(getRelatedVideos(id));
  }, [dispatch, id]);

  return (
    <Row>
      <Col lg={8}>
        <div className="watchScreen__player">
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            frameBorder="0"
            title={video?.snippet?.title || "My Video"}
            allowFullScreen
            width="100%"
            height="100%"
          ></iframe>
        </div>

        {loading ? (
          <h5>Loading..</h5>
        ) : (
          <VideoMetaData video={video} videoId={id} />
        )}

        <Comments
          videoId={id}
          totalComments={video?.statistics?.commentCount}
        />
      </Col>

      <Col lg={4}>
        {relatedVideosLoading ? (
          <SkeletonTheme baseColor="#343a40" highlightColor="#3c4147">
            <Skeleton width="100%" height="125px" count={15} />
          </SkeletonTheme>
        ) : (
          videos
            ?.filter((video) => video.snippet)
            .map((item) => (
              <VideoHorizontal
                video={item}
                key={item.id.videoId}
                searchScreen={false}
              />
            ))
        )}
      </Col>
    </Row>
  );
};

export default WatchScreen;
