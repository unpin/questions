import mongoose from "mongoose";

export interface Bookmark extends mongoose.Document {
  user_id: mongoose.Types.ObjectId;
  questions: mongoose.Types.ObjectId[];
  created_at: Date;
  updated_at: Date;
}

const BookmarkSchema = new mongoose.Schema<Bookmark>(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export default mongoose.models.Bookmark ||
  mongoose.model<Bookmark>("Bookmark", BookmarkSchema);
