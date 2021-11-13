import React, { useEffect } from "react";
import { Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CategoriesBar from "../../components/CategoriesBar/CategoriesBar";
import Video from "../../components/Video/Video";
import {
  getPopularVideos,
  getVideosByCategory,
} from "../../redux/actions/video.action";
import InfiniteScroll from "react-infinite-scroll-component";
import SkeletonVideos from "../../components/skeletons/SkeletonVideos";
import "./_HomeScreen.scss";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const { videos, activeCategory, loading } = useSelector(
    (state) => state.homeVideos
  );

  useEffect(() => {
    dispatch(getPopularVideos());
  }, [dispatch]);

  const fetchDataHandler = () => {
    if (activeCategory === "All") {
      dispatch(getPopularVideos());
    } else {
      dispatch(getVideosByCategory(activeCategory));
    }
  };

  return (
    <Container>
      <CategoriesBar />
      <InfiniteScroll
        dataLength={videos.length}
        next={fetchDataHandler}
        hasMore={true}
        loader={
          <div className="spinner-border text-danger d-block mx-auto"></div>
        }
        className="row"
      >
        {loading ? (
          [...Array(20)].map((item, i) => (
            <Col lg={3} md={4} key={i}>
              <SkeletonVideos />
            </Col>
          ))
        ) : videos?.length > 0 ? (
          videos.map((item) => (
            <Col lg={3} md={4} key={item.id?.videoId || item.id}>
              <Video video={item} />
            </Col>
          ))
        ) : (
          <h2>there is no video</h2>
        )}
      </InfiniteScroll>
    </Container>
  );
};

export default HomeScreen;
