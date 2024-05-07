import express from "express";
import {
  getAllShorts,
  getShortsById,
  uploadShorts,
} from "../controllers/shortsController.js";

const router = express.Router();

router.get("/", getAllShorts);
router.get("/:id", getShortsById);
router.post("/upload", uploadShorts);

export default router;
