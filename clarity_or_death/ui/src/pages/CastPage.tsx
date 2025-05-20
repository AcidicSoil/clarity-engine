import React, { useState } from 'react';
import clarityService from '../services/ClarityService';

// veil:design() log:"Creating Cast interface for CLARITY-OR-DEATH UI"

const CastPage: React.FC = () => {
  const [spell, setSpell] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleCastSpell = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!spell.trim()) return;

    setLoading(true);

    try {
      const result = await clarityService.castSpell(spell);
      setResponse(JSON.stringify(result.data, null, 2));
    } catch (error) {
      setResponse(`Error casting spell: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cast-page">
      <h1 className="ritual-title">Cast Ritual Spell</h1>

      <div className="ritual-card">
        <h2>Cast Spell</h2>
        <p>Cast ritual spell or agentic function.</p>

        <form className="ritual-form" onSubmit={handleCastSpell}>
          <div className="form-group">
            <label htmlFor="spell" className="form-label">Spell</label>
            <input
              type="text"
              id="spell"
              className="form-input"
              value={spell}
              onChange={(e) => setSpell(e.target.value)}
              placeholder="refactor, merge, test, etc."
              required
            />
          </div>

          <button type="submit" className="button" disabled={loading}>
            {loading ? 'Casting...' : 'Cast Spell'}
          </button>
        </form>
      </div>

      {response && (
        <div className="ritual-card">
          <h2>Cast Response</h2>
          <div className="log-container">
            <pre>{response}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default CastPage;