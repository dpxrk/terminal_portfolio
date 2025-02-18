"use client";
import React from "react";

interface CommandPromptProps {
  input: string;
  currentPath: string;
  onInputChange: (value: string) => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const CommandPrompt: React.FC<CommandPromptProps> = ({
  input,
  currentPath,
  onInputChange,
  onKeyPress,
}) => {
  return (
    <div className="flex items-center space-x-2 text-sm group">
      <span className="text-red-900/80 group-focus-within:text-red-900 transition-colors duration-300">
        {new Date().toLocaleTimeString()}
      </span>
      <span className="text-red-950/80 group-focus-within:text-red-950 transition-colors duration-300">
        {currentPath}
      </span>
      <span className="text-zinc-500 group-focus-within:text-red-900 transition-colors duration-300">
        ❯
      </span>
      <input
        type="text"
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        onKeyPress={onKeyPress}
        className="flex-1 bg-transparent outline-none text-zinc-700 focus:text-red-900 transition-colors duration-300"
        autoFocus
      />
    </div>
  );
};

export default CommandPrompt;
