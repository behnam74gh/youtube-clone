import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import VideoHorizontal from "../../components/VideoHorizontal/VideoHorizontal";
import { getVideosBySearch } from "../../redux/actions/video.action";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const SearchScreen = () => {
  const { query } = useParams();

  const { videos, loading } = useSelector((state) => state.searchedVideos);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideosBySearch());
  }, [query, dispatch]);
  return (
    <Container>
      {loading ? (
        <SkeletonTheme baseColor="#343a40" highlightColor="#3c4147">
          <Skeleton width="100%" height="170px" count={20} />
        </SkeletonTheme>
      ) : (
        videos?.map((item) => (
          <VideoHorizontal key={item.id.videoId} video={item} searchScreen />
        ))
      )}
    </Container>
  );
};

export default SearchScreen;
