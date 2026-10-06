import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Flame,
  Sun,
  Users,
  Trees,
  Building2,
  Sparkles,
  School,
  Building,
  Bus,
  ShieldAlert,
  Layers,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { RiskBadge, StatusBadge } from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import SHAPExplainer from '../../components/ai/SHAPExplainer';
import { CardSkeleton } from '../../components/ui/SkeletonLoader';
import ErrorState from '../../components/ui/ErrorState';
import { hotspotService } from '../../services/hotspotService';

export default function HotspotDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [hotspot, setHotspot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadHotspot = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await hotspotService.getHotspotById(id || 'H-017');
      setHotspot(data);
    } catch (err) {
      console.error('Failed to load hotspot detail:', err);
      setError(`Hotspot ${id} could not be loaded.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHotspot();
  }, [id]);

  if (error) {
    return <ErrorState message={error} onRetry={loadHotspot} />;
  }

  if (loading || !hotspot) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Top Breadcrumb & Action */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <button
          onClick={() => navigate('/hotspots')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            color: 'var(--cyan-400)',
            fontSize: '0.85rem',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          <ArrowLeft size={16} /> Back to Hotspots Registry
        </button>

        <div style={{ display: 'flex', gap: 10 }}>
          <Button
            variant="primary"
            icon={Sparkles}
            onClick={() => navigate(`/planner?ward=${hotspot.id}`)}
          >
            Launch AI Planner for {hotspot.shortName}
          </Button>
        </div>
      </div>

      {/* Main Header Banner */}
      <div
        className="card-glass"
        style={{
          padding: 28,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 20,
          background: 'var(--ai-card-bg)',
          border: '1px solid var(--border-active)'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.88rem',
                fontWeight: 700,
                color: 'var(--cyan-400)',
                background: 'rgba(6, 182, 212, 0.12)',
                padding: '2px 8px',
                borderRadius: 'var(--radius-xs)'
              }}
            >
              HOTSPOT {hotspot.id}
            </span>
            <RiskBadge level={hotspot.riskLevel} score={hotspot.heatRisk} />
            <StatusBadge status={hotspot.status} variant="rose" />
          </div>

          <h1 style={{ fontSize: '1.85rem', color: 'var(--text-primary)', marginBottom: 4 }}>
            {hotspot.name}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
            Ward {hotspot.wardNumber} • Total Land Surface: {hotspot.areaKm2} km² • High Thermal Inertia Corridor
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            gap: 16,
            background: 'var(--card-inner-bg)',
            padding: '12px 20px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)'
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Surface Temp
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f97316', fontFamily: 'var(--font-display)' }}>
              {hotspot.lstCelsius}°C
            </div>
          </div>

          <div style={{ width: 1, backgroundColor: 'var(--border-subtle)' }} />

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Heat Risk Index
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ef4444', fontFamily: 'var(--font-display)' }}>
              {hotspot.heatRisk}/100
            </div>
          </div>
        </div>
      </div>

      {/* 1. Overview Grid */}
      <div className="grid-3">
        <div className="card-glass" style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Users size={18} color="#38bdf8" />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
              Population Density
            </span>
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
            {hotspot.population?.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4 }}>
            {Math.round(hotspot.population / hotspot.areaKm2).toLocaleString()} residents / km²
          </div>
        </div>

        <div className="card-glass" style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Trees size={18} color="#10b981" />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
              Vegetation Canopy Cover
            </span>
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#34d399', fontFamily: 'var(--font-display)' }}>
            {hotspot.vegetationPercent}% <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>(NDVI {hotspot.ndvi})</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4 }}>
            Critically below municipal target of 25% canopy
          </div>
        </div>

        <div className="card-glass" style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Building2 size={18} color="#f43f5e" />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
              Built-Up Impervious Ratio
            </span>
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fb7185', fontFamily: 'var(--font-display)' }}>
            {hotspot.builtUpPercent}% <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>(NDBI {hotspot.ndbi})</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4 }}>
            Paved road density: {hotspot.pavedRoadDensityKmPerKm2} km/km²
          </div>
        </div>
      </div>

      {/* 2. AI Risk Explanation (SHAP Feature Importance) */}
      <SHAPExplainer
        explanation={hotspot.explanation}
        hotspotName={hotspot.shortName}
      />

      {/* 3. Exposure & Infrastructure Matrix */}
      {hotspot.exposure && (
        <div className="card-glass" style={{ padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <ShieldAlert size={20} color="#f59e0b" />
            <div>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)' }}>
                Demographic & Infrastructure Exposure Matrix
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Sensitive populations and critical municipal assets exposed to extreme heat stress.
              </p>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 14,
              marginBottom: 20
            }}
          >
            <div style={{ padding: 14, background: 'var(--card-inner-bg)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Elderly Citizens (60+)</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ef4444', fontFamily: 'var(--font-display)' }}>
                {hotspot.exposure.vulnerableSeniorCitizens?.toLocaleString()}
              </div>
            </div>

            <div style={{ padding: 14, background: 'var(--card-inner-bg)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Children Under 5</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#f97316', fontFamily: 'var(--font-display)' }}>
                {hotspot.exposure.childrenUnderFive?.toLocaleString()}
              </div>
            </div>

            <div style={{ padding: 14, background: 'var(--card-inner-bg)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Outdoor Gig Workers</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#eab308', fontFamily: 'var(--font-display)' }}>
                {hotspot.exposure.outdoorWorkers?.toLocaleString()}
              </div>
            </div>

            <div style={{ padding: 14, background: 'var(--card-inner-bg)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Informal Slum Density</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#a855f7', fontFamily: 'var(--font-display)' }}>
                {hotspot.exposure.slumInformalSettlementsPct}%
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 12,
              padding: 14,
              background: 'var(--card-inner-bg)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <School size={16} color="var(--cyan-400)" />
              <span style={{ fontSize: '0.82rem', color: 'var(--text-primary)' }}>
                <strong>{hotspot.exposure.schoolsCount}</strong> Schools & Daycares
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Building size={16} color="#10b981" />
              <span style={{ fontSize: '0.82rem', color: 'var(--text-primary)' }}>
                <strong>{hotspot.exposure.hospitalsCount}</strong> Hospitals & Health Centers
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Bus size={16} color="#fbbf24" />
              <span style={{ fontSize: '0.82rem', color: 'var(--text-primary)' }}>
                <strong>{hotspot.exposure.transitHubsCount}</strong> Public Transit Terminals
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 4. AI Recommendation Stack */}
      {hotspot.recommendedInterventions && (
        <div className="card-glass" style={{ padding: 24, border: '1px solid var(--border-active)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Layers size={20} color="var(--cyan-400)" />
              <div>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)' }}>
                  AI Tailored Cooling Package for {hotspot.shortName}
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  Synthesized intervention mix optimized for rapid thermal relief and spatial feasibility.
                </p>
              </div>
            </div>

            <Button
              variant="primary"
              size="sm"
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => navigate(`/planner?ward=${hotspot.id}`)}
            >
              Customize in Planner
            </Button>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 14
            }}
          >
            {hotspot.recommendedInterventions.map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: 16,
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--card-inner-bg)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: 10
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--cyan-400)', textTransform: 'uppercase' }}>
                      Intervention #{idx + 1}
                    </span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#10b981' }}>
                      {item.estimatedCooling}
                    </span>
                  </div>
                  <h4 style={{ fontSize: '0.95rem', color: 'var(--text-primary)', lineHeight: 1.2 }}>{item.name}</h4>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 4 }}>
                    Target Deployment: <strong style={{ color: 'var(--text-secondary)' }}>{item.targetVolume}</strong>
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.72rem', color: '#10b981' }}>
                  <CheckCircle2 size={12} />
                  <span>Feasible in local cadastre</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
