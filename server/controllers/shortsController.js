import Shorts from "../models/ShortsModel.js";

export const getShortsById = async (req, res) => {
  try {
    const shortVideo = await Shorts.findById(req.params.id).populate("author");
    return res.json({
      status: "success",
      Data: shortVideo,
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

export const uploadShorts = async (req, res) => {
  try {
    const { userId, title, shortsURL } = req.body;

    if (!userId || !title || !shortsURL) {
      return res.status(400).json({ err: "Please send all required fields" });
    }

    const shortVideo = new Shorts({
      author: userId,
      title,
      shortsURL,
    });

    await shortVideo.save();

    return res.json({
      status: "success",
      Data: shortVideo,
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

export const getAllShorts = async (req, res) => {
  try {
    const ids = await Shorts.find({}).populate({ path: "author" });

    if (!ids) {
      return res.status(400).json({ err: "No Shorts Found" });
    }

    return res.json({
      status: "success",
      Data: ids,
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
