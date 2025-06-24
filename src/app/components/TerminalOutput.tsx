"use client";

import React, { useState, useEffect } from 'react';
import { CommandOutput, CommandItem } from '../types';
import TypingText from './TypingText';

interface TerminalOutputProps {
  output: CommandOutput[];
  isLatest?: boolean;
  onTyping?: () => void;
}

const TerminalOutput: React.FC<TerminalOutputProps> = ({ output, isLatest = false, onTyping }) => {
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [currentSubIndex, setCurrentSubIndex] = useState(0);

  useEffect(() => {
    if (isLatest) {
      setCompletedItems(new Set());
      setCurrentItemIndex(0);
      setCurrentSubIndex(0);
    }
  }, [isLatest, output]);

  const handleItemComplete = (itemId: string) => {
    setCompletedItems(prev => new Set([...prev, itemId]));
  };

  const shouldShowItem = (globalIndex: number) => {
    if (!isLatest) return true;
    return globalIndex <= currentItemIndex;
  };

  const shouldTypeItem = (globalIndex: number, itemId: string) => {
    if (!isLatest) return false;
    return globalIndex === currentItemIndex && !completedItems.has(itemId);
  };

  const moveToNextItem = () => {
    setCurrentItemIndex(prev => prev + 1);
    setCurrentSubIndex(0);
  };

  // Flatten all content items for sequential typing
  const flattenedItems: Array<{
    type: 'header' | 'text' | 'section' | 'line';
    content: string;
    parentType?: string;
    parentTitle?: string;
    originalItem?: CommandOutput;
    itemIndex: number;
    subIndex?: number;
  }> = [];

  output.forEach((item, itemIndex) => {
    if (item.type === 'header' && typeof item.content === 'string') {
      flattenedItems.push({
        type: 'header',
        content: item.content,
        originalItem: item,
        itemIndex
      });
    } else if (item.type === 'text') {
      if (typeof item.content === 'string') {
        flattenedItems.push({
          type: 'text',
          content: item.content,
          originalItem: item,
          itemIndex
        });
      } else if (Array.isArray(item.content)) {
        item.content.forEach((line, subIndex) => {
          if (typeof line === 'string') {
            flattenedItems.push({
              type: 'line',
              content: line,
              parentType: 'text',
              itemIndex,
              subIndex
            });
          }
        });
      }
    } else if (item.type === 'section') {
      // Add section title
      if (item.title) {
        flattenedItems.push({
          type: 'section',
          content: item.title,
          parentTitle: item.title,
          originalItem: item,
          itemIndex,
          subIndex: -1
        });
      }
      // Add section content
      if (Array.isArray(item.content)) {
        item.content.forEach((line, subIndex) => {
          if (typeof line === 'string') {
            flattenedItems.push({
              type: 'line',
              content: line,
              parentType: 'section',
              parentTitle: item.title,
              itemIndex,
              subIndex
            });
          } else if (typeof line === 'object' && line.command) {
            flattenedItems.push({
              type: 'line',
              content: `${line.command}—${line.desc}`,
              parentType: 'section',
              parentTitle: item.title,
              itemIndex,
              subIndex
            });
          }
        });
      }
    }
  });

  const renderContent = (content: string | Array<string | CommandItem>, parentKey: string, shouldType: boolean) => {
    if (Array.isArray(content)) {
      return content.map((line, i) => {
        const lineId = `${parentKey}-${i}`;
        const isCompleted = completedItems.has(lineId);
        const shouldTypeLine = shouldType && currentSubIndex === i && !isCompleted;
        
        if (typeof line === 'object') {
          // Show the full line immediately when typing, both command and description
          const showFullLine = shouldTypeLine || (shouldType && currentSubIndex > i) || !shouldType;
          
          return (
            <div key={i} className="text-cream/80 mb-3 hover:text-cream transition-all duration-300 group cursor-default">
              {shouldTypeLine ? (
                // When it's this line's turn to type, show the whole line with typing animation
                <>
                  <span className="text-luxury-gold font-medium group-hover:text-luxury-gold/90 transition-all duration-300">
                    <TypingText 
                      text={line.command} 
                      speed={2} 
                      onType={onTyping}
                      onComplete={() => {}}
                    />
                  </span>
                  <span className="text-muted/60 mx-3 font-light">—</span>
                  <span className="text-muted group-hover:text-cream/70 font-light">
                    <TypingText 
                      text={line.desc} 
                      speed={2} 
                      onType={onTyping}
                      onComplete={() => {
                        handleItemComplete(lineId);
                        if (i === content.length - 1) {
                          moveToNextItem();
                        } else {
                          setCurrentSubIndex(prev => prev + 1);
                        }
                      }}
                    />
                  </span>
                </>
              ) : showFullLine ? (
                // Show the complete line without animation
                <>
                  <span className="text-luxury-gold font-medium group-hover:text-luxury-gold/90 transition-all duration-300">
                    {line.command}
                  </span>
                  <span className="text-muted/60 mx-3 font-light">—</span>
                  <span className="text-muted group-hover:text-cream/70 font-light">
                    {line.desc}
                  </span>
                </>
              ) : null}
            </div>
          );
        }
        
        const showLine = !shouldType || currentSubIndex >= i;
        if (!showLine) return null;
        
        return (
          <div key={i} className="text-cream/80 mb-2 hover:text-cream transition-all duration-300 flex items-start space-x-2">
            <span className="text-luxury-gold/60 mt-0.5">•</span>
            <span className="font-light">
              {shouldTypeLine ? (
                <TypingText 
                  text={line} 
                  speed={2} 
                  onType={onTyping}
                  onComplete={() => {
                    handleItemComplete(lineId);
                    if (i === content.length - 1) {
                      moveToNextItem();
                    } else {
                      setCurrentSubIndex(prev => prev + 1);
                    }
                  }}
                />
              ) : line}
            </span>
          </div>
        );
      });
    }
    return (
      <div className="text-cream/80 font-light">
        {shouldType ? (
          <TypingText 
            text={content} 
            speed={2} 
            onType={onTyping}
            onComplete={() => {
              handleItemComplete(parentKey);
              moveToNextItem();
            }}
          />
        ) : content}
      </div>
    );
  };

  return (
    <>
      {output.map((item, index) => {
        const shouldShow = shouldShowItem(index);
        const shouldType = shouldTypeItem(index, `item-${index}`);
        const itemKey = `item-${index}`;

        if (!shouldShow) return null;

        switch (item.type) {
          case 'header':
            return (
              <div key={index} className="mb-6 animate-fade-in">
                <div className="relative">
                  <span className="inline-block text-xl font-light tracking-[0.3em] uppercase text-luxury-gold">
                    {shouldType && typeof item.content === 'string' ? (
                      <TypingText
                        text={item.content}
                        speed={2}
                        onType={onTyping}
                        onComplete={() => {
                          handleItemComplete(itemKey);
                          moveToNextItem();
                        }}
                      />
                    ) : (
                      typeof item.content === 'string' ? item.content : ''
                    )}
                  </span>
                  <div className="absolute -bottom-2 left-0 w-16 h-px bg-gradient-to-r from-luxury-gold to-transparent"></div>
                </div>
              </div>
            );
          case 'text':
            return (
              <div key={index} className="mb-4 text-cream/80 leading-relaxed animate-fade-in">
                {renderContent(item.content, itemKey, shouldType)}
              </div>
            );
          case 'section':
            return (
              <div key={index} className="mb-6 animate-fade-in">
                <div className="mb-3">
                  <span className="text-soft-gold font-normal text-sm tracking-wider uppercase">
                    {shouldType && item.title && currentSubIndex === -1 ? (
                      <TypingText
                        text={item.title}
                        speed={2}
                        onType={onTyping}
                        onComplete={() => {
                          setCurrentSubIndex(0);
                        }}
                      />
                    ) : (
                      shouldShow ? item.title : ''
                    )}
                  </span>
                  {(!shouldType || currentSubIndex >= 0) && (
                    <div className="h-px bg-gradient-to-r from-luxury-gold/20 to-transparent mt-2"></div>
                  )}
                </div>
                {(!shouldType || currentSubIndex >= 0) && (
                  <div className="pl-4 border-l border-luxury-gold/10 hover:border-luxury-gold/20 transition-colors duration-500">
                    {renderContent(item.content, `${itemKey}-content`, shouldType)}
                  </div>
                )}
              </div>
            );
          default:
            return null;
        }
      })}
    </>
  );
};

export default TerminalOutput;