"use client";

import React from "react";
import TerminalHeader from "@/app/components/TerminalHeader";
import CommandPrompt from "@/app/components/CommandPrompt";
import TerminalOutput from "@/app/components/TerminalOutput";
import { useTerminal } from "@/app/hooks/useTerminal";
import { HistoryEntry } from "@/app/types";

const PersonalWebsite: React.FC = () => {
  const { input, setInput, history, currentPath, handleKeyPress } =
    useTerminal();

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-100 to-white text-gray-800 p-4 font-mono">
      <div className="max-w-2xl mx-auto relative">
        <TerminalHeader />

        <div className="bg-white p-4 rounded-b-lg h-[600px] overflow-y-auto border border-t-0 border-zinc-300 shadow-lg">
          {history.map((entry: HistoryEntry, i: number) => (
            <div key={i} className="mb-4 space-y-2">
              {entry.command && (
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-red-900/80">{entry.timestamp}</span>
                  <span className="text-red-950/80">{entry.path}</span>
                  <span className="text-zinc-500">❯</span>
                  <span className="text-zinc-700">{entry.command}</span>
                </div>
              )}

              <div className={`pl-4 ${entry.error ? "text-red-700" : ""}`}>
                {entry.output && <TerminalOutput output={entry.output} />}
              </div>
            </div>
          ))}

          <CommandPrompt
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
