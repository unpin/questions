import { QuestionOption, type Question } from "@/models/Question";
import { CircleNotch, Translate } from "../Icon/Icon";
import { useEffect, useState } from "react";

type QuestionCardProps = {
  question: Question;
};

export default function QuestionCard({ question }: QuestionCardProps) {
  const { questionNumber, question: questionText, options } = question;
  const [showTranslation, setShowTranslation] = useState(false);
  const [translation, setTranslation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTranslate = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/translation", {
        method: "POST",
        body: JSON.stringify({
          text: questionText,
          targetLang: "Farsi",
        }),
      });
      const data = await res.json();
      setTranslation(data.translation);
      setShowTranslation(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 rounded-2xl shadow-lg p-4 border border-gray-300 dark:border-gray-800 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 transition-all">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-gray-400 dark:text-gray-500">
          Question #{questionNumber}
        </span>
        <div className="flex gap-4 items-center">
          <button
            disabled={isLoading}
            onClick={handleTranslate}
            className={`block button-translate ${
              isLoading ? "animate-pulse" : ""
            } ${showTranslation ? "active" : ""}`}
          >
            <Translate />
          </button>
          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 shadow">
            Krok 2, 2023
          </span>
        </div>
      </div>
      <h4 className="font-light mb-4 text-gray-900 dark:text-gray-300">
        {questionText}
      </h4>
      {showTranslation && translation && (
        <h4 className="font-light mb-4 text-gray-900 dark:text-gray-300">
          {translation}
        </h4>
      )}
      <ul className="flex flex-col gap-2">
        {options.map(({ isCorrect, option, text }: QuestionOption, idx) => (
          <li
            key={idx}
            className={`flex items-center gap-2 rounded-xl px-3 py-2.5 border transition-all ${
              isCorrect
                ? "border-green-400 bg-green-50 dark:bg-green-900/10 text-green-700 dark:text-green-100"
                : "border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-300"
            }`}
          >
            <span className="text-blue-600 dark:text-blue-300">{option}.</span>
            <span className="flex-1">{text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
