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
import CustomButton from "../CustomButton/CustomButton";
import { apiCall } from "../../utils/apiCall";
import { toast } from "react-toastify";
import SkeletonChannelCard from "../Skeleton/SkeletonChannelCard";
import { AuthContext } from "../../context/UserContext";

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

  const token = localStorage.getItem("token");
  const [isUnSubscribeLoading, setIsUnSubscribeLoading] = useState(false);
  const handleUnsubscribe = async (e) => {
    e.stopPropagation();
    try {
      setIsUnSubscribeLoading(true);
      const payload = {
        channelId: channel._id,
        userId: userState?.userData?.Data?.user?._id,
      };
      const res = await apiCall("PUT", "channel/unsubscribe", token, payload);
      if (res?.data?.status === "success") {
        setIsUnSubscribeLoading(false);
        setIsSubscribed(false);
        // setTriggerChannelsCall(!triggerChannelsCall);
        setSubscribeNumber((subscribeNumber) => subscribeNumber - 1);
      }
    } catch (error) {
      setIsUnSubscribeLoading(false);
      toast.error(error?.response?.data?.err);
    }
  };

  const handleSubscribe = async () => {
    try {
      setIsUnSubscribeLoading(true);
      const payload = {
        channelId: channel?._id,
        userId: userState?.userData?.Data?.user?._id,
      };
      const res = await apiCall("PUT", "channel/subscribe", token, payload);
      if (res?.data?.status === "success") {
        setIsUnSubscribeLoading(false);
        setIsSubscribed(true);
        setSubscribeNumber((subscribeNumber) => subscribeNumber + 1);
      }
    } catch (error) {
      setIsUnSubscribeLoading(false);
      toast.error(error?.response?.data?.err);
    }
  };

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
          <CustomButton
            name={isSubscribed ? "Subscribed" : "Subscribe"}
            handleSubmit={(e) => {
              isSubscribed ? handleUnsubscribe(e) : handleSubscribe(e);
            }}
            loadingState={isUnSubscribeLoading}
            type={"small"}
          />
        </div>
      </Container>
      <Hr />
    </>
  );
}

export default ChannelCard;
