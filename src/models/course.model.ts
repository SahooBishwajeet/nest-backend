import mongoose, { Document, Schema } from "mongoose";

export interface IContent {
  contentId: string;
  type: string; // e.g., "video", "pdf"
  title: string;
  url: string;
}

export interface ICourse extends Document {
  courseId: string;
  title: string;
  category: string;
  contents: IContent[];
  createdBy: string; // Reference to the creator (could be a user ID)
  description: string;
  thumbnail: string; // URL to the course thumbnail
}

const ContentSchema: Schema = new Schema({
  contentId: { type: String, required: true },
  type: { type: String, required: true },
  title: { type: String, required: true },
  url: { type: String, required: true },
});

const CourseSchema: Schema = new Schema(
  {
    courseId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    contents: [ContentSchema],
    createdBy: { type: String, required: true },
    description: { type: String, required: true },
    thumbnail: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ICourse>("Course", CourseSchema);