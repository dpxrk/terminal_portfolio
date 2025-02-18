"use client";

import React, { useState, useEffect } from "react";
import { CommandOutput, CommandItem } from "../types";
import { useTypingEffect } from "../hooks/useTypingEffect";

interface TerminalOutputProps {
  output: CommandOutput[];
}

const TypedContent: React.FC<{ content: string; onComplete: () => void }> = ({
  content,
  onComplete,
}) => {
  const { displayedText, isComplete } = useTypingEffect(content);

  useEffect(() => {
    if (isComplete) {
      onComplete();
    }
  }, [isComplete, onComplete]);

  return <span>{displayedText}</span>;
};

const TerminalOutput: React.FC<TerminalOutputProps> = ({ output }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemIndex, setItemIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const renderContent = (
    content: string | (string | CommandItem)[] | React.ReactNode
  ): React.ReactNode => {
    if (Array.isArray(content)) {
      return (
        <>
          {content.map((line, i) => {
            if (i > itemIndex) return null;

            if (typeof line === "object") {
              return (
                <div
                  key={i}
                  className="text-zinc-700 mb-2 hover:text-red-900 transition-colors duration-300"
                >
                  <span className="text-red-900">{line.command}</span>
                  <span className="text-zinc-400 mx-2">―</span>
                  {i === itemIndex && isTyping ? (
                    <TypedContent
                      content={line.desc}
                      onComplete={() => {
                        setIsTyping(false);
                        setItemIndex((prev) => prev + 1);
                      }}
                    />
                  ) : (
                    <span>{line.desc}</span>
                  )}
                </div>
              );
            }

            return (
              <div
                key={i}
                className="text-zinc-700 mb-2 hover:text-red-900 transition-colors duration-300"
              >
                {i === itemIndex && isTyping ? (
                  <TypedContent
                    content={`▪ ${line}`}
                    onComplete={() => {
                      setIsTyping(false);
                      setItemIndex((prev) => prev + 1);
                    }}
                  />
                ) : (
                  `▪ ${line}`
                )}
              </div>
            );
          })}
        </>
      );
    }

    return (
      <div className="text-zinc-700">
        {typeof content === "string" ? (
          <TypedContent
            content={content}
            onComplete={() => {
              setIsTyping(false);
              setCurrentIndex((prev) => prev + 1);
            }}
          />
        ) : (
          content
        )}
      </div>
    );
  };

  useEffect(() => {
    if (!isTyping && currentIndex < output.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setItemIndex(0);
      setIsTyping(true);
    }
  }, [isTyping, currentIndex, output.length]);

  return (
    <>
      {output.slice(0, currentIndex + 1).map((item, index) => {
        const isCurrentItem = index === currentIndex;

        switch (item.type) {
          case "header":
            return (
              <div key={index} className="mb-4">
                <div className="text-red-900 font-bold text-lg bg-zinc-100 p-2 rounded border-l-4 border-red-900">
                  {isCurrentItem && isTyping ? (
                    <TypedContent
                      content={item.content}
                      onComplete={() => {
                        setIsTyping(false);
                        setCurrentIndex((prev) => prev + 1);
                      }}
                    />
                  ) : (
                    item.content
                  )}
                </div>
              </div>
            );
          case "text":
            return (
              <div key={index} className="mb-4 text-zinc-800 leading-relaxed">
                {isCurrentItem && isTyping ? (
                  <TypedContent
                    content={item.content}
                    onComplete={() => {
                      setIsTyping(false);
                      setCurrentIndex((prev) => prev + 1);
                    }}
                  />
                ) : (
                  item.content
                )}
              </div>
            );
          case "section":
            return (
              <div key={index} className="mb-4">
                <div className="text-red-950 font-semibold mb-2 border-b border-zinc-200 pb-1">
                  {isCurrentItem && isTyping ? (
                    <TypedContent
                      content={item.title || ""}
                      onComplete={() => {
                        setIsTyping(false);
                        setItemIndex(0);
                      }}
                    />
                  ) : (
                    item.title
                  )}
                </div>
                {(!isCurrentItem || !isTyping) && (
                  <div className="pl-4">{renderContent(item.content)}</div>
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
