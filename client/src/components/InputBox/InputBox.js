import React from "react";
import { Input } from "./styles";

function InputBox({ name, type, onChange, value, placeholder, required }) {
  return (
    <Input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
    />
  );
}

export default InputBox;
