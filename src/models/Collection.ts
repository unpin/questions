import mongoose from "mongoose";

export interface Collection extends mongoose.Document {
  type: "quiz" | "cards";
  name: string;
  description: string;
  user_id: mongoose.Types.ObjectId;
  questions: mongoose.Types.ObjectId[];
  created_at: Date;
  updated_at: Date;
}

const CollectionSchema = new mongoose.Schema<Collection>(
  {
    type: { type: String, enum: ["quiz", "cards"], required: true },
    name: { type: String, required: true },
    description: { type: String },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export default mongoose.models.Collection ||
  mongoose.model<Collection>("Collection", CollectionSchema);
