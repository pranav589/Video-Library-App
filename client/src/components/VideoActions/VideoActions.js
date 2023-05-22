import React, { useEffect, useState } from "react";
import { Button, Buttons, Details, Info } from "./styles";

import SkeletonVideoActions from "../Skeleton/SkeletonVideoActions";
import DateFormatter from "../DateFormatter/DateFormatter";
import LikeDisLike from "../LikeDisLike/LikeDisLike";
import { useSelector } from "react-redux";

function VideoActions({ data = {}, loadingState = false }) {
  const userState = useSelector((state) => state?.auth);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isDisLiked, setIsDisLiked] = useState(false);
  const [disLikeCount, setDisLikeCount] = useState(0);
  const [isLikeLoading, setIsLikeLoading] = useState(false);
  const [isDisLikeLoading, setIsDisLikeLoading] = useState(false);

  useEffect(() => {
    const validateIsLiked = data?.likes?.some(
      (like) => like === userState?.user?._id
    );

    if (validateIsLiked) {
      setIsLiked(true);
    }
    if (data?.likes) {
      setLikeCount(data?.likes?.length);
    }
  }, [data?.likes, userState?.user?._id]);

  useEffect(() => {
    const validateIsDisLiked = data?.disLikes?.some(
      (disLike) => disLike === userState?.user?._id
    );
    if (validateIsDisLiked) {
      setIsDisLiked(true);
    }
    if (data?.disLikes) {
      setDisLikeCount(data?.disLikes?.length);
    }
  }, [data?.disLikes, userState?.user?._id]);

  if (loadingState) {
    return <SkeletonVideoActions />;
  }

  return (
    <Details>
      <Info>
        {data?.views} views • <DateFormatter date={data?.createdAt} />
      </Info>
      <Buttons>
        <LikeDisLike
          isLiked={isLiked}
          setIsLiked={setIsLiked}
          isDisLiked={isDisLiked}
          setIsDisLiked={setIsDisLiked}
          videoId={data?._id}
          userId={userState?.user?._id}
          likeCount={likeCount}
          setLikeCount={setLikeCount}
          disLikeCount={disLikeCount}
          setDisLikeCount={setDisLikeCount}
          isLikeLoading={isLikeLoading}
          setIsLikeLoading={setIsLikeLoading}
          isDisLikeLoading={isDisLikeLoading}
          setIsDisLikeLoading={setIsDisLikeLoading}
        />
        <Button>{/* <ReplyOutlinedIcon /> Share */}</Button>
        <Button>{/* <AddTaskOutlinedIcon /> Save */}</Button>
      </Buttons>
    </Details>
  );
}

export default VideoActions;
