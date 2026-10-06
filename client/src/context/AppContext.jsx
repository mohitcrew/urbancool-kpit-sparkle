import React, { createContext, useContext, useState, useEffect } from 'react';
import { heatService } from '../services/heatService';
import { apiClient } from '../services/apiClient';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem('urbancool_theme') || 'dark'
  );
  const [selectedCityId, setSelectedCityId] = useState(
    () => localStorage.getItem('urbancool_city') || 'pune'
  );
  const [currentCity, setCurrentCity] = useState(null);
  const [citiesList, setCitiesList] = useState([]);
  const [isDemoMode, setIsDemoMode] = useState(
    () => localStorage.getItem('urbancool_demo_mode') !== 'false'
  );
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [tempUnit, setTempUnit] = useState('celsius');
  const [currency, setCurrency] = useState('INR');
  const [selectedHotspotId, setSelectedHotspotId] = useState(null);
  const [activeMapLayer, setActiveMapLayer] = useState('heatRisk');
  const [isLoadingCity, setIsLoadingCity] = useState(true);
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      title: 'Heatwave Alert Stage 2 Active',
      message: 'IMD Issued Extreme Heat Caution for Central Pune Wards (17, 08, 12).',
      time: '12m ago',
      type: 'warning',
      read: false
    },
    {
      id: 'notif-2',
      title: 'Landsat-9 Thermal Pass Ingested',
      message: 'Fresh 30m LST raster processed with +1.3°C daytime anomaly.',
      time: '1h ago',
      type: 'info',
      read: false
    }
  ]);

  // Sync theme with document root & localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.className = theme === 'light' ? 'theme-light' : 'theme-dark';
    localStorage.setItem('urbancool_theme', theme);
  }, [theme]);

  // Sync API Client mock mode state
  useEffect(() => {
    apiClient.setMockMode(isDemoMode);
    localStorage.setItem('urbancool_demo_mode', isDemoMode);
  }, [isDemoMode]);

  // Load city profile when selectedCityId changes
  useEffect(() => {
    let mounted = true;
    async function loadCityData() {
      try {
        setIsLoadingCity(true);
        const cityData = await heatService.getCity(selectedCityId);
        const allCities = await heatService.getAllCities();
        if (mounted) {
          setCurrentCity(cityData);
          setCitiesList(allCities);
        }
      } catch (err) {
        console.error('Failed to load city data:', err);
      } finally {
        if (mounted) setIsLoadingCity(false);
      }
    }
    loadCityData();
    localStorage.setItem('urbancool_city', selectedCityId);
    return () => {
      mounted = false;
    };
  }, [selectedCityId]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleSidebar = () => setIsSidebarCollapsed((prev) => !prev);
  const toggleDemoMode = () => setIsDemoMode((prev) => !prev);

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const value = {
    theme,
    setTheme,
    toggleTheme,
    isDarkMode: theme === 'dark',
    selectedCityId,
    setSelectedCityId,
    currentCity,
    citiesList,
    isLoadingCity,
    isDemoMode,
    setIsDemoMode,
    toggleDemoMode,
    isSidebarCollapsed,
    toggleSidebar,
    tempUnit,
    setTempUnit,
    currency,
    setCurrency,
    selectedHotspotId,
    setSelectedHotspotId,
    activeMapLayer,
    setActiveMapLayer,
    notifications,
    markAllNotificationsRead
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
