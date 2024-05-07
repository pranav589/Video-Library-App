import styled, { keyframes } from "styled-components";

const Reel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2.6rem;
  scroll-snap-align: start;
`;

const ReelVideo = styled.div`
  display: flex;
  position: relative;
`;

const Video = styled.div`
  position: relative;
  height: 80vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  border-radius: 10px;
  max-width: calc((9 / 16) * 80vh);
  background: #15161c;

  &:hover > .controls {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  &:hover > .foot {
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(3px);
  }

  .play-pause {
    position: absolute;
    top: 50%;
    cursor: pointer;
    background: #00000075;
    display: flex;
    width: 4rem;
    height: 4rem;
    left: 50%;
    opacity: 0;
    transform: translate(-50%, -50%) scale(0);
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
  }

  .show-play-pause {
    transform: translate(-50%, -50%) scale(1) !important;
    opacity: 1 !important;
  }
`;

const Controls = styled.div`
  position: absolute;
  top: 0;
  opacity: 0;
  visibility: hidden;
  padding: 1rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  border-radius: 10px;
  transition: all 0.2s;
  transform: translateY(-50px);
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.734), transparent);
`;

const Foot = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
  transition: all 0.2s;
  border-radius: 10px;

  img {
    border-radius: 50%;
    width: 36px;
    height: 36px;
    object-fit: cover;
  }
`;

const PlayPause = styled.div`
  position: absolute;
  top: 50%;
  cursor: pointer;
  background: #00000075;
  display: flex;
  width: 4rem;
  height: 4rem;
  left: 50%;
  opacity: 0;
  transform: translate(-50%, -50%) scale(0);
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
`;

const ShowPlayPause = styled.div`
  transform: translate(-50%, -50%) scale(1) !important;
  opacity: 1 !important;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.5rem;
  color: #fff;

  div {
    display: flex;
    align-items: center;
  }

  span {
    margin-left: 0.5rem;
  }
`;

const Title = styled.div`
  color: #fff;
`;

const Reaction = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-end;
  padding: 1rem;

  div {
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  div span {
    margin-top: 5px;
  }

  @media (max-width: 600px) {
    position: absolute;
    right: 0;
    bottom: 8rem;
    color: #fff;
  }
`;

const LikeAnimation = keyframes`
 0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

const DisLikeAnimation = keyframes`
 0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.5);
  }
  100% {
    transform: scale(1);
  }
`;

const Like = styled.div`
  color: #f81348;
  animation: ${LikeAnimation} 0.3s ease-in forwards;
  background: #f813482b;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DisLike = styled.div`
  animation: ${DisLikeAnimation} 0.17s ease-in reverse forwards;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export {
  Controls,
  DisLike,
  Foot,
  Like,
  PlayPause,
  ReelVideo,
  Title,
  Video,
  Reaction,
  UserInfo,
  Reel,
  ShowPlayPause,
};
