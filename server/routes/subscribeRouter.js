import express from "express";
import auth from "../middleware/auth.js";
import { subscribe, unsubscribe } from "../controllers/subscribeController.js";

const router = express.Router();

router.put("/subscribe", auth, subscribe);
router.put("/unsubscribe", auth, unsubscribe);

export default router;
