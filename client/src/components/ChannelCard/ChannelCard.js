import React, { useContext, useEffect, useState } from "react";
import {
  ChannelSubVideoContainer,
  ChannelSubscribers,
  Container,
  Details,
  Hr,
  Image,
  Info,
  Texts,
  Title,
} from "./styles";
import SkeletonChannelCard from "../Skeleton/SkeletonChannelCard";
import { AuthContext } from "../../context/UserContext";
import SubscriptionButton from "../SubscriptionButton/SubscriptionButton";

function ChannelCard({
  type,
  channel,
  triggerChannelsCall,
  setTriggerChannelsCall,
  loadingState = false,
  videosLength,
}) {
  const userState = useContext(AuthContext);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscribeNumber, setSubscribeNumber] = useState(0);
  const [isUnSubscribeLoading, setIsUnSubscribeLoading] = useState(false);

  useEffect(() => {
    const validateIsSubscribed =
      userState?.userData?.Data?.user?.subscribedUsers?.some(
        (user) => user === channel?._id
      );
    if (validateIsSubscribed) {
      setIsSubscribed(true);
    }
    if (channel?.subscribeNumber) {
      setSubscribeNumber(channel?.subscribeNumber);
    }
  }, [
    channel?.subscribedUsers,
    channel?.subscribeNumber,
    userState?.userData?.Data?.user?._id,
  ]);

  const increaseSubscribeCount = () => {
    setSubscribeNumber((subscribeNumber) => subscribeNumber + 1);
  };

  const decreaseSubscribeCount = () => {
    setSubscribeNumber((subscribeNumber) => subscribeNumber - 1);
  };

  if (loadingState) {
    return <SkeletonChannelCard />;
  }

  return (
    <>
      <Container>
        <Image src={channel?.avatar} />
        <Details>
          <Texts>
            <Title>{channel?.name}</Title>
            <ChannelSubVideoContainer type={type}>
              <ChannelSubscribers>
                Subscribers-{subscribeNumber || 0}
              </ChannelSubscribers>

              <ChannelSubscribers>
                Videos-{videosLength || 0}
              </ChannelSubscribers>
            </ChannelSubVideoContainer>
            <Info>{channel?.description}</Info>
          </Texts>
        </Details>
        <div style={{ marginLeft: "auto" }}>
          <SubscriptionButton
            channelId={channel?._id}
            isSubscribed={isSubscribed}
            setIsSubscribed={setIsSubscribed}
            loadingState={isUnSubscribeLoading}
            setIsLoadingState={setIsUnSubscribeLoading}
            customSubscribeSuccessAction={increaseSubscribeCount}
            customUnsubscribeSuccessAction={decreaseSubscribeCount}
          />
        </div>
      </Container>
      <Hr />
    </>
  );
}

export default ChannelCard;
