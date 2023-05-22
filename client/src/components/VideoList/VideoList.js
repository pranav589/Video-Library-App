import React from "react";
import { Container } from "./styles";
import VideoCard from "../VideoCard/VideoCard";
import SkeletonVideoCard from "../Skeleton/SkeletonVideoCard";

function VideoList({ videos = [], type, loadingState }) {
  if (loadingState) {
    return (
      <Container>
        {videos.length === 0 && [1, 2, 3, 4].map((n) => <SkeletonVideoCard />)}
      </Container>
    );
  }

  if (videos?.length === 0) {
    return <p>No Videos Found</p>;
  }

  return (
    <Container>
      {videos?.map((video) => (
        <VideoCard video={video} type={type} />
      ))}
    </Container>
  );
}

export default VideoList;
