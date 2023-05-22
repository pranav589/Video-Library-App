import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { apiCall } from "../../utils/apiCall";
import VideoList from "../../components/VideoList/VideoList";

function Home({ type }) {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAllVideos = async () => {
      try {
        setIsLoading(true);
        const res = await apiCall("GET", "video/homeVideos");
        if (res?.data?.status === "success") {
          setVideos(res?.data?.Data);
          setIsLoading(false);
        }
      } catch (error) {
        toast.error(error?.response?.data?.err);
        setIsLoading(false);
      }
    };
    fetchAllVideos();
  }, []);

  return <VideoList videos={videos} type={type} loadingState={isLoading} />;
}

export default Home;
