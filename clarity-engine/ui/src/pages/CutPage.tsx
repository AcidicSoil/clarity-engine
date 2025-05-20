import React, { useState } from 'react';
import clarityService from '../services/ClarityService';

// veil:design() log:"Creating Cut interface for CLARITY-OR-DEATH UI"

const CutPage: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleCut = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);

    try {
      const result = await clarityService.cutContradiction(input);
      setResponse(JSON.stringify(result.data, null, 2));
    } catch (error) {
      setResponse(`Error cutting contradiction: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cut-page">
      <h1 className="ritual-title">Cut Contradiction</h1>

      <div className="ritual-card">
        <h2>Interrogate Contradiction</h2>
        <p>Interrogate or collapse an idea or tension.</p>

        <form className="ritual-form" onSubmit={handleCut}>
          <div className="form-group">
            <label htmlFor="input" className="form-label">Contradiction Input</label>
            <textarea
              id="input"
              className="form-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe the contradiction, tension, or idea to interrogate..."
              rows={4}
              required
            />
          </div>

          <button type="submit" className="button" disabled={loading}>
            {loading ? 'Cutting...' : 'Cut Contradiction'}
          </button>
        </form>
      </div>

      {response && (
        <div className="ritual-card">
          <h2>Cut Response</h2>
          <div className="log-container">
            <pre>{response}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default CutPage;