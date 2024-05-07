import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 500px;
  min-width: 800px;
  padding: 1rem;
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
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
  margin-bottom: auto;
`;

export const LowerSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: auto;
`;

export const UploadIconContainer = styled.div`
  width: 136px;
  height: 136px;
  background-color: #f9f9f9;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const UploadText = styled.p`
  font-size: 15px;
  color: #0d0d0d;
  margin-top: 23px;
`;

export const UploadSubText = styled.p`
  font-size: 13px;
  color: #606060;
  margin-top: 2px;
  margin-bottom: 26px;
`;
