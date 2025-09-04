"use client";

import { useEffect, useRef } from "react";
import { useThemeContext } from "../../hooks/useTheme";
import { Moon, Sun } from "../Icon/Icon";

declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}

export function ThemeToggleButton() {
  const { theme, toggleTheme } = useThemeContext();

  const audioContextRef = useRef<AudioContext | null>(null);
  const audioCacheRef = useRef<Record<string, AudioBuffer>>({});

  useEffect(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext ||
        window.webkitAudioContext)();
    }
    const ctx = audioContextRef.current!;
    const files = ["/sounds/light-on.mp3", "/sounds/light-off.mp3"];
    files.forEach(async (file) => {
      try {
        if (!audioCacheRef.current[file]) {
          const res = await fetch(file);
          const buffer = await res.arrayBuffer();
          const decoded = await ctx.decodeAudioData(buffer);
          audioCacheRef.current[file] = decoded;
        }
      } catch (error) {
        console.error(error);
      }
    });
  }, []);

  const playSound = async (file: string) => {
    try {
      const ctx = audioContextRef.current!;
      let decoded = audioCacheRef.current[file];

      if (!decoded) {
        const res = await fetch(file);
        const buffer = await res.arrayBuffer();
        decoded = await ctx.decodeAudioData(buffer);
        audioCacheRef.current[file] = decoded;
      }

      const src = ctx.createBufferSource();
      src.buffer = decoded;
      src.connect(ctx.destination);
      src.start(0);
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggle = () => {
    toggleTheme();
    const file =
      theme === "dark" ? "/sounds/light-on.mp3" : "/sounds/light-off.mp3";
    playSound(file);
  };

  return (
    <button onClick={handleToggle} className="cursor-pointer flex">
      <div className="relative w-6 h-6">
        <div
          className={`absolute inset-0 transition-all duration-300 transform ${
            theme === "dark"
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4"
          }`}
        >
          <Moon size={24} />
        </div>
        <div
          className={`absolute inset-0 transition-all duration-300 transform ${
            theme === "light"
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <Sun size={24} />
        </div>
      </div>
    </button>
  );
}
