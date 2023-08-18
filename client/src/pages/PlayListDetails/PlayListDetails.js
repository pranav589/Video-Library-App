import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { apiCall } from "../../utils/apiCall";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import VideoList from "../../components/VideoList/VideoList";
import { PlayListWrapper, VideoWrapper } from "./styles";
import PlayListInfo from "../../components/PlayListInfo/PlayListInfo";

function PlayListDetails() {
  const [isLoading, setIsLoading] = useState(false);
  const [videos, setVideos] = useState([]);
  const [bannerVideo, setBannerVideo] = useState(null);

  const userState = useSelector((state) => state?.auth);
  const token = localStorage.getItem("token");
  const params = useParams();

  useEffect(() => {
    if (userState?.user?._id && params?.playListId) {
      const fetchMyVideos = async () => {
        try {
          setIsLoading(true);
          const res = await apiCall(
            "GET",
            `playList/playListVideos/${params?.playListId}`,
            token
          );
          if (res?.data?.status === "success") {
            setIsLoading(false);
            setVideos(res?.data?.Data);
            setBannerVideo(res?.data?.Data?.[0]);
          }
        } catch (error) {
          toast.error(error?.response?.data?.err);
          setIsLoading(false);
        }
      };
      fetchMyVideos();
    }
  }, [token, userState?.user?._id, params.playListId]);

  return (
    <>
      <PlayListWrapper>
        <PlayListInfo data={bannerVideo} videosLength={videos?.length} />
        <VideoWrapper>
          <VideoList
            videos={videos}
            loadingState={isLoading}
            from={"playList"}
            type="sm"
          />
        </VideoWrapper>
      </PlayListWrapper>
    </>
  );
}

export default PlayListDetails;
