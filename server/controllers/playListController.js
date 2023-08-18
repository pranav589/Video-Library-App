import PlayList from "../models/PlayListModel.js";
import Video from "../models/VideoModel.js";

export const newPlayList = async (req, res) => {
  try {
    const id = req.user.id;
    if (!id) {
      return res.status(400).json({ err: "user id is required" });
    }
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ err: "Name of playlist is required" });
    }

    const newPlayList = new PlayList({
      userId: id,
      name: name,
    });
    await newPlayList.save();

    return res.json({
      status: "success",
      Data: {
        msg: "Playlist Created!",
      },
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

export const addVideosToPlayList = async (req, res) => {
  try {
    const userId = req.user.id;

    const { playListId, videoId } = req.body;
    if (!playListId) {
      return res.status(400).json({ err: "Playlist id is required" });
    }

    if (!videoId) {
      return res.status(400).json({ err: "video id is required" });
    }

    const addToPlayList = await PlayList.findByIdAndUpdate(playListId, {
      $push: { videos: videoId },
    });

    return res.json({
      status: "success",
      Data: addToPlayList,
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

export const removeVideosFromPlayList = async (req, res) => {
  try {
    const { playListId, videoId } = req.body;
    if (!playListId) {
      return res.status(400).json({ err: "Playlist id is required" });
    }

    if (!videoId) {
      return res.status(400).json({ err: "video id is required" });
    }

    const removeFromPlayList = await PlayList.findByIdAndUpdate(playListId, {
      $pull: { videos: videoId },
    });
    return res.json({
      status: "success",
      Data: removeFromPlayList,
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

export const getLoggedUsersPlayLists = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(400).json({ err: "User id not found." });
    }

    const playLists = await PlayList.find({ userId: userId });

    return res.json({
      status: "success",
      Data: playLists,
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

export const getVideosOfPlayList = async (req, res) => {
  try {
    const playListId = req.params.id;

    const isPlayListValid = await PlayList.find({ _id: playListId });
    if (!isPlayListValid)
      return res.status(500).json({ err: "Invalid play-list." });

    const playListVideos = await Promise.all(
      isPlayListValid[0].videos.map(async (videoId) => {
        return await Video.findOne({ _id: videoId });
      })
    );

    return res.json({
      status: "success",
      Data: playListVideos,
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
