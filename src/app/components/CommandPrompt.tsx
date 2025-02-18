import React from "react";

interface CommandPromptProps {
  input: string;
  currentPath: string;
  setInput: (value: string) => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
}

export const CommandPrompt: React.FC<CommandPromptProps> = ({
  input,
  currentPath,
  setInput,
  handleKeyPress,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-cyan-400/70">
        {new Date().toLocaleTimeString()}
      </span>
      <span className="text-purple-400/70">{currentPath}</span>
      <span className="text-gray-500">$</span>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        className="flex-1 bg-transparent outline-none text-gray-300"
        autoFocus
      />
    </div>
  );
};
