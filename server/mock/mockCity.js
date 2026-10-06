const mockCities = [
  {
    id: 'pune',
    name: 'Pune',
    state: 'Maharashtra',
    country: 'India',
    coordinates: [18.5204, 73.8567],
    defaultZoom: 13,
    population: '3,124,458',
    totalAreaKm2: '331.2',
    adminBody: 'Pune Municipal Corporation (PMC)',
    climateZone: 'Semi-arid / Tropical Wet & Dry (Köppen: Aw/BSh)',
    elevationMeters: 560,
    activeHeatSeason: 'March – June',
    currentSeasonStatus: 'Peak Heat Alert Phase 2',
    currency: 'INR',
    currencySymbol: '₹',
    weather: {
      ambientTemp: '39.8°C',
      feelsLike: '42.4°C',
      humidity: '34%',
      windSpeed: '12 km/h WNW',
      solarRadiation: '920 W/m²',
      uvIndex: '9.4 (Extreme)',
      heatIndex: 'Extreme Caution',
      lastUpdated: '10 mins ago (IMD Pune)'
    },
    metrics: {
      cityHeatRiskIndex: 78,
      riskTrend: '+8.2%',
      activeHotspotsCount: 24,
      hotspotTrend: '+4 this week',
      populationExposed: 184200,
      exposedTrend: '14.2% of urban core',
      averageLST: '39.4°C',
      lstTrend: '+1.3°C vs 5-yr baseline',
      treeCanopyCover: '11.8%',
      targetCanopyCover: '25.0%',
      pavedSurfaceRatio: '68.4%'
    }
  },
  {
    id: 'ahmedabad',
    name: 'Ahmedabad',
    state: 'Gujarat',
    country: 'India',
    coordinates: [23.0225, 72.5714],
    defaultZoom: 13,
    population: '5,570,585',
    totalAreaKm2: '464.1',
    adminBody: 'Ahmedabad Municipal Corporation (AMC)',
    climateZone: 'Hot Semi-Arid (Köppen: BSh)',
    elevationMeters: 53,
    activeHeatSeason: 'April – June',
    currentSeasonStatus: 'Heat Action Plan Red Stage',
    currency: 'INR',
    currencySymbol: '₹',
    weather: {
      ambientTemp: '42.6°C',
      feelsLike: '45.1°C',
      humidity: '28%',
      windSpeed: '15 km/h NW',
      solarRadiation: '965 W/m²',
      uvIndex: '10.8 (Extreme)',
      heatIndex: 'Danger',
      lastUpdated: '5 mins ago (IMD Ahmedabad)'
    },
    metrics: {
      cityHeatRiskIndex: 84,
      riskTrend: '+11.5%',
      activeHotspotsCount: 38,
      hotspotTrend: '+7 this week',
      populationExposed: 320400,
      exposedTrend: '19.8% of urban core',
      averageLST: '42.1°C',
      lstTrend: '+2.1°C vs 5-yr baseline',
      treeCanopyCover: '8.4%',
      targetCanopyCover: '20.0%',
      pavedSurfaceRatio: '74.2%'
    }
  }
];

const getCityById = (id = 'pune') => {
  return mockCities.find((c) => c.id.toLowerCase() === id.toLowerCase()) || mockCities[0];
};

module.exports = { mockCities, getCityById };
