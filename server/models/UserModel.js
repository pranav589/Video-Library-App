import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      requried: true,
    },
    email: {
      type: String,
      requried: true,
      trim: true,
    },
    password: {
      type: String,
      requried: true,
    },
    role: {
      type: String,
      default: "user",
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png",
    },
    subscribers: {
      type: [String],
    },
    subscribeNumber: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
