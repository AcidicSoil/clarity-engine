import React, { useState } from 'react';
import clarityService from '../services/ClarityService';

// veil:design() log:"Creating Query interface for CLARITY-OR-DEATH UI"

const QueryPage: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleQuerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);

    try {
      const result = await clarityService.runQuery(query);
      setResponse(JSON.stringify(result.data, null, 2));
    } catch (error) {
      setResponse(`Error running query: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="query-page">
      <h1 className="ritual-title">Query Ritual System</h1>

      <div className="ritual-card">
        <h2>Search Ritual Archives</h2>
        <p>Search all ritual logs, glyphs, or artifacts.</p>

        <form className="ritual-form" onSubmit={handleQuerySubmit}>
          <div className="form-group">
            <label htmlFor="query" className="form-label">Query</label>
            <input
              type="text"
              id="query"
              className="form-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter query..."
              required
            />
          </div>

          <button type="submit" className="button" disabled={loading}>
            {loading ? 'Searching...' : 'Run Query'}
          </button>
        </form>
      </div>

      {response && (
        <div className="ritual-card">
          <h2>Query Response</h2>
          <div className="log-container">
            <pre>{response}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default QueryPage;