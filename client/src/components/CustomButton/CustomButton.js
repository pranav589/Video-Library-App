import React from "react";
import { Button } from "./styles";
import Loader from "../Loader/Loader";
import SmallLoader from "../../SmallLoader/SmallLoader";

function CustomButton({
  name = "",
  handleSubmit = () => {},
  loadingState = false,
  type = "",
}) {
  return loadingState ? (
    type === "small" ? (
      <SmallLoader />
    ) : (
      <Loader />
    )
  ) : (
    <Button onClick={(e) => handleSubmit(e)}>{name}</Button>
  );
}

export default CustomButton;
