import React, { useContext } from "react";
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
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/UserContext";

function PlayListInfo({ data, videosLength = 0 }) {
  const userState = useContext(AuthContext);
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
          <User>{userState?.userData?.Data?.user?.name}</User>
          <VideoLength>{videosLength} videos</VideoLength>
        </PlayListInfoDetail>
      </Content>
    </Container>
  );
}

export default PlayListInfo;
