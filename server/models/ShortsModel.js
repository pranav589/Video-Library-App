import mongoose from "mongoose";

const shortsSchema = mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    privacy: {
      type: String,
      default: "Private",
    },
    views: {
      type: Number,
      default: 0,
    },
    shortsURL: {
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

const Shorts = mongoose.model("Shorts", shortsSchema);

export default Shorts;
