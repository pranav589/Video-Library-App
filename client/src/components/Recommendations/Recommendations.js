import React, { useState } from "react";
import { Container } from "./styles";
import VideoCard from "../VideoCard/VideoCard";
import SkeletonVideoCard from "../Skeleton/SkeletonVideoCard";

function Recommendations() {
  const [isLoading, setIsLoading] = useState(true);
  const [videos, setVideos] = useState([
    {
      thumbnail:
        "https://firebasestorage.googleapis.com/v0/b/clone-771cc.appspot.com/o/thumbnails%2F645ce22c6cf52f5ea0fd1ff6%2F1684386412638photo_6264781427459601977_y.jpg?alt=media&token=a58ddda9-7f42-4eca-b1c2-116c7f275f93",
      title: "hello",
      description: "world",
    },
  ]);

  if (isLoading) {
    return (
      <Container>
        {[1, 2, 3, 4].map((v) => (
          <SkeletonVideoCard type={"sm"} />
        ))}
      </Container>
    );
  }

  return (
    <Container>
      {videos.map((video) => (
        <VideoCard type="sm" key={video._id} video={video} />
      ))}
    </Container>
  );
}

export default Recommendations;
