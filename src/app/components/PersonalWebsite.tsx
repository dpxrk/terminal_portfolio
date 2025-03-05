"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useTerminal } from '../hooks/useTerminal';
import TerminalHeader from './TerminalHeader';
import CommandPrompt from './CommandPrompt';
import TerminalOutput from './TerminalOutput';
import { HistoryEntry } from '../types';

const PersonalWebsite: React.FC = () => {
  // For client-side rendering only
  const [isMounted, setIsMounted] = useState(false);
  
  const {
    input,
    setInput,
    history,
    currentPath,
    handleKeyPress,
  } = useTerminal();

  // For handling dragging and shadow effect
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const terminalRef = useRef<HTMLDivElement>(null);
  const [terminalDimensions, setTerminalDimensions] = useState({ width: 0, height: 0 });
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });
  
  // Mark component as mounted on client side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Only calculate shadows on client
  const calculateShadow = () => {
    if (!isMounted) {
      return {
        boxShadow: '',
        transform: ''
      };
    }
    
    // Light source is at the top center of the screen
    const lightSourceX = windowDimensions.width / 2;
    const lightSourceY = 0;
    
    // Terminal center position
    const terminalCenterX = position.x + (terminalDimensions.width / 2);
    const terminalCenterY = position.y + (terminalDimensions.height / 2);
    
    // Direction from light to terminal
    const directionX = terminalCenterX - lightSourceX;
    const directionY = terminalCenterY - lightSourceY;
    
    // Normalize the direction and adjust shadow length
    const distance = Math.sqrt(directionX * directionX + directionY * directionY);
    const normalizedX = distance > 0 ? (directionX / distance) * 12 : 0;
    const normalizedY = distance > 0 ? (directionY / distance) * 12 : 12;
    
    // Calculate shadow intensity based on distance from light
    const maxDistance = Math.sqrt(Math.pow(windowDimensions.width, 2) + Math.pow(windowDimensions.height, 2));
    const shadowIntensity = Math.min(0.35, (distance / maxDistance) * 0.5);
    
    // Add a colored glow effect that follows the terminal
    const glowColor = 'rgba(234, 179, 8, 0.15)'; // Gold/yellow glow that matches the theme
    
    return {
      boxShadow: `
        0 ${normalizedY}px ${20 + normalizedY}px rgba(0, 0, 0, ${shadowIntensity}),
        ${normalizedX}px ${normalizedY * 0.5}px 8px rgba(0, 0, 0, ${shadowIntensity * 0.7}),
        0 0 25px ${glowColor}
      `,
      transform: isDragging 
        ? `perspective(1000px) rotateX(${-directionY * 0.02}deg) rotateY(${directionX * 0.02}deg) scale(1.02)`
        : `perspective(1000px) rotateX(${-directionY * 0.01}deg) rotateY(${directionX * 0.01}deg)`
    };
  };

  useEffect(() => {
    if (!isMounted) return;
    
    // Get initial terminal dimensions and window dimensions
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
    
    // Initial update
    updateDimensions();
    
    // Update on resize
    window.addEventListener('resize', updateDimensions);
    
    // Ensure terminal stays within bounds when window resizes
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

  // Custom drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only allow dragging from terminal header
    if (!(e.target as HTMLElement).closest('.terminal-header')) return;
    
    e.preventDefault();
    setIsDragging(true);
    
    // Calculate the offset between mouse position and terminal position
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    
    // Calculate new position
    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;
    
    // Keep terminal within viewport bounds
    const maxX = windowDimensions.width - terminalDimensions.width;
    const maxY = windowDimensions.height - terminalDimensions.height;
    
    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY))
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Add and remove event listeners for drag
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
  }, [isDragging, dragOffset, isMounted]);

  // Dynamic styles for terminal
  const terminalStyles = {
    ...calculateShadow(),
    transition: isDragging ? 'none' : 'transform 0.3s ease, box-shadow 0.3s ease',
    position: 'absolute',
    left: `${position.x}px`,
    top: `${position.y}px`,
    zIndex: isDragging ? 20 : 10,
    width: '80%', // Make it wider
    maxWidth: '900px' // Set a maximum width
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-200 p-4 font-mono relative overflow-hidden">
      {/* Luxury background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(234,179,8,0.03)_0%,rgba(234,179,8,0)_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(234,179,8,0.03)_0%,rgba(234,179,8,0)_35%)]"></div>
      
      {/* Light source indicator (subtle glow at top center) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-[radial-gradient(circle,rgba(255,255,255,0.1)_0%,transparent_70%)] rounded-full blur-xl"></div>
      
      {/* Additional ambient glow effects */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-[radial-gradient(circle,rgba(234,179,8,0.05)_0%,transparent_70%)] rounded-full blur-xl"></div>
      <div className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-[radial-gradient(circle,rgba(59,130,246,0.03)_0%,transparent_70%)] rounded-full blur-xl"></div>
      
      {/* Only render the terminal on client-side to avoid hydration issues */}
      {isMounted && (
        <div 
          ref={terminalRef}
          className="w-4xl max-w-6xl cursor-default select-none"
          onMouseDown={handleMouseDown}
          style={terminalStyles as React.CSSProperties}
        >
          {/* Terminal Header - Use as drag handle */}
          <div className="terminal-header cursor-move">
            <TerminalHeader isDragging={isDragging} />
          </div>

          {/* Terminal Body */}
          <div className="terminal-body bg-gray-900/70 backdrop-blur-md p-4 rounded-b-lg h-[60vh] max-h-[80vh] overflow-y-auto border border-t-0 border-yellow-700/30 transition-all duration-300">
            {/* Command History */}
            {history.map((entry: HistoryEntry, i: number) => (
              <div key={i} className="mb-6 space-y-2">
                {/* Command Prompt */}
                {entry.command && (
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="text-blue-400/80">{entry.timestamp}</span>
                    <span className="text-yellow-500/80">{entry.path}</span>
                    <span className="text-gray-400">❯</span>
                    <span className="text-gray-300">{entry.command}</span>
                  </div>
                )}
                {/* Command Output */}
                <div className={`pl-4 ${entry.error ? 'text-red-500' : ''}`}>
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