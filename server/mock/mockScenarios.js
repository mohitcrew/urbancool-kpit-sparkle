const mockScenarioPresets = [
  {
    id: 'preset-trees-only',
    name: 'Scenario A: Aggressive Tree Afforestation',
    description: 'Prioritizes maximum tree plantation & Miyawaki forests along road avenues and parks.',
    inputs: {
      treeCount: 5200,
      coolRoofsM2: 2000,
      greenRoofsM2: 0,
      coolPavementM2: 1000,
      greenCorridorKm: 0.4,
      shadeStructuresM2: 200,
      mistingNodes: 2,
      budgetCr: 5.0,
      waterAvailability: 'Medium'
    },
    results: {
      costCr: 5.0,
      estimatedCoolingC: 1.0,
      populationBenefited: 19200,
      waterReqMlPerDay: 1.2,
      implementationMonths: 18,
      equityScore: 71,
      carbonOffsetTonnes: 114,
      confidenceScorePct: 81
    }
  },
  {
    id: 'preset-coolroofs-only',
    name: 'Scenario B: Fast Cool Roof Coating Surge',
    description: 'Prioritizes low-cost, zero-ground footprint solar-reflective coating on municipal and residential roofs.',
    inputs: {
      treeCount: 800,
      coolRoofsM2: 32000,
      greenRoofsM2: 0,
      coolPavementM2: 1200,
      greenCorridorKm: 0.0,
      shadeStructuresM2: 600,
      mistingNodes: 4,
      budgetCr: 5.0,
      waterAvailability: 'Low'
    },
    results: {
      costCr: 5.0,
      estimatedCoolingC: 0.8,
      populationBenefited: 25400,
      waterReqMlPerDay: 0.4,
      implementationMonths: 4,
      equityScore: 84,
      carbonOffsetTonnes: 48,
      confidenceScorePct: 89
    }
  },
  {
    id: 'preset-ai-optimal',
    name: 'AI Optimal Multi-Objective Plan',
    description: 'Pareto-optimal hybrid combining deep canopy shade, rapid cool roofs, transit corridors, and cool pavements.',
    inputs: {
      treeCount: 3800,
      coolRoofsM2: 9500,
      greenRoofsM2: 1200,
      coolPavementM2: 2400,
      greenCorridorKm: 1.2,
      shadeStructuresM2: 850,
      mistingNodes: 6,
      budgetCr: 4.78,
      waterAvailability: 'Medium (STP Treated)'
    },
    results: {
      costCr: 4.78,
      estimatedCoolingC: 1.4,
      populationBenefited: 31200,
      waterReqMlPerDay: 1.6,
      implementationMonths: 10,
      equityScore: 92,
      carbonOffsetTonnes: 142,
      confidenceScorePct: 84
    }
  }
];

function calculateScenarioImpact(inputs = {}) {
  const {
    treeCount = 2000,
    coolRoofsM2 = 5000,
    greenRoofsM2 = 500,
    coolPavementM2 = 1000,
    greenCorridorKm = 0.5,
    shadeStructuresM2 = 400,
    mistingNodes = 2,
    budgetCr = 5.0
  } = inputs;

  const treeCost = (treeCount * 2200) / 10000000;
  const coolRoofCost = (coolRoofsM2 * 320) / 10000000;
  const greenRoofCost = (greenRoofsM2 * 3400) / 10000000;
  const pavementCost = (coolPavementM2 * 1100) / 10000000;
  const corridorCost = greenCorridorKm * 0.85;
  const shadeCost = (shadeStructuresM2 * 4500) / 10000000;
  const mistingCost = mistingNodes * 0.065;

  const totalCalculatedCostCr = Number((treeCost + coolRoofCost + greenRoofCost + pavementCost + corridorCost + shadeCost + mistingCost).toFixed(2));

  const treeCooling = (treeCount / 4000) * 0.65;
  const coolRoofCooling = (coolRoofsM2 / 12000) * 0.45;
  const greenRoofCooling = (greenRoofsM2 / 3000) * 0.25;
  const pavementCooling = (coolPavementM2 / 4000) * 0.20;
  const corridorCooling = (greenCorridorKm / 1.5) * 0.40;
  const shadeCooling = (shadeStructuresM2 / 1000) * 0.15;
  const mistingCooling = (mistingNodes / 8) * 0.25;

  const rawCooling = treeCooling + coolRoofCooling + greenRoofCooling + pavementCooling + corridorCooling + shadeCooling + mistingCooling;
  const estimatedCoolingC = Number((Math.min(2.8, rawCooling * 0.92)).toFixed(2));

  const popFromCoolRoofs = (coolRoofsM2 / 10) * 1.4;
  const popFromTrees = treeCount * 3.2;
  const popFromCorridor = greenCorridorKm * 8500;
  const popFromPavementAndShade = (coolPavementM2 + shadeStructuresM2) * 2.5;
  const popFromMisting = mistingNodes * 1800;
  const populationBenefited = Math.round(popFromCoolRoofs + popFromTrees + popFromCorridor + popFromPavementAndShade + popFromMisting);

  const treeWaterLiters = treeCount * 18;
  const greenRoofWaterLiters = greenRoofsM2 * 6;
  const mistingWaterLiters = mistingNodes * 1600;
  const corridorWaterLiters = greenCorridorKm * 28000;
  const totalWaterLiters = treeWaterLiters + greenRoofWaterLiters + mistingWaterLiters + corridorWaterLiters;
  const waterReqMlPerDay = Number((totalWaterLiters / 1000000).toFixed(2));

  const budgetUtilizationPct = Math.min(100, Math.round((totalCalculatedCostCr / budgetCr) * 100));
  const confidenceScorePct = Math.round(80 + Math.min(15, (populationBenefited / 30000) * 8));

  return {
    costCr: totalCalculatedCostCr,
    budgetCr,
    budgetUtilizationPct,
    estimatedCoolingC: Math.max(0.1, estimatedCoolingC),
    populationBenefited: Math.max(100, populationBenefited),
    waterReqMlPerDay: Math.max(0.1, waterReqMlPerDay),
    confidenceScorePct: Math.min(95, confidenceScorePct),
    equityScore: Math.min(98, Math.round(65 + (coolRoofsM2 / 300) + (treeCount / 150))),
    carbonOffsetTonnes: Math.round(treeCount * 0.022 + greenCorridorKm * 18.5 + (coolRoofsM2 / 100) * 0.015)
  };
}

module.exports = { mockScenarioPresets, calculateScenarioImpact };
