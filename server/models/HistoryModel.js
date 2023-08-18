import mongoose from "mongoose";
const { Schema } = mongoose;

const historySchema = mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    videoId: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
  },
  { timestamps: true }
);

const History = mongoose.model("History", historySchema);

export default History;
