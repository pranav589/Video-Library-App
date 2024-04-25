import React, { Fragment, useContext, useState } from "react";
import { Avatar, Container, Input, NewComment } from "./styles";
import Comment from "../Comment/Comment";
import { toast } from "react-toastify";
import { apiCall } from "../../utils/apiCall";
import SkeletonComment from "../Skeleton/SkeletonComment";
import ReplyComment from "../Comment/ReplyComment";
import { AuthContext } from "../../context/UserContext";

function CommentList({
  comments = [],
  videoId = null,
  triggerFetchComment = false,
  setTriggerFetchComment = () => {},
  loadingState = false,
  isReplyComment = false,
  setIsReply = () => {},
}) {
  const token = localStorage.getItem("token");
  // const userState = useSelector((state) => state?.auth);
  const userState = useContext(AuthContext);
  const [text, setText] = useState("");

  const handlePostComment = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        content: text,
        author: userState?.userData?.Data?.user?._id,
        videoId: videoId,
      };
      const res = await apiCall("POST", "comment/saveComment", token, payload);
      if (res?.data?.status === "success") {
        setText("");
        setTriggerFetchComment(!triggerFetchComment);
      }
    } catch (error) {
      toast.error(error?.response?.data?.err);
    }
  };

  if (loadingState) {
    return [1, 2, 3, 4].map((v) => <SkeletonComment />);
  }

  return (
    <Container>
      <NewComment onSubmit={(e) => handlePostComment(e)}>
        <Avatar
          src={
            userState?.userData?.Data?.user?.avatar ||
            "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"
          }
        />
        <Input
          placeholder="Add a comment"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </NewComment>
      {comments?.map(
        (comment) =>
          !comment?.responseTo && (
            <Fragment key={comment._id}>
              <Comment
                comment={comment}
                videoId={videoId}
                triggerFetchComment={triggerFetchComment}
                setTriggerFetchComment={setTriggerFetchComment}
              />
              <ReplyComment
                comments={comments}
                videoId={videoId}
                parentCommentId={comment?._id}
                triggerFetchComment={triggerFetchComment}
                setTriggerFetchComment={setTriggerFetchComment}
              />
            </Fragment>
          )
      )}
    </Container>
  );
}

export default CommentList;
