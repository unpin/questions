"use client";

import { useEffect, useState } from "react";
import SingleView from "./SingleView";
import ListView from "./ListView";
import { List } from "../Icon/Icon";
import useLocalStorage from "@/hooks/useLocalStorage";

type ListView = "list" | "single";

export default function Questions() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useLocalStorage<ListView>("view", "single");

  useEffect(() => {
    async function fetchQuestions() {
      const res = await fetch("/api/questions");
      const data = await res.json();
      setQuestions(data);
      setLoading(false);
    }
    fetchQuestions();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-gray-700 dark:text-gray-300 py-8">
        Loading questions...
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between h-full max-w-6xl mx-auto">
      <div className="flex justify-between items-center my-8 gap-2">
        <div className="flex flex-col">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-700 dark:text-gray-300">
            Krok 2
          </h3>
          <span className="font-medium text-gray-600 dark:text-gray-400">
            Dentistry, 2023
          </span>
        </div>
        <div className="flex items-center p-1 rounded-full bg-white dark:bg-gray-800 gap-2">
          <button
            className={`button-view ${view === "single" ? "active" : ""}`}
            onClick={() => setView("single")}
          >
            Single
          </button>
          <button
            className={`button-view ${view === "list" ? "active" : ""}`}
            onClick={() => setView("list")}
          >
            List
          </button>
        </div>
      </div>
      {view === "list" ? (
        <ListView questions={questions} />
      ) : (
        <SingleView questions={questions} />
      )}
    </div>
  );
}
