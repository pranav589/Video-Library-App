import React, { useEffect, useRef, useState } from "react";
import { VideoWrapper } from "./styles";
import SkeletonVideoFrame from "../Skeleton/SkeletonVideoFrame";
import ReactPlayer from "react-player";
import { toast } from "react-toastify";
import { apiCall } from "../../utils/apiCall";

function VideoFrame({ data, loadingState }) {
  const token = localStorage.getItem("token");
  const [videoProgress, setVideoProgress] = useState(0);
  const videoRef = useRef(videoProgress); // ref to store state value

  useEffect(() => {
    videoRef.current = videoProgress; // save userCheck state value to ref
  }, [videoProgress]);

  useEffect(() => {
    if (Math.floor(videoProgress) === 10) {
      const makeView = async () => {
        try {
          await apiCall("PUT", `video/addView/${data?._id}`);
        } catch (error) {
          toast.error(error?.response?.data?.err);
        }
      };

      makeView();
    }
  }, [videoProgress, data?._id]);

  useEffect(() => {
    if (Math.floor(videoProgress) === 10) {
      const markHistoryEntry = async () => {
        try {
          await apiCall("POST", `history/addHistory`, token, {
            videoId: data?._id,
          });
        } catch (error) {
          toast.error(error?.response?.data?.err);
        }
      };

      markHistoryEntry();
    }
  }, [videoProgress, token, data?._id]);

  const insertWatchTime = async (time) => {
    try {
      const payload = {
        secondsWatched: Number(time).toFixed(2),
      };

      const res = await apiCall(
        "PUT",
        `video/addWatchTime/${data?._id}`,
        "",
        payload
      );
    } catch (error) {
      toast.error(error?.response?.data?.err);
    }
  };

  useEffect(() => {
    return () => {
      if (data?._id) {
        insertWatchTime(videoRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?._id]);

  if (loadingState) {
    return <SkeletonVideoFrame />;
  }
  return (
    <VideoWrapper>
      <ReactPlayer
        url={data?.videoURL}
        controls
        style={{ width: "100%", objectFit: "cover" }}
        width={"100%"}
        height={"fit-content"}
        onProgress={(progress) => {
          setVideoProgress(progress.playedSeconds);
        }}
      />
    </VideoWrapper>
  );
}

export default VideoFrame;
