import styled from "styled-components";

const Container = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 20px;
  height: auto;
  @media (max-width: 768px) {
    flex-direction: column;
    margin-top: 5px;
    padding: 0px 10px;
  }
`;

export { Container };
