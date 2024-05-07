import React, { useContext } from "react";
import CustomButton from "../CustomButton/CustomButton";
import { AuthContext } from "../../context/UserContext";
import { apiCall } from "../../utils/apiCall";
import { toast } from "react-toastify";

function SubscriptionButton({
  channelId,
  isSubscribed,
  setIsSubscribed,
  loadingState,
  setIsLoadingState,
  customSubscribeSuccessAction = () => {},
  customUnsubscribeSuccessAction = () => {},
}) {
  const userState = useContext(AuthContext);
  const token = localStorage.getItem("token");
  const handleUnsubscribe = async (e) => {
    e.stopPropagation();
    try {
      setIsLoadingState(true);
      const payload = {
        channelId: channelId,
        userId: userState?.userData?.Data?.user?._id,
      };
      const res = await apiCall("PUT", "channel/unsubscribe", token, payload);
      if (res?.data?.status === "success") {
        setIsLoadingState(false);
        setIsSubscribed(false);
        customUnsubscribeSuccessAction();
        // setTriggerChannelsCall(!triggerChannelsCall);
        // setSubscribeNumber((subscribeNumber) => subscribeNumber - 1);
      }
    } catch (error) {
      setIsLoadingState(false);
      toast.error(error?.response?.data?.err);
    }
  };

  const handleSubscribe = async () => {
    try {
      setIsLoadingState(true);
      const payload = {
        channelId: channelId,
        userId: userState?.userData?.Data?.user?._id,
      };
      const res = await apiCall("PUT", "channel/subscribe", token, payload);
      if (res?.data?.status === "success") {
        setIsLoadingState(false);
        setIsSubscribed(true);
        customSubscribeSuccessAction();
        // setSubscribeNumber((subscribeNumber) => subscribeNumber + 1);
      }
    } catch (error) {
      setIsLoadingState(false);
      toast.error(error?.response?.data?.err);
    }
  };
  return (
    <CustomButton
      name={isSubscribed ? "Subscribed" : "Subscribe"}
      handleSubmit={(e) => {
        isSubscribed ? handleUnsubscribe(e) : handleSubscribe(e);
      }}
      loadingState={loadingState}
      type={"small"}
    />
  );
}

export default SubscriptionButton;
