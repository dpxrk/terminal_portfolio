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
            <div key={i} className="text-gray-300 mb-2 hover:text-yellow-300 transition-colors duration-300">
              <span className="text-yellow-500">{line.command}</span>
              <span className="text-gray-500 mx-2">―</span>
              <span>{line.desc}</span>
            </div>
          );
        }
        return (
          <div key={i} className="text-gray-300 mb-2 hover:text-yellow-300 transition-colors duration-300">
            {`◆ ${line}`}
          </div>
        );
      });
    }
    return <div className="text-gray-300">{content}</div>;
  };

  return (
    <>
      {output.map((item, index) => {
        switch (item.type) {
          case 'header':
            return (
              <div key={index} className="mb-4">
                <div className="text-yellow-500 font-bold text-lg bg-gradient-to-r from-gray-800 to-gray-900 p-2 rounded-lg border border-yellow-700/30">
                  {`❧ ${item.content} ❧`}
                </div>
              </div>
            );
          case 'text':
            return (
              <div key={index} className="mb-4 text-gray-300 leading-relaxed">
                {renderContent(item.content)}
              </div>
            );
          case 'section':
            return (
              <div key={index} className="mb-6">
                <div className="text-yellow-600 font-semibold mb-2 bg-gradient-to-r from-gray-800 to-transparent p-2 rounded-lg">
                  {`◈ ${item.title} ◈`}
                </div>
                <div className="pl-4">
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