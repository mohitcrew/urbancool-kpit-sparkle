import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  MapPin,
  Sun,
  Bell,
  Sliders,
  Menu,
  ChevronDown,
  Sparkles,
  Info,
  CheckCircle2,
  Thermometer,
  Wind
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Header() {
  const {
    currentCity,
    citiesList,
    selectedCityId,
    setSelectedCityId,
    isDemoMode,
    toggleDemoMode,
    toggleSidebar,
    notifications,
    markAllNotificationsRead
  } = useApp();

  const [showNotifs, setShowNotifs] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="top-header">
      {/* Left: Sidebar toggle & City Selector */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <button
          onClick={toggleSidebar}
          className="btn-secondary"
          style={{
            padding: 8,
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          title="Toggle Navigation Sidebar"
        >
          <Menu size={18} />
        </button>

        {/* City Dropdown */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(15, 23, 42, 0.8)',
              border: '1px solid var(--border-default)',
              padding: '6px 14px',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer'
            }}
          >
            <MapPin size={16} color="var(--cyan-400)" />
            <select
              value={selectedCityId}
              onChange={(e) => setSelectedCityId(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.92rem',
                cursor: 'pointer',
                paddingRight: 10,
                outline: 'none'
              }}
            >
              {citiesList.map((c) => (
                <option key={c.id} value={c.id} style={{ background: '#0f172a', color: '#fff' }}>
                  {c.name}, {c.state}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Live Weather Widget */}
        {currentCity?.weather && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              padding: '6px 14px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.8rem'
            }}
            className="hide-mobile"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <Thermometer size={14} color="#f97316" />
              <span style={{ color: 'var(--text-muted)' }}>Ambient:</span>
              <strong style={{ color: '#ffffff' }}>{currentCity.weather.ambientTemp}</strong>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <Sun size={14} color="#eab308" />
              <span style={{ color: 'var(--text-muted)' }}>Heat Index:</span>
              <strong style={{ color: '#fbbf24' }}>{currentCity.weather.heatIndex}</strong>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <Wind size={14} color="var(--cyan-400)" />
              <span style={{ color: 'var(--text-muted)' }}>Wind:</span>
              <strong style={{ color: 'var(--text-secondary)' }}>{currentCity.weather.windSpeed}</strong>
            </div>
          </div>
        )}
      </div>

      {/* Right: Demo Mode Pill, Notifications, User Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        {/* Demo Mode Toggle */}
        <button
          onClick={toggleDemoMode}
          className="demo-mode-badge"
          title="Toggle between Realistic Mock Data and Live REST API Backend"
          style={{ cursor: 'pointer' }}
        >
          <span className="pulse-dot" />
          {isDemoMode ? 'DEMO MODE (MOCK ACTIVE)' : 'LIVE API CONNECTED'}
        </button>

        {/* Notifications Popover */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowNotifs(!showNotifs)}
            style={{
              position: 'relative',
              width: 38,
              height: 38,
              borderRadius: 'var(--radius-md)',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--border-default)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-secondary)'
            }}
            title="Notifications"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: -2,
                  right: -2,
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  background: '#ef4444',
                  color: '#fff',
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifs && (
            <div
              className="card-glass"
              style={{
                position: 'absolute',
                top: 48,
                right: 0,
                width: 320,
                zIndex: 1100,
                padding: 16,
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid var(--border-active)',
                borderRadius: 'var(--radius-lg)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ffffff' }}>
                  System Notifications
                </span>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotificationsRead}
                    style={{ fontSize: '0.72rem', color: 'var(--cyan-400)', cursor: 'pointer' }}
                  >
                    Mark read
                  </button>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    style={{
                      padding: 10,
                      borderRadius: 'var(--radius-sm)',
                      background: n.read ? 'rgba(255, 255, 255, 0.02)' : 'rgba(6, 182, 212, 0.08)',
                      border: '1px solid var(--border-subtle)',
                      fontSize: '0.78rem'
                    }}
                  >
                    <div style={{ fontWeight: 600, color: '#ffffff', marginBottom: 2 }}>{n.title}</div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: 1.3 }}>{n.message}</div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: 4 }}>{n.time}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User / Command Center Authority Profile */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '4px 10px 4px 6px',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid var(--border-default)'
          }}
        >
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              color: '#fff',
              fontSize: '0.75rem'
            }}
          >
            PMC
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#ffffff' }}>City Climate Cell</span>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Admin Role</span>
          </div>
        </div>
      </div>
    </header>
  );
}
