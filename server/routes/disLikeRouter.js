import express from "express";
import auth from "../middleware/auth.js";
import {
  decDisLike,
  incDisLike,
} from "../controllers/likeDisLikeController.js";
const router = express.Router();

router.put("/increaseDislike", auth, incDisLike);
router.put("/decreaseDislike", auth, decDisLike);

export default router;
