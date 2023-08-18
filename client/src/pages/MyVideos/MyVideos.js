import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { apiCall } from "../../utils/apiCall";
import { useSelector } from "react-redux";
import VideoList from "../../components/VideoList/VideoList";
import { Title } from "../Subscriptions/styles";

function YourVideos() {
  const [isLoading, setIsLoading] = useState(false);
  const [myVideos, setMyVideos] = useState([]);
  const userState = useSelector((state) => state?.auth);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (userState?.user?._id) {
      const fetchMyVideos = async () => {
        try {
          setIsLoading(true);
          const res = await apiCall(
            "GET",
            `video/myVideos/${userState?.user?._id}`,
            token
          );
          if (res?.data?.status === "success") {
            setIsLoading(false);
            setMyVideos(res?.data?.Data);
          }
        } catch (error) {
          toast.error(error?.response?.data?.err);
          setIsLoading(false);
        }
      };
      fetchMyVideos();
    }
  }, [token, userState?.user?._id]);

  return (
    <>
      <Title>Your Videos</Title>
      <VideoList videos={myVideos} loadingState={isLoading} />
    </>
  );
}

export default YourVideos;
