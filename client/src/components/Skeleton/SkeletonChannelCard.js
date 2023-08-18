import React from "react";
import {
  ChannelSubVideoContainer,
  ChannelSubscribers,
  Container,
  Details,
  Info,
  Texts,
  Title,
} from "../ChannelCard/styles";
import Skeleton from "react-loading-skeleton";

function SkeletonChannelCard() {
  return (
    <>
      <Container>
        <Skeleton circle width={150} height={150} />
        <Details>
          <Texts>
            <Title>
              <Skeleton width={150} height={20} />
            </Title>
            <ChannelSubVideoContainer>
              <ChannelSubscribers>
                <Skeleton width={100} height={15} />
              </ChannelSubscribers>

              <ChannelSubscribers>
                <Skeleton width={100} height={15} />
              </ChannelSubscribers>
            </ChannelSubVideoContainer>
            <Info>
              <Skeleton width={200} height={15} />
              <Skeleton width={200} height={15} />
            </Info>
          </Texts>
        </Details>
        <div style={{ marginLeft: "auto" }}>
          <Skeleton width={70} height={40} />
        </div>
      </Container>
    </>
  );
}

export default SkeletonChannelCard;
