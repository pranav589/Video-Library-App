import styled from "styled-components";

const PreviewImage = styled.img`
  height: 275px;
  width: 250px;
`;

const PreviewVideo = styled.video`
  height: 275px;
  width: 250px;
  margin: auto;
`;

const PreviewCardWrapper = styled.div`
  position: relative;
`;

const Badge = styled.div`
  z-index: 10;
  position: absolute;
  top: 0;
  right: 0;
  background-color: #f03d4e;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
`;

export { PreviewImage, PreviewVideo, PreviewCardWrapper, Badge };
