import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trees, SunDim, Sprout, Grid, Layers, Umbrella, Droplets, ArrowRight, CheckCircle2 } from 'lucide-react';
import Button from '../ui/Button';

const ICON_MAP = {
  Trees,
  SunDim,
  Sprout,
  Grid,
  Layers,
  Umbrella,
  Droplets
};

export default function InterventionCard({ intervention, onSelectForPlanning }) {
  const navigate = useNavigate();
  const Icon = ICON_MAP[intervention.icon] || Trees;

  return (
    <div
      className="card-glass"
      style={{
        padding: 22,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 16,
        border: '1px solid var(--border-subtle)'
      }}
    >
      <div>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, rgba(16, 185, 129, 0.2) 100%)',
              border: '1px solid rgba(6, 182, 212, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--cyan-400)'
            }}
          >
            <Icon size={22} />
          </div>

          <span
            style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              padding: '3px 8px',
              borderRadius: 'var(--radius-xs)',
              background: 'rgba(16, 185, 129, 0.15)',
              color: '#34d399',
              border: '1px solid rgba(16, 185, 129, 0.3)'
            }}
          >
            Cooling {intervention.coolingPotential}
          </span>
        </div>

        <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.04em' }}>
          {intervention.category}
        </div>
        <h3 style={{ fontSize: '1.15rem', color: '#ffffff', margin: '4px 0 6px', lineHeight: 1.25 }}>
          {intervention.name}
        </h3>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: 12 }}>
          {intervention.tagline}
        </p>

        {/* Specs Table */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
            background: 'rgba(0, 0, 0, 0.25)',
            padding: 10,
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-subtle)',
            fontSize: '0.76rem'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-muted)' }}>Estimated Cost:</span>
            <span style={{ color: '#ffffff', fontWeight: 600 }}>{intervention.costPerUnit}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-muted)' }}>Water Demand:</span>
            <span style={{ color: 'var(--cyan-400)', fontWeight: 600 }}>{intervention.waterCategory}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-muted)' }}>Land Footprint:</span>
            <span style={{ color: '#fbbf24', fontWeight: 600 }}>{intervention.landCategory}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-muted)' }}>Feasibility Score:</span>
            <span style={{ color: '#34d399', fontWeight: 700 }}>{intervention.feasibilityScore}/100</span>
          </div>
        </div>

        {/* Co-benefits */}
        <div style={{ marginTop: 12 }}>
          <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, marginBottom: 4 }}>
            Key Environmental Co-Benefits:
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {intervention.coBenefits.slice(0, 2).map((benefit, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                <CheckCircle2 size={12} color="#10b981" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <Button
          variant="primary"
          size="sm"
          style={{ flex: 1 }}
          icon={ArrowRight}
          iconPosition="right"
          onClick={() => {
            if (onSelectForPlanning) onSelectForPlanning(intervention);
            else navigate('/planner');
          }}
        >
          Include in Plan
        </Button>
      </div>
    </div>
  );
}
