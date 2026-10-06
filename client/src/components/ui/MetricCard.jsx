import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

export default function MetricCard({
  title,
  value,
  subtext,
  trend,
  trendType = 'neutral', // 'good', 'bad', 'neutral'
  icon: Icon,
  accentColor = 'var(--cyan-500)',
  onClick,
  className = ''
}) {
  return (
    <div
      className={`card-glass metric-card ${onClick ? 'card-glass-interactive' : ''} ${className}`}
      style={{ '--accent-glow': accentColor }}
      onClick={onClick}
    >
      <div className="metric-header">
        <span className="metric-title">{title}</span>
        {Icon && (
          <div className="metric-icon-badge" style={{ color: accentColor }}>
            <Icon size={18} />
          </div>
        )}
      </div>

      <div className="metric-value-row">
        <span className="metric-value">{value}</span>
      </div>

      <div className="metric-subtext">
        {trend && (
          <span
            className={`trend-pill ${
              trendType === 'bad'
                ? 'trend-up-bad'
                : trendType === 'good'
                ? 'trend-down-good'
                : 'trend-neutral'
            }`}
          >
            {trendType === 'bad' ? (
              <ArrowUpRight size={12} />
            ) : trendType === 'good' ? (
              <ArrowDownRight size={12} />
            ) : (
              <Minus size={12} />
            )}
            {trend}
          </span>
        )}
        {subtext && <span>{subtext}</span>}
      </div>
    </div>
  );
}
