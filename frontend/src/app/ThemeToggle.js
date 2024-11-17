'use client';
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './themeContext';

export function ThemeToggle({ className = '' }) {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className={`p-3 rounded-full shadow-lg flex items-center gap-2 transition-all duration-300 ${
        isDarkMode 
          ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
          : 'bg-white text-gray-600 hover:bg-gray-50'
      } ${className}`}
    >
      {isDarkMode ? (
        <>
          <Sun size={20} />
          <span className="text-sm">Light Mode</span>
        </>
      ) : (
        <>
          <Moon size={20} />
          <span className="text-sm">Dark Mode</span>
        </>
      )}
    </button>
  );
}