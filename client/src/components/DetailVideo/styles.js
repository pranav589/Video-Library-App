import styled from "styled-components";

const Container = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
    margin-top: 5px;
    padding: 0px 10px;
  }
`;

const Content = styled.div`
  flex: 5;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

export { Container, Content, Title, Hr };
