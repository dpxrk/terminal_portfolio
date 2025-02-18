import React from "react";
import { CommandOutput, CommandHelp } from "../types";

interface TerminalOutputProps {
  output: CommandOutput[] | null;
}

export const TerminalOutput: React.FC<TerminalOutputProps> = ({ output }) => {
  if (!Array.isArray(output)) return null;

  return (
    <>
      {output.map((item, index) => {
        switch (item.type) {
          case "header":
            return (
              <div key={index} className="mb-4">
                <div className="text-cyan-400 font-bold text-lg">
                  {`<${item.content}>`}
                </div>
              </div>
            );
          case "text":
            return (
              <div key={index} className="mb-4 text-gray-300">
                {Array.isArray(item.content)
                  ? item.content.map((line, i) =>
                      typeof line === "object" ? (
                        <div key={i} className="text-gray-300 mb-1">
                          <span className="text-cyan-400">
                            {(line as CommandHelp).command}
                          </span>
                          <span className="text-gray-500 mx-2">-</span>
                          <span>{(line as CommandHelp).desc}</span>
                        </div>
                      ) : (
                        <div key={i} className="text-gray-300 mb-1">
                          {`> ${line}`}
                        </div>
                      )
                    )
                  : item.content}
              </div>
            );
          case "section":
            return (
              <div key={index} className="mb-4">
                <div className="text-purple-400 font-semibold mb-2">
                  {`[${item.title}]`}
                </div>
                <div className="pl-4">
                  {Array.isArray(item.content) ? (
                    item.content.map((line, i) =>
                      typeof line === "object" ? (
                        <div key={i} className="text-gray-300 mb-1">
                          <span className="text-cyan-400">
                            {(line as CommandHelp).command}
                          </span>
                          <span className="text-gray-500 mx-2">-</span>
                          <span>{(line as CommandHelp).desc}</span>
                        </div>
                      ) : (
                        <div key={i} className="text-gray-300 mb-1">
                          {`> ${line}`}
                        </div>
                      )
                    )
                  ) : (
                    <div className="text-gray-300">{item.content}</div>
                  )}
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
