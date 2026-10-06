import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Flame,
  AlertTriangle,
  Users,
  Sun,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Map as MapIcon,
  ShieldAlert
} from 'lucide-react';
import MetricCard from '../../components/ui/MetricCard';
import HeatMap from '../../components/maps/HeatMap';
import AIInsightCard from '../../components/cards/AIInsightCard';
import { RiskBadge, StatusBadge } from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { CardSkeleton, TableSkeleton } from '../../components/ui/SkeletonLoader';
import ErrorState from '../../components/ui/ErrorState';
import { useApp } from '../../context/AppContext';
import { heatService } from '../../services/heatService';
import { hotspotService } from '../../services/hotspotService';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { currentCity, selectedCityId, activeMapLayer, setActiveMapLayer } = useApp();

  const [hotspots, setHotspots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await hotspotService.getHotspots({ cityId: selectedCityId });
      setHotspots(data || []);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
      setError('Unable to load heat monitoring metrics.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedCityId]);

  if (error) {
    return <ErrorState message={error} onRetry={loadData} />;
  }

  const criticalHotspots = hotspots.filter((h) => h.heatRisk >= 85);
  const metrics = currentCity?.metrics || {
    cityHeatRiskIndex: 78,
    riskTrend: '+8.2%',
    activeHotspotsCount: 24,
    hotspotTrend: '+4 this week',
    populationExposed: 184200,
    exposedTrend: 'High-risk exposure',
    averageLST: '39.4°C',
    lstTrend: '+1.3°C'
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Page Title & Subtitle Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--cyan-400)'
              }}
            >
              Urban Climate Intelligence
            </span>
            <span style={{ color: 'var(--text-muted)' }}>•</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {currentCity?.name} Municipal Jurisdiction
            </span>
          </div>
          <h1 style={{ fontSize: '1.85rem', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            City Heat Mitigation Command Center
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
            Real-time geospatial heat risk diagnostics, demographic vulnerability tracking, and automated cooling interventions.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <Button
            variant="secondary"
            icon={MapIcon}
            onClick={() => navigate('/heat-map')}
            size="sm"
          >
            Full Map Studio
          </Button>
          <Button
            variant="primary"
            icon={Sparkles}
            onClick={() => navigate('/planner')}
            size="sm"
          >
            AI Cooling Planner
          </Button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      {loading ? (
        <div className="kpi-grid">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : (
        <div className="kpi-grid">
          <MetricCard
            title="City Heat Risk Index"
            value={`${metrics.cityHeatRiskIndex} / 100`}
            trend={metrics.riskTrend}
            trendType="bad"
            subtext="vs previous period"
            icon={Flame}
            accentColor="#ef4444"
          />

          <MetricCard
            title="Active Hotspots"
            value={metrics.activeHotspotsCount}
            trend={metrics.hotspotTrend}
            trendType="bad"
            subtext="tracked wards"
            icon={AlertTriangle}
            accentColor="#f97316"
          />

          <MetricCard
            title="Population Exposed"
            value={metrics.populationExposed?.toLocaleString()}
            trend="High-Risk"
            trendType="bad"
            subtext="vulnerable demographic"
            icon={Users}
            accentColor="#eab308"
          />

          <MetricCard
            title="Average Surface LST"
            value={metrics.averageLST}
            trend={metrics.lstTrend}
            trendType="bad"
            subtext="thermal infrared pass"
            icon={Sun}
            accentColor="#06b6d4"
          />
        </div>
      )}

      {/* Main Grid: Interactive Map & AI Insight Summary */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: 24,
          alignItems: 'stretch'
        }}
        className="dashboard-main-grid"
      >
        {/* Interactive Heat Map */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <MapIcon size={16} color="var(--cyan-400)" />
              <h2 style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>Live Urban Thermal Map</h2>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Click any polygon for ward diagnostics
            </span>
          </div>

          <HeatMap
            hotspots={hotspots}
            activeLayer={activeMapLayer}
            onLayerChange={setActiveMapLayer}
            height="460px"
          />
        </div>

        {/* AI Insight Card */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <AIInsightCard
            totalCriticalCount={criticalHotspots.length}
            criticalZones={criticalHotspots.slice(0, 3).map((h) => ({
              name: `${h.shortName} (${h.name.split(' ')[0]})`,
              risk: h.heatRisk,
              lst: `${h.lstCelsius}°C`
            }))}
          />
        </div>
      </div>

      {/* High-Risk Zones Action Table */}
      <div className="card-glass" style={{ padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: 2 }}>
              Priority Heat Hotspots Requiring Action
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Identified through combined Landsat thermal infrared signatures and urban morphology density.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            icon={ArrowRight}
            iconPosition="right"
            onClick={() => navigate('/hotspots')}
          >
            View All Hotspots
          </Button>
        </div>

        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Hotspot ID</th>
                <th>Ward Location</th>
                <th>Heat Risk</th>
                <th>Surface LST</th>
                <th>Exposed Pop.</th>
                <th>Vulnerability</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {hotspots.slice(0, 5).map((h) => (
                <tr
                  key={h.id}
                  className="clickable-row"
                  onClick={() => navigate(`/hotspots/${h.id}`)}
                >
                  <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--cyan-400)' }}>
                    {h.id}
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{h.shortName}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{h.name}</div>
                  </td>
                  <td>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 800,
                        color: h.heatRisk >= 90 ? '#ef4444' : h.heatRisk >= 80 ? '#f97316' : '#eab308'
                      }}
                    >
                      {h.heatRisk} / 100
                    </span>
                  </td>
                  <td style={{ fontWeight: 700, color: '#f97316' }}>{h.lstCelsius}°C</td>
                  <td>{h.population?.toLocaleString()}</td>
                  <td>
                    <span style={{ color: h.vulnerability === 'High' ? '#f87171' : '#fbbf24', fontWeight: 600 }}>
                      {h.vulnerability}
                    </span>
                  </td>
                  <td>
                    <RiskBadge level={h.priority} />
                  </td>
                  <td>
                    <StatusBadge status={h.status} variant={h.status === 'Action Required' ? 'rose' : 'cyan'} />
                  </td>
                  <td>
                    <span style={{ color: 'var(--cyan-400)', fontSize: '0.8rem', fontWeight: 600 }}>
                      Inspect →
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
