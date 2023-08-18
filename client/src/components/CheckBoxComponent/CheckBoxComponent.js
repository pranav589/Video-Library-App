import React from "react";
import {
  CheckboxContainer,
  HiddenCheckbox,
  Icon,
  StyledCheckbox,
} from "./styles";

function CheckBoxComponent({ value, checked, ...props }) {
  return (
    <CheckboxContainer>
      <HiddenCheckbox value={value} {...props} />
      <StyledCheckbox checked={checked}>
        <Icon viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12" />
        </Icon>
      </StyledCheckbox>
    </CheckboxContainer>
  );
}

export default CheckBoxComponent;
