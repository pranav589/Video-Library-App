import User from "../models/UserModel.js";

export const subscribe = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ err: "Please login to subscribe" });
    }
    await User.findByIdAndUpdate(userId, {
      $push: { subscribers: userId },
    });
    await User.findByIdAndUpdate(userId, {
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
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ err: "Please login to unsubscribe" });
    }
    await User.findByIdAndUpdate(userId, {
      $pull: { subscribers: userId },
    });
    await User.findByIdAndUpdate(userId, {
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
