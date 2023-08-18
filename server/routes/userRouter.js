import express from "express";
import { getChannelDetails } from "../controllers/userController.js";

const router = express.Router();

router.get("/channelDetails/:id", getChannelDetails);

export default router;
