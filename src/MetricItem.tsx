import React from 'react';
import type { MetricDefinition, MetricData } from './metrics';

interface MetricItemProps {
  metric: MetricDefinition;
  data: MetricData;
  isPinned: boolean;
  onTogglePin: (id: string) => void;
}

export const MetricItem: React.FC<MetricItemProps> = ({ metric, data, isPinned, onTogglePin }) => {
  // Gracefully handle empty states before calculation
  const value = data.gt.length > 0 ? metric.calculate(data) : 0;
  
  // Format numbers to 4 decimal places for readability
  const formattedValue = typeof value === 'number' ? value.toFixed(4) : value;

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      padding: '0.75rem',
      backgroundColor: '#f8fafc',
      border: '1px solid #e2e8f0',
      borderRadius: '6px',
      marginBottom: '0.5rem'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <button 
          onClick={() => onTogglePin(metric.id)}
          style={{ 
            background: 'none', 
            border: 'none', 
            cursor: 'pointer',
            fontSize: '1.2rem',
            color: isPinned ? '#eab308' : '#cbd5e1' // Yellow if pinned, gray if not
          }}
          title={isPinned ? "Unpin metric" : "Pin metric"}
        >
          {isPinned ? '★' : '☆'}
        </button>
        <span style={{ fontWeight: 500 }}>{metric.name}</span>
      </div>
      <span style={{ fontFamily: 'monospace', fontSize: '1.1rem' }}>
        {formattedValue}
      </span>
    </div>
  );
};