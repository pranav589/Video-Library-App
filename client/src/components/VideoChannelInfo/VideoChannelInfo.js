import React, { useContext, useEffect, useState } from "react";
import {
  Channel,
  ChannelCounter,
  ChannelDetail,
  ChannelInfo,
  ChannelName,
  Description,
  Image,
} from "./styles";
import SkeletonVideoChannelInfo from "../Skeleton/SkeletonVideoChannelInfo";
import { AuthContext } from "../../context/UserContext";
import SubscriptionButton from "../SubscriptionButton/SubscriptionButton";

function VideoChannelInfo({ data, loadingState }) {
  const token = localStorage.getItem("token");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [subscribeNumber, setSubscribeNumber] = useState(0);
  const userState = useContext(AuthContext);

  // const userState = useSelector((state) => state?.auth);
  useEffect(() => {
    const validateIsSubscribed =
      userState?.userData?.Data?.user?.subscribedUsers?.some(
        (user) => user === data?.author?._id
      );
    if (validateIsSubscribed) {
      setIsSubscribed(true);
    }
    if (data?.author?.subscribeNumber) {
      setSubscribeNumber(data?.author?.subscribeNumber);
    }
  }, [
    data?.author?.subscribedUsers,
    data?.author?.subscribeNumber,
    userState?.userData?.Data?.user?._id,
  ]);

  const increaseSubscribeCount = () => {
    setSubscribeNumber((subscribeNumber) => subscribeNumber + 1);
  };

  const decreaseSubscribeCount = () => {
    setSubscribeNumber((subscribeNumber) => subscribeNumber - 1);
  };

  if (loadingState) {
    return <SkeletonVideoChannelInfo />;
  }

  return (
    <Channel>
      <ChannelInfo>
        <Image src={data?.author?.avatar} />
        <ChannelDetail>
          <ChannelName>{data?.author?.name}</ChannelName>
          <ChannelCounter>{subscribeNumber} subscribers</ChannelCounter>
          <Description>{data?.description}</Description>
        </ChannelDetail>
      </ChannelInfo>
      <SubscriptionButton
        channelId={data?.author?._id}
        isSubscribed={isSubscribed}
        setIsSubscribed={setIsSubscribed}
        loadingState={isLoading}
        setIsLoadingState={setIsLoading}
        customSubscribeSuccessAction={increaseSubscribeCount}
        customUnsubscribeSuccessAction={decreaseSubscribeCount}
      />
    </Channel>
  );
}

export default VideoChannelInfo;
