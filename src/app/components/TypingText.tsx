"use client";

import React, { useState, useEffect } from 'react';

interface TypingTextProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
  onType?: () => void;
  cursor?: boolean;
}

const TypingText: React.FC<TypingTextProps> = ({ 
  text, 
  speed = 2, 
  className = "",
  onComplete,
  onType,
  cursor = false
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
        if (onType && currentIndex % 5 === 0) { // Call onType every 5 characters to smooth scrolling
          onType();
        }
      }, speed);

      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete, onType]);

  useEffect(() => {
    if (cursor) {
      const interval = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [cursor]);

  return (
    <span className={className}>
      {displayedText}
      {cursor && currentIndex < text.length && (
        <span className={`inline-block w-2 h-4 bg-luxury-gold ml-0.5 ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
      )}
    </span>
  );
};

export default TypingText;