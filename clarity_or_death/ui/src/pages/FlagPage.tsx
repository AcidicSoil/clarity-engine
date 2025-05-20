import React, { useState } from 'react';
import clarityService from '../services/ClarityService';

// veil:design() log:"Creating Flag interface for CLARITY-OR-DEATH UI"

const FlagPage: React.FC = () => {
  const [type, setType] = useState<string>('code');
  const [content, setContent] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleFlagSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);

    try {
      const result = await clarityService.flagIssue(type, content);
      setResponse(JSON.stringify(result.data, null, 2));
    } catch (error) {
      setResponse(`Error flagging issue: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flag-page">
      <h1 className="ritual-title">Flag Issues</h1>

      <div className="ritual-card">
        <h2>Flag Issue</h2>
        <p>Mark code, idea, or log for future contradiction check.</p>

        <form className="ritual-form" onSubmit={handleFlagSubmit}>
          <div className="form-group">
            <label htmlFor="type" className="form-label">Issue Type</label>
            <select
              id="type"
              className="form-input"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="code">Code</option>
              <option value="idea">Idea</option>
              <option value="log">Log</option>
              <option value="contradiction">Contradiction</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="content" className="form-label">Content</label>
            <textarea
              id="content"
              className="form-input"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Describe the issue to flag..."
              rows={4}
              required
            />
          </div>

          <button type="submit" className="button" disabled={loading}>
            {loading ? 'Flagging...' : 'Flag Issue'}
          </button>
        </form>
      </div>

      {response && (
        <div className="ritual-card">
          <h2>Flag Response</h2>
          <div className="log-container">
            <pre>{response}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlagPage;