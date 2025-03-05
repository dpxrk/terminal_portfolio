'use client'
import React, { useState, useEffect } from 'react';

interface TerminalHeaderProps {
  isDragging?: boolean;
}

const TerminalHeader: React.FC<TerminalHeaderProps> = ({ isDragging = false }) => {

  const [currentDate, setCurrentDate] = useState('');
  
  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString());
  }, []);
  
  return (
    <div className={`
      bg-gradient-to-r from-gray-800/95 via-gray-900/95 to-gray-800/95 
      backdrop-blur-md
      rounded-t-lg p-3 flex items-center justify-between 
      border border-yellow-700/30 transition-all duration-300
      ${isDragging ? 'border-yellow-600/50' : ''}
    `}>
      <div className="flex items-center space-x-2">
        <div className={`
          h-3 w-3 rounded-full bg-yellow-500/80 border border-yellow-600/40 
          transition-all duration-300
          ${isDragging ? 'bg-yellow-400' : 'hover:bg-yellow-400'}
        `}></div>
        <div className={`
          h-3 w-3 rounded-full bg-blue-500/80 border border-blue-600/40 
          transition-all duration-300
          ${isDragging ? 'bg-blue-400' : 'hover:bg-blue-400'}
        `}></div>
        <div className={`
          h-3 w-3 rounded-full bg-green-500/80 border border-green-600/40 
          transition-all duration-300
          ${isDragging ? 'bg-green-400' : 'hover:bg-green-400'}
        `}></div>
      </div>
      <div className={`
        text-yellow-500/80 text-sm font-medium select-none
        ${isDragging ? 'text-yellow-400' : ''}
      `}>
        DIGITAL_TERMINAL v1.0
        {isDragging && <span className="ml-2 text-xs">• Dragging</span>}
      </div>
      <div className="text-gray-500 text-sm">
        {currentDate}
      </div>
    </div>
  );
};

export default TerminalHeader;