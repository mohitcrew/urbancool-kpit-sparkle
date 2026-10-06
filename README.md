# UrbanCool AI — Intelligent Urban Heat Mitigation & Cooling Strategy Platform

> **“From Urban Heat Data to Intelligent Cooling Decisions.”**  
> *Developed for the **KPIT Sparkle 2027 — AI Systems** Problem Statement:*  
> **AI for Urban Heat Mitigation and Cooling Strategies**

---

## 🌟 Executive Summary

**UrbanCool AI** is a state-of-the-art **Climate-Tech Command Center** and decision-support platform engineered to help municipal corporations, city planners, and disaster management authorities mitigate Urban Heat Island (UHI) effects, protect vulnerable demographics, and simulate multi-objective cooling interventions.

The platform bridges the critical gap between raw satellite earth observations (Landsat-9, Sentinel-2), ground weather stations (IMD AWS), cadastral GIS data, and actionable municipal capital expenditure planning.

---

## 🏙️ Core Capabilities

1. **Urban Heat Diagnosis**: Continuous monitoring of Land Surface Temperature (LST), NDVI vegetation health, NDBI built-up indices, and ambient thermal stress.
2. **Hotspot Detection & Classification**: Automated spatial identification and priority ranking of high-risk urban wards.
3. **AI Root-Cause Explainability**: Game-theoretic feature attribution (SHAP) revealing why specific municipal wards experience extreme microclimate heat traps.
4. **Demographic & Infrastructure Exposure**: Pinpoint tracking of seniors (60+), infants (<5), outdoor workers, slum clusters, schools, and hospitals at risk.
5. **AI Multi-Objective Cooling Planner**: Pareto optimization of nature-based solutions (NBS) and engineered cooling materials constrained by budget (₹ INR Cr), water availability, and land feasibility.
6. **What-If Climatology Scenario Lab**: Interactive sandbox with parameter sliders to simulate and compare bespoke cooling strategies against the AI Optimal Strategy.
7. **Conversational Thermal Assistant**: Natural language AI reasoning assistant answering municipal policy queries with grounded citations and mitigation roadmaps.
8. **Multi-Modal Data Pipeline**: Real-time status monitoring of satellite, IMD telemetry, and GIS cadastre feeds.

---

## 🏛️ System Architecture

```text
┌────────────────────────────────────────────────────────┐
│               REACT CLIENT (VITE + SPA)                │
│  Command Center UI • Leaflet Maps • Recharts • Context │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│            DECOUPLED SERVICE LAYER ABSTRACTION         │
│  apiClient • heatService • hotspotService • planner... │
└──────────────┬───────────────────────────┬─────────────┘
               │                           │
  [MOCK_MODE=true]            [MOCK_MODE=false]
               │                           │
               ▼                           ▼
┌──────────────────────────┐  ┌──────────────────────────┐
│ REALISTIC MOCK DATASETS  │  │   NODE.JS EXPRESS API    │
│  Pune & Ahmedabad Wards  │  │  REST Routing & Security │
└──────────────────────────┘  └────────────┬─────────────┘
                                           │
                                           ▼
                              ┌──────────────────────────┐
                              │  FUTURE AI ORCHESTRATOR  │
                              │  • Physics-ML Heat Model │
                              │  • TreeSHAP Explainer    │
                              │  • Pareto Opt Engine     │
                              │  • LLM Strategy Reasoner │
                              └────────────┬─────────────┘
                                           │
                                           ▼
                              ┌──────────────────────────┐
                              │ GEOSPATIAL & SENSOR DB   │
                              │  PostGIS + OpenStreetMap │
                              │  Landsat-9 / Sentinel-2  │
                              │  IMD AWS Telemetry       │
                              └──────────────────────────┘
```

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, React Router v6, Vanilla CSS Modern Design System.
- **Geospatial & Maps**: Leaflet, React-Leaflet, CartoDB Voyager tiles.
- **Data Visualizations**: Recharts (Multi-series Line, Area, Scatter, Bar, Donut charts).
- **Icons**: Lucide React.
- **Backend API**: Node.js, Express.js, CORS, Morgan, Dotenv.
- **State Management**: React Context API (`AppContext`) with dynamic mock/live mode toggle.

---

## 📂 Repository Structure

```text
KPIT/
├── client/                     # Vite + React Frontend Client
│   ├── public/
│   ├── src/
│   │   ├── assets/             # Static brand assets
│   │   ├── components/         # Reusable UI, Layout, Maps, and AI components
│   │   │   ├── ai/             # SHAPExplainer
│   │   │   ├── cards/          # AIInsightCard, HotspotCard, InterventionCard
│   │   │   ├── layout/         # Header, Sidebar, Footer, AppLayout
│   │   │   ├── maps/           # HeatMap, MapControls, MapLegend, HotspotDrawer
│   │   │   └── ui/             # MetricCard, Button, Badge, SliderInput, Skeletons
│   │   ├── context/            # AppContext Global State (City, Theme, Mock mode)
│   │   ├── data/               # High-fidelity realistic mock datasets
│   │   ├── pages/              # 10 Core Application Page Views + Hotspot Detail
│   │   │   ├── Dashboard/      # Command center KPIs & live map
│   │   │   ├── HeatMap/        # Fullscreen geospatial analysis studio
│   │   │   ├── Hotspots/       # Registry & Hotspot Detail view
│   │   │   ├── Planner/        # AI Multi-Objective Cooling Planner
│   │   │   ├── Scenarios/      # What-If Climatology Scenario Lab
│   │   │   ├── Analytics/      # Longitudinal trends, scatter & diurnal curves
│   │   │   ├── Interventions/  # 7+ urban cooling solutions catalog
│   │   │   ├── AIInsights/     # Conversational thermal assistant
│   │   │   ├── DataSources/    # Satellite & weather feeds status
│   │   │   └── Settings/       # Thresholds, units, and API toggles
│   │   ├── routes/             # AppRoutes definition
│   │   ├── services/           # Decoupled API abstraction & client services
│   │   ├── App.jsx             # Root React component
│   │   ├── index.css           # Climate-Tech Command Center CSS design system
│   │   └── main.jsx            # Vite entrypoint
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
│
├── server/                     # Node.js Express REST API Server
│   ├── mock/                   # Mirrored high-fidelity mock datasets
│   ├── routes/                 # REST API endpoints (/api/*)
│   ├── app.js                  # Express middleware setup
│   ├── server.js               # Entrypoint listener
│   ├── .env.example
│   └── package.json
│
├── .env.example
├── package.json                # Root concurrent scripts
└── README.md
```

---

## ⚡ Quick Start & Installation

### 1. Install all dependencies (Root, Client, Server)

```bash
npm install
npm --prefix client install
npm --prefix server install
```

### 2. Configure Environment Files

```bash
# Frontend: client/.env
VITE_API_BASE_URL=/api
VITE_MOCK_MODE=true
VITE_DEFAULT_CITY=Pune

# Backend: server/.env
PORT=5000
NODE_ENV=development
```

### 3. Run Development Servers

To run both Frontend and Backend concurrently:

```bash
npm run dev
```

Or run them individually:

```bash
# Frontend only (http://localhost:3000)
npm run client

# Backend only (http://localhost:5000)
npm run server
```

---

## 📡 REST API Documentation

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Service health status and telemetry version |
| `GET` | `/api/city?id=pune` | City profile, weather telemetry, and KPIs |
| `GET` | `/api/heatmap?cityId=pune&layer=heatRisk` | Spatial polygon data and layer metrics |
| `GET` | `/api/hotspots?cityId=pune` | Filtered and sorted hotspot registry |
| `GET` | `/api/hotspots/:id` | In-depth ward diagnostics, SHAP features & exposure |
| `GET` | `/api/interventions` | Catalog of 7+ cooling intervention solutions |
| `POST`| `/api/planner/optimize` | AI multi-objective Pareto optimization engine |
| `POST`| `/api/scenarios/simulate` | Custom what-if scenario parameter computation |
| `GET` | `/api/analytics` | Climatology time series, scatter, and impact curves |
| `POST`| `/api/ai/chat` | Conversational thermal reasoning assistant |
| `GET` | `/api/data-sources` | Ingestion pipeline health and sensor metrics |

---

## 🎭 Step-by-Step Competition Demonstration Story

Follow this 10-step narrative during judging presentations:

1. **Open Dashboard (`/dashboard`)**:  
   Review current city heat risk index (**78/100**), **24 active hotspots**, **184,200 exposed citizens**, and average LST (**39.4°C**).
2. **Open Heat Map (`/heat-map`)**:  
   Toggle between **Heat Risk**, **LST (°C)**, and **NDVI (Greenery)** layers to reveal thermal clusters across central Pune.
3. **Inspect Critical Zone (Ward 17)**:  
   Click on **Ward 17 (Shivajinagar)** on the map to trigger the inspection drawer (**94/100 — Critical Risk**, **43.7°C LST**).
4. **Open Hotspot Deep Dive (`/hotspots/H-017`)**:  
   Examine the **AI-generated SHAP Explanation** showcasing *Low Vegetation Cover (34%)*, *Building Density (28%)*, and *Paved Roads (21%)*.
5. **Navigate to AI Cooling Planner (`/planner`)**:  
   Target Ward 17, set municipal budget to **₹5.0 Crore**, and prioritize **Maximum Population Benefit**.
6. **Click "OPTIMIZE COOLING PLAN"**:  
   Watch the multi-objective optimizer compute a Pareto-efficient package (**3,800 trees**, **9,500 m² cool roofs**, **1.2 km green corridor**).
7. **Inspect Output Metrics**:  
   Review estimated **-1.4°C net ambient cooling**, **31,200 population benefited**, and **₹4.78 Cr estimated cost** with 84% model confidence.
8. **Open Scenario Lab (`/scenarios`)**:  
   Compare **Scenario A (Trees Only)** vs. **Scenario B (Cool Roofs Only)** vs. **AI Optimal Plan**.
9. **Verify Trade-Off Superiority**:  
   Confirm that the AI hybrid plan achieves 40% higher cooling and reaches 6,000 more residents for the same ₹5 Cr budget.
10. **Engage Conversational AI (`/ai-insights`)**:  
    Ask *"Why is Ward 17 high risk?"* and review natural language explanations and policy recommendations.

---

## 🔮 Roadmap to Real-World Production

```text
Phase 1: High-Fidelity Frontend & Service Layer (COMPLETED ✅)
Phase 2: Live Weather & Satellite Ingestion Integration (IMD AWS + Sentinel-2 STAC)
Phase 3: Physics-Informed ML Heat Prediction Model (PyTorch / XGBoost)
Phase 4: TreeSHAP Feature Attribution Server (Python FastAPI Microservice)
Phase 5: Genetic Algorithm / NSGA-II Multi-Objective Spatial Optimizer
Phase 6: Closed-Loop IoT Sensor Validation & Real-World Intervention Learning
```

---

## 📄 License & Attribution

Developed for **KPIT Sparkle 2027**. Built with pride for sustainable, climate-resilient smart cities.
