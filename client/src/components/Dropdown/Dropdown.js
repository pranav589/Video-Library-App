import React, { useState } from "react";
import {
  DropdownItem,
  DropdownStyle,
  SelectContainer,
  SelectLabelButton,
  IconButton,
} from "./styles";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";

function Dropdown({ label, values, onChange }) {
  const [currentValue, setCurrentValue] = useState("");
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleValueChange = (value) => {
    setCurrentValue(value);
  };
  const handleChange = (value) => {
    handleValueChange(value);
    // call method, if it exists
    if (onChange) onChange(value);
    // close, after all tasks are finished
    handleClose();
  };
  return (
    <SelectContainer>
      <SelectLabelButton onClick={() => setOpen(!open)}>
        {currentValue !== "" ? currentValue : label}
        <IconButton>
          <MdOutlineArrowDropDownCircle size={20} />
        </IconButton>
      </SelectLabelButton>
      <DropdownStyle isVisible={open}>
        {values.map((value, index) => (
          <DropdownItem
            onClick={() => handleChange(value)}
            active={value === currentValue}
            key={index}
          >
            {value}
          </DropdownItem>
        ))}
      </DropdownStyle>
    </SelectContainer>
  );
}

export default Dropdown;
