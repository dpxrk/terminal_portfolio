"use client";

import React from 'react';
import { CommandOutput, CommandItem } from '../types';

interface TerminalOutputProps {
  output: CommandOutput[];
}

const TerminalOutput: React.FC<TerminalOutputProps> = ({ output }) => {
  const renderContent = (content: string | Array<string | CommandItem>) => {
    if (Array.isArray(content)) {
      return content.map((line, i) => {
        if (typeof line === 'object') {
          return (
            <div key={i} className="text-cream/80 mb-3 hover:text-cream transition-all duration-300 group cursor-default">
              <span className="text-luxury-gold font-medium group-hover:text-luxury-gold/90 transition-all duration-300">
                {line.command}
              </span>
              <span className="text-muted/60 mx-3 font-light">—</span>
              <span className="text-muted group-hover:text-cream/70 font-light">{line.desc}</span>
            </div>
          );
        }
        return (
          <div key={i} className="text-cream/80 mb-2 hover:text-cream transition-all duration-300 flex items-center space-x-2">
            <span className="text-luxury-gold/60">•</span>
            <span className="font-light">{line}</span>
          </div>
        );
      });
    }
    return <div className="text-cream/80 font-light">{content}</div>;
  };

  return (
    <>
      {output.map((item, index) => {
        switch (item.type) {
          case 'header':
            return (
              <div key={index} className="mb-6 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="relative">
                  <div className="text-xl font-light tracking-[0.3em] uppercase text-luxury-gold">
                    {typeof item.content === 'string' ? item.content : ''}
                  </div>
                  <div className="absolute -bottom-2 left-0 w-16 h-px bg-gradient-to-r from-luxury-gold to-transparent"></div>
                </div>
              </div>
            );
          case 'text':
            return (
              <div key={index} className="mb-4 text-cream/80 leading-relaxed animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                {renderContent(item.content)}
              </div>
            );
          case 'section':
            return (
              <div key={index} className="mb-6 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="mb-3">
                  <span className="text-soft-gold font-normal text-sm tracking-wider uppercase">
                    {item.title}
                  </span>
                  <div className="h-px bg-gradient-to-r from-luxury-gold/20 to-transparent mt-2"></div>
                </div>
                <div className="pl-4 border-l border-luxury-gold/10 hover:border-luxury-gold/20 transition-colors duration-500">
                  {renderContent(item.content)}
                </div>
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