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
    <div className="min-h-screen bg-slate-900 text-slate-300 p-4 font-mono relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 grid grid-cols-12 gap-4 opacity-5">
          {Array.from({ length: 12 * 8 }).map((_, i) => (
            <div
              key={i}
              className="h-8 bg-blue-500/10 rounded-sm"
              style={{
                animation: `pulse ${6 + (i % 4)}s infinite`,
                animationDelay: `${(i % 4) * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto relative">
        {/* Terminal Header */}
        <TerminalHeader />

        {/* Terminal Body */}
        <div
          ref={terminalBodyRef}
          onScroll={handleScroll}
          className="bg-slate-800/50 backdrop-blur-sm p-4 rounded-b-lg h-[40vh] overflow-y-auto 
            border border-t-0 border-blue-900/30 shadow-lg shadow-blue-900/10 no-scrollbar"
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
                  <span className="text-blue-400/80">{entry.timestamp}</span>
                  <span className="text-indigo-400/80">{entry.path}</span>
                  <span className="text-slate-500">▶</span>
                  <span className="text-slate-300">{entry.command}</span>
                </div>
              )}
              {/* Command Output */}
              <div className={`pl-4 ${entry.error ? "text-red-400" : ""}`}>
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
