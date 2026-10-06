import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import Button from './Button';

export default function ErrorState({
  title = 'Unable to Load Data',
  message = 'The data service is temporarily unavailable. Please verify connection and retry.',
  onRetry,
  className = ''
}) {
  return (
    <div
      className={`card-glass ${className}`}
      style={{
        padding: '40px 24px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16
      }}
    >
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: '50%',
          backgroundColor: 'rgba(239, 68, 68, 0.15)',
          color: '#f87171',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <AlertTriangle size={26} />
      </div>

      <div>
        <h3 style={{ fontSize: '1.15rem', marginBottom: 6, color: '#ffffff' }}>{title}</h3>
        <p style={{ color: 'var(--text-secondary)', maxWidth: 460, fontSize: '0.88rem' }}>{message}</p>
      </div>

      {onRetry && (
        <Button variant="secondary" icon={RefreshCw} onClick={onRetry} size="sm">
          Retry Request
        </Button>
      )}
    </div>
  );
}
