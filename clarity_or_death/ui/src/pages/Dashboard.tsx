import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import clarityService from '../services/ClarityService';

// veil:design() log:"Creating Dashboard view for CLARITY-OR-DEATH UI"

interface LogEntry {
  timestamp: string;
  type: string;
  content: string;
}

const Dashboard: React.FC = () => {
  const [recentLogs, setRecentLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // In a real implementation, this would fetch logs from the server
    // For demo purposes, we'll create some sample logs
    const sampleLogs: LogEntry[] = [
      {
        timestamp: new Date().toISOString(),
        type: 'veil',
        content: 'veil:design() log:"UI system initialized"'
      },
      {
        timestamp: new Date(Date.now() - 100000).toISOString(),
        type: 'cast',
        content: 'cast:render log:"Dashboard component rendered"'
      },
      {
        timestamp: new Date(Date.now() - 200000).toISOString(),
        type: 'log',
        content: 'Ritual system connected to MCP server'
      }
    ];

    // Simulate API call
    setTimeout(() => {
      setRecentLogs(sampleLogs);
      setLoading(false);
    }, 500);
  }, []);

  const handleScanSystem = async () => {
    try {
      setLoading(true);
      const response = await clarityService.scanSystem();
      // In a real implementation, you would update the UI based on the response
      console.log('Scan response:', response);
      setLoading(false);
    } catch (error) {
      console.error('Error scanning system:', error);
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-page">
      <h1 className="ritual-title">CLARITY-OR-DEATH Dashboard</h1>

      <div className="dashboard-grid">
        <div className="ritual-card">
          <h2>System Status</h2>
          <p>Connected to MCP Server: <span className="status-indicator">●</span></p>
          <p>Active Rituals: 3</p>
          <p>Pending Contradictions: 2</p>
          <button className="button" onClick={handleScanSystem} disabled={loading}>
            {loading ? 'Scanning...' : 'Scan System'}
          </button>
        </div>

        <div className="ritual-card">
          <h2>Recent Logs</h2>
          <div className="log-container">
            {recentLogs.map((log, index) => (
              <div key={index} className={`log-entry log-type-${log.type}`}>
                <div className="log-timestamp">{new Date(log.timestamp).toLocaleString()}</div>
                <div className="log-content">{log.content}</div>
              </div>
            ))}
            {recentLogs.length === 0 && !loading && (
              <div className="log-entry">No logs found.</div>
            )}
            {loading && <div className="log-entry">Loading logs...</div>}
          </div>
          <Link to="/log" className="button secondary" style={{ marginTop: '1rem', display: 'inline-block' }}>
            View All Logs
          </Link>
        </div>

        <div className="ritual-card">
          <h2>Quick Actions</h2>
          <div className="quick-actions">
            <Link to="/veil" className="button secondary">Invoke Veil</Link>
            <Link to="/cast" className="button secondary">Cast Spell</Link>
            <Link to="/cut" className="button secondary">Cut Contradiction</Link>
            <Link to="/glyphs" className="button secondary">View Glyphs</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;