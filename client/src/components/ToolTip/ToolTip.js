import React from "react";
import { TooltipBox, TooltipCard, TooltipText } from "./styles";

function ToolTip(props) {
  const { children, text } = props;
  return (
    <>
      <TooltipCard>
        <TooltipText>{children}</TooltipText>
        <TooltipBox>{text}</TooltipBox>
      </TooltipCard>
    </>
  );
}

export default ToolTip;
