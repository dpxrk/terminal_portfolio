import React from "react";
import { TerminalHeader } from "@/app/components/TerminalHeader";
import { CommandPrompt } from "@/app/components/CommandPrompt";
import { TerminalOutput } from "@/app/components/TerminalOutput";
import { useTerminal } from "@/app/hooks/useTerminal";

const PersonalWebsite: React.FC = () => {
  const { input, setInput, history, currentPath, handleKeyPress } =
    useTerminal();

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 p-4 font-mono">
      <div className="max-w-4xl mx-auto">
        <TerminalHeader />

        {/* Terminal Body */}
        <div className="bg-gray-900/50 backdrop-blur-sm p-4 rounded-b-lg h-[80vh] overflow-y-auto border border-t-0 border-cyan-800/30">
          {/* Command History */}
          {history.map((entry, i) => (
            <div key={i} className="mb-4">
              {/* Command Prompt */}
              {entry.command && (
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-cyan-400/70">{entry.timestamp}</span>
                  <span className="text-purple-400/70">{entry.path}</span>
                  <span className="text-gray-500">$</span>
                  <span className="text-gray-300">{entry.command}</span>
                </div>
              )}
              {/* Command Output */}
              <div className={`pl-4 ${entry.error ? "text-red-400" : ""}`}>
                <TerminalOutput output={entry.output} />
              </div>
            </div>
          ))}

          {/* Current Input */}
          <CommandPrompt
            input={input}
            currentPath={currentPath}
            setInput={setInput}
            handleKeyPress={handleKeyPress}
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalWebsite;
