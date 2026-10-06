import { apiClient } from './apiClient';
import { mockAIKnowledgeBase, mockDefaultPrompts } from '../data/mockAIResponses';

export const aiService = {
  getDefaultPrompts() {
    return mockDefaultPrompts;
  },

  async ask(message) {
    if (apiClient.isMock()) {
      await apiClient.simulateDelay(450); // Simulate realistic LLM thinking & synthesis time

      const clean = (message || '').toLowerCase();
      const match = mockAIKnowledgeBase.find((kb) =>
        kb.patterns.some((pat) => clean.includes(pat))
      );

      const replyText = match
        ? match.response
        : `UrbanCool AI Analysis for: "${message}"\n\nBased on satellite thermal imagery (Landsat-9 / Sentinel-2) and IMD meteorological sensors, cooling optimization in dense urban zones requires balancing high-albedo cool roofs for instantaneous surface reflection with nature-based urban canopies for long-term evapotranspiration.\n\nYou can customize budget constraints in the **AI Cooling Planner** or compare multi-intervention trade-offs in the **Scenario Lab**.`;

      return {
        query: message,
        response: replyText,
        confidence: 0.94,
        model: 'UrbanCool-HybridReasoner-v1.4 (Simulated)',
        timestamp: new Date().toISOString()
      };
    }

    const res = await apiClient.post('/ai/chat', { message });
    return res.data;
  }
};

export default aiService;
