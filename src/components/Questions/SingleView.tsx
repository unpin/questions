import { type Question } from "@/models/Question";
import { useState } from "react";
import QuestionCard from "./QuestionCard";
import { CaretLeft, CaretRight } from "../Icon/Icon";

type SingleViewProps = {
  questions: Question[];
};

export default function SingleView({ questions }: SingleViewProps) {
  const [current, setCurrent] = useState(0);

  if (!questions || questions.length === 0) {
    return <div className="text-center py-8">No questions found.</div>;
  }

  const handlePrev = () => {
    setCurrent((prev) => {
      const nextPrev = prev - 1;
      if (nextPrev <= 0) {
        return questions.length - 1;
      }
      return nextPrev;
    });
  };

  const handleNext = () => {
    setCurrent((prev) => {
      const next = prev + 1;
      if (next >= questions.length) {
        return 0;
      }
      return next;
    });
  };

  const question = questions[current];

  return (
    <div className="flex-1 max-w-xl mx-auto flex flex-col justify-between gap-4">
      <QuestionCard question={question}></QuestionCard>
      <div className="flex justify-between gap-4 items-center">
        <button className="pagination-button" onClick={handlePrev}>
          <CaretLeft size={20} />
        </button>
        <button className="text-sm font-medium p-4 text-gray-600 dark:text-gray-400 cursor-pointer transition-all">
          {current + 1} / {questions.length}
        </button>
        <button className="pagination-button" onClick={handleNext}>
          <CaretRight size={20} />
        </button>
      </div>
    </div>
  );
}
