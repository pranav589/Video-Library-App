import Comment from "../models/CommentModel.js";
import Video from "../models/VideoModel.js";

export const saveComment = async (req, res) => {
  try {
    const { videoId, responseTo, author, content } = req.body;
    if (!videoId) {
      return res.status(400).json({ err: "Video id is required." });
    }
    if (!author) {
      return res.status(400).json({ err: "Please Login" });
    }
    if (!content) {
      return res.status(400).json({ err: "Content is required" });
    }
    if (videoId) {
      const comment = new Comment({ videoId, responseTo, author, content });
      await comment.save();

      const result = await Comment.findById(comment._id).populate("author");
      await Video.findByIdAndUpdate(videoId, {
        $inc: { comments: 1 },
      });
      return res.json({
        status: "success",
        Data: result,
      });
    }
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

export const getVideoComments = async (req, res) => {
  try {
    const { videoId } = req.params;
    if (!videoId) {
      return res.status(400).json({ err: "Video Id is required" });
    }
    const comments = await Comment.find({ videoId: videoId })
      .sort({ updatedAt: -1 })
      .populate("author");
    return res.json({
      status: "success",
      Data: comments,
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
