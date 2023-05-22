import React from "react";
import { Button, Buttons } from "../VideoActions/styles";
import {
  FaRegThumbsUp,
  FaThumbsUp,
  FaRegThumbsDown,
  FaThumbsDown,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { apiCall } from "../../utils/apiCall";
import SmallLoader from "../../SmallLoader/SmallLoader";

function LikeDisLike({
  videoId = null,
  commentId = null,
  userId = null,
  isLiked = false,
  isDisLiked = false,
  setIsDisLiked = () => {},
  setIsLiked = () => {},
  likeCount = 0,
  setLikeCount = () => {},
  disLikeCount = 0,
  setIsDisLikeCount = () => {},
  isLikeLoading = false,
  setIsLikeLoading = () => {},
  isDisLikeLoading = false,
  setIsDisLikeLoading = () => {},
  showDisLikeText = true,
}) {
  const token = localStorage.getItem("token");
  const handleLikeIncrease = async () => {
    try {
      setIsLikeLoading(true);
      const payload = {
        commentId,
        videoId,
        userId,
      };
      const res = await apiCall("PUT", "like/increaseLike", token, payload);
      if (res?.data?.status === "success") {
        setIsLikeLoading(false);
        toast.success("Like Added.");
        setIsLiked(true);
        setLikeCount((likeCount) => likeCount + 1);
        if (isDisLiked) {
          setIsDisLiked(false);
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.err);
      setIsLikeLoading(false);
    }
  };

  const handleLikeDecrease = async () => {
    try {
      setIsLikeLoading(true);
      const payload = {
        commentId,
        videoId,
        userId,
      };
      const res = await apiCall("PUT", "like/decreaseLike", token, payload);
      if (res?.data?.status === "success") {
        setIsLikeLoading(false);
        toast.success("Like Removed.");
        setIsLiked(false);
        setLikeCount((likeCount) => likeCount - 1);
      }
    } catch (error) {
      toast.error(error?.response?.data?.err);
      setIsLikeLoading(false);
    }
  };

  const handleDisLikeIncrease = async () => {
    try {
      setIsDisLikeLoading(true);
      const payload = {
        commentId,
        videoId,
        userId,
      };
      const res = await apiCall(
        "PUT",
        "dislike/increaseDislike",
        token,
        payload
      );
      if (res?.data?.status === "success") {
        setIsDisLikeLoading(false);
        toast.success("DisLike Added.");
        setIsDisLiked(true);
        setIsDisLikeCount((disLikeCount) => disLikeCount + 1);
        if (isLiked) {
          setIsLiked(false);
          setIsLiked((likeCount) => likeCount - 1);
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.err);
      setIsDisLikeLoading(false);
    }
  };

  const handleDisLikeDecrease = async () => {
    try {
      setIsDisLikeLoading(true);
      const payload = {
        commentId,
        videoId,
        userId,
      };
      const res = await apiCall(
        "PUT",
        "dislike/decreaseDislike",
        token,
        payload
      );
      if (res?.data?.status === "success") {
        setIsDisLikeLoading(false);
        toast.success("DisLike Removed.");
        setIsDisLiked(false);
        setIsDisLikeCount((disLikeCount) => disLikeCount - 1);
      }
    } catch (error) {
      toast.error(error?.response?.data?.err);
      setIsDisLikeLoading(false);
    }
  };

  return (
    <Buttons>
      <Button>
        {isLikeLoading ? (
          <SmallLoader />
        ) : isLiked ? (
          <FaThumbsUp onClick={handleLikeDecrease} />
        ) : (
          <FaRegThumbsUp onClick={handleLikeIncrease} />
        )}
        {likeCount}
      </Button>
      <Button>
        {isDisLikeLoading ? (
          <SmallLoader />
        ) : isDisLiked ? (
          <FaThumbsDown onClick={handleDisLikeDecrease} />
        ) : (
          <FaRegThumbsDown onClick={handleDisLikeIncrease} />
        )}
        {showDisLikeText && "Dislike"}
      </Button>
    </Buttons>
  );
}

export default LikeDisLike;
