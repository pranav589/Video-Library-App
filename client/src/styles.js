import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};
  min-height: 100vh;

  @media (max-width: 768px) {
    height: auto;
  }
`;

const Wrapper = styled.div`
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;
export { Container, Main, Wrapper };
