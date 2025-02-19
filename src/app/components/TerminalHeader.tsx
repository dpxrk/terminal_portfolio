"use client";

import React, { useEffect, useState } from "react";

const TerminalHeader: React.FC = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    setTime(new Date().toLocaleTimeString());
  }, []);

  return (
    <div className="bg-zinc-100 rounded-t-lg p-2.5 flex items-center justify-between border border-zinc-300">
      <div className="flex items-center space-x-2">
        <div className="h-3 w-3 rounded-full bg-red-900 border border-red-950"></div>
        <div className="h-3 w-3 rounded-full bg-red-800 border border-red-900"></div>
        <div className="h-3 w-3 rounded-full bg-red-700 border border-red-800"></div>
      </div>
      <div className="text-zinc-700 text-sm font-medium tracking-wide">
        DANIEL_PARK.TERMINAL
      </div>
      <div className="text-zinc-500 text-sm">{time}</div>
    </div>
  );
};

export default TerminalHeader;
