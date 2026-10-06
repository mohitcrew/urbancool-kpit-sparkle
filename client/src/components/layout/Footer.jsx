import React from 'react';
import { Activity, Satellite, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Footer() {
  const { isDemoMode } = useApp();

  return (
    <footer
      style={{
        padding: '12px 32px',
        borderTop: '1px solid var(--border-subtle)',
        background: 'rgba(10, 15, 29, 0.95)',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 12,
        fontSize: '0.74rem',
        color: 'var(--text-muted)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span className="pulse-dot" style={{ background: '#10b981' }} />
          <span>System Status: <strong style={{ color: '#ffffff' }}>Operational</strong></span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Satellite size={13} color="var(--cyan-400)" />
          <span>Landsat-9 / Sentinel-2 Feed: <strong style={{ color: 'var(--text-secondary)' }}>Synced</strong></span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Activity size={13} color="#38bdf8" />
          <span>API Telemetry Latency: <strong style={{ color: 'var(--text-secondary)' }}>24ms</strong></span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <ShieldCheck size={14} color="#10b981" />
        <span>UrbanCool AI Platform • From Urban Heat Data to Intelligent Cooling Decisions</span>
      </div>
    </footer>
  );
}
