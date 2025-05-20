import React, { useState, useEffect } from 'react';
import clarityService from './src/services/ClarityService';

// veil:design() log:"Creating ritual log dashboard component"

/**
 * RitualLogDashboard displays the ritual logs from the system.
 * It provides filtering, search, and visualization capabilities for
 * the CLARITY-OR-DEATH ritual system logs.
 */
const RitualLogDashboard = () => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    types: ['veil', 'cast', 'log', 'cut', 'scan', 'flag', 'save', 'query'],
    search: '',
    startDate: null,
    endDate: null
  });
  const [selectedLog, setSelectedLog] = useState(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    byType: {},
    byDay: []
  });

  useEffect(() => {
    fetchLogs();

    // Refresh logs periodically
    const interval = setInterval(() => {
      fetchLogs(false);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [logs, filter]);

  const fetchLogs = async (showLoading = true) => {
    if (showLoading) {
      setLoading(true);
    }

    try {
      const logData = await clarityService.getRitualLogs();
      setLogs(logData);
      calculateStats(logData);
    } catch (error) {
      console.error('Error fetching ritual logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (logData) => {
    // Calculate statistics from logs
    const byType = {};
    const dayMap = {};

    logData.forEach(log => {
      // Count by type
      byType[log.type] = (byType[log.type] || 0) + 1;

      // Group by day
      const day = new Date(log.timestamp).toISOString().split('T')[0];
      dayMap[day] = (dayMap[day] || 0) + 1;
    });

    // Convert day map to array sorted by date
    const byDay = Object.entries(dayMap)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));

    setStats({
      total: logData.length,
      byType,
      byDay
    });
  };

  const applyFilters = () => {
    let filtered = [...logs];

    // Filter by type
    if (filter.types.length > 0) {
      filtered = filtered.filter(log => filter.types.includes(log.type));
    }

    // Filter by search text
    if (filter.search) {
      const searchLower = filter.search.toLowerCase();
      filtered = filtered.filter(log =>
        log.content.toLowerCase().includes(searchLower) ||
        log.type.toLowerCase().includes(searchLower)
      );
    }

    // Filter by date range
    if (filter.startDate) {
      filtered = filtered.filter(log =>
        new Date(log.timestamp) >= new Date(filter.startDate)
      );
    }

    if (filter.endDate) {
      filtered = filtered.filter(log =>
        new Date(log.timestamp) <= new Date(filter.endDate)
      );
    }

    setFilteredLogs(filtered);
  };

  const toggleTypeFilter = (type) => {
    setFilter(prev => {
      if (prev.types.includes(type)) {
        return {
          ...prev,
          types: prev.types.filter(t => t !== type)
        };
      } else {
        return {
          ...prev,
          types: [...prev.types, type]
        };
      }
    });
  };

  const handleSearchChange = (e) => {
    setFilter(prev => ({
      ...prev,
      search: e.target.value
    }));
  };

  const handleDateChange = (field, value) => {
    setFilter(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const viewLogDetails = (log) => {
    setSelectedLog(log);
  };

  const closeLogDetails = () => {
    setSelectedLog(null);
  };

  const toggleStats = () => {
    setStatsVisible(prev => !prev);
  };

  return (
    <div className="ritual-log-dashboard">
      <div className="dashboard-header">
        <h1 className="ritual-title">Ritual Log Dashboard</h1>
        <div className="dashboard-actions">
          <button
            className="button secondary"
            onClick={toggleStats}
          >
            {statsVisible ? 'Hide Statistics' : 'Show Statistics'}
          </button>
          <button
            className="button"
            onClick={() => fetchLogs()}
            disabled={loading}
          >
            {loading ? 'Refreshing...' : 'Refresh Logs'}
          </button>
        </div>
      </div>

      {statsVisible && (
        <div className="stats-container ritual-card">
          <h2>Log Statistics</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-label">Total Logs</div>
              <div className="stat-value">{stats.total}</div>
            </div>
            {Object.entries(stats.byType).map(([type, count]) => (
              <div className="stat-item" key={type}>
                <div className="stat-label">{type}</div>
                <div className="stat-value">{count}</div>
              </div>
            ))}
          </div>

          <h3>Activity Over Time</h3>
          <div className="time-chart">
            {stats.byDay.map(day => (
              <div
                key={day.date}
                className="chart-bar"
                style={{height: `${Math.max(20, day.count * 2)}px`}}
                title={`${day.date}: ${day.count} logs`}
              />
            ))}
          </div>
        </div>
      )}

      <div className="filter-container ritual-card">
        <div className="filter-row">
          <div className="search-field">
            <input
              type="text"
              placeholder="Search logs..."
              value={filter.search}
              onChange={handleSearchChange}
            />
          </div>
          <div className="date-filters">
            <input
              type="date"
              onChange={(e) => handleDateChange('startDate', e.target.value)}
              placeholder="Start Date"
            />
            <span>to</span>
            <input
              type="date"
              onChange={(e) => handleDateChange('endDate', e.target.value)}
              placeholder="End Date"
            />
          </div>
        </div>

        <div className="type-filters">
          {['veil', 'cast', 'log', 'cut', 'scan', 'flag', 'save', 'query'].map(type => (
            <button
              key={type}
              className={`filter-button ${filter.types.includes(type) ? 'active' : ''}`}
              onClick={() => toggleTypeFilter(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="logs-container ritual-card">
        <h2>Ritual Logs {loading && <span className="loading-indicator">Loading...</span>}</h2>
        <div className="log-grid">
          {filteredLogs.length > 0 ? (
            filteredLogs.map((log, index) => (
              <div
                key={index}
                className={`log-item log-type-${log.type}`}
                onClick={() => viewLogDetails(log)}
              >
                <div className="log-timestamp">
                  {new Date(log.timestamp).toLocaleString()}
                </div>
                <div className="log-type">{log.type}</div>
                <div className="log-content">{log.content}</div>
              </div>
            ))
          ) : (
            <div className="no-logs-message">
              {loading ? 'Loading logs...' : 'No logs match the current filters.'}
            </div>
          )}
        </div>
      </div>

      {selectedLog && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={closeLogDetails}>×</button>
            <h2>Log Details</h2>

            <div className="log-details">
              <div className="detail-row">
                <div className="detail-label">Timestamp</div>
                <div className="detail-value">
                  {new Date(selectedLog.timestamp).toLocaleString()}
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-label">Type</div>
                <div className="detail-value">{selectedLog.type}</div>
              </div>

              <div className="detail-row">
                <div className="detail-label">Content</div>
                <div className="detail-value log-content-full">{selectedLog.content}</div>
              </div>

              {selectedLog.metadata && (
                <div className="detail-row">
                  <div className="detail-label">Metadata</div>
                  <div className="detail-value">
                    <pre>{JSON.stringify(selectedLog.metadata, null, 2)}</pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RitualLogDashboard;