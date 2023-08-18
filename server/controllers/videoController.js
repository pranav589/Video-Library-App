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
    } = req.body;

    if (
      !userId ||
      !title ||
      !description ||
      !privacy ||
      !category ||
      !thumbnail ||
      !videoURL ||
      !tags
    ) {
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
    });

    console.log({ video });
    await video.save();

    // await User.findById(userId, {
    //   $inc: { videoUploaded: 1 },
    // });

    return res.json({
      status: "success",
      Data: video,
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

export const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
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
    const video = await Video.findById(req.params.id).populate("author");
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
    console.log({ tags });
    const videos = await Video.find({ tags: { $in: tags } })
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
