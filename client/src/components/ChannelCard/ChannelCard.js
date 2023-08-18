import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChannelImage,
  ChannelName,
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
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import SkeletonChannelCard from "../Skeleton/SkeletonChannelCard";

function ChannelCard({
  type,
  channel,
  triggerChannelsCall,
  setTriggerChannelsCall,
  loadingState = false,
  videosLength,
}) {
  const userState = useSelector((state) => state?.auth);
  const token = localStorage.getItem("token");
  const [isUnSubscribeLoading, setIsUnSubscribeLoading] = useState(false);
  const handleUnsubscribe = async (e) => {
    e.stopPropagation();
    try {
      setIsUnSubscribeLoading(true);
      const payload = {
        channelId: channel._id,
        userId: userState?.user?._id,
      };
      const res = await apiCall("PUT", "channel/unsubscribe", token, payload);
      if (res?.data?.status === "success") {
        setIsUnSubscribeLoading(false);
        setTriggerChannelsCall(!triggerChannelsCall);
      }
    } catch (error) {
      setIsUnSubscribeLoading(false);
      toast.error(error?.response?.data?.err);
    }
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
                Subscribers-{channel?.subscribeNumber || 0}
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
            name={"Subscribed"}
            handleSubmit={(e) => handleUnsubscribe(e)}
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
