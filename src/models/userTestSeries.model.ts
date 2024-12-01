import mongoose, { Document, Schema } from "mongoose";

export interface IUserTestProgress {
  testId: string; // Reference to the test
  attempted: boolean; // Whether the test has been attempted
  score?: number; // Score obtained (if attempted)
}

export interface IUserTestSeries extends Document {
  userId: string; // Reference to the user
  testSeriesId: string; // Reference to the test series
  progress: IUserTestProgress[]; // Array of user progress for individual tests
  enrollmentDate: Date; // Date of enrollment
  completionDate?: Date; // Date of completion (optional)
}

const UserTestProgressSchema: Schema = new Schema({
  testId: { type: String, required: true },
  attempted: { type: Boolean, default: false },
  score: { type: Number },
});

const UserTestSeriesSchema: Schema = new Schema(
  {
    userId: { type: String, required: true },
    testSeriesId: { type: String, required: true },
    progress: [UserTestProgressSchema],
    enrollmentDate: { type: Date, default: Date.now },
    completionDate: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model<IUserTestSeries>(
  "UserTestSeries",
  UserTestSeriesSchema
);
