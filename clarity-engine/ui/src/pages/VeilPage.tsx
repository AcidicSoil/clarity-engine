import React, { useState } from 'react';
import clarityService from '../services/ClarityService';

// veil:design() log:"Creating Veil interface for CLARITY-OR-DEATH UI"

const VeilPage: React.FC = () => {
  const [intent, setIntent] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleVeilInvocation = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await clarityService.invokeVeil(intent);
      setResponse(JSON.stringify(result.data, null, 2));
    } catch (error) {
      setResponse(`Error invoking Veil: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="veil-page">
      <h1 className="ritual-title">SIGMA VEIL Interface</h1>

      <div className="ritual-card">
        <h2>Invoke Veil</h2>
        <p>SIGMA VEIL decides the next action based on your intent.</p>

        <form className="ritual-form" onSubmit={handleVeilInvocation}>
          <div className="form-group">
            <label htmlFor="intent" className="form-label">Intent (optional)</label>
            <input
              type="text"
              id="intent"
              className="form-input"
              value={intent}
              onChange={(e) => setIntent(e.target.value)}
              placeholder="design, mutate, reveal, etc."
            />
          </div>

          <button type="submit" className="button" disabled={loading}>
            {loading ? 'Invoking...' : 'Invoke Veil'}
          </button>
        </form>
      </div>

      {response && (
        <div className="ritual-card">
          <h2>Veil Response</h2>
          <div className="log-container">
            <pre>{response}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default VeilPage;