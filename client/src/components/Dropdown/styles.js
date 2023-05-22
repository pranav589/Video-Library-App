import styled, { css } from "styled-components";

const SelectContainer = styled.div`
  position: relative;
  margin: 0;
`;

const SelectLabelButton = styled.button`
  color: #757575;
  display: flex;
  justify-content: space-between;
  max-width: 100%;
  padding: 11px 13px;
  background: #f9f9fa;
  width: 100%;
  cursor: pointer;
  margin-bottom: 0.9rem;
  border-radius: 4px;
  outline: 0;
  border: 1px solid rgba(245, 245, 245, 0.7);
  font-size: 14px;
  transition: all 0.3s ease-out;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.1);
  :focus,
  :hover {
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.15), 0 1px 5px rgba(0, 0, 0, 0.1);
  }
`;

const DropdownStyle = styled.div`
  z-index: 10;
  position: absolute;
  top: 80%;
  left: 0;
  max-height: 60px;
  min-width: 98%;
  padding: 0.4rem;
  display: flex;
  flex-direction: column;
  background: #fafafa;
  border: 1px solid rgba(245, 245, 245, 0.7);
  transition: all 0.3s ease-out;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.1);
  :focus,
  :hover {
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.15), 0 1px 5px rgba(0, 0, 0, 0.1);
  }
  transition: max-height 0.2s ease;
  overflow: auto;
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  ::-webkit-scrollbar-thumb {
    background: #888;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  ${(p) =>
    p.isVisible !== true &&
    css`
      max-height: 40px;
      visibility: hidden;
    `}
`;

const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  width: 95%;
  margin: 0.15rem 0;
  padding: 0.3rem 0.5rem;
  font-size: 14px;
  cursor: pointer;
  ${(p) =>
    p.active &&
    css`
      color: #f03d4e;
      background: #f9f9fa;
      font-weight: 500;
    `}
  &:hover, :focus, :focus:hover {
    background-color: #f03d4e;
    color: #fafafa;
    outline: none;
  }
`;

const IconButton = styled.div``;

export {
  SelectContainer,
  SelectLabelButton,
  DropdownItem,
  DropdownStyle,
  IconButton,
};
