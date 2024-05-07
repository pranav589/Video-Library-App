import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 500px;
  min-width: 800px;
  padding: 1rem;
  position: relative;
`;

export const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.p`
  font-size: 20px;
  color: #212121;
  margin: 0px;
`;

export const Hr = styled.hr`
  margin: 9px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

export const LowerSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-bottom: auto;

  div > div > div {
    padding-top: 0px !important;
    top: 16px !important;
  }
`;

export const ButtonContainer = styled.div``;
