import React, { useState } from 'react';
import clarityService from '../services/ClarityService';

// veil:design() log:"Creating Log interface for CLARITY-OR-DEATH UI"

const LogPage: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);

    try {
      const result = await clarityService.logMessage(message);
      setResponse(JSON.stringify(result.data, null, 2));
      // Clear the form on success
      setMessage('');
    } catch (error) {
      setResponse(`Error logging message: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="log-page">
      <h1 className="ritual-title">Ritual Log System</h1>

      <div className="ritual-card">
        <h2>Create Log Entry</h2>
        <p>Log a manifestation, contradiction, or outcome.</p>

        <form className="ritual-form" onSubmit={handleLogMessage}>
          <div className="form-group">
            <label htmlFor="message" className="form-label">Log Message</label>
            <textarea
              id="message"
              className="form-input"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter the log message..."
              rows={4}
              required
            />
          </div>

          <button type="submit" className="button" disabled={loading}>
            {loading ? 'Logging...' : 'Log Message'}
          </button>
        </form>
      </div>

      {response && (
        <div className="ritual-card">
          <h2>Log Response</h2>
          <div className="log-container">
            <pre>{response}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogPage;