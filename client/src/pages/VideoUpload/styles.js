import styled from "styled-components";

const Container = styled.div`
  height: auto;
  padding: 20px 0px;
  max-width: 700px;
  margin: 20px auto;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    box-shadow: none;
  }
`;

const UploadContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  max-width: fit-content;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const SingleUploadWrapper = styled.div``;

const LowerContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 13%;
  @media (max-width: 768px) {
    margin: 20px 5%;
  }
`;

export { Container, UploadContainer, LowerContainer, SingleUploadWrapper };
