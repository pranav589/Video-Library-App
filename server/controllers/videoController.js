import User from "../models/UserModel.js";
import Video from "../models/VideoModel.js";

export const uploadVideo = async (req, res) => {
  try {
    const {
      userId,
      title,
      description,
      privacy,
      category,
      thumbnail,
      videoURL,
      tags,
      status,
    } = req.body;

    if (!title || !videoURL) {
      return res.status(400).json({ err: "Please send all required fields" });
    }

    const video = new Video({
      author: userId,
      title,
      description,
      privacy,
      category,
      thumbnail,
      videoURL,
      tags,
      status,
    });

    await video.save();

    return res.json({
      status: "success",
      Data: video,
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

export const editVideo = async (req, res) => {
  try {
    const updatedVideo = await Video.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    return res.json({
      status: "success",
      Data: updatedVideo,
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

export const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.aggregate([
      { $match: { status: "public" } },
      { $sample: { size: 40 } },
    ]);
    const videosWithAuthorDetails = await Video.populate(videos, {
      path: "author",
    });
    return res.json({
      status: "success",
      Data: videosWithAuthorDetails,
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

export const getVideo = async (req, res) => {
  try {
    const userId = req.user.id;

    const video = await Video.findById(req.params.id).populate("author");
    // Check if the video is private, if it is, return an error
    if (
      video.status !== "public" &&
      video.author._id.toString() !== userId.toString()
    ) {
      return res.status(403).json({ err: "This video is not public" });
    }

    return res.json({
      status: "success",
      Data: video,
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

export const getVideosByTag = async (req, res) => {
  try {
    const tags = req.query.tags.split(",");
    const videos = await Video.find({
      tags: { $in: tags },
      status: { $ne: "private" },
    })
      .populate("author")
      .limit(20);
    return res.json({
      status: "success",
      Data: videos,
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

export const addView = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ err: "Video not found" });
    }
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });
    return res.json({
      status: "success",
      Data: {
        msg: "View Increased",
      },
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

export const watchTimeOfVideo = async (req, res) => {
  try {
    const { secondsWatched } = req.body;
    if (!req.params.id) {
      return res.status(400).json({ err: "Video not found" });
    }

    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { watchTime: secondsWatched },
    });
    return res.json({
      status: "success",
      Data: {
        msg: "Watch Time Saved",
      },
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

export const myVideos = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ err: "Id is required" });
    }

    const isUser = await User.findById(id);
    if (!isUser) {
      return res.status(400).json({ err: "Invalid user" });
    }

    const videos = await Video.find({ author: id }).populate("author");
    return res.json({
      status: "success",
      Data: videos,
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
