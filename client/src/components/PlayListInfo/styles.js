import styled from "styled-components";
import { AiOutlinePlayCircle } from "react-icons/ai";

const Container = styled.div`
  position: relative;
  width: 350px;
  height: 75vh;
  /* background-color: #f03d4e; */
  padding: 20px;
  overflow: hidden; /* Hide any overflow content */
  border-radius: 8px;
  @media (max-width: 768px) {
    height: 270px;
    border-radius: 0px;
    width: auto;
  }
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  filter: blur(13px); /* Apply the blur effect */
  opacity: 0.6;
`;

const BackgroundShade = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4); /* Semi-transparent background color */
`;

const Content = styled.div`
  position: relative;
  z-index: 1; /* Place the content above the blurred background */
  @media (max-width: 768px) {
    display: flex;
  }
`;

const VideoImage = styled.div`
  cursor: pointer;
  width: 100%;
  height: 175px;
  z-index: 100 !important;
  position: relative;
  &:hover {
    opacity: 0.7;
  }
  @media (max-width: 768px) {
    width: 200px;
    height: 175px;
  }
`;
const PlayButtonIcon = styled(AiOutlinePlayCircle)`
  position: absolute;
  top: 37%;
  left: 45%;
  z-index: 100;
  display: none;
  ${VideoImage}:hover & {
    display: block;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 8px;
`;

const PlayListInfoDetail = styled.div`
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
  }
`;

const PlayListName = styled.p`
  font-size: 24px;
  font-weight: 600;
  margin: 10px 0px 0px 0px !important;
  color: #fff;
`;

const User = styled.p`
  font-size: 16px;
  font-weight: 500;
  margin: 5px 0px 0px 0px !important;
  color: #fff;
`;

const VideoLength = styled.p`
  font-size: 12px;
  font-weight: 400;
  margin: 5px 0px 0px 0px !important;
  color: #fff;
`;

export {
  Container,
  VideoImage,
  Image,
  Background,
  BackgroundShade,
  Content,
  PlayListName,
  VideoLength,
  User,
  PlayListInfoDetail,
  PlayButtonIcon,
};
