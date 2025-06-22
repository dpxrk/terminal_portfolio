'use client'
import React, { useState, useEffect } from 'react';

interface TerminalHeaderProps {
  isDragging?: boolean;
}

const TerminalHeader: React.FC<TerminalHeaderProps> = ({ isDragging = false }) => {
  const [currentTime, setCurrentTime] = useState('');
  
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
      }));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className={`
      bg-black/95 backdrop-blur-xl rounded-t-xl p-5 flex items-center justify-between 
      border border-b-0 border-luxury-gold/10 transition-all duration-500
      ${isDragging ? 'bg-black' : ''}
    `}>
      <div className="flex items-center space-x-4">
        {/* Elegant window controls */}
        <div className="flex items-center space-x-2">
          <div className="h-3 w-3 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 border border-gray-800 transition-all duration-300 hover:scale-110" />
          <div className="h-3 w-3 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 border border-gray-800 transition-all duration-300 hover:scale-110" />
          <div className="h-3 w-3 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 border border-gray-800 transition-all duration-300 hover:scale-110" />
        </div>
        
        {/* Status indicator */}
        <div className="flex items-center space-x-2">
          <div className="w-1.5 h-1.5 bg-luxury-gold rounded-full animate-pulse" />
          <span className="text-xs text-muted uppercase tracking-widest font-light">Active</span>
        </div>
      </div>
      
      {/* Terminal title */}
      <div className={`
        text-sm font-light tracking-[0.2em] select-none uppercase
        ${isDragging ? 'text-luxury-gold' : 'text-muted'}
        transition-colors duration-300
      `}>
        Portfolio Terminal
        {isDragging && (
          <span className="ml-3 text-xs text-luxury-gold/60 lowercase tracking-wide">
            • moving
          </span>
        )}
      </div>
      
      {/* Time display */}
      <div className="text-xs text-muted tabular-nums">
        {currentTime}
      </div>
    </div>
  );
};

export default TerminalHeader;