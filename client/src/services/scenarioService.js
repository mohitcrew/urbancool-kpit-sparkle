import { apiClient } from './apiClient';
import { mockScenarioPresets, calculateScenarioImpact } from '../data/mockScenarios';

export const scenarioService = {
  async getPresets() {
    if (apiClient.isMock()) {
      await apiClient.simulateDelay(150);
      return mockScenarioPresets;
    }
    const res = await apiClient.get('/scenarios/presets');
    return res.data;
  },

  async simulateScenario(inputs) {
    if (apiClient.isMock()) {
      await apiClient.simulateDelay(250);
      const results = calculateScenarioImpact(inputs);
      return {
        inputs,
        results
      };
    }
    const res = await apiClient.post('/scenarios/simulate', inputs);
    return res.data;
  }
};

export default scenarioService;
