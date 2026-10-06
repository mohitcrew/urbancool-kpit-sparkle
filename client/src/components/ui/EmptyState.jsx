import React from 'react';
import { SearchX } from 'lucide-react';

export default function EmptyState({
  icon: Icon = SearchX,
  title = 'No Data Found',
  description = 'No matching records match the current filter criteria.',
  action
}) {
  return (
    <div
      className="card-glass"
      style={{
        padding: '48px 24px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 14
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.04)',
          color: 'var(--text-muted)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Icon size={24} />
      </div>
      <div>
        <h4 style={{ fontSize: '1rem', color: '#ffffff', marginBottom: 4 }}>{title}</h4>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', maxWidth: 420 }}>{description}</p>
      </div>
      {action && <div style={{ marginTop: 8 }}>{action}</div>}
    </div>
  );
}
