import { apiClient } from './apiClient';
import { calculateScenarioImpact } from '../data/mockScenarios';

export const plannerService = {
  async optimizePlan(params) {
    const {
      wardId = 'H-017',
      budgetCr = 5.0,
      waterConstraint = 'Medium',
      landConstraint = 'Medium',
      planningPriority = 'Maximum Population Benefit',
      timeHorizon = '12 months'
    } = params;

    if (apiClient.isMock()) {
      await apiClient.simulateDelay(650); // Simulate multi-objective AI optimization computation

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

      return {
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
      };
    }

    const res = await apiClient.post('/planner/optimize', params);
    return res.data;
  }
};

export default plannerService;
