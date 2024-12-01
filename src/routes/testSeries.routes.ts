import express from "express";
import {
  createTestSeries,
  getTestSeries,
  getTestSeriesById,
  updateTest,
} from "../controllers/testSeries.controller";

const router = express.Router();

router.post("/", createTestSeries); // Create a new test series
router.get("/", getTestSeries); // Get all test series
router.get("/:testSeriesId", getTestSeriesById); // Get a specific test series
router.put("/:testSeriesId/:testId", updateTest); // Update a test in the series

export default router;
