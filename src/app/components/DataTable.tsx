"use client";
import React from 'react';

interface TableColumn {
  key: string;
  label: string;
  align?: 'left' | 'right' | 'center';
}

interface DataTableProps {
  columns: TableColumn[];
  data: Record<string, string | number>[];
  maxHeight?: string;
}

const DataTable: React.FC<DataTableProps> = ({ columns, data, maxHeight = '400px' }) => {
  return (
    <div className="panel-card bg-[var(--panel-bg)] overflow-hidden">
      <div className="overflow-x-auto">
        <div className="overflow-y-auto" style={{ maxHeight }}>
          <table className="w-full font-mono text-sm">
            <thead className="sticky top-0 bg-[var(--background-secondary)] border-b border-[var(--border-color)]">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={`px-4 py-2.5 text-xs uppercase tracking-wider text-[var(--text-secondary)] font-medium text-${column.align || 'left'}`}
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)]">
              {data.map((row, index) => (
                <tr
                  key={index}
                  className="hover:bg-[var(--hover-bg)] instant-transition"
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={`px-4 py-2.5 text-[var(--text-primary)] text-${column.align || 'left'}`}
                    >
                      {row[column.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
