import React, { useEffect, useState } from "react";
import { Container } from "./styles";

import Recommendations from "../../components/Recommendations/Recommendations";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import DetailVideo from "../../components/DetailVideo/DetailVideo";
import { useSelector } from "react-redux";
import { apiCall } from "../../utils/apiCall";

function VideoDetail() {
  const params = useParams();
  const { videoId } = params;
  const videoState = useSelector((state) => state.video);
  const [videoData, setVideoData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setIsLoading(true);
        const res = await apiCall("GET", `video/videoDetail/${videoId}`, token);
        if (res?.data?.status === "success") {
          setVideoData(res?.data?.Data);
          setIsLoading(false);
        }
      } catch (error) {
        toast.error(error?.response?.data?.err);
        setIsLoading(false);
      }
    };
    fetchVideo();
  }, [videoId]);

  useEffect(() => {
    if (videoState?.isError) {
      toast.error(videoState?.message);
    }
  }, [videoState]);

  return (
    <Container>
      <DetailVideo videoData={videoData} loadingState={isLoading} />
      <Recommendations tags={videoData?.tags} />
    </Container>
  );
}

export default VideoDetail;
