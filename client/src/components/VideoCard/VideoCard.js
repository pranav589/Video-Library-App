import React from "react";
import { Link, useNavigate } from "react-router-dom";

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
import { Description } from "../VideoChannelInfo/styles";
import ToolTip from "../ToolTip/ToolTip";

function VideoCard({ video, type }) {
  const navigate = useNavigate();

  return (
    <Container type={type} onClick={() => navigate(`/video/${video?._id}`)}>
      <Image
        type={type}
        src={
          video?.thumbnail ||
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJyJH0SeRGusK8R1SOl7GRFNINb7yfyem7_OX9Wo7wZQ&s"
        }
      />
      <Details type={type}>
        <ChannelImage type={type} src={video?.author?.avatar} />
        <Texts>
          <Title>{video?.title}</Title>

          <ToolTip text={video?.author?.name}>
            <ChannelName
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/channelDetails/${video?.author?._id}`);
              }}
            >
              {video?.author?.name}
            </ChannelName>
          </ToolTip>

          <Info>
            {video.views} views • <DateFormatter date={video?.createdAt} />
          </Info>
          {type === "subscriptions-2" && (
            <Description>{video?.description}</Description>
          )}
        </Texts>
      </Details>
    </Container>
  );
}

export default VideoCard;
