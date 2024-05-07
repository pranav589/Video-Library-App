import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { apiCall } from "../../utils/apiCall";
import VideoList from "../../components/VideoList/VideoList";
import { Title } from "../Subscriptions/styles";

function TrendingVideos() {
  const [isLoading, setIsLoading] = useState(false);
  const [trendingVideos, setTrendingVideos] = useState([]);

  useEffect(() => {
    const fetchTrendingVideos = async () => {
      try {
        setIsLoading(true);
        const res = await apiCall("GET", `trendingVideos`);
        if (res?.data?.status === "success") {
          setIsLoading(false);
          setTrendingVideos(res?.data?.Data);
        }
      } catch (error) {
        toast.error(error?.response?.data?.err);
        setIsLoading(false);
      }
    };
    fetchTrendingVideos();
  }, []);

  return (
    <>
      <Title>Trending Videos</Title>
      <VideoList videos={trendingVideos} loadingState={isLoading} />
    </>
  );
}

export default TrendingVideos;
