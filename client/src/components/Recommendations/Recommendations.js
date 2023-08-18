import React, { useEffect, useState } from "react";
import { Container } from "./styles";
import VideoCard from "../VideoCard/VideoCard";
import SkeletonVideoCard from "../Skeleton/SkeletonVideoCard";
import { toast } from "react-toastify";
import { apiCall } from "../../utils/apiCall";
import { useParams } from "react-router-dom";

function Recommendations({ tags }) {
  const [isLoading, setIsLoading] = useState(false);
  const [videos, setVideos] = useState([]);
  const { videoId } = useParams();

  useEffect(() => {
    const fetchRecommendedVideos = async () => {
      try {
        setIsLoading(true);
        const res = await apiCall(
          "GET",
          `video/recommendedVideos?tags=${tags.join(",")}`
        );
        if (res?.data?.status === "success") {
          const filterData = res?.data?.Data?.filter(
            (video) => video?._id !== videoId
          );
          setVideos(filterData);
          setIsLoading(false);
        }
      } catch (error) {
        toast.error(error?.response?.data?.err);
        setIsLoading(false);
      }
    };
    fetchRecommendedVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags]);

  if (isLoading) {
    return (
      <Container>
        {[1, 2, 3, 4].map((v) => (
          <SkeletonVideoCard type={"sm"} />
        ))}
      </Container>
    );
  }

  return (
    <Container>
      {videos.map((video) => (
        <VideoCard type="sm" key={video._id} video={video} />
      ))}
    </Container>
  );
}

export default Recommendations;
