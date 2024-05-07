import React from "react";
import { Container } from "./styles";
import VideoCard from "../VideoCard/VideoCard";
import SkeletonVideoCard from "../Skeleton/SkeletonVideoCard";

function VideoList({
  videos = [],
  type = "",
  loadingState = false,
  from = "",
}) {
  if (loadingState) {
    return (
      <Container type={type} from={from}>
        {videos.length === 0 &&
          [1, 2, 3, 4].map((n) => <SkeletonVideoCard type={type} />)}
      </Container>
    );
  }

  if (videos?.length === 0) {
    return <p>No Videos Found</p>;
  }

  return (
    <Container type={type} from={from}>
      {videos?.map((video) => (
        <VideoCard video={video?.video || video} type={type} />
      ))}
    </Container>
  );
}

export default VideoList;
