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
      required: true,
    },
    privacy: {
      type: String,
      default: "Private",
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
      required: true,
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
  },
  { timestamps: true }
);

const Video = mongoose.model("Video", videoSchema);

export default Video;
