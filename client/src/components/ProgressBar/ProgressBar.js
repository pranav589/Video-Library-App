import React from "react";
import { Container } from "./styles";

function ProgressBar({ value, max, color, width }) {
  return (
    <Container color={color} width={width}>
      <progress value={value} max={max} />
    </Container>
  );
}

export default ProgressBar;
