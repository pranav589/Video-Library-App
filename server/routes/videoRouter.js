import express from "express";
import {
  addView,
  getAllVideos,
  getVideo,
  getVideosByTag,
  myVideos,
  uploadVideo,
  watchTimeOfVideo,
  editVideo,
} from "../controllers/videoController.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.post("/uploadVideo", auth, uploadVideo);
router.put("/editVideo/:id", auth, editVideo);
router.get("/homeVideos", getAllVideos);
router.get("/videoDetail/:id", auth, getVideo);
router.get("/recommendedVideos", getVideosByTag);
router.put("/addView/:id", addView);
router.put("/addWatchTime/:id", watchTimeOfVideo);
router.get("/myVideos/:id", auth, myVideos);

export default router;
