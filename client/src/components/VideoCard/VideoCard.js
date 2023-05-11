import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChannelImage,
  ChannelName,
  Container,
  Details,
  Image,
  Info,
  Texts,
  Title,
} from "./styles";

function VideoCard({ video, type }) {
  const [channel, setChannel] = useState({
    name: "Pranav",
    img: "https://www.raisin.digital/wp-content/uploads/placeholder.svg",
  });
  return (
    <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
      <Container type={type}>
        <Image type={type} src={video.imgUrl} />
        <Details type={type}>
          <ChannelImage type={type} src={channel?.img} />
          <Texts>
            <Title>{video.title}</Title>
            <ChannelName>{channel.name}</ChannelName>
            <Info>{video.views} views • </Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
}

export default VideoCard;
