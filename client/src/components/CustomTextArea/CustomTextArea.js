import React from "react";
import { TextArea } from "./styles";

function CustomTextArea({
  name,
  type,
  onChange,
  value,
  placeholder,
  required,
}) {
  return (
    <TextArea
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
    />
  );
}

export default CustomTextArea;
