import express from "express";
import auth from "../middleware/auth.js";
import { decLike, incLike } from "../controllers/likeDisLikeController.js";
const router = express.Router();

router.put("/increaseLike", auth, incLike);
router.put("/decreaseLike", auth, decLike);

export default router;
