import { useLocation } from "react-router-dom";
import React from "react";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const handleToggle = (e) => {
    toggleTheme(e.clientX, e.clientY);
  };

  // 🎮 Top-right on game pages, bottom-right everywhere else
  const isGame = /^\/game\/[^/]+$/.test(location.pathname);

  return (
    <div 
      className={isGame 
        ? "fixed top-3 left-3  z-[9999]" 
        : "fixed bottom-8 right-8 z-[9999]"
      }
    >
      <button
        onClick={handleToggle}
        className="group relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-white p-0 shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 dark:bg-slate-800"
        aria-label="Toggle Theme"
      >
        {/* Animated Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 opacity-0 transition-opacity group-hover:opacity-100 dark:from-indigo-400/20 dark:to-purple-400/20" />

        {/* 2D Icons with Animation */}
        <div className="relative h-6 w-6">
          {/* Sun Icon */}
          <div
            className={`absolute inset-0 transition-all duration-500 transform ${
              theme === "dark" ? "translate-y-12 rotate-90 opacity-0" : "translate-y-0 rotate-0 opacity-100"
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-amber-500"
            >
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          </div>

          {/* Moon Icon */}
          <div
            className={`absolute inset-0 transition-all duration-500 transform ${
              theme === "light" ? "-translate-y-12 -rotate-90 opacity-0" : "translate-y-0 rotate-0 opacity-100"
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-indigo-400"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </div>
        </div>
      </button>
    </div>
  );
};

export default ThemeToggle;
