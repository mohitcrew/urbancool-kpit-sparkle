import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Sparkles,
  Sliders,
  DollarSign,
  Droplet,
  MapPin,
  Clock,
  TrendingDown,
  Users,
  ShieldCheck,
  CheckCircle,
  FlaskConical,
  Download,
  AlertCircle,
  Layers
} from 'lucide-react';
import SliderInput from '../../components/ui/SliderInput';
import Button from '../../components/ui/Button';
import { RiskBadge } from '../../components/ui/Badge';
import { useApp } from '../../context/AppContext';
import { plannerService } from '../../services/plannerService';
import { hotspotService } from '../../services/hotspotService';
import ErrorState from '../../components/ui/ErrorState';

export default function PlannerPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialWard = searchParams.get('ward') || 'H-017';
  const { currentCity, selectedCityId } = useApp();

  const [hotspotsList, setHotspotsList] = useState([]);
  const [selectedWard, setSelectedWard] = useState(initialWard);
  const [budgetCr, setBudgetCr] = useState(5.0);
  const [waterConstraint, setWaterConstraint] = useState('Medium');
  const [landConstraint, setLandConstraint] = useState('Medium');
  const [planningPriority, setPlanningPriority] = useState('Maximum Population Benefit');
  const [timeHorizon, setTimeHorizon] = useState('12 months');

  const [isOptimizing, setIsOptimizing] = useState(false);
  const [planResult, setPlanResult] = useState(null);
  const [error, setError] = useState(null);

  // Load hotspots dropdown
  useEffect(() => {
    async function fetchHotspots() {
      try {
        const data = await hotspotService.getHotspots({ cityId: selectedCityId });
        setHotspotsList(data || []);
      } catch (err) {
        console.error('Failed to load hotspots for planner:', err);
      }
    }
    fetchHotspots();
  }, [selectedCityId]);

  // Initial optimization on mount
  useEffect(() => {
    handleRunOptimization();
  }, []);

  const handleRunOptimization = async () => {
    try {
      setIsOptimizing(true);
      setError(null);
      const res = await plannerService.optimizePlan({
        wardId: selectedWard,
        budgetCr,
        waterConstraint,
        landConstraint,
        planningPriority,
        timeHorizon
      });
      setPlanResult(res);
    } catch (err) {
      console.error('Optimization error:', err);
      setError('Unable to run AI cooling optimization.');
    } finally {
      setIsOptimizing(false);
    }
  };

  const currentSelectedWardData = hotspotsList.find((h) => h.id === selectedWard) || hotspotsList[0];

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: 'var(--radius-xs)',
                background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff'
              }}
            >
              <Sparkles size={13} />
            </div>
            <span style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--cyan-400)', letterSpacing: '0.05em' }}>
              Multi-Objective AI Decision Engine
            </span>
          </div>
          <h1 style={{ fontSize: '1.85rem', color: 'var(--text-primary)' }}>
            AI Cooling Strategy Planner
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
            Compute Pareto-optimal cooling intervention packages constrained by municipal budget, land availability, and water resources.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <Button
            variant="secondary"
            icon={FlaskConical}
            onClick={() => navigate('/scenarios')}
          >
            Scenario Lab
          </Button>
        </div>
      </div>

      {error && <ErrorState message={error} onRetry={handleRunOptimization} />}

      {/* Two Column Layout: Configuration Panel & Optimization Output */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 1.4fr',
          gap: 24,
          alignItems: 'start'
        }}
        className="planner-grid"
      >
        {/* Left: Configuration Panel */}
        <div className="card-glass" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid var(--border-subtle)', paddingBottom: 12 }}>
            <Sliders size={18} color="var(--cyan-400)" />
            <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>Optimization Constraints</h3>
          </div>

          {/* Ward Target */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <MapPin size={14} color="var(--cyan-400)" /> Target Area / Ward:
            </label>
            <select
              value={selectedWard}
              onChange={(e) => setSelectedWard(e.target.value)}
              style={{ fontSize: '0.88rem', padding: '10px 12px' }}
            >
              {hotspotsList.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.shortName} — Risk {h.heatRisk}/100 ({h.lstCelsius}°C)
                </option>
              ))}
            </select>
            {currentSelectedWardData && (
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                <span>Pop: {currentSelectedWardData.population?.toLocaleString()}</span>
                <span>Canopy: {currentSelectedWardData.vegetationPercent}%</span>
                <span>Built-up: {currentSelectedWardData.builtUpPercent}%</span>
              </div>
            )}
          </div>

          {/* Budget Slider */}
          <SliderInput
            label="Municipal Budget Ceiling (₹ INR)"
            value={budgetCr}
            min={1.0}
            max={20.0}
            step={0.25}
            unit="Cr"
            displayMultiplier={1}
            onChange={setBudgetCr}
            sublabel="Allocated capital expenditure for urban heat action plan"
          />

          {/* Planning Priority */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Primary Planning Objective:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 6 }}>
              {[
                'Maximum Population Benefit',
                'Maximum Cooling',
                'Maximum Equity',
                'Minimum Cost',
                'Balanced Hybrid'
              ].map((p) => {
                const active = planningPriority === p;
                return (
                  <button
                    key={p}
                    onClick={() => setPlanningPriority(p)}
                    style={{
                      padding: '8px 10px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.75rem',
                      fontWeight: active ? 700 : 500,
                      backgroundColor: active ? 'rgba(6, 182, 212, 0.2)' : 'var(--badge-bg)',
                      color: active ? 'var(--cyan-400)' : 'var(--text-secondary)',
                      border: active ? '1px solid var(--cyan-400)' : '1px solid var(--border-subtle)',
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {p}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Water Constraint & Land Availability */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                Water Resource Limit:
              </label>
              <select
                value={waterConstraint}
                onChange={(e) => setWaterConstraint(e.target.value)}
                style={{ fontSize: '0.82rem' }}
              >
                <option value="Low">Low (Drought / Arid)</option>
                <option value="Medium">Medium (STP Effluent)</option>
                <option value="High">High (Abundant Water)</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                Time Horizon:
              </label>
              <select
                value={timeHorizon}
                onChange={(e) => setTimeHorizon(e.target.value)}
                style={{ fontSize: '0.82rem' }}
              >
                <option value="6 months">Fast Track (6 Months)</option>
                <option value="12 months">Annual Plan (12 Months)</option>
                <option value="24 months">2-Year Phase (24 Months)</option>
                <option value="36 months">Long-Term (36 Months)</option>
              </select>
            </div>
          </div>

          {/* Submit Optimize Button */}
          <Button
            variant="primary"
            size="lg"
            icon={Sparkles}
            loading={isOptimizing}
            onClick={handleRunOptimization}
            style={{ width: '100%', marginTop: 8 }}
          >
            {isOptimizing ? 'Synthesizing Optimal Package...' : 'OPTIMIZE COOLING PLAN'}
          </Button>
        </div>

        {/* Right: Optimization Results Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {planResult?.data ? (
            <div
              className="card-glass"
              style={{
                padding: 26,
                border: '1px solid var(--border-active)',
                background: 'linear-gradient(145deg, rgba(21, 31, 56, 0.95) 0%, rgba(10, 15, 29, 0.98) 100%)',
                boxShadow: 'var(--shadow-glow)'
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.76rem',
                        fontWeight: 800,
                        color: 'var(--cyan-400)',
                        background: 'rgba(6, 182, 212, 0.15)',
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-xs)'
                      }}
                    >
                      AI OPTIMAL PLAN
                    </span>
                    <span
                      style={{
                        fontSize: '0.7rem',
                        padding: '2px 6px',
                        borderRadius: 'var(--radius-xs)',
                        background: 'rgba(245, 158, 11, 0.15)',
                        color: '#fbbf24',
                        border: '1px solid rgba(245, 158, 11, 0.3)',
                        fontWeight: 700,
                        textTransform: 'uppercase'
                      }}
                    >
                      ESTIMATED SIMULATION
                    </span>
                  </div>
                  <h2 style={{ fontSize: '1.4rem', color: 'var(--text-primary)' }}>
                    Recommended Strategy for {currentSelectedWardData?.shortName || selectedWard}
                  </h2>
                </div>

                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  ID: {planResult.data.planId}
                </span>
              </div>

              {/* 4 Primary Impact Cards */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: 12,
                  marginBottom: 20
                }}
                className="impact-metrics-strip"
              >
                <div style={{ padding: 12, background: 'var(--card-inner-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Estimated Cooling
                  </div>
                  <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#10b981', fontFamily: 'var(--font-display)' }}>
                    -{planResult.data.impact.estimatedCoolingC}°C
                  </div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Ambient air relief</div>
                </div>

                <div style={{ padding: 12, background: 'var(--card-inner-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Population Benefited
                  </div>
                  <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0891b2', fontFamily: 'var(--font-display)' }}>
                    {planResult.data.impact.populationBenefited?.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Exposed citizens</div>
                </div>

                <div style={{ padding: 12, background: 'var(--card-inner-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Estimated Cost
                  </div>
                  <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#d97706', fontFamily: 'var(--font-display)' }}>
                    ₹{planResult.data.impact.costCr} Cr
                  </div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                    {planResult.data.impact.budgetUtilizationPct}% of ₹{budgetCr} Cr
                  </div>
                </div>

                <div style={{ padding: 12, background: 'var(--card-inner-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Water Requirement
                  </div>
                  <div style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--cyan-400)', fontFamily: 'var(--font-display)' }}>
                    {planResult.data.impact.waterReqMlPerDay} ML/d
                  </div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Recycled STP priority</div>
                </div>
              </div>

              {/* Synthesized Interventions Deployment Matrix */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--cyan-400)', fontWeight: 700, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Layers size={14} /> Recommended Deployment Breakdown:
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
                  {planResult.data.optimalInterventions.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '10px 14px',
                        borderRadius: 'var(--radius-sm)',
                        background: 'var(--card-inner-bg)',
                        border: '1px solid var(--border-subtle)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                          {item.name}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                          Allocated cost: ₹{item.costCr.toFixed(2)} Cr
                        </div>
                      </div>
                      <div
                        style={{
                          fontSize: '0.95rem',
                          fontWeight: 800,
                          fontFamily: 'var(--font-mono)',
                          color: 'var(--cyan-400)'
                        }}
                      >
                        {item.quantity}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Reasoning Note */}
              <div
                style={{
                  padding: 12,
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(6, 182, 212, 0.08)',
                  border: '1px solid rgba(6, 182, 212, 0.25)',
                  fontSize: '0.8rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.4,
                  marginBottom: 20
                }}
              >
                <div style={{ fontWeight: 700, color: 'var(--cyan-400)', marginBottom: 2 }}>
                  Optimizer Convergence Logic:
                </div>
                {planResult.data.aiRecommendationNotes}
              </div>

              {/* Bottom Actions */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <ShieldCheck size={14} color="#10b981" />
                  <span>Model Confidence: <strong>{planResult.data.impact.confidenceScorePct}%</strong></span>
                </div>

                <div style={{ display: 'flex', gap: 10 }}>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={FlaskConical}
                    onClick={() => navigate('/scenarios')}
                  >
                    Compare in Scenario Lab →
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="card-glass" style={{ padding: 40, textAlign: 'center' }}>
              <Sparkles size={32} color="var(--cyan-400)" style={{ margin: '0 auto 12px' }} />
              <h3 style={{ color: 'var(--text-primary)', marginBottom: 6 }}>Ready to Optimize</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                Set your budget and priorities on the left, then click Optimize Cooling Plan.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
