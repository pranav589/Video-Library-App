import React from "react";
import { Frame, VideoWrapper } from "./styles";
import SkeletonVideoFrame from "../Skeleton/SkeletonVideoFrame";

function VideoFrame({ data, loadingState }) {
  if (loadingState) {
    return <SkeletonVideoFrame />;
  }
  return (
    <VideoWrapper>
      <Frame src={data?.videoURL} controls />
    </VideoWrapper>
  );
}

export default VideoFrame;
