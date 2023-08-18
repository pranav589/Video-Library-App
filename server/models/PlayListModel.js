import mongoose from "mongoose";
const { Schema } = mongoose;

const playListSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    videos: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
  },
  { timestamps: true }
);

const PlayList = mongoose.model("PlayList", playListSchema);

export default PlayList;
