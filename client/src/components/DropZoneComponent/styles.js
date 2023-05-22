import styled from "styled-components";

const Wrapper = styled.div`
  margin-right: 20px;
  border: 1px solid lightgray;
  padding: 3px;
  @media (max-width: 768px) {
    margin-right: 0;
  }
`;

const DroppableArea = styled.div`
  height: 240px;
  border: 1px solid lightgray;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 20px;
  color: ${({ theme }) => theme.text};
  @media (max-width: 768px) {
    margin-bottom: 10px;
    padding: 40px;
    width: 275px;
    /* width: 100%; */
  }
`;

export { Wrapper, DroppableArea };
