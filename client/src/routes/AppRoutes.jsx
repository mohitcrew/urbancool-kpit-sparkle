import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import DashboardPage from '../pages/Dashboard/DashboardPage';
import HeatMapPage from '../pages/HeatMap/HeatMapPage';
import HotspotsPage from '../pages/Hotspots/HotspotsPage';
import HotspotDetailPage from '../pages/Hotspots/HotspotDetailPage';
import PlannerPage from '../pages/Planner/PlannerPage';
import ScenariosPage from '../pages/Scenarios/ScenariosPage';
import AnalyticsPage from '../pages/Analytics/AnalyticsPage';
import InterventionsPage from '../pages/Interventions/InterventionsPage';
import AIInsightsPage from '../pages/AIInsights/AIInsightsPage';
import DataSourcesPage from '../pages/DataSources/DataSourcesPage';
import SettingsPage from '../pages/Settings/SettingsPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/heat-map" element={<HeatMapPage />} />
        <Route path="/hotspots" element={<HotspotsPage />} />
        <Route path="/hotspots/:id" element={<HotspotDetailPage />} />
        <Route path="/planner" element={<PlannerPage />} />
        <Route path="/scenarios" element={<ScenariosPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/interventions" element={<InterventionsPage />} />
        <Route path="/ai-insights" element={<AIInsightsPage />} />
        <Route path="/data-sources" element={<DataSourcesPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  );
}
