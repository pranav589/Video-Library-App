import mongoose from "mongoose";

const videoSchema = mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    catogory: String,
    views: {
      type: Number,
      default: 0,
    },
    duration: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
    videoURL: {
      type: String,
      required: true,
    },
    likes: {
      type: [String],
      default: [],
    },
    disLikes: {
      type: [String],
      default: [],
    },
    watchTime: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String],
      default: [],
    },
    comments: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Video = mongoose.model("Video", videoSchema);

export default Video;
