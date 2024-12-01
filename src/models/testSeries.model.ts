import mongoose, { Document, Schema } from "mongoose";

export interface ITest {
  testId: string; // Unique identifier for the test
  title: string; // Test title
  attempted: boolean; // Whether the user has attempted the test
  score?: number; // Score obtained
  totalMarks: number; // Maximum marks for the test
  duration: number; // Test duration in minutes
}

export interface ITestSeries extends Document {
  testSeriesId: string; // Unique identifier for the test series
  title: string; // Test series name
  category: string; // e.g., "GATE", "GRE"
  description: string; // Description of the test series
  tests: ITest[]; // Array of individual tests
  createdBy: string; // User ID of the creator
}

const TestSchema: Schema = new Schema({
  testId: { type: String, required: true },
  title: { type: String, required: true },
  attempted: { type: Boolean, default: false },
  score: { type: Number },
  totalMarks: { type: Number, required: true },
  duration: { type: Number, required: true },
});

const TestSeriesSchema: Schema = new Schema(
  {
    testSeriesId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    tests: [TestSchema],
    createdBy: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ITestSeries>("TestSeries", TestSeriesSchema);
