import styled from "styled-components";

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.div`
  color: ${({ theme }) => theme.text};
  font-size: 24px;
  font-weight: 600;
  margin-top: 10px;
  margin-left: 10px;
`;

const ViewContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ManageText = styled.p`
  font-size: 18px;
  color: #3d7bd8;
  font-weight: 600;
  cursor: pointer;
  margin-right: 25px;
`;

export { Title, Box, ViewContainer, ManageText };
