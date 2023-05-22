import Comment from "../models/CommentModel.js";
import Video from "../models/VideoModel.js";

export const incLike = async (req, res) => {
  try {
    const { videoId, commentId, userId } = req.body;

    if ((!userId && !videoId) || (!userId && !commentId)) {
      return res.status(400).json({ err: "Invalid Request" });
    }

    if (videoId) {
      const videoLike = await Video.findByIdAndUpdate(videoId, {
        $addToSet: { likes: userId },
        $pull: { disLikes: userId },
      });
      return res.json({
        status: "success",
        Data: {
          msg: "Like added",
        },
      });
    }
    if (commentId) {
      const commentLike = await Comment.findByIdAndUpdate(commentId, {
        $addToSet: { likes: userId },
        $pull: { disLikes: userId },
      });
      return res.json({
        status: "success",
        Data: {
          msg: "Like added",
        },
      });
    }
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

export const decLike = async (req, res) => {
  try {
    const { videoId, commentId, userId } = req.body;

    if ((!userId && !videoId) || (!userId && !commentId)) {
      return res.status(400).json({ err: "Invalid Request" });
    }

    if (videoId) {
      await Video.findByIdAndUpdate(videoId, {
        $pull: { likes: userId },
      });
      return res.json({
        status: "success",
        Data: {
          msg: "Like removed",
        },
      });
    }
    if (commentId) {
      const commentLike = await Comment.findByIdAndUpdate(commentId, {
        $pull: { likes: userId },
      });
      return res.json({
        status: "success",
        Data: {
          msg: "Like added",
        },
      });
    }
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

export const incDisLike = async (req, res) => {
  try {
    const { videoId, commentId, userId } = req.body;

    if ((!userId && !videoId) || (!userId && !commentId)) {
      return res.status(400).json({ err: "Invalid Request" });
    }

    if (videoId) {
      await Video.findByIdAndUpdate(videoId, {
        $addToSet: { disLikes: userId },
        $pull: { likes: userId },
      });
      return res.json({
        status: "success",
        Data: {
          msg: "DisLike added",
        },
      });
    }
    if (commentId) {
      await Comment.findByIdAndUpdate(commentId, {
        $addToSet: { disLikes: userId },
        $pull: { likes: userId },
      });
      return res.json({
        status: "success",
        Data: {
          msg: "DisLike added",
        },
      });
    }
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

export const decDisLike = async (req, res) => {
  try {
    const { videoId, commentId, userId } = req.body;

    if ((!userId && !videoId) || (!userId && !commentId)) {
      return res.status(400).json({ err: "Invalid Request" });
    }

    if (videoId) {
      await Video.findByIdAndUpdate(videoId, {
        $pull: { disLikes: userId },
      });
      return res.json({
        status: "success",
        Data: {
          msg: "DisLike removed",
        },
      });
    }
    if (commentId) {
      await Video.findByIdAndUpdate(commentId, {
        $pull: { disLikes: userId },
      });
      return res.json({
        status: "success",
        Data: {
          msg: "DisLike removed",
        },
      });
    }
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
