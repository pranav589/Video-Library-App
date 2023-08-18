import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { apiCall } from "../../utils/apiCall";
import { useParams } from "react-router-dom";
import ChannelCard from "../../components/ChannelCard/ChannelCard";
import CustomTabs from "../../components/CustomTabs/CustomTabs";
import VideoList from "../../components/VideoList/VideoList";
import { Container } from "./styles";

function ChannelDetails() {
  const [isLoading, setIsLoading] = useState(false);
  const [channelDetails, setChannelDetails] = useState(null);
  const [videos, setVideos] = useState([]);
  const { channelId } = useParams();

  useEffect(() => {
    const fetchChannelDetails = async () => {
      try {
        setIsLoading(true);
        const res = await apiCall(
          "GET",
          `userChannel/channelDetails/${channelId}`
        );
        if (res?.data?.status === "success") {
          setIsLoading(false);
          setChannelDetails(res?.data?.Data?.channelInfo);
          setVideos(res?.data?.Data?.videos);
        }
      } catch (error) {
        toast.error(error?.response?.data?.err);
        setIsLoading(false);
      }
    };
    fetchChannelDetails();
  }, [channelId]);

  return (
    <Container>
      <ChannelCard
        channel={channelDetails}
        type="sm"
        loadingState={isLoading}
        videosLength={videos?.length}
      />
      <CustomTabs
        tabNames={["Videos", "Posts"]}
        tabContent={[<VideoList videos={videos} loadingState={isLoading} />]}
      />
    </Container>
  );
}

export default ChannelDetails;
