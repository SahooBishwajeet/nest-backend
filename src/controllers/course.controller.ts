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

export const addContent = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { courseId, parentTopicId } = req.params;
  const { contentId, type, title, url } = req.body;

  try {
    // Find the course by courseId
    const course = await Course.findOne({ courseId });

    if (!course) {
      res.status(404).json({ message: "Course not found" });
      return;
    }

    // Find the parent topic by parentTopicId
    const parentTopicIndex = course.parentTopics.findIndex(
      (topic) => topic.parentId === parentTopicId
    );

    if (parentTopicIndex === -1) {
      res.status(404).json({ message: "Parent topic not found in the course" });
      return;
    }

    // Add the new content to the parent topic
    course.parentTopics[parentTopicIndex].contents.push({
      contentId,
      type,
      title,
      url,
    });

    // Save the updated course
    await course.save();

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error });
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
