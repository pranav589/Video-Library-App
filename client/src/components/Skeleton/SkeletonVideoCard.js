import React from "react";
import { Container, Details, Texts } from "../VideoCard/styles";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function SkeletonVideoCard({ type }) {
  return (
    <Container type={type}>
      <Skeleton
        width={type === "sm" ? 200 : 360}
        height={type === "sm" ? 120 : 202}
      />
      <Details type={type}>
        <Skeleton
          circle
          width={type === "sm" ? 20 : 36}
          height={type === "sm" ? 20 : 36}
        />
        <Texts>
          <Skeleton height={10} width={type === "sm" ? 140 : 200} />
          <Skeleton height={10} width={type === "sm" ? 140 : 200} />
        </Texts>
      </Details>
    </Container>
  );
}

export default SkeletonVideoCard;
