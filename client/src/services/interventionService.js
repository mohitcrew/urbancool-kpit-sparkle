import { apiClient } from './apiClient';
import { mockInterventions, getInterventionById } from '../data/mockInterventions';

export const interventionService = {
  async getAllInterventions() {
    if (apiClient.isMock()) {
      await apiClient.simulateDelay(180);
      return mockInterventions;
    }
    const res = await apiClient.get('/interventions');
    return res.data;
  },

  async getInterventionById(id) {
    if (apiClient.isMock()) {
      await apiClient.simulateDelay(120);
      return getInterventionById(id);
    }
    const res = await apiClient.get(`/interventions/${id}`);
    return res.data;
  }
};

export default interventionService;
