import React, { useState } from 'react';
import clarityService from '../services/ClarityService';

// veil:design() log:"Creating Save interface for CLARITY-OR-DEATH UI"

const SavePage: React.FC = () => {
  const [label, setLabel] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSaveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await clarityService.saveState(label);
      setResponse(JSON.stringify(result.data, null, 2));
    } catch (error) {
      setResponse(`Error saving state: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="save-page">
      <h1 className="ritual-title">Save System State</h1>

      <div className="ritual-card">
        <h2>Save State</h2>
        <p>Snapshot current project or ritual state.</p>

        <form className="ritual-form" onSubmit={handleSaveSubmit}>
          <div className="form-group">
            <label htmlFor="label" className="form-label">Snapshot Label (optional)</label>
            <input
              type="text"
              id="label"
              className="form-input"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Enter a label for this snapshot"
            />
          </div>

          <button type="submit" className="button" disabled={loading}>
            {loading ? 'Saving...' : 'Save State'}
          </button>
        </form>
      </div>

      {response && (
        <div className="ritual-card">
          <h2>Save Response</h2>
          <div className="log-container">
            <pre>{response}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavePage;