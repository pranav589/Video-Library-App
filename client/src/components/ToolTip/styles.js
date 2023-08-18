import styled from "styled-components";

const TooltipText = styled.div``;
const TooltipBox = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  left: 30px;
  visibility: hidden;
  color: transparent;
  background-color: transparent;
  width: max-content;
  padding: 5px 5px;
  border-radius: 4px;

  transition: visibility 0.5s, color 0.5s, background-color 0.5s, width 0.5s,
    padding 0.5s ease-in-out;

  &:before {
    content: "";
    width: 0;
    height: 0;
    left: 40px;
    top: -4px;
    position: absolute;

    border: 5px solid transparent;
    transform: rotate(135deg);
    transition: border 0.3s ease-in-out;
  }
`;
const TooltipCard = styled.div`
  position: relative;
  & ${TooltipText}:hover + ${TooltipBox} {
    visibility: visible;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.8);
    width: max-content;
    /* padding: 8px 8px; */

    &:before {
      border-color: transparent transparent rgba(0, 0, 0, 0.8)
        rgba(0, 0, 0, 0.8);
    }
  }
`;

export { TooltipBox, TooltipCard, TooltipText };
