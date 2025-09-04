import { type Question } from "@/models/Question";
import QuestionCard from "./QuestionCard";

type ListViewProps = {
  questions: Question[];
};

export default function ListView({ questions }: ListViewProps) {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {questions.map((question: Question, i) => (
          <QuestionCard key={i} question={question} />
        ))}
      </div>
    </div>
  );
}
