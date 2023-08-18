import styled from "styled-components";

const Wrapper = styled.div`
  /* position: relative; */
`;

const Search = styled.div`
  width: 40%;
  height: 30px;
  position: absolute;
  left: 0px;
  right: 0px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 30px;
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};
  ::placeholder,
  ::-webkit-input-placeholder {
    font-size: 16px;
    padding-left: 10px;
  }
`;

const DropDown = styled.ul`
  list-style: none;
  padding: 0;
  background-color: #fff;
  position: absolute;
  width: 40%;
  margin: 0;
  border-radius: 0 0 2px 2px;
  border-top: 1px solid #e0e0e0;
  z-index: 9;
  top: 60px;
  left: 30%;
  box-shadow: 2px 3px 5px -1px rgba(0, 0, 0, 0.5);
`;

const DropDownItem = styled.li`
  padding: 8px 16px 8px 8px;
  cursor: pointer;
`;

const LightText = styled.span`
  color: #5a5a5a;
`;

const BoldText = styled.span`
  font-weight: 600;
`;

export { Search, Input, DropDown, DropDownItem, Wrapper, LightText, BoldText };
