import React from 'react';

export default function SliderInput({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  displayMultiplier = 1,
  onChange,
  sublabel
}) {
  return (
    <div className="slider-container">
      <div className="slider-header">
        <label className="slider-label">{label}</label>
        <span className="slider-val">
          {(value * displayMultiplier).toLocaleString()} {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      {sublabel && (
        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{sublabel}</span>
      )}
    </div>
  );
}
