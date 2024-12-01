import { Request, Response } from "express";
import UserCourse, { IUserCourse } from "../models/userCourse.model";

export const enrollInCourse = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userCourse: IUserCourse = new UserCourse(req.body);
    const savedUserCourse = await userCourse.save();
    res.status(201).json(savedUserCourse);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const getUserCourses = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userCourses = await UserCourse.find({ userId: req.params.userId });
    res.status(200).json(userCourses);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getUserCourseById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId, courseId } = req.params;
    const userCourse = await UserCourse.findOne({ userId, courseId });
    res.status(200).json(userCourse);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const updateProgress = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId, courseId } = req.params;
    const { completedPercentage, lastAccessedContent } = req.body;

    const userCourse = await UserCourse.findOneAndUpdate(
      { userId, courseId },
      {
        $set: {
          "progress.completedPercentage": completedPercentage,
          "progress.lastAccessedContent": lastAccessedContent,
        },
      },
      { new: true }
    );

    if (!userCourse) {
      res.status(404).json({ message: "User-Course relationship not found" });
      return;
    }

    res.status(200).json(userCourse);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const addNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, courseId } = req.params;
    const { noteId, content } = req.body;

    const userCourse = await UserCourse.findOneAndUpdate(
      { userId, courseId },
      { $push: { notes: { noteId, content } } },
      { new: true }
    );

    if (!userCourse) {
      res.status(404).json({ message: "User-Course relationship not found" });
      return;
    }

    res.status(200).json(userCourse);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
