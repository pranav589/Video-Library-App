import express from "express";
import auth from "../middleware/auth.js";
import {
  getSubscribedChannels,
  getSubscriptionsVideos,
  subscribe,
  unsubscribe,
} from "../controllers/subscribeController.js";

const router = express.Router();

router.put("/subscribe", auth, subscribe);
router.put("/unsubscribe", auth, unsubscribe);
router.get("/subscriptions/:id", auth, getSubscriptionsVideos);
router.get("/subscribedChannels/:id", auth, getSubscribedChannels);

export default router;
