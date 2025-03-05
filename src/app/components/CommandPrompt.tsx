"use client";
import React, { useState, useEffect } from 'react';

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
  onKeyPress
}) => {

  const [currentTime, setCurrentTime] = useState('');
  
  
  useEffect(() => {
    
    setCurrentTime(new Date().toLocaleTimeString());
    
   
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center space-x-2 text-sm group">
      <span className="text-blue-400/80 group-focus-within:text-blue-400 transition-colors duration-300">
        {currentTime}
      </span>
      <span className="text-yellow-500/80 group-focus-within:text-yellow-500 transition-colors duration-300">
        {currentPath}
      </span>
      <span className="text-gray-400 group-focus-within:text-blue-400 transition-colors duration-300">
        ❯
      </span>
      <input
        type="text"
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        onKeyPress={onKeyPress}
        className="flex-1 bg-transparent outline-none text-gray-300 focus:text-yellow-200 transition-colors duration-300"
        autoFocus
      />
    </div>
  );
};

export default CommandPrompt;