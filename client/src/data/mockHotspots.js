export const mockHotspots = [
  {
    id: 'H-017',
    wardNumber: 17,
    name: 'Shivajinagar Central & Deccan Transit Belt',
    shortName: 'Ward 17',
    cityId: 'pune',
    heatRisk: 94,
    riskLevel: 'Critical',
    lstCelsius: 43.7,
    ambientTempCelsius: 40.2,
    population: 24120,
    areaKm2: 2.14,
    vegetationPercent: 8,
    ndvi: 0.08,
    builtUpPercent: 89,
    ndbi: 0.54,
    pavedRoadDensityKmPerKm2: 14.8,
    albedoScore: 0.12,
    vulnerability: 'High',
    priority: 'Critical',
    status: 'Action Required',
    centerCoordinates: [18.5314, 73.8446],
    polygonCoordinates: [
      [18.539, 73.837],
      [18.538, 73.854],
      [18.524, 73.852],
      [18.525, 73.836],
      [18.539, 73.837]
    ],
    explanation: {
      title: 'AI Explainability (SHAP Feature Importance)',
      description: 'Ward 17 suffers from severe thermal trapping due to extreme impervious surface fraction and canyon effect along major transit corridors.',
      factors: [
        { feature: 'Low Vegetation Cover (NDVI < 0.10)', contributionPercent: 34, impact: 'High', color: '#ef4444' },
        { feature: 'High Building Density & Thermal Mass', contributionPercent: 28, impact: 'High', color: '#f97316' },
        { feature: 'Impervious Road & Asphalt Coverage', contributionPercent: 21, impact: 'Moderate-High', color: '#eab308' },
        { feature: 'Historical Heat Retention Anomaly', contributionPercent: 12, impact: 'Moderate', color: '#06b6d4' },
        { feature: 'Anthropogenic Heat (Transit/HVAC)', contributionPercent: 5, impact: 'Low-Moderate', color: '#a855f7' }
      ]
    },
    exposure: {
      totalPopulation: 24120,
      vulnerableSeniorCitizens: 3850,
      childrenUnderFive: 2940,
      outdoorWorkers: 4200,
      schoolsCount: 14,
      hospitalsCount: 6,
      transitHubsCount: 3,
      slumInformalSettlementsPct: 22,
      criticalAssetsAtRisk: ['Shivajinagar ST Bus Terminus', 'Modern College Junction', 'District Court Complex']
    },
    recommendedInterventions: [
      { id: 'int-trees', name: 'Urban Forest Canopy & Street Trees', targetVolume: '3,800 native species', estimatedCooling: '-1.4°C' },
      { id: 'int-cool-roofs', name: 'High-Albedo Cool Roof Coating', targetVolume: '9,500 m² public & residential', estimatedCooling: '-0.9°C' },
      { id: 'int-green-corridors', name: 'JM-FC Road Green Transit Corridor', targetVolume: '1.2 km linear belt', estimatedCooling: '-1.1°C' },
      { id: 'int-cool-pavements', name: 'Permeable Cool Pavement Retooling', targetVolume: '2,400 m²', estimatedCooling: '-0.6°C' }
    ]
  },
  {
    id: 'H-008',
    wardNumber: 8,
    name: 'Hadapsar Industrial & Dense Mixed Zone',
    shortName: 'Ward 08',
    cityId: 'pune',
    heatRisk: 91,
    riskLevel: 'Critical',
    lstCelsius: 42.9,
    ambientTempCelsius: 39.8,
    population: 18420,
    areaKm2: 2.85,
    vegetationPercent: 11,
    ndvi: 0.11,
    builtUpPercent: 85,
    ndbi: 0.49,
    pavedRoadDensityKmPerKm2: 12.2,
    albedoScore: 0.15,
    vulnerability: 'High',
    priority: 'Critical',
    status: 'Action Required',
    centerCoordinates: [18.5089, 73.9259],
    polygonCoordinates: [
      [18.517, 73.915],
      [18.519, 73.938],
      [18.498, 73.936],
      [18.497, 73.916],
      [18.517, 73.915]
    ],
    explanation: {
      title: 'AI Explainability (SHAP Feature Importance)',
      description: 'Industrial metal roofing sheets and high asphalt fraction produce extreme localized surface radiation during afternoon peak hours.',
      factors: [
        { feature: 'Low-Albedo Corrugated Metal Roofs', contributionPercent: 32, impact: 'High', color: '#ef4444' },
        { feature: 'Industrial Waste Heat & HVAC Exhaust', contributionPercent: 27, impact: 'High', color: '#f97316' },
        { feature: 'Deficient Micro-parks & Street Canopy', contributionPercent: 23, impact: 'Moderate-High', color: '#eab308' },
        { feature: 'Wide Unshaded Commercial Corridors', contributionPercent: 14, impact: 'Moderate', color: '#06b6d4' },
        { feature: 'High Soil Dryness (NDWI < -0.2)', contributionPercent: 4, impact: 'Low', color: '#a855f7' }
      ]
    },
    exposure: {
      totalPopulation: 18420,
      vulnerableSeniorCitizens: 2100,
      childrenUnderFive: 2280,
      outdoorWorkers: 6100,
      schoolsCount: 9,
      hospitalsCount: 4,
      transitHubsCount: 2,
      slumInformalSettlementsPct: 31,
      criticalAssetsAtRisk: ['Hadapsar Industrial Estate', 'Gadital Bus Station', 'Sayyed Nagar']
    },
    recommendedInterventions: [
      { id: 'int-cool-roofs', name: 'Industrial Cool Roof Reflective Membranes', targetVolume: '14,000 m²', estimatedCooling: '-1.8°C' },
      { id: 'int-trees', name: 'Perimeter Miyawaki Urban Pocket Forests', targetVolume: '2,600 saplings', estimatedCooling: '-0.8°C' },
      { id: 'int-water-sensitive', name: 'Misting Nodes & Water Refill Pods', targetVolume: '6 transit nodes', estimatedCooling: '-0.5°C' }
    ]
  },
  {
    id: 'H-023',
    wardNumber: 23,
    name: 'Kothrud Commercial Junction & Dense Res',
    shortName: 'Ward 23',
    cityId: 'pune',
    heatRisk: 87,
    riskLevel: 'High',
    lstCelsius: 42.1,
    ambientTempCelsius: 39.1,
    population: 15820,
    areaKm2: 1.95,
    vegetationPercent: 14,
    ndvi: 0.14,
    builtUpPercent: 81,
    ndbi: 0.44,
    pavedRoadDensityKmPerKm2: 13.1,
    albedoScore: 0.16,
    vulnerability: 'Medium',
    priority: 'High',
    status: 'In Review',
    centerCoordinates: [18.5074, 73.8077],
    polygonCoordinates: [
      [18.516, 73.798],
      [18.518, 73.818],
      [18.498, 73.816],
      [18.496, 73.799],
      [18.516, 73.798]
    ],
    explanation: {
      title: 'AI Explainability (SHAP Feature Importance)',
      description: 'Mid-rise urban concrete canyons reduce sky-view factor, preventing nocturnal radiation release.',
      factors: [
        { feature: 'Reduced Sky-View Factor in Residential Canyons', contributionPercent: 30, impact: 'High', color: '#ef4444' },
        { feature: 'Sparse Street Shade Trees along Arterial Roads', contributionPercent: 29, impact: 'High', color: '#f97316' },
        { feature: 'High Density Concrete Pavements', contributionPercent: 22, impact: 'Moderate-High', color: '#eab308' },
        { feature: 'Vehicle Traffic Congestion Heat', contributionPercent: 13, impact: 'Moderate', color: '#06b6d4' },
        { feature: 'Microclimate Boundary Effects', contributionPercent: 6, impact: 'Low', color: '#a855f7' }
      ]
    },
    exposure: {
      totalPopulation: 15820,
      vulnerableSeniorCitizens: 3200,
      childrenUnderFive: 1400,
      outdoorWorkers: 2100,
      schoolsCount: 11,
      hospitalsCount: 5,
      transitHubsCount: 2,
      slumInformalSettlementsPct: 8,
      criticalAssetsAtRisk: ['Karve Statue Square', 'Paud Road Junction', 'City Pride Hub']
    },
    recommendedInterventions: [
      { id: 'int-trees', name: 'Continuous Linear Shading Canopy', targetVolume: '2,200 avenue trees', estimatedCooling: '-1.1°C' },
      { id: 'int-cool-roofs', name: 'Commercial Building Solar-Reflective Paint', targetVolume: '7,800 m²', estimatedCooling: '-0.7°C' },
      { id: 'int-shade-structures', name: 'Solar PV Canopy Transit Shelters', targetVolume: '12 bus stops', estimatedCooling: '-0.4°C' }
    ]
  },
  {
    id: 'H-012',
    wardNumber: 12,
    name: 'Kasba Peth & Shaniwar Peth Heritage Core',
    shortName: 'Ward 12',
    cityId: 'pune',
    heatRisk: 89,
    riskLevel: 'High',
    lstCelsius: 42.5,
    ambientTempCelsius: 39.5,
    population: 29800,
    areaKm2: 1.42,
    vegetationPercent: 5,
    ndvi: 0.05,
    builtUpPercent: 93,
    ndbi: 0.62,
    pavedRoadDensityKmPerKm2: 16.4,
    albedoScore: 0.11,
    vulnerability: 'High',
    priority: 'Critical',
    status: 'Action Required',
    centerCoordinates: [18.5204, 73.8567],
    polygonCoordinates: [
      [18.527, 73.851],
      [18.526, 73.864],
      [18.513, 73.862],
      [18.514, 73.850],
      [18.527, 73.851]
    ],
    explanation: {
      title: 'AI Explainability (SHAP Feature Importance)',
      description: 'Extremely dense old-city fabric with 93% built-up density and virtually no ground space for conventional ground forests.',
      factors: [
        { feature: 'Severe Absence of Open Vegetated Land', contributionPercent: 38, impact: 'Critical', color: '#ef4444' },
        { feature: 'Ultra-Narrow Canyons with Poor Air Flow', contributionPercent: 26, impact: 'High', color: '#f97316' },
        { feature: 'Dark Clay Tile and Bitumen Heat Sinks', contributionPercent: 20, impact: 'Moderate-High', color: '#eab308' },
        { feature: 'High Population Density per Sq Km', contributionPercent: 11, impact: 'Moderate', color: '#06b6d4' },
        { feature: 'Commercial Generator Exhausts', contributionPercent: 5, impact: 'Low', color: '#a855f7' }
      ]
    },
    exposure: {
      totalPopulation: 29800,
      vulnerableSeniorCitizens: 5100,
      childrenUnderFive: 3400,
      outdoorWorkers: 5800,
      schoolsCount: 16,
      hospitalsCount: 7,
      transitHubsCount: 4,
      slumInformalSettlementsPct: 28,
      criticalAssetsAtRisk: ['Shaniwar Wada Historical Precinct', 'Phule Mandai Market', 'Lal Mahal Corridor']
    },
    recommendedInterventions: [
      { id: 'int-cool-roofs', name: 'Rooftop White Albedo & Thermal Insulation', targetVolume: '12,000 m²', estimatedCooling: '-1.3°C' },
      { id: 'int-shade-structures', name: 'Tensile Retractable Canopy for Narrow Streets', targetVolume: '850 m linear', estimatedCooling: '-0.9°C' },
      { id: 'int-green-roofs', name: 'Lightweight Community Vegetated Roofs', targetVolume: '3,200 m²', estimatedCooling: '-0.7°C' }
    ]
  },
  {
    id: 'H-031',
    wardNumber: 31,
    name: 'Viman Nagar & Nagar Road Expressway Belt',
    shortName: 'Ward 31',
    cityId: 'pune',
    heatRisk: 84,
    riskLevel: 'High',
    lstCelsius: 41.6,
    ambientTempCelsius: 38.9,
    population: 21300,
    areaKm2: 3.2,
    vegetationPercent: 16,
    ndvi: 0.16,
    builtUpPercent: 78,
    ndbi: 0.41,
    pavedRoadDensityKmPerKm2: 11.5,
    albedoScore: 0.18,
    vulnerability: 'Medium',
    priority: 'High',
    status: 'Scheduled',
    centerCoordinates: [18.5679, 73.9143],
    polygonCoordinates: [
      [18.579, 73.902],
      [18.577, 73.926],
      [18.555, 73.924],
      [18.556, 73.903],
      [18.579, 73.902]
    ],
    explanation: {
      title: 'AI Explainability (SHAP Feature Importance)',
      description: 'Expansive commercial parking plazas, airport asphalt runoffs, and multi-lane expressway generate substantial thermal plume.',
      factors: [
        { feature: 'Unshaded Asphalt Surface Parking Lots', contributionPercent: 31, impact: 'High', color: '#ef4444' },
        { feature: 'Glass Facade Reflectance & HVAC Output', contributionPercent: 27, impact: 'High', color: '#f97316' },
        { feature: 'Fragmented Tree Canopy Corridors', contributionPercent: 23, impact: 'Moderate-High', color: '#eab308' },
        { feature: 'Fast Vehicular Heat Dissipation', contributionPercent: 14, impact: 'Moderate', color: '#06b6d4' },
        { feature: 'Soil Moisture Evaporation Deficit', contributionPercent: 5, impact: 'Low', color: '#a855f7' }
      ]
    },
    exposure: {
      totalPopulation: 21300,
      vulnerableSeniorCitizens: 2400,
      childrenUnderFive: 1800,
      outdoorWorkers: 3900,
      schoolsCount: 8,
      hospitalsCount: 4,
      transitHubsCount: 3,
      slumInformalSettlementsPct: 14,
      criticalAssetsAtRisk: ['Symbiosis Campus Junction', 'Phoenix Market City Environs', 'Airport Approach Corridor']
    },
    recommendedInterventions: [
      { id: 'int-cool-pavements', name: 'Permeable Gridded Pavers for Parking Plazas', targetVolume: '6,500 m²', estimatedCooling: '-1.0°C' },
      { id: 'int-trees', name: 'Multi-tiered Noise & Thermal Buffer Woodlands', targetVolume: '3,100 trees', estimatedCooling: '-1.2°C' },
      { id: 'int-cool-roofs', name: 'Reflective Coatings on Commercial Warehouses', targetVolume: '8,000 m²', estimatedCooling: '-0.6°C' }
    ]
  },
  {
    id: 'H-005',
    wardNumber: 5,
    name: 'Aundh Residential & University Green Margin',
    shortName: 'Ward 05',
    cityId: 'pune',
    heatRisk: 52,
    riskLevel: 'Moderate',
    lstCelsius: 35.8,
    ambientTempCelsius: 34.6,
    population: 14200,
    areaKm2: 2.7,
    vegetationPercent: 46,
    ndvi: 0.46,
    builtUpPercent: 52,
    ndbi: 0.12,
    pavedRoadDensityKmPerKm2: 8.4,
    albedoScore: 0.24,
    vulnerability: 'Low',
    priority: 'Moderate',
    status: 'Monitored',
    centerCoordinates: [18.5583, 73.8074],
    polygonCoordinates: [
      [18.568, 73.797],
      [18.567, 73.818],
      [18.547, 73.816],
      [18.548, 73.798],
      [18.568, 73.797]
    ],
    explanation: {
      title: 'AI Explainability (SHAP Feature Importance)',
      description: 'Preserved mature tree avenues and proximity to SPPU botanical campus provide natural microclimate buffering.',
      factors: [
        { feature: 'Canopy Evapotranspirative Cooling', contributionPercent: -42, impact: 'Protective', color: '#10b981' },
        { feature: 'Permeable Soils & Open Lawns', contributionPercent: -28, impact: 'Protective', color: '#10b981' },
        { feature: 'Localized Asphalt Corridors', contributionPercent: 18, impact: 'Moderate', color: '#eab308' },
        { feature: 'Low-Rise Residential Spacing', contributionPercent: -12, impact: 'Protective', color: '#06b6d4' }
      ]
    },
    exposure: {
      totalPopulation: 14200,
      vulnerableSeniorCitizens: 2800,
      childrenUnderFive: 1100,
      outdoorWorkers: 1200,
      schoolsCount: 7,
      hospitalsCount: 3,
      transitHubsCount: 1,
      slumInformalSettlementsPct: 4,
      criticalAssetsAtRisk: ['Parihar Chowk', 'Aundh Chest Hospital', 'DAV School Zone']
    },
    recommendedInterventions: [
      { id: 'int-trees', name: 'Canopy Gap Infill Planting', targetVolume: '850 trees', estimatedCooling: '-0.4°C' }
    ]
  },
  {
    id: 'H-019',
    wardNumber: 19,
    name: 'Pashan Lake & Bio-Reserve Buffer',
    shortName: 'Ward 19',
    cityId: 'pune',
    heatRisk: 41,
    riskLevel: 'Low',
    lstCelsius: 33.2,
    ambientTempCelsius: 32.8,
    population: 9400,
    areaKm2: 3.8,
    vegetationPercent: 62,
    ndvi: 0.62,
    builtUpPercent: 38,
    ndbi: -0.05,
    pavedRoadDensityKmPerKm2: 5.2,
    albedoScore: 0.28,
    vulnerability: 'Low',
    priority: 'Low',
    status: 'Baseline Protected',
    centerCoordinates: [18.5362, 73.7842],
    polygonCoordinates: [
      [18.549, 73.771],
      [18.548, 73.795],
      [18.525, 73.793],
      [18.526, 73.772],
      [18.549, 73.771]
    ],
    explanation: {
      title: 'AI Explainability (SHAP Feature Importance)',
      description: 'Wetland evaporative cooling and high biodiversity canopy maintain the city\'s coolest thermal baseline.',
      factors: [
        { feature: 'Water Body Microclimate Moderation', contributionPercent: -50, impact: 'Protective', color: '#10b981' },
        { feature: 'Dense Native Deciduous Forest Cover', contributionPercent: -35, impact: 'Protective', color: '#10b981' },
        { feature: 'Low Building Footprint', contributionPercent: -15, impact: 'Protective', color: '#06b6d4' }
      ]
    },
    exposure: {
      totalPopulation: 9400,
      vulnerableSeniorCitizens: 1200,
      childrenUnderFive: 650,
      outdoorWorkers: 500,
      schoolsCount: 4,
      hospitalsCount: 1,
      transitHubsCount: 1,
      slumInformalSettlementsPct: 2,
      criticalAssetsAtRisk: ['Pashan Wetland Sanctuary', 'ARDE Boundary']
    },
    recommendedInterventions: [
      { id: 'int-water-sensitive', name: 'Wetland Buffer Conservation & Desilting', targetVolume: '1 Lake Environs', estimatedCooling: '-0.3°C' }
    ]
  }
];

export const getHotspotById = (id) => {
  return mockHotspots.find((h) => h.id.toLowerCase() === id.toLowerCase()) || mockHotspots[0];
};
