"use client";
import React, { useState, forwardRef, useEffect } from "react";

interface CommandPromptProps {
  input: string;
  currentPath: string;
  onInputChange: (value: string) => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const CommandPrompt = forwardRef<HTMLInputElement, CommandPromptProps>(
  ({ input, currentPath, onInputChange, onKeyPress }, ref) => {
    const [time, setTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
      setTime(new Date().toLocaleTimeString());
    }, []);

    return (
      <div className="flex items-center space-x-2 text-sm group">
        <span className="text-red-600/80 group-focus-within:text-red-600 transition-colors duration-300">
          {time}
        </span>
        <span className="text-red-700/80 group-focus-within:text-red-700 transition-colors duration-300">
          {currentPath}
        </span>
        <span className="text-gray-400 group-focus-within:text-red-500 transition-colors duration-300">
          ❯
        </span>
        <input
          ref={ref}
          type="text"
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyPress={onKeyPress}
          className="flex-1 bg-transparent outline-none text-gray-700 focus:text-red-600 transition-colors duration-300 caret-red-600"
          autoFocus
          autoComplete="off"
          spellCheck="false"
        />
      </div>
    );
  }
);

CommandPrompt.displayName = "CommandPrompt";

export default CommandPrompt;
