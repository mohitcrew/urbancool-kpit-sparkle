import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Map,
  Flame,
  Sparkles,
  FlaskConical,
  BarChart3,
  Layers,
  Bot,
  Database,
  Settings,
  ChevronLeft,
  ChevronRight,
  SunMedium
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const NAV_GROUPS = [
  {
    category: 'Monitoring',
    items: [
      { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { to: '/heat-map', label: 'Heat Map', icon: Map },
      { to: '/hotspots', label: 'Hotspots', icon: Flame }
    ]
  },
  {
    category: 'Intelligence & Decision',
    items: [
      { to: '/planner', label: 'AI Planner', icon: Sparkles },
      { to: '/scenarios', label: 'Scenario Lab', icon: FlaskConical },
      { to: '/interventions', label: 'Interventions', icon: Layers }
    ]
  },
  {
    category: 'Analytics & Reasoning',
    items: [
      { to: '/analytics', label: 'Analytics', icon: BarChart3 },
      { to: '/ai-insights', label: 'AI Insights', icon: Bot },
      { to: '/data-sources', label: 'Data Sources', icon: Database },
      { to: '/settings', label: 'Settings', icon: Settings }
    ]
  }
];

export default function Sidebar() {
  const { isSidebarCollapsed, toggleSidebar } = useApp();

  return (
    <aside className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
      {/* Brand Header */}
      <div className="sidebar-brand">
        <div className="brand-icon-wrapper">
          <SunMedium size={22} />
        </div>
        {!isSidebarCollapsed && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span className="brand-title">UrbanCool</span>
            <span className="brand-badge">AI</span>
          </div>
        )}
      </div>

      {/* Navigation list */}
      <div className="nav-section">
        {NAV_GROUPS.map((group, gIdx) => (
          <div key={gIdx} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {!isSidebarCollapsed && (
              <div className="nav-category-label">{group.category}</div>
            )}
            {group.items.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                  title={isSidebarCollapsed ? item.label : undefined}
                >
                  <Icon className="nav-icon" />
                  {!isSidebarCollapsed && <span>{item.label}</span>}
                </NavLink>
              );
            })}
          </div>
        ))}
      </div>

      {/* Bottom KPIT Sparkle 2027 Tag */}
      <div
        style={{
          padding: '14px 16px',
          borderTop: '1px solid var(--border-subtle)',
          backgroundColor: 'rgba(0, 0, 0, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          gap: 4
        }}
      >
        {!isSidebarCollapsed ? (
          <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--cyan-400)', letterSpacing: '0.04em' }}>
                KPIT SPARKLE 2027
              </span>
              <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>v1.0 Demo</span>
            </div>
            <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)', lineHeight: 1.3 }}>
              AI Systems for Urban Heat Mitigation
            </p>
          </>
        ) : (
          <div style={{ textAlign: 'center', fontSize: '0.62rem', color: 'var(--cyan-400)', fontWeight: 800 }}>
            KPIT
          </div>
        )}
      </div>
    </aside>
  );
}
