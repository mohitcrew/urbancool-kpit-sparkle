import { apiClient } from './apiClient';
import { mockHotspots, getHotspotById } from '../data/mockHotspots';

export const hotspotService = {
  async getHotspots(params = {}) {
    const { cityId = 'pune', priority, riskLevel, search } = params;

    if (apiClient.isMock()) {
      await apiClient.simulateDelay(220);
      let results = mockHotspots.filter((h) => !h.cityId || h.cityId === cityId);

      if (priority && priority !== 'all') {
        results = results.filter((h) => h.priority.toLowerCase() === priority.toLowerCase());
      }
      if (riskLevel && riskLevel !== 'all') {
        results = results.filter((h) => h.riskLevel.toLowerCase() === riskLevel.toLowerCase());
      }
      if (search) {
        const q = search.toLowerCase();
        results = results.filter(
          (h) =>
            h.name.toLowerCase().includes(q) ||
            h.shortName.toLowerCase().includes(q) ||
            h.id.toLowerCase().includes(q)
        );
      }
      return results;
    }

    const res = await apiClient.get('/hotspots', params);
    return res.data;
  },

  async getHotspotById(id) {
    if (apiClient.isMock()) {
      await apiClient.simulateDelay(180);
      const hotspot = getHotspotById(id);
      if (!hotspot) {
        throw new Error(`Hotspot with ID ${id} not found`);
      }
      return hotspot;
    }

    const res = await apiClient.get(`/hotspots/${id}`);
    return res.data;
  }
};

export default hotspotService;
