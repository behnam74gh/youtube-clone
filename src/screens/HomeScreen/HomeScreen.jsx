import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CategoriesBar from "../../components/CategoriesBar/CategoriesBar";
import Video from "../../components/Video/Video";
import { getPopularVideos } from "../../redux/actions/video.action";
import "./_HomeScreen.scss";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const { videos } = useSelector((state) => state.homeVideos);

  useEffect(() => {
    dispatch(getPopularVideos());
  }, [dispatch]);

  return (
    <Container>
      <CategoriesBar />
      <Row>
        {videos?.length > 0 ? (
          videos.map((item) => (
            <Col lg={3} md={4} key={item.id}>
              <Video video={item} />
            </Col>
          ))
        ) : (
          <h2>there is no video</h2>
        )}
      </Row>
    </Container>
  );
};

export default HomeScreen;
