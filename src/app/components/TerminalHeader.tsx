'use client'

import React from 'react';

interface TerminalHeaderProps {
  isDragging?: boolean;
}

const TerminalHeader: React.FC<TerminalHeaderProps> = ({ isDragging = false }) => {
  return (
    <div className={`
      bg-gradient-to-r from-red-50/80 via-white/80 to-red-50/80 
      backdrop-blur-md
      rounded-t-lg p-3 flex items-center justify-between 
      border border-red-200 transition-all duration-300
      ${isDragging ? 'border-red-400' : ''}
    `}>
      <div className="flex items-center space-x-2">
        <div className={`
          h-3 w-3 rounded-full bg-red-500/80 border border-red-600/40 
          transition-all duration-300
          ${isDragging ? 'bg-red-600' : 'hover:bg-red-600'}
        `}></div>
        <div className={`
          h-3 w-3 rounded-full bg-amber-500/80 border border-amber-600/40 
          transition-all duration-300
          ${isDragging ? 'bg-amber-600' : 'hover:bg-amber-600'}
        `}></div>
        <div className={`
          h-3 w-3 rounded-full bg-green-500/80 border border-green-600/40 
          transition-all duration-300
          ${isDragging ? 'bg-green-600' : 'hover:bg-green-600'}
        `}></div>
      </div>
      <div className={`
        text-red-800/70 text-sm font-medium select-none
        ${isDragging ? 'text-red-800' : ''}
      `}>
        DIGITAL_TERMINAL v1.0
        {isDragging && <span className="ml-2 text-xs">• Dragging</span>}
      </div>
      <div className="text-gray-500 text-sm">{new Date().toLocaleDateString()}</div>
    </div>
  );
};

export default TerminalHeader;