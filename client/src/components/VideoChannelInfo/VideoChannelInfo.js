import React, { useEffect, useState } from "react";
import {
  Channel,
  ChannelCounter,
  ChannelDetail,
  ChannelInfo,
  ChannelName,
  Description,
  Image,
  Subscribe,
} from "./styles";
import SkeletonVideoChannelInfo from "../Skeleton/SkeletonVideoChannelInfo";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { apiCall } from "../../utils/apiCall";
import SmallLoader from "../../SmallLoader/SmallLoader";

function VideoChannelInfo({ data, loadingState }) {
  const token = localStorage.getItem("token");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [subscribeNumber, setSubscribeNumber] = useState(0);

  const userState = useSelector((state) => state?.auth);
  useEffect(() => {
    const validateIsSubscribed = userState?.user?.subscribedUsers?.some(
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
    userState?.user?._id,
  ]);

  const handleSubscribe = async () => {
    try {
      setIsLoading(true);
      const payload = {
        channelId: data?.author?._id,
        userId: userState?.user?._id,
      };
      const res = await apiCall("PUT", "channel/subscribe", token, payload);
      if (res?.data?.status === "success") {
        setIsLoading(false);
        setIsSubscribed(true);
        setSubscribeNumber((subscribeNumber) => subscribeNumber + 1);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.response?.data?.err);
    }
  };

  const handleUnsubscribe = async () => {
    try {
      setIsLoading(true);
      const payload = {
        channelId: data?.author?._id,
        userId: userState?.user?._id,
      };
      const res = await apiCall("PUT", "channel/unsubscribe", token, payload);
      if (res?.data?.status === "success") {
        setIsLoading(false);
        setSubscribeNumber((subscribeNumber) => subscribeNumber - 1);
        setIsSubscribed(false);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.response?.data?.err);
    }
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
      {isLoading ? (
        <div style={{ width: "10%" }}>
          <SmallLoader />
        </div>
      ) : isSubscribed ? (
        <Subscribe onClick={handleUnsubscribe}>SUBSCRIBED</Subscribe>
      ) : (
        <Subscribe onClick={handleSubscribe}>SUBSCRIBE</Subscribe>
      )}
    </Channel>
  );
}

export default VideoChannelInfo;
