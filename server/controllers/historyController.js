import History from "../models/HistoryModel.js";

export const addVideoToHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const { videoId } = req.body;

    if (!videoId) return res.status(500).json({ err: "Video id not found" });

    const isAlreadyExist = await History.findOneAndDelete({
      userId: userId,
      videoId: videoId,
    });

    const historyEntry = await History({
      videoId: videoId,
      userId: userId,
    });

    await historyEntry.save();
    return res.json({
      status: "success",
      Data: historyEntry,
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

export const getHistoryOfUser = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) return res.status(403).json({ err: "Invalid Access" });
    const getVideos = await History.find({ userId: userId }).populate({
      path: "videoId",
      populate: {
        path: "author",
        model: "User",
      },
    });

    return res.json({
      status: "success",
      Data: getVideos,
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
