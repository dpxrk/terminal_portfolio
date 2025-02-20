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
      const timer = setInterval(() => {
        setTime(new Date().toLocaleTimeString());
      }, 1000);

      return () => clearInterval(timer);
    }, []);

    return (
      <div className="flex items-center space-x-2 text-sm group">
        <span className="text-blue-400/80 group-focus-within:text-blue-400 transition-colors duration-300">
          {time}
        </span>
        <span className="text-indigo-400/80 group-focus-within:text-indigo-400 transition-colors duration-300">
          {currentPath}
        </span>
        <span className="text-slate-500 group-focus-within:text-blue-400 transition-colors duration-300">
          ▶
        </span>
        <input
          ref={ref}
          type="text"
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyPress={onKeyPress}
          className="flex-1 bg-transparent outline-none text-slate-300 focus:text-blue-400 
            transition-colors duration-300 caret-blue-400 placeholder-slate-600"
          placeholder="Type a command..."
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
