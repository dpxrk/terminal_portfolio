import React from "react";

export const TerminalHeader: React.FC = () => {
  return (
    <div className="bg-gray-900 rounded-t-lg p-3 flex items-center justify-between border-b border-cyan-800/30">
      <div className="flex items-center space-x-2">
        <div className="h-3 w-3 rounded-full bg-cyan-500/20 border border-cyan-500/40"></div>
        <div className="h-3 w-3 rounded-full bg-purple-500/20 border border-purple-500/40"></div>
        <div className="h-3 w-3 rounded-full bg-green-500/20 border border-green-500/40"></div>
      </div>
      <div className="text-cyan-500/70 text-sm">DANIEL_PARK.TERMINAL</div>
      <div className="text-gray-600 text-sm">
        {new Date().toLocaleDateString()}
      </div>
    </div>
  );
};
