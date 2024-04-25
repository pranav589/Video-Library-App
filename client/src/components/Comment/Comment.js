import React, { Fragment, useContext, useEffect, useState } from "react";
import {
  Avatar,
  ButtonContainer,
  CommentActionsContainer,
  Container,
  Date,
  Details,
  Name,
  ReplyText,
  Text,
  Wrapper,
} from "./styles";
import DateFormatter from "../DateFormatter/DateFormatter";
import LikeDisLike from "../LikeDisLike/LikeDisLike";

import { Input, NewComment } from "../CommentList/styles";
import { apiCall } from "../../utils/apiCall";
import { toast } from "react-toastify";
import CustomButton from "../CustomButton/CustomButton";
import { AuthContext } from "../../context/UserContext";

function Comment({
  comment,
  videoId,
  triggerFetchComment,
  setTriggerFetchComment,
  isReplyComment = true,
}) {
  const [text, setText] = useState("");
  // const userState = useSelector((state) => state?.auth);
  const userState = useContext(AuthContext);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isDisLiked, setIsDisLiked] = useState(false);
  const [disLikeCount, setDisLikeCount] = useState(0);
  const [isLikeLoading, setIsLikeLoading] = useState(false);
  const [isDisLikeLoading, setIsDisLikeLoading] = useState(false);
  const [isReply, setIsReply] = useState(false);

  useEffect(() => {
    const validateIsLiked = comment?.likes?.some(
      (like) => like === userState?.userData?.Data?.user?._id
    );

    if (validateIsLiked) {
      setIsLiked(true);
    }
    if (comment?.likes) {
      setLikeCount(comment?.likes?.length);
    }
  }, [comment?.likes, userState?.userData?.Data?.user?._id]);

  useEffect(() => {
    const validateIsDisLiked = comment?.disLikes?.some(
      (disLike) => disLike === userState?.userData?.Data?.user?._id
    );
    if (validateIsDisLiked) {
      setIsDisLiked(true);
    }
    if (comment?.disLikes) {
      setDisLikeCount(comment?.disLikes?.length);
    }
  }, [comment?.disLikes, userState?.userData?.Data?.user?._id]);

  const handleReplyOpen = () => {
    setIsReply(true);
  };
  const token = localStorage.getItem("token");

  const handlePostComment = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        content: text,
        author: userState?.userData?.Data?.user?._id,
        videoId: videoId,
        responseTo: comment?._id,
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

  return (
    <Container>
      <Wrapper>
        <Avatar src={comment?.author?.avatar} />
        <Details>
          <Name>
            {comment?.author?.name}{" "}
            <Date>
              <DateFormatter date={comment?.updatedAt} />
            </Date>
          </Name>
          <Text>{comment?.content}</Text>
          <CommentActionsContainer>
            <LikeDisLike
              isLiked={isLiked}
              setIsLiked={setIsLiked}
              isDisLiked={isDisLiked}
              setIsDisLiked={setIsDisLiked}
              commentId={comment?._id}
              userId={userState?.userData?.Data?.user?._id}
              likeCount={likeCount}
              setLikeCount={setLikeCount}
              disLikeCount={disLikeCount}
              setDisLikeCount={setDisLikeCount}
              isLikeLoading={isLikeLoading}
              setIsLikeLoading={setIsLikeLoading}
              isDisLikeLoading={isDisLikeLoading}
              setIsDisLikeLoading={setIsDisLikeLoading}
              showDisLikeText={false}
            />
            <ReplyText onClick={handleReplyOpen}>Reply</ReplyText>
          </CommentActionsContainer>
        </Details>
      </Wrapper>

      {isReply && (
        <Fragment>
          <NewComment>
            <Avatar src={userState?.userData?.Data?.user?.avatar} />
            <Input
              placeholder="Add a comment"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </NewComment>

          <ButtonContainer>
            <CustomButton name="Submit" handleSubmit={handlePostComment} />
            <CustomButton
              name="Cancel"
              handleSubmit={() => setIsReply(false)}
            />
          </ButtonContainer>
        </Fragment>
      )}
    </Container>
  );
}

export default Comment;
