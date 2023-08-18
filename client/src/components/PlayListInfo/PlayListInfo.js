import React from "react";
import {
  Background,
  BackgroundShade,
  Container,
  Content,
  Image,
  PlayButtonIcon,
  PlayListInfoDetail,
  PlayListName,
  User,
  VideoImage,
  VideoLength,
} from "./styles";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function PlayListInfo({ data, videosLength = 0 }) {
  const userState = useSelector((state) => state?.auth);
  const queryParameters = new URLSearchParams(window.location.search);
  const name = queryParameters.get("name");
  const navigate = useNavigate();

  return (
    <Container>
      <Background style={{ backgroundImage: `url(${data?.thumbnail})` }} />
      <BackgroundShade />
      <Content>
        <VideoImage onClick={() => navigate(`/video/${data?._id}`)}>
          <Image alt={data?.title} src={data?.thumbnail} />
          <PlayButtonIcon size={40} className="playIcon" />
        </VideoImage>

        <PlayListInfoDetail>
          <PlayListName>{name}</PlayListName>
          <User>{userState?.user?.name}</User>
          <VideoLength>{videosLength} videos</VideoLength>
        </PlayListInfoDetail>
      </Content>
    </Container>
  );
}

export default PlayListInfo;
