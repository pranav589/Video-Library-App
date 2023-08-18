import styled from "styled-components";
const Tabs = styled.div`
  overflow-x: auto;
  border-bottom: 1px solid;
  border-color: #d3d3d3;
  height: 3em;
  display: flex;
`;

const Tab = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  width: 50%;
  position: relative;
  color: ${(props) => (props.active ? "#fff" : "#000")};
  margin-right: 0.1em;
  font-size: 1em;
  border: ${(props) => (props.active ? "1px solid #ccc" : "")};
  /* border-bottom: ${(props) => (props.active ? "none" : "")}; */
  background-color: ${(props) => (props.active ? "#f03d4e" : "#fff")};
  height: 2.6em;
  transition: background-color 0.5s ease-in-out;

  :hover {
    background-color: #f03d4e;
    color: #fff;
  }
`;
const Content = styled.div`
  ${(props) => (props.active ? "" : "display:none")}
`;

export { Tab, Tabs, Content };
