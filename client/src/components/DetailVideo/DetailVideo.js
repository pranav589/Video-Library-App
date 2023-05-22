import React, { useEffect, useState } from "react";
import { Content, Hr, Title } from "./styles";
import VideoFrame from "../VideoFrame/VideoFrame";
// import VideoActions from "../VideoActions/VideoActions";
import VideoChannelInfo from "../VideoChannelInfo/VideoChannelInfo";
import VideoActions from "../VideoActions/VideoActions";
import CommentList from "../CommentList/CommentList";
import { toast } from "react-toastify";
import { apiCall } from "../../utils/apiCall";

function DetailVideo({ videoData = {}, loadingState = false }) {
  const [comments, setComments] = useState([]);
  const [triggerFetchComment, setTriggerFetchComment] = useState(false);
  const [isCommentsLoading, setIsCommentLoadings] = useState(false);

  useEffect(() => {
    if (videoData?._id) {
      const fetchComments = async () => {
        try {
          setIsCommentLoadings(true);
          const res = await apiCall(
            "GET",
            `comment/getVideoComments/${videoData?._id}`
          );
          if (res?.data?.status === "success") {
            setIsCommentLoadings(false);
            setComments(res?.data?.Data);
          }
        } catch (error) {
          toast.error(error?.response?.data?.err);
          setIsCommentLoadings(false);
        }
      };
      fetchComments();
    }
  }, [videoData?._id, triggerFetchComment]);

  return (
    <Content>
      <VideoFrame data={videoData} loadingState={loadingState} />
      <Title>{videoData?.title}</Title>
      <VideoActions data={videoData} loadingState={loadingState} />
      <Hr />
      <VideoChannelInfo data={videoData} loadingState={loadingState} />
      <Hr />
      {/* <Comments videoId={currentVideo._id} /> */}
      <CommentList
        videoId={videoData?._id}
        comments={comments}
        triggerFetchComment={triggerFetchComment}
        setTriggerFetchComment={setTriggerFetchComment}
        loadingState={isCommentsLoading}
      />
    </Content>
  );
}

export default DetailVideo;
