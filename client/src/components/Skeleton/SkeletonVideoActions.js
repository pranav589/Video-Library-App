import React from "react";
import { Button, Buttons, Details, Info } from "../VideoActions/styles";
import Skeleton from "react-loading-skeleton";

function SkeletonVideoActions() {
  return (
    <Details>
      <Info>
        <Skeleton width={100} height={15} />
      </Info>
      <Buttons>
        <Button>
          <Skeleton circle width={20} height={20} />
        </Button>
        <Button>
          <Skeleton circle width={20} height={20} />
        </Button>
        <Button>
          <Skeleton circle width={20} height={20} />
        </Button>
        <Button>
          <Skeleton circle width={20} height={20} />
        </Button>
      </Buttons>
    </Details>
  );
}

export default SkeletonVideoActions;
