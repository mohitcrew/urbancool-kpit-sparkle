import React from 'react';

export function SkeletonLoader({ height = 24, width = '100%', radius = 6, className = '', style = {} }) {
  return (
    <div
      className={`skeleton ${className}`}
      style={{
        height,
        width,
        borderRadius: radius,
        ...style
      }}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="card-glass" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <SkeletonLoader height={16} width="40%" />
      <SkeletonLoader height={36} width="60%" />
      <SkeletonLoader height={14} width="80%" />
    </div>
  );
}

export function TableSkeleton({ rows = 5 }) {
  return (
    <div className="card-glass" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
      <SkeletonLoader height={24} width="30%" />
      {Array.from({ length: rows }).map((_, i) => (
        <SkeletonLoader key={i} height={38} width="100%" />
      ))}
    </div>
  );
}
