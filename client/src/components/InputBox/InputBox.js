import React from "react";
import { Input } from "./styles";

function InputBox({ name, type, onChange, value }) {
  return (
    <Input
      type="password"
      name="password"
      // value={dados.password}
      // onChange={handleChange}
    />
  );
}

export default InputBox;
