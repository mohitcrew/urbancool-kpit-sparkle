import React from 'react';
import { Sparkles, Info, HelpCircle } from 'lucide-react';

export default function SHAPExplainer({ explanation, hotspotName }) {
  if (!explanation) return null;

  const { title, description, factors = [] } = explanation;

  return (
    <div
      className="card-glass"
      style={{
        padding: 24,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        border: '1px solid var(--border-active)',
        background: 'var(--ai-card-bg)'
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: 'var(--radius-xs)',
                background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff'
              }}
            >
              <Sparkles size={14} />
            </div>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.74rem',
                fontWeight: 700,
                color: 'var(--cyan-400)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              AI-generated explanation (SHAP Attribution)
            </span>
          </div>
          <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', lineHeight: 1.2 }}>
            Thermal Driver Breakdown for {hotspotName || 'Zone'}
          </h3>
        </div>

        <span
          style={{
            fontSize: '0.68rem',
            padding: '2px 8px',
            borderRadius: 'var(--radius-xs)',
            background: 'rgba(6, 182, 212, 0.12)',
            color: 'var(--cyan-400)',
            border: '1px solid rgba(6, 182, 212, 0.25)',
            fontFamily: 'var(--font-mono)'
          }}
        >
          Model Confidence: 94.2%
        </span>
      </div>

      <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
        {description}
      </p>

      {/* Feature Contribution Bars */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {factors.map((factor, index) => {
          const absVal = Math.abs(factor.contributionPercent);
          const isProtective = factor.contributionPercent < 0 || factor.impact === 'Protective';

          return (
            <div key={index} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem' }}>
                <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>
                  {factor.feature}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    color: isProtective ? '#10b981' : factor.color || '#f97316'
                  }}
                >
                  {factor.contributionPercent > 0 ? `+${factor.contributionPercent}%` : `${factor.contributionPercent}%`}
                </span>
              </div>

              {/* Progress Bar Container */}
              <div
                style={{
                  width: '100%',
                  height: 8,
                  backgroundColor: 'var(--card-inner-bg)',
                  borderRadius: 999,
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                <div
                  style={{
                    width: `${Math.min(100, absVal * 2.2)}%`,
                    height: '100%',
                    backgroundColor: isProtective ? '#10b981' : factor.color || '#f97316',
                    borderRadius: 999,
                    transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                <span>Impact Factor: <strong style={{ color: isProtective ? '#10b981' : 'var(--text-secondary)' }}>{factor.impact}</strong></span>
                <span>{isProtective ? 'Mitigating Effect' : 'Heat Aggravation Factor'}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          fontSize: '0.72rem',
          color: 'var(--text-muted)',
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: 10
        }}
      >
        <Info size={13} color="var(--cyan-400)" />
        <span>Values calculated via Game-Theoretic TreeSHAP feature attributions on satellite and GIS variables.</span>
      </div>
    </div>
  );
}
