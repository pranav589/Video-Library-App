import styled, { keyframes } from "styled-components";

const rotate = keyframes`
     0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }

`;

const SmallLoaderLayout = styled.span`
  width: 20px;
  height: 20px;
  border: 3px solid #eb3c4c;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: ${rotate} 1s linear infinite;
`;
export { SmallLoaderLayout };
