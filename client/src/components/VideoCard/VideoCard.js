import React from "react";
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
import DateFormatter from "../DateFormatter/DateFormatter";

function VideoCard({ video, type }) {
  return (
    <Link to={`/video/${video?._id}`} style={{ textDecoration: "none" }}>
      <Container type={type}>
        <Image type={type} src={video?.thumbnail} />
        <Details type={type}>
          <ChannelImage type={type} src={video?.author?.avatar} />
          <Texts>
            <Title>{video.title}</Title>
            <ChannelName>{video?.author?.name}</ChannelName>
            <Info>
              {/* {video.views} views • <DateFormatter date={video?.updatedAt} /> */}
            </Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
}

export default VideoCard;
