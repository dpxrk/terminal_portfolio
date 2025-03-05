"use client";

import { useState, useEffect } from 'react';
import { commands } from '../data/commands';
import { HistoryEntry, CommandOutput } from '../types';

export const useTerminal = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [currentPath, setCurrentPath] = useState('/home');
  const [isInitialized, setIsInitialized] = useState(false);

  const processCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    if (cleanCmd === '') return;

    // Create timestamp in a consistent way for server/client
    const timestamp = new Date().toLocaleTimeString();

    const newEntry: HistoryEntry = {
      command: cmd,
      path: currentPath,
      output: null,
      error: false,
      timestamp
    };

    if (commands[cleanCmd]) {
      const result = commands[cleanCmd]();
      newEntry.output = result.output;
    } else {
      newEntry.error = true;
      newEntry.output = [{ 
        type: 'text', 
        content: `Command not found: ${cmd}. Type 'help' for available commands.` 
      }];
    }

    setHistory(prev => [...prev, newEntry]);
    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      processCommand(input);
    }
  };

  // Initialize welcome message only on client-side
  useEffect(() => {
    if (!isInitialized) {
      const initialEntry: HistoryEntry = {
        command: '',
        path: currentPath,
        output: [
          { type: 'header', content: 'SYSTEM_INITIALIZED' },
          { type: 'text', content: 'Welcome to the digital workspace of Daniel Park' },
          { type: 'text', content: "Type '/help' to view available commands" }
        ],
        error: false,
        timestamp: new Date().toLocaleTimeString()
      };

      setHistory([initialEntry]);
      setIsInitialized(true);
    }
  }, [isInitialized, currentPath]);

  return {
    input,
    setInput,
    history,
    currentPath,
    handleKeyPress,
    processCommand
  };
};