import mongoose from "mongoose";

export interface QuestionOption {
  isCorrect: boolean;
  option: string;
  text: string;
}

export interface Question extends mongoose.Document {
  questionNumber: number;
  question: string;
  options: QuestionOption[];
}

const QuestionOptionSchema = new mongoose.Schema<QuestionOption>({
  isCorrect: { type: Boolean, required: true },
  option: { type: String, required: true },
  text: { type: String, required: true },
});

const QuestionSchema = new mongoose.Schema<Question>({
  questionNumber: { type: Number, required: true },
  question: { type: String, required: true },
  options: { type: [QuestionOptionSchema], required: true },
});

export default mongoose.models.Question ||
  mongoose.model<Question>("Question", QuestionSchema);
