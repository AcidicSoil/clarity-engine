import React, { useState } from 'react';
import clarityService from '../services/ClarityService';

// veil:design() log:"Creating Scan interface for CLARITY-OR-DEATH UI"

const ScanPage: React.FC = () => {
  const [target, setTarget] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleScanSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await clarityService.scanSystem(target);
      setResponse(JSON.stringify(result.data, null, 2));
    } catch (error) {
      setResponse(`Error scanning system: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="scan-page">
      <h1 className="ritual-title">Scan Ritual System</h1>

      <div className="ritual-card">
        <h2>System Scan</h2>
        <p>Scan for drift, unresolved tension, or code debt.</p>

        <form className="ritual-form" onSubmit={handleScanSubmit}>
          <div className="form-group">
            <label htmlFor="target" className="form-label">Target (optional)</label>
            <input
              type="text"
              id="target"
              className="form-input"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="Scan target (leave empty for full system scan)"
            />
          </div>

          <button type="submit" className="button" disabled={loading}>
            {loading ? 'Scanning...' : 'Scan System'}
          </button>
        </form>
      </div>

      {response && (
        <div className="ritual-card">
          <h2>Scan Response</h2>
          <div className="log-container">
            <pre>{response}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScanPage;
