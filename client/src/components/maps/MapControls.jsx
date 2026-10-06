import React from 'react';
import { Flame, Sun, Trees, Building2, Users, ShieldAlert, Sparkles, Clock, Calendar } from 'lucide-react';

export const LAYER_OPTIONS = [
  { id: 'heatRisk', label: 'Heat Risk', icon: Flame },
  { id: 'lst', label: 'LST (°C)', icon: Sun },
  { id: 'ndvi', label: 'NDVI (Greenery)', icon: Trees },
  { id: 'ndbi', label: 'NDBI (Built-up)', icon: Building2 },
  { id: 'population', label: 'Population', icon: Users },
  { id: 'vulnerability', label: 'Vulnerability', icon: ShieldAlert },
  { id: 'interventions', label: 'AI Interventions', icon: Sparkles }
];

export default function MapControls({
  activeLayer = 'heatRisk',
  onLayerChange,
  timeHorizon = 'current',
  onTimeChange,
  showTimeline = true
}) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        zIndex: 1000,
        display: 'flex',
        flexWrap: 'wrap',
        gap: 12,
        justifyContent: 'space-between',
        pointerEvents: 'none'
      }}
    >
      {/* Layer selector bar */}
      <div
        className="card-glass"
        style={{
          padding: '6px 8px',
          display: 'flex',
          gap: 4,
          overflowX: 'auto',
          maxWidth: '100%',
          pointerEvents: 'auto'
        }}
      >
        {LAYER_OPTIONS.map((layer) => {
          const Icon = layer.icon;
          const isActive = activeLayer === layer.id;
          return (
            <button
              key={layer.id}
              onClick={() => onLayerChange(layer.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 12px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.78rem',
                fontWeight: isActive ? 700 : 500,
                backgroundColor: isActive ? 'rgba(6, 182, 212, 0.25)' : 'transparent',
                color: isActive ? '#ffffff' : 'var(--text-secondary)',
                border: isActive ? '1px solid var(--cyan-400)' : '1px solid transparent',
                transition: 'all 0.15s ease',
                whiteSpace: 'nowrap'
              }}
            >
              <Icon size={14} style={{ color: isActive ? 'var(--cyan-400)' : 'var(--text-muted)' }} />
              {layer.label}
            </button>
          );
        })}
      </div>

      {/* Temporal Switcher (Historical / Current / Forecast) */}
      {showTimeline && (
        <div
          className="card-glass"
          style={{
            padding: '6px 8px',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            pointerEvents: 'auto'
          }}
        >
          {[
            { id: 'historical', label: 'Historical (2019-23)' },
            { id: 'current', label: 'Live IMD Telemetry' },
            { id: 'forecast', label: '+7D Heat Prognosis' }
          ].map((t) => {
            const isActive = timeHorizon === t.id;
            return (
              <button
                key={t.id}
                onClick={() => onTimeChange && onTimeChange(t.id)}
                style={{
                  padding: '5px 10px',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: '0.74rem',
                  fontWeight: isActive ? 700 : 500,
                  backgroundColor: isActive ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
                  color: isActive ? '#ffffff' : 'var(--text-muted)',
                  border: isActive ? '1px solid rgba(255, 255, 255, 0.25)' : '1px solid transparent'
                }}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
