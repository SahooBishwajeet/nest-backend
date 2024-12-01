import express from "express";
import {
  createCourse,
  getCourseById,
  getCourses,
} from "../controllers/course.controller";

const router = express.Router();

router.post("/", createCourse); // Create a new course
router.get("/", getCourses); // Get all courses
router.get("/:courseId", getCourseById); // Get a course by ID

export default router;
