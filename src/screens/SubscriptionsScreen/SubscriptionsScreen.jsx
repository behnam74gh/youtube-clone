import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import VideoHorizontal from "../../components/VideoHorizontal/VideoHorizontal";
import { getSubscribedChannels } from "../../redux/actions/video.action";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const SubscriptionsScreen = () => {
  const { videos, loading } = useSelector(
    (state) => state.subscriptionsChannel
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSubscribedChannels());
  }, [dispatch]);

  return (
    <Container fluid>
      {loading ? (
        <SkeletonTheme baseColor="#343a40" highlightColor="#3c4147">
          <Skeleton width="100%" height="170px" count={20} />
        </SkeletonTheme>
      ) : (
        videos?.map((item) => (
          <VideoHorizontal key={item.id} video={item} subScreen />
        ))
      )}
    </Container>
  );
};

export default SubscriptionsScreen;
