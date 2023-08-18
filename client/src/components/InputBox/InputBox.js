import React from "react";
import { Input } from "./styles";

function InputBox({
  name = "",
  type = "text",
  onChange = () => {},
  onKeyUp = () => {},
  value = "",
  placeholder = "",
  required = false,
}) {
  return (
    <Input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      onKeyUp={onKeyUp}
    />
  );
}

export default InputBox;
