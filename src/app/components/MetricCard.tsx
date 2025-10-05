"use client";
import React from 'react';

interface MetricCardProps {
  label: string;
  value: string | number;
  status?: 'success' | 'warning' | 'error';
  subtitle?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, status, subtitle }) => {
  return (
    <div className="panel-card p-4 bg-[var(--panel-bg)]">
      <div className="text-uppercase-sm text-[var(--text-muted)] mb-3">
        {label}
      </div>
      <div className="flex items-baseline gap-2">
        {status && (
          <span className={`status-dot status-dot-${status}`} />
        )}
        <div className="font-mono text-2xl text-[var(--text-primary)]">
          {value}
        </div>
      </div>
      {subtitle && (
        <div className="text-xs text-[var(--text-secondary)] mt-2">
          {subtitle}
        </div>
      )}
    </div>
  );
};

export default MetricCard;
