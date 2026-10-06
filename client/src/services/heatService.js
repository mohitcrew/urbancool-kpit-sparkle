import { apiClient } from './apiClient';
import { mockCities, getCityById } from '../data/mockCity';
import { mockHotspots } from '../data/mockHotspots';

export const heatService = {
  async getCity(cityId = 'pune') {
    if (apiClient.isMock()) {
      await apiClient.simulateDelay(180);
      return getCityById(cityId);
    }
    const res = await apiClient.get('/city', { id: cityId });
    return res.data;
  },

  async getAllCities() {
    if (apiClient.isMock()) {
      await apiClient.simulateDelay(100);
      return mockCities.map((c) => ({ id: c.id, name: c.name, state: c.state }));
    }
    const res = await apiClient.get('/city');
    return res.allCities || mockCities;
  },

  async getHeatMapData(params = {}) {
    const { cityId = 'pune', layer = 'heatRisk', time = 'current' } = params;
    if (apiClient.isMock()) {
      await apiClient.simulateDelay(200);
      const filtered = mockHotspots.filter((h) => !h.cityId || h.cityId === cityId);
      return {
        cityId,
        layer,
        time,
        hotspots: filtered,
        timestamp: new Date().toISOString()
      };
    }
    const res = await apiClient.get('/heatmap', params);
    return res.data;
  }
};

export default heatService;
