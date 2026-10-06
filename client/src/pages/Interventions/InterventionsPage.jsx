import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layers, Sparkles, Filter, Search, ShieldCheck } from 'lucide-react';
import InterventionCard from '../../components/cards/InterventionCard';
import Button from '../../components/ui/Button';
import { CardSkeleton } from '../../components/ui/SkeletonLoader';
import ErrorState from '../../components/ui/ErrorState';
import { interventionService } from '../../services/interventionService';

export default function InterventionsPage() {
  const navigate = useNavigate();
  const [interventions, setInterventions] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadInterventions = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await interventionService.getAllInterventions();
      setInterventions(data || []);
    } catch (err) {
      console.error('Failed to load interventions:', err);
      setError('Unable to load intervention solutions catalog.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInterventions();
  }, []);

  const filtered = interventions.filter((item) => {
    const matchesCategory =
      categoryFilter === 'all' ||
      item.category.toLowerCase().includes(categoryFilter.toLowerCase());

    const q = searchQuery.toLowerCase();
    const matchesSearch =
      item.name.toLowerCase().includes(q) ||
      item.tagline.toLowerCase().includes(q) ||
      item.suitableConditions.toLowerCase().includes(q);

    return matchesCategory && matchesSearch;
  });

  if (error) {
    return <ErrorState message={error} onRetry={loadInterventions} />;
  }

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <Layers size={16} color="var(--cyan-400)" />
            <span style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--cyan-400)', letterSpacing: '0.05em' }}>
              Urban Heat Mitigation Strategy Library
            </span>
          </div>
          <h1 style={{ fontSize: '1.85rem', color: 'var(--text-primary)' }}>
            Cooling Interventions Catalog
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
            Comprehensive engineering and nature-based solutions catalog with unit costs, water footprint, feasibility scores, and environmental co-benefits.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <Button
            variant="primary"
            icon={Sparkles}
            onClick={() => navigate('/planner')}
          >
            Launch AI Planner
          </Button>
        </div>
      </div>

      {/* Filter Toolbar */}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', flex: 1 }}>
          <div style={{ position: 'relative', width: 280 }}>
            <Search size={15} color="var(--text-muted)" style={{ position: 'absolute', left: 12, top: 10 }} />
            <input
              type="text"
              placeholder="Search interventions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: 36, width: '100%' }}
            />
          </div>

          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {[
              { id: 'all', label: 'All Solutions' },
              { id: 'Nature-Based', label: 'Nature-Based' },
              { id: 'Passive Materials', label: 'Passive Coatings' },
              { id: 'Surface Material', label: 'Cool Pavements' },
              { id: 'Spatial Infrastructure', label: 'Green Corridors' },
              { id: 'Evaporative', label: 'Evaporative Misting' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id)}
                style={{
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.78rem',
                  fontWeight: categoryFilter === cat.id ? 700 : 500,
                  backgroundColor: categoryFilter === cat.id ? 'rgba(6, 182, 212, 0.2)' : 'var(--bg-secondary)',
                  color: categoryFilter === cat.id ? 'var(--cyan-400)' : 'var(--text-secondary)',
                  border: categoryFilter === cat.id ? '1px solid var(--cyan-400)' : '1px solid var(--border-subtle)',
                  cursor: 'pointer'
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          {filtered.length} interventions cataloged
        </span>
      </div>

      {/* Grid of Interventions */}
      {loading ? (
        <div className="grid-3">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : (
        <div className="grid-3">
          {filtered.map((item) => (
            <InterventionCard
              key={item.id}
              intervention={item}
              onSelectForPlanning={() => navigate(`/planner?intervention=${item.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
