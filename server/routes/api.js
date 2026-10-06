const express = require('express');
const router = express.Router();
const {
  mockCities,
  getCityById,
  mockHotspots,
  getHotspotById,
  mockInterventions,
  getInterventionById,
  mockScenarioPresets,
  calculateScenarioImpact,
  mockAnalyticsData,
  mockAIKnowledgeBase,
  mockDefaultPrompts,
  mockDataSources
} = require('../mock');

// Health
router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    platform: 'UrbanCool AI Decision Support Platform',
    version: '1.0.0',
    mode: 'Demonstration / Prototype API',
    timestamp: new Date().toISOString()
  });
});

// City
router.get('/city', (req, res) => {
  const cityId = req.query.id || 'pune';
  const city = getCityById(cityId);
  res.json({ success: true, data: city, allCities: mockCities.map(c => ({ id: c.id, name: c.name, state: c.state })) });
});

// Heatmap / Geo Layers
router.get('/heatmap', (req, res) => {
  const cityId = req.query.cityId || 'pune';
  const layer = req.query.layer || 'heatRisk';
  const time = req.query.time || 'current';
  
  const hotspots = mockHotspots.filter(h => !h.cityId || h.cityId === cityId);
  res.json({
    success: true,
    data: {
      cityId,
      layer,
      time,
      hotspots,
      timestamp: new Date().toISOString()
    }
  });
});

// Hotspots
router.get('/hotspots', (req, res) => {
  const { cityId = 'pune', priority, riskLevel, search } = req.query;
  let results = mockHotspots.filter(h => !h.cityId || h.cityId === cityId);
  
  if (priority && priority !== 'all') {
    results = results.filter(h => h.priority.toLowerCase() === priority.toLowerCase());
  }
  if (riskLevel && riskLevel !== 'all') {
    results = results.filter(h => h.riskLevel.toLowerCase() === riskLevel.toLowerCase());
  }
  if (search) {
    const q = search.toLowerCase();
    results = results.filter(h => 
      h.name.toLowerCase().includes(q) || 
      h.shortName.toLowerCase().includes(q) || 
      h.id.toLowerCase().includes(q)
    );
  }
  
  res.json({ success: true, total: results.length, data: results });
});

router.get('/hotspots/:id', (req, res) => {
  const hotspot = getHotspotById(req.params.id);
  if (!hotspot) {
    return res.status(404).json({ success: false, message: 'Hotspot not found' });
  }
  res.json({ success: true, data: hotspot });
});

// Interventions
router.get('/interventions', (req, res) => {
  res.json({ success: true, total: mockInterventions.length, data: mockInterventions });
});

router.get('/interventions/:id', (req, res) => {
  const item = getInterventionById(req.params.id);
  res.json({ success: true, data: item });
});

// Planner / Optimize
router.post('/planner/optimize', (req, res) => {
  const {
    wardId = 'H-017',
    budgetCr = 5.0,
    waterConstraint = 'Medium',
    landConstraint = 'Medium',
    planningPriority = 'Maximum Population Benefit',
    timeHorizon = '12 months'
  } = req.body;

  // Multi-objective optimization simulation
  const multiplier = budgetCr / 5.0;
  const trees = Math.round(3800 * (planningPriority.includes('Equity') ? 1.2 : multiplier));
  const coolRoofs = Math.round(9500 * (planningPriority.includes('Maximum Cooling') ? 1.4 : multiplier));
  const greenRoofs = Math.round(1200 * (planningPriority.includes('Minimum Cost') ? 0.3 : multiplier * 0.8));
  const pavement = Math.round(2400 * multiplier);
  const corridorKm = Number((1.2 * (planningPriority.includes('Equity') ? 1.3 : multiplier)).toFixed(1));
  const shadeM2 = Math.round(850 * multiplier);
  const misting = Math.round(6 * multiplier);

  const simulation = calculateScenarioImpact({
    treeCount: trees,
    coolRoofsM2: coolRoofs,
    greenRoofsM2: greenRoofs,
    coolPavementM2: pavement,
    greenCorridorKm: corridorKm,
    shadeStructuresM2: shadeM2,
    mistingNodes: misting,
    budgetCr: Number(budgetCr)
  });

  res.json({
    success: true,
    data: {
      planId: `PLAN-OPT-${Date.now()}`,
      wardId,
      planningPriority,
      budgetCr: Number(budgetCr),
      timeHorizon,
      isEstimated: true,
      optimalInterventions: [
        { id: 'int-trees', name: 'Urban Forest Canopy & Street Trees', quantity: `${trees.toLocaleString()} trees`, metric: `${trees} trees`, costCr: (trees * 2200) / 10000000 },
        { id: 'int-cool-roofs', name: 'High-Albedo Cool Roof Coating', quantity: `${coolRoofs.toLocaleString()} m²`, metric: `${coolRoofs} m²`, costCr: (coolRoofs * 320) / 10000000 },
        { id: 'int-green-corridors', name: 'JM-FC Green Transit Corridor', quantity: `${corridorKm} km`, metric: `${corridorKm} km`, costCr: corridorKm * 0.85 },
        { id: 'int-cool-pavements', name: 'Permeable Cool Pavements', quantity: `${pavement.toLocaleString()} m²`, metric: `${pavement} m²`, costCr: (pavement * 1100) / 10000000 },
        { id: 'int-shade-structures', name: 'Solar PV Transit Shelters', quantity: `${shadeM2} m²`, metric: `${shadeM2} m²`, costCr: (shadeM2 * 4500) / 10000000 },
        { id: 'int-water-sensitive', name: 'Smart Evaporative Misting Pods', quantity: `${misting} stations`, metric: `${misting} pods`, costCr: misting * 0.065 }
      ],
      impact: simulation,
      aiRecommendationNotes: `The AI Multi-Objective Optimizer converged on a Pareto-efficient combination prioritizing rapid high-albedo roof relief and canopy corridors under the ₹${budgetCr} Cr fiscal ceiling.`
    }
  });
});

// Scenarios / Simulate
router.post('/scenarios/simulate', (req, res) => {
  const inputs = req.body;
  const results = calculateScenarioImpact(inputs);
  res.json({ success: true, data: { inputs, results, presets: mockScenarioPresets } });
});

router.get('/scenarios/presets', (req, res) => {
  res.json({ success: true, data: mockScenarioPresets });
});

// Analytics
router.get('/analytics', (req, res) => {
  res.json({ success: true, data: mockAnalyticsData });
});

// AI Chat
router.post('/ai/chat', (req, res) => {
  const { message = '' } = req.body;
  const clean = message.toLowerCase();
  
  let match = mockAIKnowledgeBase.find(kb => 
    kb.patterns.some(pat => clean.includes(pat))
  );

  const replyText = match 
    ? match.response 
    : `UrbanCool AI Analysis for your query: "${message}"\n\nBased on satellite thermal imagery (Landsat-9 / Sentinel-2) and IMD meteorological stations, urban cooling optimization in dense wards requires balancing high-albedo cool roofs for instantaneous surface reflection with nature-based urban canopies for long-term evapotranspiration.\n\nYou can configure custom constraints in the **AI Cooling Planner** or simulate custom variations in the **Scenario Lab**.`;

  res.json({
    success: true,
    data: {
      query: message,
      response: replyText,
      confidence: 0.94,
      model: 'UrbanCool-HybridReasoner-v1.4 (Simulated)',
      timestamp: new Date().toISOString()
    }
  });
});

// Data Sources
router.get('/data-sources', (req, res) => {
  res.json({ success: true, total: mockDataSources.length, data: mockDataSources });
});

module.exports = router;
