"use client";
import React, { useState, useEffect } from 'react';

interface StatusBarProps {
  stats?: {
    label: string;
    value: string | number;
  }[];
}

const StatusBar: React.FC<StatusBarProps> = ({ stats = [] }) => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[var(--background-secondary)] border-b border-[var(--border-color)] px-4 py-2 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="status-dot status-dot-success" />
          <span className="text-uppercase-sm text-[var(--text-secondary)]">SYSTEM ACTIVE</span>
        </div>
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="text-xs text-[var(--text-muted)]">{stat.label}</span>
            <span className="font-mono text-xs text-[var(--text-primary)]">{stat.value}</span>
          </div>
        ))}
      </div>
      <div className="font-mono text-xs text-[var(--text-secondary)] tabular-nums">
        {currentTime}
      </div>
    </div>
  );
};

export default StatusBar;
