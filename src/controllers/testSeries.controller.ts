import { Request, Response } from "express";
import TestSeries, { ITestSeries } from "../models/testSeries.model";

export const createTestSeries = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const testSeries: ITestSeries = new TestSeries(req.body);
    const savedTestSeries = await testSeries.save();
    res.status(201).json(savedTestSeries);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const getTestSeries = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const testSeries = await TestSeries.find();
    res.status(200).json(testSeries);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getTestSeriesById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { testSeriesId } = req.params;
    const testSeries = await TestSeries.findOne({ testSeriesId });
    if (!testSeries) {
      res.status(404).json({ message: "Test Series not found" });
      return;
    }
    res.status(200).json(testSeries);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const updateTest = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { testSeriesId, testId } = req.params;
    const { attempted, score } = req.body;

    const testSeries = await TestSeries.findOne({ testSeriesId });
    if (!testSeries) {
      res.status(404).json({ message: "Test Series not found" });
      return;
    }

    const test = testSeries.tests.find((t) => t.testId === testId);
    if (!test) {
      res.status(404).json({ message: "Test not found" });
      return;
    }

    if (attempted !== undefined) test.attempted = attempted;
    if (score !== undefined) test.score = score;

    const updatedTestSeries = await testSeries.save();
    res.status(200).json(updatedTestSeries);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
