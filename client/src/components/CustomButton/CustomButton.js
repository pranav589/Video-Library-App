import React from "react";
import { Button } from "./styles";
import Loader from "../Loader/Loader";
import SmallLoader from "../../SmallLoader/SmallLoader";

function CustomButton({
  name = "",
  handleSubmit = () => {},
  loadingState = false,
  type = "",
  disabled = false,
}) {
  return loadingState ? (
    type === "small" ? (
      <SmallLoader />
    ) : (
      <Loader />
    )
  ) : (
    <Button onClick={(e) => handleSubmit(e)} disabled={disabled}>
      {name}
    </Button>
  );
}

export default CustomButton;
