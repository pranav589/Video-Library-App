import styled from "styled-components";

const PlayListsData = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

const Text = styled.p`
  font-size: 20px;
  margin: 0;
  margin-left: 5px;
  margin-bottom: 10px;
`;

const PlayListButtons = styled.div`
  display: flex;
  align-items: flex-start;
`;

export { PlayListButtons, PlayListsData, Text };
