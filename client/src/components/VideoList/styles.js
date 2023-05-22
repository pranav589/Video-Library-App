import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 20px;
  @media (max-width: 768px) {
    justify-content: center;
    align-items: center;
  }
`;

export { Container };
