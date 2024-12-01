import { Request, Response } from "express";
import UserTestSeries, {
  IUserTestSeries,
} from "../models/userTestSeries.model";

export const enrollInTestSeries = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId, testSeriesId, progress } = req.body;

    const newEnrollment: IUserTestSeries = new UserTestSeries({
      userId,
      testSeriesId,
      progress,
    });

    const savedEnrollment = await newEnrollment.save();
    res.status(201).json(savedEnrollment);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const getUserTestSeries = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;
    const userTestSeries = await UserTestSeries.find({ userId });
    res.status(200).json(userTestSeries);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const updateTestProgress = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId, testSeriesId, testId } = req.params;
    const { attempted, score } = req.body;

    const userTestSeries = await UserTestSeries.findOne({
      userId,
      testSeriesId,
    });
    if (!userTestSeries) {
      res
        .status(404)
        .json({ message: "User-TestSeries relationship not found" });
      return;
    }

    const testProgress = userTestSeries.progress.find(
      (t) => t.testId === testId
    );
    if (!testProgress) {
      res.status(404).json({ message: "Test not found in user progress" });
      return;
    }

    if (attempted !== undefined) testProgress.attempted = attempted;
    if (score !== undefined) testProgress.score = score;

    const updatedUserTestSeries = await userTestSeries.save();
    res.status(200).json(updatedUserTestSeries);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
