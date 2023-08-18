import styled from "styled-components";

const Container = styled.div`
  display: ${(props) => props.from !== "playList" && "flex"};
  /* justify-content: space-between; */
  flex-wrap: wrap;
  margin-top: 20px;
  flex-direction: ${(props) => props.type === "subscriptions-2" && "column"};
  @media (max-width: 768px) {
    justify-content: center;
    align-items: center;
  }
`;

export { Container };
