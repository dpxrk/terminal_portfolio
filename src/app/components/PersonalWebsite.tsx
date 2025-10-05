"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useTerminal } from '../hooks/useTerminal';
import StatusBar from './StatusBar';
import MetricCard from './MetricCard';
import ActivityLog from './ActivityLog';
import DataTable from './DataTable';
import CommandPrompt from './CommandPrompt';
import TerminalOutput from './TerminalOutput';
import { HistoryEntry } from '../types';

const PersonalWebsite: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  const {
    input,
    setInput,
    history,
    currentPath,
    handleKeyPress,
  } = useTerminal();

  const terminalBodyRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Auto-scroll to bottom when new content is added
  useEffect(() => {
    if (terminalBodyRef.current) {
      const scrollToBottom = () => {
        terminalBodyRef.current?.scrollTo({
          top: terminalBodyRef.current.scrollHeight,
          behavior: 'smooth'
        });
      };
      
      // Small delay to ensure content is rendered
      const timeoutId = setTimeout(scrollToBottom, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [history]);

  // Sample data for demonstration
  const activityItems = history.slice(-10).map((entry) => ({
    timestamp: entry.timestamp,
    action: entry.command || 'System initialization',
    result: entry.error ? 'Command failed' : 'Completed',
    status: (entry.error ? 'error' : 'success') as 'success' | 'error'
  }));

  const statsData = [
    { label: 'UPTIME', value: '24h' },
    { label: 'CMDS', value: history.length },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {isMounted && (
        <>
          {/* Top Status Bar */}
          <StatusBar stats={statsData} />

          {/* Three-Column Grid Layout */}
          <div className="grid-3-col h-[calc(100vh-44px)]">
            {/* Left Sidebar */}
            <div className="bg-[var(--panel-bg)] border-r border-[var(--border-color)] overflow-y-auto">
              <div className="p-4 border-b border-[var(--border-color)]">
                <h2 className="text-uppercase-sm text-[var(--text-secondary)] mb-4">
                  METRICS
                </h2>
                <div className="space-y-3">
                  <MetricCard
                    label="TOTAL COMMANDS"
                    value={history.length}
                    status="success"
                  />
                  <MetricCard
                    label="CURRENT PATH"
                    value={currentPath}
                    subtitle="Active directory"
                  />
                  <MetricCard
                    label="STATUS"
                    value="ONLINE"
                    status="success"
                  />
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-uppercase-sm text-[var(--text-secondary)] mb-3">
                  QUICK ACTIONS
                </h3>
                <div className="space-y-2">
                  <button className="btn-minimal w-full text-left">HELP</button>
                  <button className="btn-minimal w-full text-left">ABOUT</button>
                  <button className="btn-minimal w-full text-left">CLEAR</button>
                </div>
              </div>
            </div>

            {/* Main Content Area - Terminal */}
            <div className="bg-[var(--background)] overflow-hidden flex flex-col">
              <div className="p-4 border-b border-[var(--border-color)]">
                <h2 className="text-uppercase-sm text-[var(--text-secondary)]">
                  TERMINAL
                </h2>
              </div>

              <div
                ref={terminalBodyRef}
                className="flex-1 overflow-y-auto p-6 font-mono text-sm no-scrollbar"
              >
                {/* Command History */}
                {history.map((entry: HistoryEntry, i: number) => (
                  <div key={i} className="mb-6">
                    {entry.command && (
                      <div className="flex items-center gap-3 text-xs mb-2">
                        <span className="text-[var(--text-muted)]">{entry.timestamp}</span>
                        <span className="text-[var(--accent)]">{entry.path}</span>
                        <span className="text-[var(--text-muted)]">›</span>
                        <span className="text-[var(--text-primary)]">{entry.command}</span>
                      </div>
                    )}
                    <div className={`pl-4 ${entry.error ? 'text-[var(--error)]' : ''}`}>
                      {entry.output && (
                        <TerminalOutput
                          output={entry.output}
                          isLatest={i === history.length - 1}
                          onTyping={() => {
                            if (terminalBodyRef.current) {
                              terminalBodyRef.current.scrollTo({
                                top: terminalBodyRef.current.scrollHeight,
                                behavior: 'smooth'
                              });
                            }
                          }}
                        />
                      )}
                    </div>
                  </div>
                ))}

                {/* Current Input */}
                <CommandPrompt
                  input={input}
                  currentPath={currentPath}
                  onInputChange={setInput}
                  onKeyPress={handleKeyPress}
                />
              </div>
            </div>

            {/* Right Sidebar - Activity Log */}
            <div className="bg-[var(--panel-bg)] border-l border-[var(--border-color)] hidden lg:block overflow-hidden">
              <ActivityLog items={activityItems} maxHeight="calc(100vh - 44px)" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PersonalWebsite;