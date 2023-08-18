import express from "express";
import auth from "../middleware/auth.js";
import {
  addVideosToPlayList,
  getLoggedUsersPlayLists,
  getVideosOfPlayList,
  newPlayList,
  removeVideosFromPlayList,
} from "../controllers/playListController.js";

const router = express.Router();

router.post("/create", auth, newPlayList);
router.put("/addToPlayList", auth, addVideosToPlayList);
router.put("/removeFromPlayList", auth, removeVideosFromPlayList);
router.get("/", auth, getLoggedUsersPlayLists);
router.get("/playListVideos/:id", auth, getVideosOfPlayList);

export default router;
