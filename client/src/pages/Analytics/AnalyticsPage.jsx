import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  TrendingUp,
  Sun,
  Trees,
  Users,
  PieChart as PieIcon,
  Activity,
  Layers,
  Sparkles
} from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import MetricCard from '../../components/ui/MetricCard';
import { CardSkeleton } from '../../components/ui/SkeletonLoader';
import ErrorState from '../../components/ui/ErrorState';
import { analyticsService } from '../../services/analyticsService';
import { useApp } from '../../context/AppContext';

export default function AnalyticsPage() {
  const { currentCity } = useApp();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await analyticsService.getAnalyticsData();
      setData(res);
    } catch (err) {
      console.error('Failed to load analytics:', err);
      setError('Unable to load urban climatology analytics.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnalytics();
  }, []);

  if (error) {
    return <ErrorState message={error} onRetry={loadAnalytics} />;
  }

  if (loading || !data) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div className="kpi-grid">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
        <CardSkeleton />
      </div>
    );
  }

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <BarChart3 size={16} color="var(--cyan-400)" />
          <span style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--cyan-400)', letterSpacing: '0.05em' }}>
            Longitudinal Climatology & Demographic Insights
          </span>
        </div>
        <h1 style={{ fontSize: '1.85rem', color: '#ffffff' }}>
          Urban Heat Analytics & Evidence
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
          Historical warming trajectories, diurnal thermal profiles, NDVI inverse correlation, and simulated mitigation impact for {currentCity?.name}.
        </p>
      </div>

      {/* Row 1: Multi-Year Heat Trend & Diurnal Cycle */}
      <div className="grid-2">
        {/* Chart 1: Multi-year Heat Trend */}
        <div className="card-glass" style={{ padding: 22 }}>
          <div style={{ marginBottom: 14 }}>
            <h3 style={{ fontSize: '1.1rem', color: '#ffffff' }}>Historical Warming & Heatwave Trend (2019–2024)</h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Landsat-8/9 summer peak thermal anomalies vs 5-year baseline</p>
          </div>
          <div style={{ height: 280, width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.heatTrend} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.06)" />
                <XAxis dataKey="year" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" domain={[34, 46]} fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: 'rgba(6, 182, 212, 0.3)', borderRadius: 8, fontSize: '0.78rem' }}
                />
                <Legend wrapperStyle={{ fontSize: '0.74rem' }} />
                <Line type="monotone" dataKey="peakLST" name="Peak LST (°C)" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="avgLST" name="Avg Surface LST (°C)" stroke="#f97316" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="baseline" name="5-Yr Baseline" stroke="#94a3b8" strokeDasharray="4 4" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Diurnal Cycle & Cooling Potential */}
        <div className="card-glass" style={{ padding: 22 }}>
          <div style={{ marginBottom: 14 }}>
            <h3 style={{ fontSize: '1.1rem', color: '#ffffff' }}>24-Hour Diurnal Temperature Profile</h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Ambient air vs unmitigated surface LST vs AI cooling plan curve</p>
          </div>
          <div style={{ height: 280, width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.diurnalCycle} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.06)" />
                <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" domain={[24, 50]} fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: 'rgba(6, 182, 212, 0.3)', borderRadius: 8, fontSize: '0.78rem' }}
                />
                <Legend wrapperStyle={{ fontSize: '0.74rem' }} />
                <Area type="monotone" dataKey="surfaceLST" name="Current Surface LST (°C)" stroke="#ef4444" fill="rgba(239, 68, 68, 0.2)" strokeWidth={2} />
                <Area type="monotone" dataKey="mitigatedLST" name="Mitigated LST (°C)" stroke="#10b981" fill="rgba(16, 185, 129, 0.2)" strokeWidth={2} />
                <Line type="monotone" dataKey="ambientTemp" name="Ambient Air Temp" stroke="#38bdf8" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 2: Scatter (NDVI vs LST) & Demographic Exposure */}
      <div className="grid-2">
        {/* Chart 3: Vegetation NDVI vs Surface LST Scatter */}
        <div className="card-glass" style={{ padding: 22 }}>
          <div style={{ marginBottom: 14 }}>
            <h3 style={{ fontSize: '1.1rem', color: '#ffffff' }}>Inverse Correlation: NDVI vs Land Surface Temperature</h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Empirical evidence proving higher tree canopy suppresses surface heat</p>
          </div>
          <div style={{ height: 280, width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.06)" />
                <XAxis dataKey="ndvi" name="NDVI Index" stroke="#94a3b8" domain={[0, 0.7]} fontSize={11} />
                <YAxis dataKey="lst" name="Surface LST (°C)" stroke="#94a3b8" domain={[30, 48]} fontSize={11} />
                <Tooltip
                  cursor={{ strokeDasharray: '3 3' }}
                  content={({ payload }) => {
                    if (payload && payload.length) {
                      const d = payload[0].payload;
                      return (
                        <div style={{ backgroundColor: '#0f172a', border: '1px solid var(--border-active)', padding: 8, borderRadius: 6, fontSize: '0.75rem' }}>
                          <strong style={{ color: '#ffffff' }}>{d.ward}</strong>
                          <div>NDVI: <strong style={{ color: '#34d399' }}>{d.ndvi}</strong></div>
                          <div>LST: <strong style={{ color: '#f97316' }}>{d.lst}°C</strong></div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Scatter name="Ward Data Points" data={data.vegetationVsTempScatter} fill="#06b6d4" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Population Vulnerability Demographics */}
        <div className="card-glass" style={{ padding: 22 }}>
          <div style={{ marginBottom: 14 }}>
            <h3 style={{ fontSize: '1.1rem', color: '#ffffff' }}>Heat-Exposed Population by Vulnerability Segment</h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Breakdown of high-risk citizens across unmitigated zones</p>
          </div>
          <div style={{ height: 280, width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.populationExposureDemographics} layout="vertical" margin={{ top: 10, right: 20, left: 40, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.06)" />
                <XAxis type="number" stroke="#94a3b8" fontSize={11} />
                <YAxis dataKey="group" type="category" stroke="#94a3b8" fontSize={10} width={120} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: 'rgba(6, 182, 212, 0.3)', borderRadius: 8, fontSize: '0.78rem' }}
                />
                <Bar dataKey="population" name="Exposed Population" radius={[0, 4, 4, 0]}>
                  {data.populationExposureDemographics.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 3: Budget Split & Before vs After Impact */}
      <div className="grid-2">
        {/* Chart 5: Budget Allocation Split */}
        <div className="card-glass" style={{ padding: 22 }}>
          <div style={{ marginBottom: 14 }}>
            <h3 style={{ fontSize: '1.1rem', color: '#ffffff' }}>Recommended AI Fiscal Allocation Split</h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Target capital deployment across the ₹5.0 Cr municipal budget</p>
          </div>
          <div style={{ height: 260, width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.interventionBudgetSplit}
                  dataKey="share"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={45}
                  paddingAngle={4}
                  label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {data.interventionBudgetSplit.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: 'rgba(6, 182, 212, 0.3)', borderRadius: 8, fontSize: '0.78rem' }}
                />
                <Legend wrapperStyle={{ fontSize: '0.72rem' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Table 6: Before vs After Cooling Impact Matrix */}
        <div className="card-glass" style={{ padding: 22 }}>
          <div style={{ marginBottom: 14 }}>
            <h3 style={{ fontSize: '1.1rem', color: '#ffffff' }}>Estimated Before vs After Mitigation Impact</h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Projected city-wide microclimate transformation metrics</p>
          </div>

          <div className="data-table-wrapper" style={{ border: 'none' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Performance Metric</th>
                  <th>Pre-Intervention Baseline</th>
                  <th>Post-AI Mitigation</th>
                  <th>Expected Benefit</th>
                </tr>
              </thead>
              <tbody>
                {data.coolingImpactComparison.map((row, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 600, color: '#ffffff' }}>{row.metric}</td>
                    <td style={{ color: '#f87171' }}>
                      {row.before} {row.unit}
                    </td>
                    <td style={{ color: '#34d399', fontWeight: 700 }}>
                      {row.after} {row.unit}
                    </td>
                    <td>
                      <span
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          padding: '2px 6px',
                          borderRadius: 4,
                          background: 'rgba(16, 185, 129, 0.15)',
                          color: '#34d399'
                        }}
                      >
                        {row.metric.includes('Canopy')
                          ? `+${(row.after - row.before).toFixed(1)}%`
                          : `-${(row.before - row.after).toLocaleString()} ${row.unit}`}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
