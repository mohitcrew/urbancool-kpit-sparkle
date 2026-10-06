import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, AlertTriangle, ShieldCheck } from 'lucide-react';
import Button from '../ui/Button';

export default function AIInsightCard({
  criticalZones = [
    { name: 'Ward 17 (Shivajinagar)', risk: 94, lst: '43.7°C' },
    { name: 'Ward 08 (Hadapsar)', risk: 91, lst: '42.9°C' },
    { name: 'Ward 23 (Kothrud)', risk: 87, lst: '42.1°C' }
  ],
  totalCriticalCount = 3
}) {
  const navigate = useNavigate();

  return (
    <div
      className="card-glass"
      style={{
        padding: 24,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        border: '1px solid var(--border-active)',
        background: 'linear-gradient(145deg, rgba(21, 31, 56, 0.8) 0%, rgba(10, 15, 29, 0.95) 100%)',
        boxShadow: 'var(--shadow-glow)'
      }}
    >
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 'var(--radius-sm)',
                background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff'
              }}
            >
              <Sparkles size={16} />
            </div>
            <span
              style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: 'var(--cyan-400)'
              }}
            >
              AI Decision Synthesis
            </span>
          </div>
          <span
            style={{
              fontSize: '0.7rem',
              padding: '2px 8px',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(239, 68, 68, 0.15)',
              color: '#f87171',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              fontWeight: 600
            }}
          >
            {totalCriticalCount} Critical Zones
          </span>
        </div>

        <h3 style={{ fontSize: '1.25rem', color: '#ffffff', marginBottom: 8, lineHeight: 1.3 }}>
          {totalCriticalCount} municipal zones require immediate cooling intervention.
        </h3>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: 16, lineHeight: 1.4 }}>
          Thermal anomaly detected across central transit and dense industrial corridors with surface temperatures exceeding 42°C.
        </p>

        {/* Highlighted high-risk list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
          {criticalZones.map((zone, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 12px',
                borderRadius: 'var(--radius-sm)',
                background: 'rgba(0, 0, 0, 0.25)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                {zone.name}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: '0.78rem', color: '#f97316', fontWeight: 600 }}>
                  {zone.lst}
                </span>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    fontFamily: 'var(--font-mono)',
                    color: zone.risk >= 90 ? '#ef4444' : '#f97316'
                  }}
                >
                  Risk {zone.risk}/100
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        <Button
          variant="primary"
          style={{ flex: 1 }}
          icon={ArrowRight}
          iconPosition="right"
          onClick={() => navigate('/planner')}
        >
          View Recommendations
        </Button>
        <Button
          variant="outline"
          onClick={() => navigate('/ai-insights')}
        >
          Ask AI
        </Button>
      </div>
    </div>
  );
}
