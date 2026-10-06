import React, { useState } from 'react';
import {
  Settings,
  Sliders,
  MapPin,
  Thermometer,
  DollarSign,
  Bell,
  ShieldCheck,
  Cpu,
  Database,
  Check,
  Save,
  Radio
} from 'lucide-react';
import Button from '../../components/ui/Button';
import { useApp } from '../../context/AppContext';

export default function SettingsPage() {
  const {
    selectedCityId,
    setSelectedCityId,
    citiesList,
    isDemoMode,
    toggleDemoMode,
    tempUnit,
    setTempUnit,
    currency,
    setCurrency
  } = useApp();

  const [criticalThreshold, setCriticalThreshold] = useState(90);
  const [highThreshold, setHighThreshold] = useState(80);
  const [moderateThreshold, setModerateThreshold] = useState(50);
  const [autoAlerts, setAutoAlerts] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2400);
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 960 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <Settings size={16} color="var(--cyan-400)" />
            <span style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--cyan-400)', letterSpacing: '0.05em' }}>
              System Preferences & API Config
            </span>
          </div>
          <h1 style={{ fontSize: '1.85rem', color: '#ffffff' }}>
            Platform Settings & Thresholds
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
            Configure default municipal jurisdiction, climatology units, heat vulnerability thresholds, and demo simulation mode.
          </p>
        </div>

        <Button
          variant="primary"
          icon={savedSuccess ? Check : Save}
          onClick={handleSave}
        >
          {savedSuccess ? 'Settings Saved!' : 'Save Changes'}
        </Button>
      </div>

      {/* Settings Sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Section 1: Demonstration & Mock Toggle */}
        <div className="card-glass" style={{ padding: 24, border: '1px solid var(--border-active)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', color: '#ffffff', marginBottom: 4 }}>
                Architecture Execution Mode (Demo / Real API)
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem' }}>
                Toggle between realistic simulated mock services and live Node.js Express REST API endpoints.
              </p>
            </div>

            <button
              onClick={toggleDemoMode}
              className="demo-mode-badge"
              style={{ cursor: 'pointer', padding: '6px 14px' }}
            >
              <span className="pulse-dot" />
              {isDemoMode ? 'DEMO MODE ACTIVE (MOCK)' : 'LIVE REST API MODE'}
            </button>
          </div>

          <div
            style={{
              padding: 12,
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(0, 0, 0, 0.3)',
              fontSize: '0.78rem',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)'
            }}
          >
            <div>VITE_API_BASE_URL: <strong>{import.meta.env.VITE_API_BASE_URL || '/api'}</strong></div>
            <div>VITE_MOCK_MODE: <strong>{String(isDemoMode)}</strong></div>
            <div style={{ marginTop: 4, color: 'var(--cyan-400)' }}>
              Service layer is completely decoupled. Toggling this allows evaluating frontend with standalone datasets or connected backend.
            </div>
          </div>
        </div>

        {/* Section 2: City & Localization */}
        <div className="card-glass" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <h3 style={{ fontSize: '1.1rem', color: '#ffffff', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 10 }}>
            Geographic Jurisdiction & Localization
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                Active City Jurisdiction:
              </label>
              <select
                value={selectedCityId}
                onChange={(e) => setSelectedCityId(e.target.value)}
                style={{ fontSize: '0.85rem' }}
              >
                {citiesList.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}, {c.state}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                Temperature Scale:
              </label>
              <select
                value={tempUnit}
                onChange={(e) => setTempUnit(e.target.value)}
                style={{ fontSize: '0.85rem' }}
              >
                <option value="celsius">Celsius (°C)</option>
                <option value="fahrenheit">Fahrenheit (°F)</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                Financial Currency:
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                style={{ fontSize: '0.85rem' }}
              >
                <option value="INR">Indian Rupee (₹ INR / Cr)</option>
                <option value="USD">US Dollar ($ USD / M)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 3: Risk Threshold Calibration */}
        <div className="card-glass" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <h3 style={{ fontSize: '1.1rem', color: '#ffffff', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 10 }}>
            Heat Risk Index Classification Thresholds
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#f87171' }}>
                Critical Risk Lower Bound (0-100):
              </label>
              <input
                type="number"
                value={criticalThreshold}
                onChange={(e) => setCriticalThreshold(Number(e.target.value))}
                min={70}
                max={99}
              />
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Default: 90 / 100</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#fb923c' }}>
                High Risk Lower Bound (0-100):
              </label>
              <input
                type="number"
                value={highThreshold}
                onChange={(e) => setHighThreshold(Number(e.target.value))}
                min={50}
                max={89}
              />
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Default: 80 / 100</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#facc15' }}>
                Moderate Risk Lower Bound (0-100):
              </label>
              <input
                type="number"
                value={moderateThreshold}
                onChange={(e) => setModerateThreshold(Number(e.target.value))}
                min={30}
                max={79}
              />
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Default: 50 / 100</span>
            </div>
          </div>
        </div>

        {/* Section 4: Notifications & Automated Advisory */}
        <div className="card-glass" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <h3 style={{ fontSize: '1.1rem', color: '#ffffff', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 10 }}>
            Automated Heat Action Alerts & Notifications
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: '0.88rem' }}>
              <input
                type="checkbox"
                checked={autoAlerts}
                onChange={(e) => setAutoAlerts(e.target.checked)}
                style={{ width: 18, height: 18, accentColor: 'var(--cyan-500)' }}
              />
              <span>Trigger automated IMD Stage 2 Heatwave advisory warnings on Dashboard</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: '0.88rem' }}>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                style={{ width: 18, height: 18, accentColor: 'var(--cyan-500)' }}
              />
              <span>Notify Municipal Climate Disaster Cell when any ward LST exceeds 43°C</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
