import styled from "styled-components";

const ShortsContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 85vh;
  scroll-behavior: smooth;
  overflow-y: scroll;
  -webkit-scroll-snap-type: y mandatory;
  -ms-scroll-snap-type: y mandatory;
  scroll-snap-type: y mandatory;
  padding-top: 2rem;
  scroll-padding-top: 2rem;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export { ShortsContainer };
