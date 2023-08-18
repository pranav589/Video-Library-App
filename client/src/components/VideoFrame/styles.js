import styled from "styled-components";

const VideoWrapper = styled.div`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`;

const Frame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`;

export { Frame, VideoWrapper };
