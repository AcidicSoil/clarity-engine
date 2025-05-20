import React, { useState, useEffect } from 'react';
import clarityService from '../services/ClarityService';
import { useNotifications } from '../context/NotificationContext';

// veil:design() log:"Creating AgenticUIController for agent interaction"

interface Agent {
  id: string;
  type: string;
  status: string;
  startTime: string;
  lastActive: string;
}

interface AgenticUIControllerProps {
  onAgentAction?: (action: string, result: any) => void;
}

const AgenticUIController: React.FC<AgenticUIControllerProps> = ({ onAgentAction }) => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeAgentId, setActiveAgentId] = useState<string | null>(null);
  const [agentCommand, setAgentCommand] = useState<string>('');
  const { addNotification } = useNotifications();

  useEffect(() => {
    loadAgents();
  }, []);

  const loadAgents = async () => {
    try {
      setLoading(true);
      const agentData = await clarityService.getActiveAgents();
      setAgents(agentData);
      setLoading(false);
    } catch (error) {
      console.error('Error loading agents:', error);
      addNotification({
        type: 'error',
        message: 'Failed to load agents',
        details: error instanceof Error ? error.message : String(error)
      });
      setLoading(false);
    }
  };

  const activateAgent = async (agentType: string) => {
    try {
      setLoading(true);
      const result = await clarityService.activateAgent(agentType, {});
      addNotification({
        type: 'success',
        message: `Agent ${agentType} activated`,
      });
      loadAgents();
      if (onAgentAction) {
        onAgentAction('activate', result);
      }
    } catch (error) {
      console.error('Error activating agent:', error);
      addNotification({
        type: 'error',
        message: 'Failed to activate agent',
        details: error instanceof Error ? error.message : String(error)
      });
      setLoading(false);
    }
  };

  const sendCommand = async () => {
    if (!activeAgentId || !agentCommand.trim()) {
      return;
    }

    try {
      setLoading(true);
      const result = await clarityService.executeRitual('command', {
        agentId: activeAgentId,
        command: agentCommand
      });

      addNotification({
        type: 'success',
        message: 'Command executed',
        details: result.message
      });

      setAgentCommand('');
      setLoading(false);

      if (onAgentAction) {
        onAgentAction('command', result);
      }
    } catch (error) {
      console.error('Error sending command:', error);
      addNotification({
        type: 'error',
        message: 'Failed to execute command',
        details: error instanceof Error ? error.message : String(error)
      });
      setLoading(false);
    }
  };

  return (
    <div className="ritual-card agentic-controller">
      <h2>Agent Controller</h2>

      <div className="agent-list">
        {loading && <div className="loading-indicator">Loading agents...</div>}

        {!loading && agents.length === 0 && (
          <div className="empty-state">
            <p>No active agents found.</p>
            <div className="agent-actions">
              <button
                className="button secondary"
                onClick={() => activateAgent('observer')}
              >
                Activate Observer
              </button>
              <button
                className="button secondary"
                onClick={() => activateAgent('executor')}
              >
                Activate Executor
              </button>
            </div>
          </div>
        )}

        {!loading && agents.length > 0 && (
          <>
            <div className="agent-grid">
              {agents.map(agent => (
                <div
                  key={agent.id}
                  className={`agent-card ${activeAgentId === agent.id ? 'active' : ''}`}
                  onClick={() => setActiveAgentId(agent.id)}
                >
                  <div className="agent-header">
                    <span className={`status-indicator ${agent.status}`}>●</span>
                    <span className="agent-type">{agent.type}</span>
                  </div>
                  <div className="agent-id">{agent.id}</div>
                  <div className="agent-time">
                    Active: {new Date(agent.lastActive).toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>

            {activeAgentId && (
              <div className="command-interface">
                <h3>Agent Command</h3>
                <div className="command-input-group">
                  <input
                    type="text"
                    className="command-input"
                    value={agentCommand}
                    onChange={(e) => setAgentCommand(e.target.value)}
                    placeholder="Enter command for agent..."
                    disabled={loading}
                  />
                  <button
                    className="button"
                    onClick={sendCommand}
                    disabled={loading || !agentCommand.trim()}
                  >
                    Send
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AgenticUIController;