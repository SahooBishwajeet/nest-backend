import express from "express";
import {
  enrollInTestSeries,
  getUserTestSeries,
  updateTestProgress,
} from "../controllers/userTestSeries.controller";

const router = express.Router();

router.post("/", enrollInTestSeries); // Enroll a user in a test series
router.get("/:userId", getUserTestSeries); // Get all test series for a user
router.put("/:userId/:testSeriesId/:testId", updateTestProgress); // Update progress for a specific test

export default router;
