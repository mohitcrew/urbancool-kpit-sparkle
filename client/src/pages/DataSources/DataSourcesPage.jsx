import React, { useState, useEffect } from 'react';
import {
  Database,
  Satellite,
  CloudSun,
  Map,
  Users,
  Radio,
  CheckCircle2,
  Clock,
  Activity,
  RefreshCw,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import Button from '../../components/ui/Button';
import { CardSkeleton } from '../../components/ui/SkeletonLoader';
import ErrorState from '../../components/ui/ErrorState';
import { dataSourcesService } from '../../services/dataSourcesService';

const ICON_BY_CATEGORY = {
  'Satellite Earth Observation': Satellite,
  'Meteorological & Weather Stations': CloudSun,
  'Geospatial & Built Environment': Map,
  'Socio-Economic & Vulnerability': Users,
  'Smart City IoT & Field Sensors': Radio
};

export default function DataSourcesPage() {
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadSources = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await dataSourcesService.getDataSources();
      setSources(data || []);
    } catch (err) {
      console.error('Failed to load data sources:', err);
      setError('Unable to load data ingestion pipeline.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSources();
  }, []);

  if (error) {
    return <ErrorState message={error} onRetry={loadSources} />;
  }

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <Database size={16} color="var(--cyan-400)" />
            <span style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--cyan-400)', letterSpacing: '0.05em' }}>
              Multi-Modal Ingestion Architecture
            </span>
          </div>
          <h1 style={{ fontSize: '1.85rem', color: '#ffffff' }}>
            Data Feeds & Geospatial Ingestion Pipeline
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
            Satellite Earth Observation, Meteorological telemetry, Vector GIS cadastre, and Demographic censuses powering UrbanCool AI.
          </p>
        </div>

        <Button
          variant="secondary"
          icon={RefreshCw}
          onClick={loadSources}
          size="sm"
        >
          Refresh Feed Telemetry
        </Button>
      </div>

      {/* System Perception Architecture Flow Banner */}
      <div
        className="card-glass"
        style={{
          padding: 20,
          background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.12) 0%, rgba(15, 23, 42, 0.8) 100%)',
          border: '1px solid var(--border-active)',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 16
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff'
            }}
          >
            <Activity size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>
              Perception Layer Status: 7 of 7 Feeds Active
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              100% automated ingestion pipeline with Cloud-Optimized GeoTIFF rasterization & STAC cataloging.
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 14, fontSize: '0.78rem' }}>
          <div>Daily Ingested: <strong style={{ color: '#ffffff' }}>74,100+ telemetry records</strong></div>
          <span style={{ color: 'var(--text-muted)' }}>|</span>
          <div>Mean Latency: <strong style={{ color: '#34d399' }}>1.2s</strong></div>
        </div>
      </div>

      {/* Data Sources Grid */}
      {loading ? (
        <div className="grid-2">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : (
        <div className="grid-2">
          {sources.map((src) => {
            const Icon = ICON_BY_CATEGORY[src.category] || Database;
            const isConnected = src.status === 'Connected';

            return (
              <div
                key={src.id}
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
                  {/* Top Status */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <div
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: 'var(--radius-sm)',
                        background: 'rgba(6, 182, 212, 0.15)',
                        color: 'var(--cyan-400)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Icon size={20} />
                    </div>

                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 5,
                        padding: '3px 8px',
                        borderRadius: 'var(--radius-xs)',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        backgroundColor: isConnected ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                        color: isConnected ? '#34d399' : '#fbbf24',
                        border: `1px solid ${isConnected ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`
                      }}
                    >
                      <span className="pulse-dot" style={{ width: 5, height: 5, background: isConnected ? '#10b981' : '#f59e0b' }} />
                      {src.status}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>
                    {src.category}
                  </div>
                  <h3 style={{ fontSize: '1.15rem', color: '#ffffff', margin: '4px 0 6px' }}>
                    {src.name}
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: 14 }}>
                    {src.description}
                  </p>

                  {/* Metadata key values */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 6,
                      background: 'rgba(0, 0, 0, 0.25)',
                      padding: 10,
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.76rem'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Spatial Grid:</span>
                      <span style={{ color: '#ffffff', fontWeight: 600 }}>{src.spatialResolution}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Temporal Cadence:</span>
                      <span style={{ color: 'var(--cyan-400)', fontWeight: 600 }}>{src.temporalResolution}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Ingestion Protocol:</span>
                      <span style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>{src.apiProtocol}</span>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTop: '1px solid var(--border-subtle)',
                    paddingTop: 10,
                    fontSize: '0.74rem',
                    color: 'var(--text-muted)'
                  }}
                >
                  <span>Health: <strong style={{ color: '#34d399' }}>{src.healthScore}%</strong></span>
                  <span>Synced: <strong style={{ color: 'var(--text-secondary)' }}>{src.lastIngested}</strong></span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
