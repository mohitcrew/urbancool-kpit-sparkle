import { apiClient } from './apiClient';
import { mockAnalyticsData } from '../data/mockAnalytics';

export const analyticsService = {
  async getAnalyticsData() {
    if (apiClient.isMock()) {
      await apiClient.simulateDelay(240);
      return mockAnalyticsData;
    }
    const res = await apiClient.get('/analytics');
    return res.data;
  }
};

export default analyticsService;
