"use client";

import { ThemeToggleButton } from "../ThemeToggleButton/ThemeToggleButton";

export default function Header() {
  return (
    <div>
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 p-4 rounded-xl">
        <ul className="flex items-center w-full">
          <li className="dark:text-gray-200">Home</li>
          <li className="ml-auto dark:text-gray-200">
            <ThemeToggleButton />
          </li>
        </ul>
      </div>
    </div>
  );
}
