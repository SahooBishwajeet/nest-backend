import express from "express";
import {
  addNote,
  deleteNote,
  enrollInCourse,
  getNoteById,
  getNotes,
  getUserCourseById,
  getUserCourses,
  updateNote,
  updateProgress,
} from "../controllers/userCourse.controller";

const router = express.Router();

router.post("/", enrollInCourse); // Enroll in a course
router.get("/:userId", getUserCourses); // Get all courses for a user
router.get("/:userId/:courseId", getUserCourseById); // Get a specific course for a user
router.put("/:userId/:courseId/progress", updateProgress); // Update progress
router.get("/:userId/:courseId/notes", getNotes); // Get all notes
router.get("/:userId/:courseId/notes/:noteId", getNoteById); // Get a specific note
router.post("/:userId/:courseId/notes", addNote); // Add a note
router.put("/:userId/:courseId/notes/:noteId", updateNote); // Edit a note
router.delete("/:userId/:courseId/notes/:noteId", deleteNote); // Delete a note

export default router;
