import React from 'react';

export default function MapLegend({ activeLayer = 'heatRisk' }) {
  const getLegendData = () => {
    switch (activeLayer) {
      case 'heatRisk':
        return {
          title: 'Urban Heat Risk Index',
          items: [
            { label: 'Critical (>90)', color: '#ef4444' },
            { label: 'High (80-89)', color: '#f97316' },
            { label: 'Moderate (50-79)', color: '#eab308' },
            { label: 'Low (<50)', color: '#10b981' }
          ]
        };
      case 'lst':
        return {
          title: 'Land Surface Temp (LST)',
          items: [
            { label: '> 43°C Extreme', color: '#dc2626' },
            { label: '40°C – 43°C High', color: '#ea580c' },
            { label: '36°C – 40°C Warm', color: '#ca8a04' },
            { label: '< 36°C Buffered', color: '#16a34a' }
          ]
        };
      case 'ndvi':
        return {
          title: 'Vegetation Health (NDVI)',
          items: [
            { label: '> 0.40 Dense Canopy', color: '#059669' },
            { label: '0.20 – 0.40 Moderate', color: '#10b981' },
            { label: '0.10 – 0.20 Sparse', color: '#eab308' },
            { label: '< 0.10 Barren/Impervious', color: '#ef4444' }
          ]
        };
      case 'ndbi':
        return {
          title: 'Built-up Index (NDBI)',
          items: [
            { label: '> 0.50 Ultra-Dense Fabric', color: '#e11d48' },
            { label: '0.30 – 0.50 High Density', color: '#f97316' },
            { label: '0.10 – 0.30 Mixed', color: '#eab308' },
            { label: '< 0.10 Low Impervious', color: '#06b6d4' }
          ]
        };
      case 'population':
        return {
          title: 'Population Density',
          items: [
            { label: '> 25,000 / ward', color: '#a855f7' },
            { label: '18,000 – 25,000', color: '#818cf8' },
            { label: '< 18,000', color: '#38bdf8' }
          ]
        };
      case 'vulnerability':
        return {
          title: 'Socio-Heat Vulnerability',
          items: [
            { label: 'High Slum / Elderly Fraction', color: '#ef4444' },
            { label: 'Medium Vulnerability', color: '#f59e0b' },
            { label: 'Low Vulnerability', color: '#10b981' }
          ]
        };
      case 'interventions':
        return {
          title: 'Intervention Target Stack',
          items: [
            { label: 'Urban Trees & Miyawaki', color: '#10b981' },
            { label: 'High-Albedo Cool Roofs', color: '#38bdf8' },
            { label: 'Green Corridors & Pavements', color: '#a855f7' }
          ]
        };
      default:
        return {
          title: 'Thermal Layer',
          items: [{ label: 'Normal', color: '#06b6d4' }]
        };
    }
  };

  const legend = getLegendData();

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 24,
        right: 24,
        zIndex: 1000,
        background: 'var(--bg-glass-card)',
        backdropFilter: 'blur(12px)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-md)',
        padding: '12px 16px',
        boxShadow: 'var(--shadow-lg)',
        pointerEvents: 'auto'
      }}
    >
      <div
        style={{
          fontSize: '0.72rem',
          textTransform: 'uppercase',
          fontWeight: 700,
          letterSpacing: '0.05em',
          color: 'var(--text-secondary)',
          marginBottom: 8
        }}
      >
        {legend.title}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {legend.items.map((item, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: 3,
                backgroundColor: item.color,
                boxShadow: `0 0 6px ${item.color}55`
              }}
            />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
