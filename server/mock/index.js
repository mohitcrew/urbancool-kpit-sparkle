const { mockCities, getCityById } = require('./mockCity');
const { mockHotspots, getHotspotById } = require('./mockHotspots');
const { mockInterventions, getInterventionById } = require('./mockInterventions');
const { mockScenarioPresets, calculateScenarioImpact } = require('./mockScenarios');
const { mockAnalyticsData } = require('./mockAnalytics');
const { mockAIKnowledgeBase, mockDefaultPrompts } = require('./mockAIResponses');
const { mockDataSources } = require('./mockDataSources');

module.exports = {
  mockCities,
  getCityById,
  mockHotspots,
  getHotspotById,
  mockInterventions,
  getInterventionById,
  mockScenarioPresets,
  calculateScenarioImpact,
  mockAnalyticsData,
  mockAIKnowledgeBase,
  mockDefaultPrompts,
  mockDataSources
};
