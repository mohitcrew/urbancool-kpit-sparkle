import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polygon, CircleMarker, Popup, Tooltip, useMap } from 'react-leaflet';
import MapControls from './MapControls';
import MapLegend from './MapLegend';
import HotspotDrawer from './HotspotDrawer';
import { useApp } from '../../context/AppContext';

// Helper component to center map on city or selected hotspot
function MapViewController({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center && map) {
      map.flyTo(center, zoom || 13, { duration: 1.2 });
    }
  }, [center, zoom, map]);
  return null;
}

export default function HeatMap({
  hotspots = [],
  activeLayer = 'heatRisk',
  onLayerChange,
  selectedHotspot,
  onSelectHotspot,
  height = '540px',
  showControls = true,
  showLegend = true,
  interactive = true
}) {
  const { currentCity } = useApp();
  const [internalLayer, setInternalLayer] = useState(activeLayer);
  const [timeHorizon, setTimeHorizon] = useState('current');
  const [activeDrawerHotspot, setActiveDrawerHotspot] = useState(selectedHotspot || null);

  useEffect(() => {
    setInternalLayer(activeLayer);
  }, [activeLayer]);

  useEffect(() => {
    if (selectedHotspot) {
      setActiveDrawerHotspot(selectedHotspot);
    }
  }, [selectedHotspot]);

  const handleLayerChange = (layer) => {
    setInternalLayer(layer);
    if (onLayerChange) onLayerChange(layer);
  };

  const handleHotspotClick = (h) => {
    setActiveDrawerHotspot(h);
    if (onSelectHotspot) onSelectHotspot(h);
  };

  // Color determination based on active layer
  const getFeatureColor = (h) => {
    switch (internalLayer) {
      case 'heatRisk':
        if (h.heatRisk >= 90) return '#ef4444';
        if (h.heatRisk >= 80) return '#f97316';
        if (h.heatRisk >= 50) return '#eab308';
        return '#10b981';

      case 'lst':
        if (h.lstCelsius >= 43) return '#dc2626';
        if (h.lstCelsius >= 40) return '#ea580c';
        if (h.lstCelsius >= 36) return '#ca8a04';
        return '#16a34a';

      case 'ndvi':
        if (h.ndvi >= 0.40) return '#059669';
        if (h.ndvi >= 0.20) return '#10b981';
        if (h.ndvi >= 0.10) return '#eab308';
        return '#ef4444';

      case 'ndbi':
        if (h.ndbi >= 0.50) return '#e11d48';
        if (h.ndbi >= 0.30) return '#f97316';
        if (h.ndbi >= 0.10) return '#eab308';
        return '#06b6d4';

      case 'population':
        if (h.population >= 25000) return '#a855f7';
        if (h.population >= 18000) return '#818cf8';
        return '#38bdf8';

      case 'vulnerability':
        if (h.vulnerability === 'High') return '#ef4444';
        if (h.vulnerability === 'Medium') return '#f59e0b';
        return '#10b981';

      case 'interventions':
        return '#22d3ee';

      default:
        return '#06b6d4';
    }
  };

  const centerCoord = currentCity?.coordinates || [18.5204, 73.8567];
  const zoomLevel = currentCity?.defaultZoom || 13;

  return (
    <div
      className="card-glass"
      style={{
        position: 'relative',
        width: '100%',
        height,
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        border: '1px solid var(--border-default)'
      }}
    >
      {showControls && (
        <MapControls
          activeLayer={internalLayer}
          onLayerChange={handleLayerChange}
          timeHorizon={timeHorizon}
          onTimeChange={setTimeHorizon}
        />
      )}

      {showLegend && <MapLegend activeLayer={internalLayer} />}

      {interactive && activeDrawerHotspot && (
        <HotspotDrawer
          hotspot={activeDrawerHotspot}
          onClose={() => setActiveDrawerHotspot(null)}
        />
      )}

      <MapContainer
        center={centerCoord}
        zoom={zoomLevel}
        scrollWheelZoom={interactive}
        style={{ width: '100%', height: '100%' }}
      >
        <MapViewController center={centerCoord} zoom={zoomLevel} />

        {/* Dark High-Tech CartoDB Voyager / Dark Matter Tile Layer */}
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a> & OpenStreetMap'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          opacity={0.35}
        />

        {/* Render polygon regions for each ward */}
        {hotspots.map((h) => {
          const color = getFeatureColor(h);
          const isSelected = activeDrawerHotspot?.id === h.id;

          return (
            <React.Fragment key={h.id}>
              {h.polygonCoordinates && (
                <Polygon
                  positions={h.polygonCoordinates}
                  pathOptions={{
                    color: isSelected ? '#ffffff' : color,
                    fillColor: color,
                    fillOpacity: isSelected ? 0.65 : 0.42,
                    weight: isSelected ? 3 : 1.5,
                    dashArray: isSelected ? '4, 4' : null
                  }}
                  eventHandlers={{
                    click: () => handleHotspotClick(h)
                  }}
                >
                  <Tooltip sticky direction="top">
                    <div style={{ padding: 4 }}>
                      <strong style={{ color }}>{h.shortName || h.name}</strong>
                      <div>Risk Score: <strong>{h.heatRisk}/100</strong></div>
                      <div>LST: <strong>{h.lstCelsius}°C</strong></div>
                    </div>
                  </Tooltip>
                </Polygon>
              )}

              {/* Centroid marker indicator */}
              {h.centerCoordinates && (
                <CircleMarker
                  center={h.centerCoordinates}
                  radius={h.heatRisk >= 90 ? 8 : 6}
                  pathOptions={{
                    color: '#ffffff',
                    fillColor: color,
                    fillOpacity: 0.95,
                    weight: 2
                  }}
                  eventHandlers={{
                    click: () => handleHotspotClick(h)
                  }}
                >
                  <Popup>
                    <div style={{ minWidth: 160, padding: 4 }}>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#ffffff' }}>
                        {h.shortName}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: '4px 0' }}>
                        {h.name}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                        <span>LST: <strong style={{ color: '#f97316' }}>{h.lstCelsius}°C</strong></span>
                        <span>Risk: <strong style={{ color }}>{h.heatRisk}</strong></span>
                      </div>
                    </div>
                  </Popup>
                </CircleMarker>
              )}
            </React.Fragment>
          );
        })}
      </MapContainer>
    </div>
  );
}
