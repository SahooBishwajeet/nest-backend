import { Request, Response } from "express";
import Course, { ICourse } from "../models/course.model";

export const createCourse = async (req: Request, res: Response) => {
  try {
    const course: ICourse = new Course(req.body);
    const savedCourse = await course.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const getCourses = async (req: Request, res: Response) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getCourseById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const course = await Course.findOne({ courseId: req.params.courseId });
    if (!course) {
      res.status(404).json({ message: "Course not found" });
      return;
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
