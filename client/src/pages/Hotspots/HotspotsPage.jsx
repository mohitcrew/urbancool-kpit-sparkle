import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, ArrowUpDown, Flame, AlertCircle, ArrowRight, Download, Sparkles } from 'lucide-react';
import { RiskBadge, StatusBadge } from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { TableSkeleton } from '../../components/ui/SkeletonLoader';
import EmptyState from '../../components/ui/EmptyState';
import ErrorState from '../../components/ui/ErrorState';
import { useApp } from '../../context/AppContext';
import { hotspotService } from '../../services/hotspotService';

export default function HotspotsPage() {
  const navigate = useNavigate();
  const { selectedCityId, currentCity } = useApp();

  const [hotspots, setHotspots] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('heatRisk'); // 'heatRisk', 'lstCelsius', 'population', 'shortName'
  const [sortOrder, setSortOrder] = useState('desc');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadHotspots = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await hotspotService.getHotspots({ cityId: selectedCityId });
      setHotspots(data || []);
    } catch (err) {
      console.error('Failed to load hotspots:', err);
      setError('Unable to load hotspot registry.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHotspots();
  }, [selectedCityId]);

  // Filter & Sort
  const filteredHotspots = hotspots
    .filter((h) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        h.name.toLowerCase().includes(q) ||
        h.shortName.toLowerCase().includes(q) ||
        h.id.toLowerCase().includes(q);

      const matchesPriority =
        priorityFilter === 'all' ||
        h.priority.toLowerCase() === priorityFilter.toLowerCase();

      return matchesSearch && matchesPriority;
    })
    .sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];
      if (typeof aVal === 'string') {
        return sortOrder === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
    });

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  if (error) {
    return <ErrorState message={error} onRetry={loadHotspots} />;
  }

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <Flame size={16} color="#ef4444" />
            <span style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--cyan-400)', letterSpacing: '0.05em' }}>
              Urban Heat Vulnerability Registry
            </span>
          </div>
          <h1 style={{ fontSize: '1.85rem', color: '#ffffff' }}>
            Municipal Heat Hotspots
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
            Ranked municipal wards in {currentCity?.name} classified by localized land surface temperature, built-up density, and demographic exposure.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <Button
            variant="primary"
            icon={Sparkles}
            onClick={() => navigate('/planner')}
          >
            Optimize All Hotspots
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div
        className="card-glass"
        style={{
          padding: 16,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 14,
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 260 }}>
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              maxWidth: 360
            }}
          >
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: 12 }} />
            <input
              type="text"
              placeholder="Search by Ward (e.g. Ward 17, Hadapsar, H-017)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: 36, width: '100%' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Filter size={15} color="var(--text-muted)" />
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              style={{ fontSize: '0.85rem' }}
            >
              <option value="all">All Priorities</option>
              <option value="critical">Critical Priority</option>
              <option value="high">High Priority</option>
              <option value="moderate">Moderate Priority</option>
              <option value="low">Low Priority</option>
            </select>
          </div>
        </div>

        <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          Showing <strong style={{ color: '#ffffff' }}>{filteredHotspots.length}</strong> of{' '}
          <strong style={{ color: '#ffffff' }}>{hotspots.length}</strong> zones
        </div>
      </div>

      {/* Table Content */}
      {loading ? (
        <TableSkeleton rows={6} />
      ) : filteredHotspots.length === 0 ? (
        <EmptyState
          title="No Hotspots Match Your Query"
          description="Try broadening your search term or clearing the priority filter."
          action={
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setSearchQuery('');
                setPriorityFilter('all');
              }}
            >
              Reset Filters
            </Button>
          }
        />
      ) : (
        <div className="card-glass" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="data-table-wrapper" style={{ border: 'none', borderRadius: 0 }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th onClick={() => toggleSort('id')} style={{ cursor: 'pointer' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      ID <ArrowUpDown size={12} />
                    </div>
                  </th>
                  <th onClick={() => toggleSort('shortName')} style={{ cursor: 'pointer' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      Location & Ward <ArrowUpDown size={12} />
                    </div>
                  </th>
                  <th onClick={() => toggleSort('heatRisk')} style={{ cursor: 'pointer' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      Heat Risk <ArrowUpDown size={12} />
                    </div>
                  </th>
                  <th onClick={() => toggleSort('lstCelsius')} style={{ cursor: 'pointer' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      Surface LST <ArrowUpDown size={12} />
                    </div>
                  </th>
                  <th onClick={() => toggleSort('population')} style={{ cursor: 'pointer' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      Population <ArrowUpDown size={12} />
                    </div>
                  </th>
                  <th>Vulnerability</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredHotspots.map((h) => (
                  <tr
                    key={h.id}
                    className="clickable-row"
                    onClick={() => navigate(`/hotspots/${h.id}`)}
                  >
                    <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--cyan-400)' }}>
                      {h.id}
                    </td>
                    <td>
                      <div style={{ fontWeight: 700, color: '#ffffff', fontSize: '0.92rem' }}>{h.shortName}</div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{h.name}</div>
                    </td>
                    <td>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.95rem',
                          fontWeight: 800,
                          color: h.heatRisk >= 90 ? '#ef4444' : h.heatRisk >= 80 ? '#f97316' : '#eab308'
                        }}
                      >
                        {h.heatRisk} / 100
                      </span>
                    </td>
                    <td>
                      <strong style={{ color: '#f97316', fontSize: '0.92rem' }}>{h.lstCelsius}°C</strong>
                    </td>
                    <td>{h.population?.toLocaleString()}</td>
                    <td>
                      <span style={{ color: h.vulnerability === 'High' ? '#f87171' : '#fbbf24', fontWeight: 600 }}>
                        {h.vulnerability}
                      </span>
                    </td>
                    <td>
                      <RiskBadge level={h.priority} />
                    </td>
                    <td>
                      <StatusBadge status={h.status} variant={h.status === 'Action Required' ? 'rose' : 'cyan'} />
                    </td>
                    <td>
                      <Button
                        variant="secondary"
                        size="sm"
                        icon={ArrowRight}
                        iconPosition="right"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/hotspots/${h.id}`);
                        }}
                      >
                        Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
