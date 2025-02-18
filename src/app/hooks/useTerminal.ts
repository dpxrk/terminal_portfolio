"use client";

import { useState, useEffect, KeyboardEvent } from "react";
import { commands } from "../data/commands";
import { HistoryEntry } from "../types";

export const useTerminal = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const currentPath = "~";

  const processCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    if (cleanCmd === "") return;

    const newEntry: HistoryEntry = {
      command: cmd,
      path: currentPath,
      output: null,
      error: false,
      timestamp: new Date().toLocaleTimeString(),
    };

    if (cleanCmd === "clear") {
      setHistory([]);
      return;
    }

    if (commands[cleanCmd]) {
      const result = commands[cleanCmd]();
      newEntry.output = result.output;
    } else {
      newEntry.error = true;
      newEntry.output = [
        {
          type: "text",
          content: `Command not found: ${cmd}. Type 'help' for available commands.`,
        },
      ];
    }

    setHistory((prev) => [...prev, newEntry]);
    setInput("");
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      processCommand(input);
    }
  };

  useEffect(() => {
    const initialEntry: HistoryEntry = {
      command: "",
      path: currentPath,
      output: [
        { type: "header", content: "SYSTEM_INITIALIZED" },
        {
          type: "text",
          content: "Welcome to the digital workspace of Daniel Park",
        },
        { type: "text", content: "Type 'help' to view available commands" },
      ],
      error: false,
      timestamp: new Date().toLocaleTimeString(),
    };

    setHistory([initialEntry]);
  }, []);

  return {
    input,
    setInput,
    history,
    currentPath,
    handleKeyPress,
    processCommand,
  };
};
