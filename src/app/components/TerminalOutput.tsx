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
      className="text-zinc-700 mb-2 hover:text-red-900 transition-colors duration-300"
    >
      <span className="text-red-900">{item.command}</span>
      <span className="text-zinc-400 mx-2">―</span>
      {contentIndex === index && isTyping ? (
        <TypedContent
          content={item.desc}
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
  ): React.ReactNode => {
    if (Array.isArray(content)) {
      if (typeof content[0] === "object" && "command" in content[0]) {
        // Handle command menu items
        return content.map((item, idx) => {
          if (typeof item === "object" && "command" in item) {
            return renderCommandItem(item, idx, idx === content.length - 1);
          }
          return null;
        });
      } else {
        // Handle regular array items
        return content.map((line, idx) => (
          <div
            key={idx}
            className="text-zinc-700 mb-2 hover:text-red-900 transition-colors duration-300"
          >
            {contentIndex === idx && isTyping ? (
              <TypedContent
                content={`▪ ${line}`}
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
              `▪ ${line}`
            )}
          </div>
        ));
      }
    }

    return (
      <div className="text-zinc-700">
        {isTyping ? (
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
                <div className="text-red-900 font-bold text-lg bg-zinc-100 p-2 rounded border-l-4 border-red-900">
                  {/* @ts-expect-error */}
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
                    item.content
                  )}
                </div>
              </div>
            );
          case "text":
            return (
              <div key={index} className="mb-4 text-zinc-800 leading-relaxed">
                {/* @ts-ignore */}
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
                        setContentIndex(0);
                      }}
                    />
                  ) : (
                    item.title
                  )}
                </div>
                <div className="pl-4">
                  {(!isCurrentItem || !isTyping) && renderContent(item.content)}
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
