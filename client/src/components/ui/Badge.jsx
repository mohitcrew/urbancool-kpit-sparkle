import React from 'react';

export function RiskBadge({ level = 'Moderate', score }) {
  const norm = (level || '').toLowerCase();
  let tagClass = 'moderate';
  if (norm.includes('crit') || (score && score >= 90)) tagClass = 'critical';
  else if (norm.includes('high') || (score && score >= 80)) tagClass = 'high';
  else if (norm.includes('mod') || (score && score >= 50)) tagClass = 'moderate';
  else if (norm.includes('low') || (score && score < 50)) tagClass = 'low';

  return (
    <span className={`risk-tag ${tagClass}`}>
      <span className="pulse-dot" />
      {score !== undefined ? `${score}/100 — ` : ''}
      {level}
    </span>
  );
}

export function StatusBadge({ status = 'Active', variant = 'cyan' }) {
  const colorMap = {
    cyan: { bg: 'rgba(6, 182, 212, 0.15)', text: '#22d3ee', border: 'rgba(6, 182, 212, 0.3)' },
    emerald: { bg: 'rgba(16, 185, 129, 0.15)', text: '#34d399', border: 'rgba(16, 185, 129, 0.3)' },
    amber: { bg: 'rgba(245, 158, 11, 0.15)', text: '#fbbf24', border: 'rgba(245, 158, 11, 0.3)' },
    rose: { bg: 'rgba(239, 68, 68, 0.15)', text: '#f87171', border: 'rgba(239, 68, 68, 0.3)' },
    indigo: { bg: 'rgba(99, 102, 241, 0.15)', text: '#a5b4fc', border: 'rgba(99, 102, 241, 0.3)' }
  };

  const style = colorMap[variant] || colorMap.cyan;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        padding: '3px 8px',
        borderRadius: 'var(--radius-xs)',
        fontSize: '0.72rem',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
        backgroundColor: style.bg,
        color: style.text,
        border: `1px solid ${style.border}`
      }}
    >
      {status}
    </span>
  );
}
