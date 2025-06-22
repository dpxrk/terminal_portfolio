"use client";

import { useState, useEffect } from 'react';
import { commands } from '../data/commands';
import { HistoryEntry } from '../types';

export const useTerminal = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [currentPath] = useState('~/portfolio');
  const [isInitialized, setIsInitialized] = useState(false);

  const processCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    if (trimmedCmd === '') return;

    // Remove leading slash if present
    const cleanCmd = trimmedCmd.startsWith('/') ? trimmedCmd.slice(1) : trimmedCmd;

    // Clear terminal
    if (cleanCmd === 'clear') {
      setHistory([]);
      return;
    }

    const timestamp = new Date().toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });

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
        content: `Command not found: ${cmd}. Type '/help' for available commands.` 
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

  // Initialize with modern welcome message
  useEffect(() => {
    if (!isInitialized) {
      const initialEntry: HistoryEntry = {
        command: '',
        path: currentPath,
        output: [
          { 
            type: 'header', 
            content: 'SYSTEM ONLINE' 
          },
          { 
            type: 'text', 
            content: [
              'Welcome to the digital workspace of Daniel Park',
              'Software Engineer | Full Stack Developer | AI Enthusiast',
              '',
              "Type '/help' to explore available commands"
            ]
          }
        ],
        error: false,
        timestamp: new Date().toLocaleTimeString('en-US', { 
          hour12: false, 
          hour: '2-digit', 
          minute: '2-digit',
          second: '2-digit'
        })
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