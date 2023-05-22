import React from "react";
import { Container, Date, Details, Name, Text } from "../Comment/styles";
import Skeleton from "react-loading-skeleton";

function SkeletonComment() {
  return (
    <Container>
      <Skeleton circle width={40} height={40} />
      <Details>
        <Name>
          <Skeleton width={100} height={15} />
          <Date>
            <Skeleton width={50} height={15} />
          </Date>
        </Name>
        <Text>
          <Skeleton width={150} height={15} />
        </Text>
      </Details>
    </Container>
  );
}

export default SkeletonComment;
