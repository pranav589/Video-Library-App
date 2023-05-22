import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function SkeletonVideoFrame() {
  return (
    <div>
      <Skeleton width={"100%"} height={400} />
      <Skeleton width={300} height={15} style={{ marginTop: "10px" }} />
    </div>
  );
}

export default SkeletonVideoFrame;
