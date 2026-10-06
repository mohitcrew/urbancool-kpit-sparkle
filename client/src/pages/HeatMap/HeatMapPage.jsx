import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layers, Calendar, Clock, MapPin, Sparkles, Filter } from 'lucide-react';
import HeatMap from '../../components/maps/HeatMap';
import Button from '../../components/ui/Button';
import { useApp } from '../../context/AppContext';
import { hotspotService } from '../../services/hotspotService';
import ErrorState from '../../components/ui/ErrorState';

export default function HeatMapPage() {
  const navigate = useNavigate();
  const { currentCity, selectedCityId, activeMapLayer, setActiveMapLayer } = useApp();

  const [hotspots, setHotspots] = useState([]);
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [selectedDate, setSelectedDate] = useState('2026-05-18');
  const [selectedHour, setSelectedHour] = useState('14:30 IST (Peak Solar)');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadHotspots = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await hotspotService.getHotspots({ cityId: selectedCityId });
      setHotspots(data || []);
      if (data?.length > 0 && !selectedHotspot) {
        setSelectedHotspot(data[0]); // Default to Ward 17 / first hotspot
      }
    } catch (err) {
      console.error('Failed to load map data:', err);
      setError('Unable to load geospatial layers.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHotspots();
  }, [selectedCityId]);

  if (error) {
    return <ErrorState message={error} onRetry={loadHotspots} />;
  }

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 16, height: 'calc(100vh - 140px)' }}>
      {/* Top Filter & Control Strip */}
      <div
        className="card-glass"
        style={{
          padding: '12px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <MapPin size={16} color="var(--cyan-400)" />
            <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{currentCity?.name} Geospatial Heat Studio</span>
          </div>
          <span style={{ color: 'var(--text-muted)' }}>•</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Resolution: 30m Multi-spectral LST
          </span>
        </div>

        {/* Date & Time Selectors */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem' }}>
            <Calendar size={14} color="var(--cyan-400)" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              style={{ fontSize: '0.8rem', padding: '4px 8px' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem' }}>
            <Clock size={14} color="var(--cyan-400)" />
            <select
              value={selectedHour}
              onChange={(e) => setSelectedHour(e.target.value)}
              style={{ fontSize: '0.8rem', padding: '4px 8px' }}
            >
              <option value="09:00 IST (Morning)">09:00 IST (Morning Baseline)</option>
              <option value="12:00 IST (Noon)">12:00 IST (Midday Heating)</option>
              <option value="14:30 IST (Peak Solar)">14:30 IST (Peak Solar Anomaly)</option>
              <option value="18:00 IST (Evening)">18:00 IST (Nocturnal Trapping)</option>
            </select>
          </div>

          <Button
            variant="primary"
            size="sm"
            icon={Sparkles}
            onClick={() => navigate('/planner')}
          >
            Launch AI Planner
          </Button>
        </div>
      </div>

      {/* Main Full-Height Interactive Map Container */}
      <div style={{ flex: 1, minHeight: 480, position: 'relative' }}>
        <HeatMap
          hotspots={hotspots}
          activeLayer={activeMapLayer}
          onLayerChange={setActiveMapLayer}
          selectedHotspot={selectedHotspot}
          onSelectHotspot={setSelectedHotspot}
          height="100%"
          showControls={true}
          showLegend={true}
          interactive={true}
        />
      </div>
    </div>
  );
}
