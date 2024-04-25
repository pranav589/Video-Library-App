import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { apiCall } from "../../utils/apiCall";
import VideoList from "../../components/VideoList/VideoList";
import { Title } from "../Subscriptions/styles";
import { AuthContext } from "../../context/UserContext";

function History() {
  const [isLoading, setIsLoading] = useState(false);
  const [videos, setVideos] = useState([]);
  // const userState = useSelector((state) => state?.auth);
  const userState = useContext(AuthContext);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (userState?.userData?.Data?.user?._id) {
      const fetchHistoryVideos = async () => {
        try {
          setIsLoading(true);
          const res = await apiCall("GET", `history/videoHistory`, token);
          if (res?.data?.status === "success") {
            setIsLoading(false);
            const formatData = res?.data?.Data?.map((video) => {
              return video?.videoId;
            });
            setVideos(formatData);
          }
        } catch (error) {
          toast.error(error?.response?.data?.err);
          setIsLoading(false);
        }
      };
      fetchHistoryVideos();
    }
  }, [token, userState?.userData?.Data?.user?._id]);

  return (
    <>
      <Title>Your History</Title>
      <VideoList videos={videos} loadingState={isLoading} />
    </>
  );
}

export default History;
