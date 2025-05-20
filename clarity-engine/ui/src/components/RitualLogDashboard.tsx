import React, { useState, useEffect } from 'react';
import clarityService from '../services/ClarityService';
import { useNotifications } from '../context/NotificationContext';

// veil:design() log:"Creating RitualLogDashboard for ritual log visualization"

interface LogEntry {
  timestamp: string;
  type: string;
  content: string;
  metadata?: any;
}

interface RitualLogDashboardProps {
  maxEntries?: number;
  filter?: string;
  refreshInterval?: number;
  onLogSelect?: (log: LogEntry) => void;
}

const RitualLogDashboard: React.FC<RitualLogDashboardProps> = ({
  maxEntries = 50,
  filter,
  refreshInterval = 0,
  onLogSelect
}) => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedLogType, setSelectedLogType] = useState<string | null>(filter || null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { addNotification } = useNotifications();

  useEffect(() => {
    loadLogs();

    // Set up refresh interval if specified
    if (refreshInterval > 0) {
      const intervalId = setInterval(loadLogs, refreshInterval);
      return () => clearInterval(intervalId);
    }
  }, [refreshInterval, selectedLogType]);

  const loadLogs = async () => {
    try {
      setLoading(true);
      const logData = await clarityService.getRitualLogs();

      // Apply filters
      let filteredLogs = logData;

      if (selectedLogType) {
        filteredLogs = filteredLogs.filter(log => log.type === selectedLogType);
      }

      if (searchTerm) {
        filteredLogs = filteredLogs.filter(log =>
          log.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (log.metadata && JSON.stringify(log.metadata).toLowerCase().includes(searchTerm.toLowerCase()))
        );
      }

      // Limit number of entries
      filteredLogs = filteredLogs.slice(0, maxEntries);

      setLogs(filteredLogs);
      setLoading(false);
    } catch (error) {
      console.error('Error loading ritual logs:', error);
      addNotification({
        type: 'error',
        message: 'Failed to load ritual logs',
        details: error instanceof Error ? error.message : String(error)
      });
      setLoading(false);
    }
  };

  const handleLogTypeChange = (type: string | null) => {
    setSelectedLogType(type);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleLogClick = (log: LogEntry) => {
    if (onLogSelect) {
      onLogSelect(log);
    }
  };

  const logTypes = ['veil', 'cast', 'log', 'cut', 'query', 'scan', 'flag', 'save'];

  return (
    <div className="ritual-log-dashboard">
      <div className="log-controls">
        <div className="log-filters">
          <button
            className={`filter-button ${selectedLogType === null ? 'active' : ''}`}
            onClick={() => handleLogTypeChange(null)}
          >
            All
          </button>
          {logTypes.map(type => (
            <button
              key={type}
              className={`filter-button ${selectedLogType === type ? 'active' : ''}`}
              onClick={() => handleLogTypeChange(type)}
            >
              {type}
            </button>
          ))}
        </div>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search logs..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          <button className="button" onClick={loadLogs}>
            Refresh
          </button>
        </div>
      </div>

      <div className="log-container">
        {loading && <div className="loading-indicator">Loading logs...</div>}

        {!loading && logs.length === 0 && (
          <div className="empty-state">No logs found.</div>
        )}

        {!loading && logs.map((log, index) => (
          <div
            key={index}
            className={`log-entry log-type-${log.type}`}
            onClick={() => handleLogClick(log)}
          >
            <div className="log-header">
              <span className="log-type">{log.type}</span>
              <span className="log-timestamp">{new Date(log.timestamp).toLocaleString()}</span>
            </div>
            <div className="log-content">{log.content}</div>
            {log.metadata && (
              <div className="log-metadata">
                <details>
                  <summary>Metadata</summary>
                  <pre>{JSON.stringify(log.metadata, null, 2)}</pre>
                </details>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RitualLogDashboard;