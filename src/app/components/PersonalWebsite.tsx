"use client";
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useTerminal } from '../hooks/useTerminal';
import TerminalHeader from './TerminalHeader';
import CommandPrompt from './CommandPrompt';
import TerminalOutput from './TerminalOutput';
import { HistoryEntry } from '../types';

const PersonalWebsite: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  
  const {
    input,
    setInput,
    history,
    currentPath,
    handleKeyPress,
  } = useTerminal();

  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const terminalRef = useRef<HTMLDivElement>(null);
  const [terminalDimensions, setTerminalDimensions] = useState({ width: 0, height: 0 });
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    const updateDimensions = () => {
      if (terminalRef.current) {
        setTerminalDimensions({
          width: terminalRef.current.offsetWidth,
          height: terminalRef.current.offsetHeight
        });
      }
      
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    const keepInBounds = () => {
      if (terminalRef.current) {
        const maxX = window.innerWidth - terminalRef.current.offsetWidth;
        const maxY = window.innerHeight - terminalRef.current.offsetHeight;
        
        setPosition(prev => ({
          x: Math.min(prev.x, maxX),
          y: Math.min(prev.y, maxY)
        }));
      }
    };
    
    window.addEventListener('resize', keepInBounds);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
      window.removeEventListener('resize', keepInBounds);
    };
  }, [isMounted]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!(e.target as HTMLElement).closest('.terminal-header')) return;
    
    e.preventDefault();
    setIsDragging(true);
    
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    
    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;
    
    const maxX = windowDimensions.width - terminalDimensions.width;
    const maxY = windowDimensions.height - terminalDimensions.height;
    
    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY))
    });
  }, [isDragging, dragOffset, windowDimensions.width, windowDimensions.height, terminalDimensions.width, terminalDimensions.height]);

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (!isMounted) return;
    
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, isMounted, handleMouseMove]);

  const terminalStyles = {
    boxShadow: isDragging 
      ? '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(212, 175, 55, 0.1)'
      : '0 20px 40px -15px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(212, 175, 55, 0.1)',
    transform: isDragging ? 'scale(1.01)' : 'scale(1)',
    transition: isDragging ? 'none' : 'transform 0.3s ease, box-shadow 0.3s ease',
    position: 'absolute' as const,
    left: `${position.x}px`,
    top: `${position.y}px`,
    zIndex: isDragging ? 20 : 10,
    width: '85%',
    maxWidth: '1000px'
  };

  return (
    <div className="min-h-screen bg-black text-cream relative overflow-hidden">
      {/* Luxury gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-charcoal to-black"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(212,175,55,0.05)_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(212,175,55,0.03)_0%,transparent_50%)]"></div>
      </div>
      
      {/* Subtle luxury texture overlay */}
      <div className="absolute inset-0 opacity-[0.02]"
           style={{
             backgroundImage: `repeating-linear-gradient(
               45deg,
               transparent,
               transparent 35px,
               rgba(212, 175, 55, 0.1) 35px,
               rgba(212, 175, 55, 0.1) 70px
             )`
           }}
      />
      
      {isMounted && (
        <div 
          ref={terminalRef}
          className="terminal-container animate-fade-in"
          onMouseDown={handleMouseDown}
          style={terminalStyles}
        >
          {/* Terminal Header */}
          <div className="terminal-header cursor-move">
            <TerminalHeader isDragging={isDragging} />
          </div>

          {/* Terminal Body with refined glass effect */}
          <div className="terminal-body bg-black/90 backdrop-blur-xl rounded-b-xl p-8 h-[70vh] max-h-[700px] overflow-y-auto border-x border-b border-luxury-gold/10 relative">
            {/* Subtle inner glow */}
            <div className="absolute inset-0 rounded-b-xl bg-gradient-to-b from-luxury-gold/5 via-transparent to-transparent pointer-events-none" />
            
            {/* Command History */}
            {history.map((entry: HistoryEntry, i: number) => (
              <div key={i} className="mb-8 space-y-3 animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
                {entry.command && (
                  <div className="flex items-center space-x-3 text-sm">
                    <span className="text-muted">{entry.timestamp}</span>
                    <span className="text-luxury-gold/70">{entry.path}</span>
                    <span className="text-muted">›</span>
                    <span className="text-cream/90">{entry.command}</span>
                  </div>
                )}
                <div className={`pl-4 ${entry.error ? 'text-error' : ''}`}>
                  {entry.output && <TerminalOutput output={entry.output} />}
                </div>
              </div>
            ))}

            {/* Current Input */}
            <CommandPrompt
              input={input}
              currentPath={currentPath}
              onInputChange={setInput}
              onKeyPress={handleKeyPress}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalWebsite;