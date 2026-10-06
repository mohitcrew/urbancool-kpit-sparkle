export const mockAnalyticsData = {
  heatTrend: [
    { year: '2019', avgLST: 37.2, peakLST: 41.1, heatwaveDays: 8, baseline: 36.5 },
    { year: '2020', avgLST: 37.6, peakLST: 41.5, heatwaveDays: 11, baseline: 36.5 },
    { year: '2021', avgLST: 38.1, peakLST: 42.0, heatwaveDays: 14, baseline: 36.5 },
    { year: '2022', avgLST: 38.7, peakLST: 42.8, heatwaveDays: 19, baseline: 36.5 },
    { year: '2023', avgLST: 39.0, peakLST: 43.2, heatwaveDays: 22, baseline: 36.5 },
    { year: '2024', avgLST: 39.4, peakLST: 43.7, heatwaveDays: 27, baseline: 36.5 }
  ],
  diurnalCycle: [
    { time: '00:00', ambientTemp: 28.2, surfaceLST: 29.1, mitigatedLST: 27.8 },
    { time: '03:00', ambientTemp: 26.5, surfaceLST: 27.2, mitigatedLST: 26.0 },
    { time: '06:00', ambientTemp: 25.8, surfaceLST: 26.4, mitigatedLST: 25.5 },
    { time: '09:00', ambientTemp: 32.4, surfaceLST: 35.8, mitigatedLST: 33.6 },
    { time: '12:00', ambientTemp: 38.6, surfaceLST: 44.2, mitigatedLST: 41.1 },
    { time: '14:30', ambientTemp: 40.2, surfaceLST: 47.6, mitigatedLST: 43.4 },
    { time: '17:00', ambientTemp: 37.8, surfaceLST: 41.5, mitigatedLST: 38.7 },
    { time: '20:00', ambientTemp: 33.1, surfaceLST: 35.2, mitigatedLST: 32.9 },
    { time: '23:00', ambientTemp: 29.8, surfaceLST: 31.0, mitigatedLST: 29.2 }
  ],
  hotspotsByWard: [
    { ward: 'Ward 17 (Shivajinagar)', riskScore: 94, popExposed: 24120, avgLST: 43.7 },
    { ward: 'Ward 08 (Hadapsar)', riskScore: 91, popExposed: 18420, avgLST: 42.9 },
    { ward: 'Ward 12 (Kasba Peth)', riskScore: 89, popExposed: 29800, avgLST: 42.5 },
    { ward: 'Ward 23 (Kothrud)', riskScore: 87, popExposed: 15820, avgLST: 42.1 },
    { ward: 'Ward 31 (Viman Nagar)', riskScore: 84, popExposed: 21300, avgLST: 41.6 },
    { ward: 'Ward 04 (Yerwada)', riskScore: 82, popExposed: 26500, avgLST: 41.2 },
    { ward: 'Ward 15 (Bhavani Peth)', riskScore: 80, popExposed: 22100, avgLST: 40.8 }
  ],
  populationExposureDemographics: [
    { group: 'Senior Citizens (60+)', population: 38500, riskShare: 21, color: '#ef4444' },
    { group: 'Children Under 5', population: 26800, riskShare: 15, color: '#f97316' },
    { group: 'Outdoor & Gig Workers', population: 54200, riskShare: 29, color: '#eab308' },
    { group: 'Informal/Slum Dwellers', population: 43600, riskShare: 24, color: '#a855f7' },
    { group: 'General Indoor Population', population: 21100, riskShare: 11, color: '#06b6d4' }
  ],
  vegetationVsTempScatter: [
    { ndvi: 0.05, lst: 44.5, ward: 'Kasba Peth' },
    { ndvi: 0.08, lst: 43.7, ward: 'Shivajinagar' },
    { ndvi: 0.11, lst: 42.9, ward: 'Hadapsar' },
    { ndvi: 0.14, lst: 42.1, ward: 'Kothrud' },
    { ndvi: 0.16, lst: 41.6, ward: 'Viman Nagar' },
    { ndvi: 0.28, lst: 38.4, ward: 'Kalyani Nagar' },
    { ndvi: 0.35, lst: 37.1, ward: 'Baner Hills' },
    { ndvi: 0.46, lst: 35.8, ward: 'Aundh' },
    { ndvi: 0.62, lst: 33.2, ward: 'Pashan Lake' }
  ],
  interventionBudgetSplit: [
    { name: 'Urban Trees & Miyawaki', share: 32, valueCr: 1.53, color: '#10b981' },
    { name: 'Cool Roofs Program', share: 24, valueCr: 1.15, color: '#38bdf8' },
    { name: 'Green Corridors', share: 20, valueCr: 0.96, color: '#34d399' },
    { name: 'Cool Pavements', share: 12, valueCr: 0.57, color: '#f59e0b' },
    { name: 'Shade & Solar Canopies', share: 8, valueCr: 0.38, color: '#818cf8' },
    { name: 'Misting Nodes & Water', share: 4, valueCr: 0.19, color: '#06b6d4' }
  ],
  coolingImpactComparison: [
    { metric: 'Peak Surface LST', before: 43.7, after: 39.6, unit: '°C' },
    { metric: 'Ambient Air Temp', before: 40.2, after: 38.8, unit: '°C' },
    { metric: 'High Risk Pop Exposed', before: 184200, after: 86400, unit: 'People' },
    { metric: 'Canopy Density', before: 11.8, after: 22.4, unit: '%' },
    { metric: 'HVAC Energy Load', before: 100, after: 78.5, unit: 'Index' },
    { metric: 'Physiological Strain (PET)', before: 48.5, after: 41.2, unit: '°C' }
  ]
};
