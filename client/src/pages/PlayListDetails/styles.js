import styled from "styled-components";

const PlayListWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  gap: 50px;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    margin-top: 0px;
  }
`;

const VideoWrapper = styled.div`
  overflow: auto;
  @media (max-width: 768px) {
    padding: 0px 8px;
  }
`;

export { PlayListWrapper, VideoWrapper };
