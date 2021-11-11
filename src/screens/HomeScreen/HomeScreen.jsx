import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import CategoriesBar from "../../components/CategoriesBar/CategoriesBar";
import Video from "../../components/Video/Video";
import "./_HomeScreen.scss";

const HomeScreen = () => {
  return (
    <Container>
      <CategoriesBar />
      <Row>
        {[...new Array(20)].map((item, i) => (
          <Col lg={3} md={4} key={i}>
            <Video />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HomeScreen;
