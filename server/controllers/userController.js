import User from "../models/UserModel.js";
import Video from "../models/VideoModel.js";

export const getChannelDetails = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ err: "Channel id not found" });
    }

    const userDetails = await User.findById(id);

    if (!userDetails) {
      return res.status(400).json({ err: "Channel not found." });
    }

    const videos = await Video.find({ author: id, status: "public" }).populate(
      "author"
    );

    return res.json({
      status: "success",
      Data: {
        videos: videos,
        channelInfo: userDetails,
      },
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
