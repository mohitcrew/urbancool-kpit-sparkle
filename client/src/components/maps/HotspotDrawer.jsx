import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Flame, Sun, Trees, Building2, Users, ArrowRight, Sparkles, ShieldAlert } from 'lucide-react';
import { RiskBadge } from '../ui/Badge';
import Button from '../ui/Button';

export default function HotspotDrawer({ hotspot, onClose }) {
  const navigate = useNavigate();

  if (!hotspot) return null;

  return (
    <div
      className="card-glass"
      style={{
        position: 'absolute',
        top: 80,
        right: 24,
        width: 360,
        maxWidth: 'calc(100% - 48px)',
        zIndex: 1000,
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid var(--border-active)',
        backdropFilter: 'blur(16px)',
        animation: 'fadeIn 0.25s ease-out',
        maxHeight: 'calc(100% - 140px)',
        overflowY: 'auto'
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
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
          <h3 style={{ fontSize: '1.05rem', color: '#ffffff', lineHeight: 1.2 }}>
            {hotspot.name}
          </h3>
        </div>
        <button
          onClick={onClose}
          style={{
            padding: 4,
            borderRadius: 'var(--radius-xs)',
            color: 'var(--text-muted)',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>
      </div>

      {/* Primary Metrics Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 10,
          background: 'rgba(0, 0, 0, 0.2)',
          padding: 12,
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)'
        }}
      >
        <div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
            <Sun size={12} color="#f97316" /> Land Surface Temp
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f97316', fontFamily: 'var(--font-display)' }}>
            {hotspot.lstCelsius}°C
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
            <Users size={12} color="#38bdf8" /> Exposed Pop.
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-display)' }}>
            {hotspot.population?.toLocaleString()}
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
            <Trees size={12} color="#10b981" /> Vegetation
          </div>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#34d399' }}>
            {hotspot.vegetationPercent}% <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>(NDVI {hotspot.ndvi})</span>
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
            <Building2 size={12} color="#f43f5e" /> Built-up Fabric
          </div>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fb7185' }}>
            {hotspot.builtUpPercent}%
          </div>
        </div>
      </div>

      {/* AI Explainability Snippet */}
      {hotspot.explanation && (
        <div style={{ borderLeft: '3px solid var(--cyan-500)', paddingLeft: 10 }}>
          <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--cyan-400)', fontWeight: 700, marginBottom: 2 }}>
            AI Root Cause Analysis
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.35 }}>
            {hotspot.explanation.description}
          </p>
        </div>
      )}

      {/* Suggested Interventions Preview */}
      {hotspot.recommendedInterventions && (
        <div>
          <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, marginBottom: 6 }}>
            Suggested Cooling Package
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {hotspot.recommendedInterventions.slice(0, 2).map((item, i) => (
              <div
                key={i}
                style={{
                  fontSize: '0.76rem',
                  padding: '5px 8px',
                  borderRadius: 'var(--radius-xs)',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span style={{ color: 'var(--text-primary)' }}>{item.name}</span>
                <span style={{ color: '#34d399', fontWeight: 700 }}>{item.estimatedCooling}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
        <Button
          variant="primary"
          size="sm"
          style={{ flex: 1 }}
          icon={ArrowRight}
          iconPosition="right"
          onClick={() => navigate(`/hotspots/${hotspot.id}`)}
        >
          Analyze Zone
        </Button>
        <Button
          variant="secondary"
          size="sm"
          icon={Sparkles}
          onClick={() => navigate('/planner')}
        >
          Plan Cooling
        </Button>
      </div>
    </div>
  );
}
