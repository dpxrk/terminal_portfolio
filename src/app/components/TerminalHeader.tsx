"use client";

import React, { useEffect, useState } from "react";

const TerminalHeader: React.FC = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-slate-800/80 backdrop-blur-sm rounded-t-lg p-2.5 flex items-center justify-between border border-blue-900/30">
      <div className="flex items-center space-x-2">
        <div className="h-3 w-3 rounded-full bg-blue-500/20 border border-blue-500/40 hover:bg-blue-500/40 transition-all duration-300 cursor-pointer"></div>
        <div className="h-3 w-3 rounded-full bg-indigo-500/20 border border-indigo-500/40 hover:bg-indigo-500/40 transition-all duration-300 cursor-pointer"></div>
        <div className="h-3 w-3 rounded-full bg-cyan-500/20 border border-cyan-500/40 hover:bg-cyan-500/40 transition-all duration-300 cursor-pointer"></div>
      </div>
      <div className="text-blue-400/90 text-sm font-bold tracking-wider hover:text-blue-400 transition-colors duration-300">
        DANIEL_PARK.TERMINAL
      </div>
      <div className="text-slate-400 text-sm font-medium hover:text-blue-400/80 transition-colors duration-300">
        {time}
      </div>
    </div>
  );
};

export default TerminalHeader;
