"use client";
import React from 'react';

interface ActivityItem {
  timestamp: string;
  action: string;
  result?: string;
  status: 'success' | 'warning' | 'error';
}

interface ActivityLogProps {
  items: ActivityItem[];
  maxHeight?: string;
}

const ActivityLog: React.FC<ActivityLogProps> = ({ items, maxHeight = '60vh' }) => {
  return (
    <div className="panel-card bg-[var(--panel-bg)]">
      <div className="p-4 border-b border-[var(--border-color)]">
        <h3 className="text-uppercase-sm text-[var(--text-secondary)]">
          ACTIVITY LOG
        </h3>
      </div>
      <div
        className="overflow-y-auto no-scrollbar"
        style={{ maxHeight }}
      >
        <div className="divide-y divide-[var(--border-color)]">
          {items.map((item, index) => (
            <div
              key={index}
              className="p-3 hover:bg-[var(--hover-bg)] instant-transition"
            >
              <div className="flex items-start gap-2">
                <span className={`status-dot status-dot-${item.status} mt-1.5`} />
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-xs text-[var(--text-muted)] mb-1">
                    {item.timestamp}
                  </div>
                  <div className="text-sm text-[var(--text-primary)]">
                    {item.action}
                  </div>
                  {item.result && (
                    <div className="text-xs text-[var(--text-secondary)] mt-1">
                      {item.result}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityLog;
