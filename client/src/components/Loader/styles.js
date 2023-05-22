import styled, { keyframes } from "styled-components";

const rotate = keyframes`
 0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const prixClipFix = keyframes`
 0% {
    clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0);
  }
  25% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0);
  }
  50% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%);
  }
  75% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%);
  }
  100% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 0);
  }
`;

const LoaderLayout = styled.span`
  width: 35px;
  height: 35px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 50%;
  position: relative;
  animation: ${rotate} 1s linear infinite;
  &:after {
    content: "";
    box-sizing: border-box;
    position: absolute;
    inset: 0px;
    border-radius: 50%;
    border: 3px solid #000;
    border-color: ${({ theme }) => theme.text};
    animation: ${prixClipFix} 2s linear infinite;
  }
  &:before {
    content: "";
    box-sizing: border-box;
    position: absolute;
    inset: 0px;
    border-radius: 50%;
    border: 3px solid #ff3d00;
    animation: ${prixClipFix} 2s linear infinite,
      rotate 0.5s linear infinite reverse;
    inset: 6px;
  }
`;
export { LoaderLayout };
