import express from "express";
import {
  getAllVideos,
  getVideo,
  uploadVideo,
} from "../controllers/videoController.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.post("/uploadVideo", auth, uploadVideo);
router.get("/homeVideos", getAllVideos);
router.get("/videoDetail/:id", getVideo);

export default router;
