export const mockAIKnowledgeBase = [
  {
    patterns: ['ward 17', 'why is ward 17', 'shivajinagar', 'high risk'],
    response: `**Ward 17 (Shivajinagar Central & Deccan Transit Belt)** exhibits a critical Heat Risk score of **94/100** with peak Land Surface Temperatures reaching **43.7°C**.\n\n### Primary Root Causes (AI Feature Importance):
1. **Low Vegetation Cover (34% contribution):** NDVI is critically low at 0.08, leaving asphalt surfaces directly exposed to solar radiation.
2. **High Building Density & Thermal Mass (28%):** Heavy concrete multistory clusters trap daytime radiation (canyon effect).
3. **Impervious Surface Ratio (21%):** High concentration of paved roads (14.8 km/km²) and parking lots.
4. **Anthropogenic & Transit Heat (12%):** Heavy vehicular congestion through ST Bus Stand and JM-FC corridors.

### AI Recommended Interventions:
- Deploy **3,800 street trees** along arterial avenues.
- Apply **9,500 m² high-albedo cool roof coatings** on government and commercial buildings.
- Establish a **1.2 km green corridor** along river-adjacent connecting lanes.`
  },
  {
    patterns: ['what should we do', 'recommendations', 'budget', 'strategy', 'how to mitigate'],
    response: `Under an allocated municipal budget of **₹5.0 Crore**, UrbanCool AI recommends a **Multi-Tiered Hybrid Cooling Strategy**:

1. **Immediate High-Speed Relief (Phase 1, Months 1–3):**
   - Apply **Cool Roof Reflective Coatings (9,500 m²)** across informal settlements and schools (Estimated cost: ₹30.4 Lakhs, provides immediate -2.5°C surface relief).
   - Install **6 Smart Evaporative Misting Pods** at major public transit interchanges.

2. **Long-Term Microclimate Transformation (Phase 2, Months 4–12):**
   - Plant **3,800 Native Miyawaki & Avenue Canopy Trees** (Neem, Peepal, Gulmohar, Karanj).
   - Retool **2,400 m² of parking lots** with permeable, high-albedo interlocking cool pavements.
   - Develop **1.2 km continuous Green Shaded Corridor**.

**Expected City Impact:** **-1.4°C net ambient cooling**, benefiting **31,200 exposed citizens**.`
  },
  {
    patterns: ['cool roofs vs green roofs', 'cool roof', 'green roof', 'difference'],
    response: `### Comparison: Cool Roofs vs. Green Roofs

| Feature | Cool Roofs (High Albedo) | Green Roofs (Vegetated) |
| :--- | :--- | :--- |
| **Capital Cost** | ₹220 – ₹380 / m² | ₹2,400 – ₹4,200 / m² |
| **Installation Speed** | 1 – 2 weeks | 3 – 6 weeks |
| **Water Demand** | Zero | 4 – 8 L/m²/day |
| **Structural Requirement** | Works on existing roofs | Requires load-bearing slab (>150 kg/m²) |
| **Cooling Mechanism** | Reflects 85%+ solar radiation (SRI > 104) | Evapotranspiration + thermal insulation |
| **Co-Benefits** | Fast energy savings | Biodiversity, stormwater retention, recreation |

**AI Policy Guidance:** For dense, budget-constrained municipal zones with low structural capacity (e.g., Ward 12 & Ward 17), prioritize **Cool Roofs**. Reserve **Green Roofs** for certified institutional and commercial civic structures.`
  },
  {
    patterns: ['water', 'water constraint', 'drought'],
    response: `UrbanCool AI incorporates a **Strict Water-Sensitive Urban Design (WSUD) Module**:

- Tree species recommended (e.g. *Azadirachta indica*, *Pongamia pinnata*, *Ficus religiosa*) are drought-resilient native species requiring water only during the initial 18–24 months.
- Misting nodes and green corridors are engineered to utilize **100% tertiary-treated effluent from municipal Sewage Treatment Plants (STP)** rather than potable freshwater.
- Cool pavements and permeable surfaces actively recharge local unconfined aquifers during monsoon rainfall.`
  },
  {
    patterns: ['ahmedabad', 'heat action plan', 'amc'],
    response: `In Ahmedabad, UrbanCool AI integrates directly with the **Ahmedabad Heat Action Plan (HAP)** framework:
- Red Alert threshold: > 45°C ambient temperature.
- Focus areas: Dense western industrial zones (Naroda, Odhav) and historic walled city clusters.
- Priority: Rapid cool roof rollouts in informal housing clusters where nighttime indoor temperatures remain dangerously high.`
  }
];

export const mockDefaultPrompts = [
  'Why is Ward 17 classified as Critical Heat Risk?',
  'What is the optimal cooling plan for ₹5 Crore budget?',
  'Compare Cool Roofs vs Green Roofs for Pune',
  'How does UrbanCool AI address water constraints during peak summer?'
];
