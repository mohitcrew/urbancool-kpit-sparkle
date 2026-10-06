// Centralized API Client Abstraction
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';
const IS_MOCK_MODE = import.meta.env.VITE_MOCK_MODE !== 'false';

class ApiClient {
  constructor() {
    this.baseUrl = API_BASE_URL;
    this.mockMode = IS_MOCK_MODE;
  }

  setMockMode(enabled) {
    this.mockMode = Boolean(enabled);
  }

  isMock() {
    return this.mockMode;
  }

  // Helper to simulate realistic async network delay
  async simulateDelay(ms = 220) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async get(endpoint, params = {}) {
    if (this.mockMode) {
      await this.simulateDelay();
      return { mock: true, endpoint, params };
    }

    const query = new URLSearchParams(params).toString();
    const url = `${this.baseUrl}${endpoint}${query ? `?${query}` : ''}`;

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    if (!res.ok) {
      throw new Error(`API GET Error: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  }

  async post(endpoint, data = {}) {
    if (this.mockMode) {
      await this.simulateDelay();
      return { mock: true, endpoint, data };
    }

    const url = `${this.baseUrl}${endpoint}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      throw new Error(`API POST Error: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  }
}

export const apiClient = new ApiClient();
export default apiClient;
