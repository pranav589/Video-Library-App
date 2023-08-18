import User from "../models/UserModel.js";
import Video from "../models/VideoModel.js";

export const subscribe = async (req, res) => {
  try {
    const { userId, channelId } = req.body;
    if (!userId) {
      return res.status(400).json({ err: "Please login to subscribe" });
    }
    if (!channelId) {
      return res.status(400).json({ err: "Channel id not found" });
    }
    await User.findByIdAndUpdate(userId, {
      $push: { subscribedUsers: channelId },
    });
    await User.findByIdAndUpdate(channelId, {
      $inc: { subscribeNumber: 1 },
    });
    return res.json({
      status: "success",
      Data: {
        msg: "Subscribed",
      },
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

export const unsubscribe = async (req, res) => {
  try {
    const { userId, channelId } = req.body;
    if (!userId) {
      return res.status(400).json({ err: "Please login to subscribe" });
    }
    if (!channelId) {
      return res.status(400).json({ err: "Channel id not found" });
    }
    await User.findByIdAndUpdate(userId, {
      $pull: { subscribedUsers: channelId },
    });
    await User.findByIdAndUpdate(channelId, {
      $inc: { subscribeNumber: -1 },
    });
    return res.json({
      status: "success",
      Data: {
        msg: "Unsubscribed",
      },
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

export const getSubscriptionsVideos = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const subscribedChannels = user.subscribedUsers;
    const allVideos = await Video.find().populate("author");

    const list = subscribedChannels.map((id) => {
      return allVideos.filter(
        (video) => video.author._id.toString() === id.toString()
      );
    });

    return res.json({
      status: "success",
      Data: list.flat().sort((a, b) => b.createdAt - a.createdAt),
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

export const getSubscribedChannels = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("subscribedUsers");
    const subscribedChannels = user.subscribedUsers;
    return res.json({
      status: "success",
      Data: subscribedChannels,
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
