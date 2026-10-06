import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sun, Users, Trees, Building2, ArrowRight } from 'lucide-react';
import { RiskBadge, StatusBadge } from '../ui/Badge';
import Button from '../ui/Button';

export default function HotspotCard({ hotspot }) {
  const navigate = useNavigate();

  if (!hotspot) return null;

  return (
    <div
      className="card-glass card-glass-interactive"
      style={{
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 14
      }}
      onClick={() => navigate(`/hotspots/${hotspot.id}`)}
    >
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              fontWeight: 700,
              color: 'var(--cyan-400)'
            }}
          >
            {hotspot.id}
          </span>
          <RiskBadge level={hotspot.riskLevel} score={hotspot.heatRisk} />
        </div>

        <h4 style={{ fontSize: '1.05rem', color: 'var(--text-primary)', marginBottom: 4, lineHeight: 1.25 }}>
          {hotspot.name}
        </h4>
        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          Area: {hotspot.areaKm2} km² • Vulnerability: <strong style={{ color: 'var(--text-secondary)' }}>{hotspot.vulnerability}</strong>
        </div>
      </div>

      {/* Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 8,
          padding: 10,
          borderRadius: 'var(--radius-sm)',
          background: 'var(--card-inner-bg)'
        }}
      >
        <div>
          <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>LST (Surface)</div>
          <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#f97316', fontFamily: 'var(--font-display)' }}>
            {hotspot.lstCelsius}°C
          </div>
        </div>
        <div>
          <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Exposed Pop.</div>
          <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
            {hotspot.population?.toLocaleString()}
          </div>
        </div>
        <div>
          <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Canopy NDVI</div>
          <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#10b981' }}>
            {hotspot.vegetationPercent}% ({hotspot.ndvi})
          </div>
        </div>
        <div>
          <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Built-Up Ratio</div>
          <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fb7185' }}>
            {hotspot.builtUpPercent}%
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <StatusBadge status={hotspot.status} variant={hotspot.status === 'Action Required' ? 'rose' : 'cyan'} />
        <span style={{ fontSize: '0.78rem', color: 'var(--cyan-400)', display: 'flex', alignItems: 'center', gap: 4, fontWeight: 600 }}>
          Inspect Hotspot <ArrowRight size={14} />
        </span>
      </div>
    </div>
  );
}
