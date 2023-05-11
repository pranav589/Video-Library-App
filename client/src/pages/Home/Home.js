import React, { useState } from "react";
import { Container } from "./styles";
import VideoCard from "../../components/VideoCard/VideoCard";

function Home({ type }) {
  const [videos, setVideos] = useState([
    {
      _id: "123",
      imgUrl: "https://www.raisin.digital/wp-content/uploads/placeholder.svg",
      title: "Test Video",
      views: 123,
    },
    {
      _id: "123",
      imgUrl: "https://www.raisin.digital/wp-content/uploads/placeholder.svg",
      title: "Test Video",
      views: 123,
    },
    {
      _id: "123",
      imgUrl: "https://www.raisin.digital/wp-content/uploads/placeholder.svg",
      title: "Test Video",
      views: 123,
    },
    {
      _id: "123",
      imgUrl: "https://www.raisin.digital/wp-content/uploads/placeholder.svg",
      title: "Test Video",
      views: 123,
    },
    {
      _id: "123",
      imgUrl: "https://www.raisin.digital/wp-content/uploads/placeholder.svg",
      title: "Test Video",
      views: 123,
    },
    {
      _id: "123",
      imgUrl: "https://www.raisin.digital/wp-content/uploads/placeholder.svg",
      title: "Test Video",
      views: 123,
    },
    {
      _id: "123",
      imgUrl: "https://www.raisin.digital/wp-content/uploads/placeholder.svg",
      title: "Test Video",
      views: 123,
    },
  ]);
  return (
    <Container>
      {videos?.map((video) => (
        <VideoCard video={video} type={type} />
      ))}
    </Container>
  );
}

export default Home;
