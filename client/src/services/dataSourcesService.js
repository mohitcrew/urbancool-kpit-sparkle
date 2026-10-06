import { apiClient } from './apiClient';
import { mockDataSources } from '../data/mockDataSources';

export const dataSourcesService = {
  async getDataSources() {
    if (apiClient.isMock()) {
      await apiClient.simulateDelay(180);
      return mockDataSources;
    }
    const res = await apiClient.get('/data-sources');
    return res.data;
  }
};

export default dataSourcesService;
