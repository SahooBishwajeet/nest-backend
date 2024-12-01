import mongoose, { Document, Schema } from "mongoose";

export interface IUserCourse extends Document {
  userId: string; // Reference to the user
  courseId: string; // Reference to the course
  progress: {
    completedPercentage: number; // Percentage of the course completed
    lastAccessedContent: string; // Content ID of the last accessed item
  };
  notes: [
    {
      noteId: string; // Unique note identifier
      content: string; // The note content
      timestamp: Date; // When the note was created
    }
  ];
  enrollmentDate: Date; // Date of enrollment
  completionDate?: Date; // (Optional) Completion date
  status: string; // e.g., "In Progress", "Completed"
}

const NoteSchema: Schema = new Schema({
  noteId: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const UserCourseSchema: Schema = new Schema(
  {
    userId: { type: String, required: true },
    courseId: { type: String, required: true },
    progress: {
      completedPercentage: { type: Number, default: 0 },
      lastAccessedContent: { type: String },
    },
    notes: [NoteSchema],
    enrollmentDate: { type: Date, default: Date.now },
    completionDate: { type: Date },
    status: { type: String, default: "In Progress" },
  },
  { timestamps: true }
);

export default mongoose.model<IUserCourse>("UserCourse", UserCourseSchema);
