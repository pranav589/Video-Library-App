import express from "express";
import auth from "../middleware/auth.js";
import {
  addVideoToHistory,
  getHistoryOfUser,
} from "../controllers/historyController.js";

const router = express.Router();

router.post("/addHistory", auth, addVideoToHistory);
router.get("/videoHistory", auth, getHistoryOfUser);

export default router;
