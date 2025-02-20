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
  const [contentIndex, setContentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const renderCommandItem = (
    item: CommandItem,
    index: number,
    isLast: boolean
  ) => (
    <div
      key={index}
      className="text-slate-300 mb-2 hover:text-blue-400 transition-colors duration-300"
    >
      <span className="text-blue-400">{item.command}</span>
      <span className="text-slate-500 mx-2">›</span>
      {contentIndex === index && isTyping ? (
        <TypedContent
          content={item.desc || ""}
          onComplete={() => {
            if (isLast) {
              setIsTyping(false);
              setCurrentIndex((prev) => prev + 1);
            } else {
              setContentIndex((prev) => prev + 1);
            }
          }}
        />
      ) : (
        <span>{item.desc}</span>
      )}
    </div>
  );

  const renderContent = (
    content: string | (string | CommandItem)[]
  ): React.ReactElement[] | null => {
    if (!content) return null;

    if (Array.isArray(content)) {
      if (typeof content[0] === "object" && "command" in content[0]) {
        return content
          .map((item, idx) => {
            if (typeof item === "object" && "command" in item) {
              return renderCommandItem(item, idx, idx === content.length - 1);
            }
            return null;
          })
          .filter((item) => item !== null);
      } else {
        return content.map((line, idx) => (
          <div
            key={idx}
            className="text-slate-300 mb-2 hover:text-blue-400 transition-colors duration-300"
          >
            {contentIndex === idx && isTyping ? (
              <TypedContent
                content={`▶ ${line}`}
                onComplete={() => {
                  if (idx === content.length - 1) {
                    setIsTyping(false);
                    setCurrentIndex((prev) => prev + 1);
                  } else {
                    setContentIndex((prev) => prev + 1);
                  }
                }}
              />
            ) : (
              `▶ ${line}`
            )}
          </div>
        ));
      }
    }

    return [
      <div key="single-content" className="text-slate-300">
        {isTyping ? (
          <TypedContent
            content={content as string}
            onComplete={() => {
              setIsTyping(false);
              setCurrentIndex((prev) => prev + 1);
            }}
          />
        ) : (
          content
        )}
      </div>,
    ];
  };

  useEffect(() => {
    if (!isTyping && currentIndex < output.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setContentIndex(0);
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
                <div className="text-blue-400 font-bold text-lg bg-slate-800/50 p-2 rounded border border-blue-900/30">
                  {isCurrentItem && isTyping ? (
                    <TypedContent
                      content={
                        typeof item.content === "string" ? item.content : ""
                      }
                      onComplete={() => {
                        setIsTyping(false);
                        setCurrentIndex((prev) => prev + 1);
                      }}
                    />
                  ) : (
                    <>
                      {renderContent(
                        item.content as string | (string | CommandItem)[]
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          case "text":
            return (
              <div key={index} className="mb-4 text-slate-300 leading-relaxed">
                {isCurrentItem && isTyping ? (
                  <TypedContent
                    content={
                      typeof item.content === "string" ? item.content : ""
                    }
                    onComplete={() => {
                      setIsTyping(false);
                      setCurrentIndex((prev) => prev + 1);
                    }}
                  />
                ) : (
                  <>
                    {renderContent(
                      item.content as string | (string | CommandItem)[]
                    )}
                  </>
                )}
              </div>
            );
          case "section":
            return (
              <div key={index} className="mb-4">
                <div className="text-indigo-400 font-semibold mb-2 bg-slate-800/30 p-2 rounded">
                  {isCurrentItem && isTyping ? (
                    <TypedContent
                      content={item.title || ""}
                      onComplete={() => {
                        setIsTyping(false);
                        setContentIndex(0);
                      }}
                    />
                  ) : (
                    item.title
                  )}
                </div>
                <div className="pl-4">
                  {(!isCurrentItem || !isTyping) &&
                    renderContent(
                      item.content as string | (string | CommandItem)[]
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

export default TerminalOutput;
