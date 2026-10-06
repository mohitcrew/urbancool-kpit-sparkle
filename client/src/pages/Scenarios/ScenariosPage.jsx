import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FlaskConical,
  BarChart2,
  TrendingDown,
  Droplet,
  Users,
  DollarSign,
  Sparkles,
  RefreshCw,
  Layers,
  ArrowRight
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import SliderInput from '../../components/ui/SliderInput';
import Button from '../../components/ui/Button';
import { scenarioService } from '../../services/scenarioService';
import { mockScenarioPresets } from '../../data/mockScenarios';
import ErrorState from '../../components/ui/ErrorState';
import { useApp } from '../../context/AppContext';

export default function ScenariosPage() {
  const { isDarkMode } = useApp();
  const navigate = useNavigate();

  // Custom User Scenario Sliders
  const [customTrees, setCustomTrees] = useState(3000);
  const [customCoolRoofs, setCustomCoolRoofs] = useState(8000);
  const [customGreenRoofs, setCustomGreenRoofs] = useState(800);
  const [customPavements, setCustomPavements] = useState(2000);
  const [customCorridorKm, setCustomCorridorKm] = useState(1.0);
  const [customBudgetCr, setCustomBudgetCr] = useState(5.0);

  const [presets, setPresets] = useState(mockScenarioPresets);
  const [customResult, setCustomResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Recalculate custom scenario whenever sliders adjust
  useEffect(() => {
    async function runSim() {
      const res = await scenarioService.simulateScenario({
        treeCount: customTrees,
        coolRoofM2: customCoolRoofs,
        greenRoofM2: customGreenRoofs,
        permeablePavementM2: customPavements,
        greenCorridorKm: customCorridorKm,
        budgetCr: customBudgetCr
      });
      setCustomResult(res);
    }
    runSim();
  }, [customTrees, customCoolRoofs, customGreenRoofs, customPavements, customCorridorKm, customBudgetCr]);

  const scenarioA = presets.scenarioA || {
    name: 'Scenario A (Urban Forestry Heavy)',
    costCr: 4.8,
    estimatedCoolingC: 1.0,
    populationBenefited: 19200,
    waterReqMlPerDay: 1.2,
    equityScore: 71
  };

  const scenarioB = presets.scenarioB || {
    name: 'Scenario B (Cool Roofs Acceleration)',
    costCr: 4.2,
    estimatedCoolingC: 0.8,
    populationBenefited: 25400,
    waterReqMlPerDay: 0.4,
    equityScore: 84
  };

  const aiPlan = presets.aiOptimalPlan || {
    name: 'UrbanCool AI Hybrid Strategy',
    costCr: 4.95,
    estimatedCoolingC: 1.4,
    populationBenefited: 31200,
    waterReqMlPerDay: 0.85,
    equityScore: 92
  };

  const chartData = [
    {
      metric: 'Cooling (°C x10)',
      'Scenario A (Trees)': scenarioA.estimatedCoolingC * 10,
      'Scenario B (Cool Roofs)': scenarioB.estimatedCoolingC * 10,
      'Custom Sandbox': (customResult?.estimatedCoolingC || 0) * 10,
      'AI Optimal Plan': aiPlan.estimatedCoolingC * 10
    },
    {
      metric: 'Pop. Benefited (k)',
      'Scenario A (Trees)': Math.round(scenarioA.populationBenefited / 1000),
      'Scenario B (Cool Roofs)': Math.round(scenarioB.populationBenefited / 1000),
      'Custom Sandbox': Math.round((customResult?.populationBenefited || 0) / 1000),
      'AI Optimal Plan': Math.round(aiPlan.populationBenefited / 1000)
    },
    {
      metric: 'Equity Score / 10',
      'Scenario A (Trees)': Math.round(scenarioA.equityScore / 10),
      'Scenario B (Cool Roofs)': Math.round(scenarioB.equityScore / 10),
      'Custom Sandbox': Math.round((customResult?.equityScore || 0) / 10),
      'AI Optimal Plan': Math.round(aiPlan.equityScore / 10)
    },
    {
      metric: 'Budget (₹ Cr)',
      'Scenario A (Trees)': scenarioA.costCr,
      'Scenario B (Cool Roofs)': scenarioB.costCr,
      'Custom Sandbox': customResult?.costCr || 0,
      'AI Optimal Plan': aiPlan.costCr
    },
    {
      metric: 'Water Req. (ML/d)',
      'Scenario A (Trees)': scenarioA.waterReqMlPerDay || 1.2,
      'Scenario B (Cool Roofs)': scenarioB.waterReqMlPerDay || 0.4,
      'Custom Sandbox': customResult?.waterReqMlPerDay || 0.9,
      'AI Optimal Plan': aiPlan.waterReqMlPerDay || 1.6
    }
  ];

  const gridStroke = isDarkMode ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.08)';
  const axisColor = isDarkMode ? '#94a3b8' : '#64748b';
  const tooltipStyle = {
    backgroundColor: isDarkMode ? '#0f172a' : '#ffffff',
    color: isDarkMode ? '#f8fafc' : '#0f172a',
    borderColor: isDarkMode ? 'rgba(6, 182, 212, 0.3)' : 'rgba(6, 182, 212, 0.6)',
    borderRadius: 8,
    fontSize: '0.78rem',
    boxShadow: 'var(--shadow-md)'
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <FlaskConical size={16} color="var(--cyan-400)" />
            <span style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--cyan-400)', letterSpacing: '0.05em' }}>
              What-If Climatology Simulation Lab
            </span>
          </div>
          <h1 style={{ fontSize: '1.85rem', color: 'var(--text-primary)' }}>
            Cooling Strategy Scenario Lab
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
            Experiment with intervention combinations, evaluate trade-offs, and compare customized plans against the AI Optimal Strategy.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <Button
            variant="primary"
            icon={Sparkles}
            onClick={() => navigate('/planner')}
          >
            Launch AI Planner
          </Button>
        </div>
      </div>

      {/* Two Column Grid: Interactive Slider Sandbox + Comparison Visualizer */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 1.3fr',
          gap: 24,
          alignItems: 'start'
        }}
        className="scenarios-grid"
      >
        {/* Left: Custom Scenario Interactive Sandbox */}
        <div className="card-glass" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 12 }}>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>Custom Scenario Sandbox</h3>
            <span style={{ fontSize: '0.72rem', color: 'var(--cyan-400)', fontWeight: 600 }}>
              Live Real-Time Feedback
            </span>
          </div>

          <SliderInput
            label="Urban Trees & Miyawaki Afforestation"
            value={customTrees}
            min={0}
            max={8000}
            step={200}
            unit="Trees"
            onChange={setCustomTrees}
            sublabel="Direct canopy shade + evapotranspiration"
          />

          <SliderInput
            label="High-Albedo Cool Roof Surface"
            value={customCoolRoofs}
            min={0}
            max={40000}
            step={1000}
            unit="m²"
            onChange={setCustomCoolRoofs}
            sublabel="Solar reflectance retrofits on industrial & tin roofs"
          />

          <SliderInput
            label="Vegetated Living Green Roofs"
            value={customGreenRoofs}
            min={0}
            max={5000}
            step={200}
            unit="m²"
            onChange={setCustomGreenRoofs}
            sublabel="Rooftop eco-insulation and stormwater buffer"
          />

          <SliderInput
            label="Permeable Cool Pavements"
            value={customPavements}
            min={0}
            max={10000}
            step={500}
            unit="m²"
            onChange={setCustomPavements}
            sublabel="Porous, light-colored parking & pedestrian grid"
          />

          <SliderInput
            label="Continuous Green Transit Corridor"
            value={customCorridorKm}
            min={0}
            max={4.0}
            step={0.1}
            unit="km"
            onChange={setCustomCorridorKm}
            sublabel="Connected shading ribbon along main arterials"
          />

          <SliderInput
            label="Allocated Scenario Budget"
            value={customBudgetCr}
            min={1.0}
            max={15.0}
            step={0.5}
            unit="Cr"
            onChange={setCustomBudgetCr}
            sublabel="Maximum capital expenditure"
          />

          {/* Live Outcome Box */}
          {customResult && (
            <div
              style={{
                padding: 14,
                borderRadius: 'var(--radius-md)',
                background: 'rgba(6, 182, 212, 0.08)',
                border: '1px solid rgba(6, 182, 212, 0.25)',
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 8,
                textAlign: 'center'
              }}
            >
              <div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Estimated Cooling</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#10b981', fontFamily: 'var(--font-display)' }}>
                  -{customResult.estimatedCoolingC}°C
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>People Benefited</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0891b2', fontFamily: 'var(--font-display)' }}>
                  {customResult.populationBenefited?.toLocaleString()}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Calculated Cost</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#d97706', fontFamily: 'var(--font-display)' }}>
                  ₹{customResult.costCr} Cr
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right: Comparative Table & Radar/Bar Visualizer */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Comparison Table */}
          <div className="card-glass" style={{ padding: 20 }}>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: 12 }}>
              Multi-Strategy Head-to-Head Comparison
            </h3>

            <div className="data-table-wrapper" style={{ border: 'none' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Metric</th>
                    <th>Scenario A (Trees)</th>
                    <th>Scenario B (Cool Roofs)</th>
                    <th>Custom Sandbox</th>
                    <th style={{ color: 'var(--cyan-400)' }}>AI Optimal Plan</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ fontWeight: 600 }}>Estimated Cost</td>
                    <td>₹{scenarioA.costCr} Cr</td>
                    <td>₹{scenarioB.costCr} Cr</td>
                    <td style={{ fontWeight: 700, color: '#d97706' }}>₹{customResult?.costCr} Cr</td>
                    <td style={{ fontWeight: 800, color: 'var(--cyan-400)' }}>₹{aiPlan.costCr} Cr</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 600 }}>Net Temperature Drop</td>
                    <td>-1.0°C</td>
                    <td>-0.8°C</td>
                    <td style={{ fontWeight: 700, color: '#10b981' }}>-{customResult?.estimatedCoolingC}°C</td>
                    <td style={{ fontWeight: 800, color: '#10b981' }}>-{aiPlan.estimatedCoolingC} °C</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 600 }}>Population Benefited</td>
                    <td>19,200</td>
                    <td>25,400</td>
                    <td style={{ fontWeight: 700, color: '#0891b2' }}>{customResult?.populationBenefited?.toLocaleString()}</td>
                    <td style={{ fontWeight: 800, color: '#0891b2' }}>{aiPlan.populationBenefited?.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 600 }}>Water Requirement</td>
                    <td>1.2 ML/day</td>
                    <td>0.4 ML/day</td>
                    <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{customResult?.waterReqMlPerDay} ML/day</td>
                    <td style={{ fontWeight: 800, color: 'var(--cyan-400)' }}>{aiPlan.waterReqMlPerDay} ML/day</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 600 }}>Equity & Inclusivity</td>
                    <td>71 / 100</td>
                    <td>84 / 100</td>
                    <td>{customResult?.equityScore} / 100</td>
                    <td style={{ fontWeight: 800, color: 'var(--cyan-400)' }}>92 / 100</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div
              style={{
                marginTop: 14,
                padding: 10,
                borderRadius: 'var(--radius-sm)',
                background: 'rgba(16, 185, 129, 0.08)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                fontSize: '0.78rem',
                color: '#10b981',
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}
            >
              <Sparkles size={16} />
              <span>
                <strong>Key Takeaway:</strong> The AI-selected hybrid strategy provides the highest estimated thermal relief (-1.4°C) and population reach (31.2k) under the ₹5 Cr municipal constraint.
              </span>
            </div>
          </div>

          {/* Comparison Bar Chart */}
          <div className="card-glass" style={{ padding: 20 }}>
            <h3 style={{ fontSize: '1.05rem', color: 'var(--text-primary)', marginBottom: 12 }}>
              Scenario Performance Profiles
            </h3>

            <div style={{ height: 260, width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
                  <XAxis dataKey="metric" stroke={axisColor} fontSize={11} />
                  <YAxis stroke={axisColor} fontSize={11} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend wrapperStyle={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }} />
                  <Bar dataKey="Scenario A (Trees)" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Scenario B (Cool Roofs)" fill="#38bdf8" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Custom Sandbox" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="AI Optimal Plan" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
