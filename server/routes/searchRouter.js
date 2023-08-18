import express from "express";
import { autoCompleteSearch } from "../controllers/searchController.js";
const router = express.Router();

router.get("/", autoCompleteSearch);

export default router;
