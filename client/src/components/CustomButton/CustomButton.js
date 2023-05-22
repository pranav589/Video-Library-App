import React from "react";
import { Button } from "./styles";
import Loader from "../Loader/Loader";

function CustomButton({
  name = "",
  handleSubmit = () => {},
  loadingState = false,
}) {
  return loadingState ? (
    <Loader />
  ) : (
    <Button onClick={(e) => handleSubmit(e)}>{name}</Button>
  );
}

export default CustomButton;
