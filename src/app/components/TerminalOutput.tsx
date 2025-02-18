"use client";

import React from "react";
import { CommandOutput, CommandItem } from "../types";

interface TerminalOutputProps {
  output: CommandOutput[];
}

const TerminalOutput: React.FC<TerminalOutputProps> = ({ output }) => {
  const renderContent = (content: string | Array<string | CommandItem>) => {
    if (Array.isArray(content)) {
      return content.map((line, i) => {
        if (typeof line === "object") {
          return (
            <div
              key={i}
              className="text-zinc-700 mb-2 hover:text-red-900 transition-colors duration-300"
            >
              <span className="text-red-900">{line.command}</span>
              <span className="text-zinc-400 mx-2">―</span>
              <span>{line.desc}</span>
            </div>
          );
        }
        return (
          <div
            key={i}
            className="text-zinc-700 mb-2 hover:text-red-900 transition-colors duration-300"
          >
            {`▪ ${line}`}
          </div>
        );
      });
    }
    return <div className="text-zinc-700">{content}</div>;
  };

  return (
    <>
      {output.map((item, index) => {
        switch (item.type) {
          case "header":
            return (
              <div key={index} className="mb-4">
                <div className="text-red-900 font-bold text-lg bg-zinc-100 p-2 rounded border-l-4 border-red-900">
                  {renderContent(item.content)}
                </div>
              </div>
            );
          case "text":
            return (
              <div key={index} className="mb-4 text-zinc-800 leading-relaxed">
                {renderContent(item.content)}
              </div>
            );
          case "section":
            return (
              <div key={index} className="mb-4">
                <div className="text-red-950 font-semibold mb-2 border-b border-zinc-200 pb-1">
                  {item.title}
                </div>
                <div className="pl-4">{renderContent(item.content)}</div>
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
