import express from "express";
import auth from "../middleware/auth.js";
import {
  getVideoComments,
  saveComment,
} from "../controllers/commentController.js";
const router = express.Router();

router.post("/saveComment", auth, saveComment);
router.get("/getVideoComments/:videoId", getVideoComments);

export default router;
