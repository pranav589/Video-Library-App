import mongoose from "mongoose";
const { Schema } = mongoose;

const disLikeSchema = mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    commentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
    videoId: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
  },
  { timestamps: true }
);

const DisLike = mongoose.model("DisLike", disLikeSchema);

export default DisLike;
