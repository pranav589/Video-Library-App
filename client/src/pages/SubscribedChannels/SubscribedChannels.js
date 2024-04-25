import React, { useContext, useEffect, useState } from "react";
import { Title } from "./styles";
import { toast } from "react-toastify";
import { apiCall } from "../../utils/apiCall";
import { useSelector } from "react-redux";
import ChannelCard from "../../components/ChannelCard/ChannelCard";
import SkeletonChannelCard from "../../components/Skeleton/SkeletonChannelCard";
import { AuthContext } from "../../context/UserContext";

function SubscribedChannels() {
  const [isLoading, setIsLoading] = useState(false);
  const [channels, setChannels] = useState([]);
  // const userState = useSelector((state) => state?.auth);
  const userState = useContext(AuthContext);
  const token = localStorage.getItem("token");
  const [triggerChannelsCall, setTriggerChannelsCall] = useState(false);

  useEffect(() => {
    if (userState?.userData?.Data?.user?._id) {
      const fetchSubscribedChanels = async () => {
        try {
          setIsLoading(true);
          const res = await apiCall(
            "GET",
            `channel/subscribedChannels/${userState?.userData?.Data?.user?._id}`,
            token
          );
          if (res?.data?.status === "success") {
            setChannels(res?.data?.Data);
            setIsLoading(false);
          }
        } catch (error) {
          toast.error(error?.response?.data?.err);
          setIsLoading(false);
        }
      };
      fetchSubscribedChanels();
    }
  }, [userState?.userData?.Data?.user?._id, token, triggerChannelsCall]);

  if (isLoading) {
    return [1, 2, 3].map(() => <SkeletonChannelCard />);
  }

  return (
    <>
      <Title>Subscribed Channels</Title>
      {channels?.length === 0 && <Title>No channel is subscribed.</Title>}
      {channels?.map((channel) => (
        <ChannelCard
          key={channel?._id}
          channel={channel}
          setTriggerChannelsCall={setTriggerChannelsCall}
          triggerChannelsCall={triggerChannelsCall}
        />
      ))}
    </>
  );
}

export default SubscribedChannels;
