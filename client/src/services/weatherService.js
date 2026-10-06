import { apiClient } from './apiClient';
import { getCityById } from '../data/mockCity';

export const weatherService = {
  async getCurrentWeather(cityId = 'pune') {
    if (apiClient.isMock()) {
      await apiClient.simulateDelay(120);
      const city = getCityById(cityId);
      return city.weather;
    }
    const res = await apiClient.get('/city', { id: cityId });
    return res.data?.weather;
  }
};

export default weatherService;
