import express from "express";
import {
  addNote,
  enrollInCourse,
  getUserCourses,
  updateProgress,
} from "../controllers/userCourse.controller";

const router = express.Router();

router.post("/", enrollInCourse); // Enroll in a course
router.get("/:userId", getUserCourses); // Get all courses for a user
router.put("/:userId/:courseId/progress", updateProgress); // Update progress
router.post("/:userId/:courseId/notes", addNote); // Add a note

export default router;
