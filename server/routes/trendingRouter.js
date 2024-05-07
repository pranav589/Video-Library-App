import express from "express";
import { trendingVideos } from "../controllers/trendingController.js";
const router = express.Router();

router.get("/", trendingVideos);

export default router;
