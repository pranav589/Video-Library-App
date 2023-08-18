import dotenv from "dotenv";
import express from "express";
const app = express();
// import { resolve } from "path";
import cors from "cors";

// import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import mongoose from "mongoose";
import authRouter from "./routes/authRouter.js";
import videoRouter from "./routes/videoRouter.js";
import likeRouter from "./routes/likeRouter.js";
import disLikeRouter from "./routes/disLikeRouter.js";
import subscribeRouter from "./routes/subscribeRouter.js";
import commentRouter from "./routes/commentRouter.js";
import channelRouter from "./routes/userRouter.js";
import playListRouter from "./routes/playListRouter.js";
import historyRouter from "./routes/historyRouter.js";
import searchRouter from "./routes/searchRouter.js";

dotenv.config();

const connect = mongoose
  .connect(process.env.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.use(cors());

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/video", videoRouter);
app.use("/api/like", likeRouter);
app.use("/api/dislike", disLikeRouter);
app.use("/api/channel", subscribeRouter);
app.use("/api/comment", commentRouter);
app.use("/api/userChannel", channelRouter);
app.use("/api/playList", playListRouter);
app.use("/api/history", historyRouter);
app.use("/api/search", searchRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Listening on ${port}`);
});
