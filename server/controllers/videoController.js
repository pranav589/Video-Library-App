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
    } = req.body;

    if (
      !userId ||
      !title ||
      !description ||
      !privacy ||
      !category ||
      !thumbnail ||
      !videoURL
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
