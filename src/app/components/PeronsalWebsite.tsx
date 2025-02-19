"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTerminal } from "../hooks/useTerminal";
import TerminalHeader from "./TerminalHeader";
import CommandPrompt from "./CommandPrompt";
import TerminalOutput from "./TerminalOutput";
import { HistoryEntry } from "../types";

const PersonalWebsite: React.FC = () => {
  const { input, setInput, history, currentPath, handleKeyPress } =
    useTerminal();

  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);

  // Keep input focused
  useEffect(() => {
    const focusInput = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    // Focus on mount
    focusInput();

    // Focus when clicking anywhere in the terminal
    const handleTerminalClick = (e: MouseEvent) => {
      if (terminalBodyRef.current?.contains(e.target as Node)) {
        focusInput();
      }
    };

    document.addEventListener("click", handleTerminalClick);

    // Refocus on history change
    if (history.length > 0) {
      focusInput();
    }

    return () => {
      document.removeEventListener("click", handleTerminalClick);
    };
  }, [history]);

  // Handle auto-scrolling
  useEffect(() => {
    if (autoScroll && terminalBodyRef.current) {
      const scrollContainer = terminalBodyRef.current;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [history, autoScroll, input]);

  // Handle scroll events
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const bottom =
      Math.abs(target.scrollHeight - target.scrollTop - target.clientHeight) <
      1;
    setAutoScroll(bottom);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-red-50 to-white text-gray-800 p-4 font-mono relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(185,28,28,0.03)_0%,rgba(185,28,28,0)_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(220,38,38,0.03)_0%,rgba(220,38,38,0)_35%)]"></div>

      <div className="max-w-4xl mx-auto relative">
        {/* Terminal Header */}
        <TerminalHeader />

        {/* Terminal Body */}
        <div
          ref={terminalBodyRef}
          onScroll={handleScroll}
          className="bg-white/70 backdrop-blur-md p-4 rounded-b-lg h-[40vh] overflow-y-auto border border-t-0 border-red-200 shadow-lg shadow-red-100 no-scrollbar"
          style={{
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          {/* Command History */}
          {history.map((entry: HistoryEntry, i: number) => (
            <div key={i} className="mb-6 space-y-2">
              {/* Command Prompt */}
              {entry.command && (
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-red-600/80">{entry.timestamp}</span>
                  <span className="text-red-700/80">{entry.path}</span>
                  <span className="text-gray-400">❯</span>
                  <span className="text-gray-700">{entry.command}</span>
                </div>
              )}
              {/* Command Output */}
              <div className={`pl-4 ${entry.error ? "text-red-500" : ""}`}>
                {entry.output && <TerminalOutput output={entry.output} />}
              </div>
            </div>
          ))}

          {/* Current Input */}
          <CommandPrompt
            ref={inputRef}
            input={input}
            currentPath={currentPath}
            onInputChange={setInput}
            onKeyPress={handleKeyPress}
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalWebsite;
