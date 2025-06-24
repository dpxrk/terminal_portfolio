"use client";
import React, { useState, useEffect, useRef } from 'react';

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
  const [showCursor, setShowCursor] = useState(true);
  const [inputKey] = useState(Date.now());
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
      }));
    };
    
    updateTime();
    const timer = setInterval(updateTime, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Auto-focus input on mount and when it loses focus
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Keep focus on the input
  useEffect(() => {
    const handleFocus = () => {
      if (inputRef.current && document.activeElement !== inputRef.current) {
        inputRef.current.focus();
      }
    };

    // Check focus periodically
    const focusInterval = setInterval(handleFocus, 100);
    
    // Also focus on any click in the window
    const handleWindowClick = () => {
      setTimeout(handleFocus, 10);
    };

    window.addEventListener('click', handleWindowClick);
    window.addEventListener('focus', handleFocus);

    return () => {
      clearInterval(focusInterval);
      window.removeEventListener('click', handleWindowClick);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="flex items-center space-x-3 text-sm group animate-fade-in">
      <span className="text-muted tabular-nums">
        {currentTime}
      </span>
      <span className="text-luxury-gold/70 font-light">
        {currentPath}
      </span>
      <span className="text-muted">
        ›
      </span>
      <div className="flex-1 relative">
        <form onSubmit={(e) => e.preventDefault()} autoComplete="off">
          <input
            key={inputKey}
            ref={inputRef}
            id="terminal-command-input"
            type="text"
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyPress={onKeyPress}
            className="w-full bg-transparent outline-none text-cream/90 focus:text-cream transition-colors duration-300 pr-4 font-light placeholder-muted/50"
            autoFocus
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            data-form-type="other"
            data-lpignore="true"
            aria-label="Terminal command input"
            aria-autocomplete="none"
            list="none"
            name={`terminal-input-${Date.now()}`}
            placeholder="Type /help for commands"
            style={{ WebkitAppearance: 'none' }}
          />
        </form>
        {/* Elegant cursor */}
        <span 
          className={`absolute top-0 bottom-0 w-[2px] bg-luxury-gold transition-opacity duration-200 ${
            showCursor && input.length === 0 ? 'opacity-60' : 'opacity-0'
          }`}
          style={{ 
            left: `${input.length * 0.55}rem`
          }}
        />
      </div>
    </div>
  );
};

export default CommandPrompt;