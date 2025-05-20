import React, { useState, useEffect } from 'react';
import clarityService from './src/services/ClarityService';

// veil:design() log:"Creating agentic UI controller for system interactions"

/**
 * AgenticUIController handles the interaction between the UI and agent system.
 * It maintains state related to active agents, processing status, and
 * ritual interactions with the CLARITY-OR-DEATH system.
 */
const AgenticUIController = () => {
  const [activeAgents, setActiveAgents] = useState([]);
  const [systemStatus, setSystemStatus] = useState('idle');
  const [notifications, setNotifications] = useState([]);
  const [ritualContext, setRitualContext] = useState({});

  useEffect(() => {
    // Initialize connection to clarity service
    initializeAgentSystem();

    // Poll for agent updates
    const interval = setInterval(() => {
      pollAgentStatus();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const initializeAgentSystem = async () => {
    try {
      const status = await clarityService.checkSystemStatus();
      setSystemStatus(status.state);

      // If connected, fetch active agents
      if (status.state === 'connected') {
        const agents = await clarityService.getActiveAgents();
        setActiveAgents(agents);
      }
    } catch (error) {
      console.error('Failed to initialize agent system:', error);
      addNotification({
        type: 'error',
        message: 'Failed to initialize agent system',
        details: error.message
      });
    }
  };

  const pollAgentStatus = async () => {
    try {
      const status = await clarityService.checkSystemStatus();
      setSystemStatus(status.state);

      // Update agent information
      if (status.state === 'connected') {
        const agents = await clarityService.getActiveAgents();
        setActiveAgents(agents);
      }
    } catch (error) {
      console.error('Error polling agent status:', error);
    }
  };

  const activateAgent = async (agentType, parameters) => {
    try {
      setSystemStatus('processing');
      const result = await clarityService.activateAgent(agentType, parameters);

      if (result.success) {
        addNotification({
          type: 'success',
          message: `Agent ${agentType} activated successfully`,
          details: result.agentId
        });

        // Refresh agent list
        const agents = await clarityService.getActiveAgents();
        setActiveAgents(agents);
      } else {
        addNotification({
          type: 'error',
          message: `Failed to activate agent ${agentType}`,
          details: result.error
        });
      }

      setSystemStatus('idle');
      return result;
    } catch (error) {
      console.error(`Error activating agent ${agentType}:`, error);
      addNotification({
        type: 'error',
        message: `Error activating agent ${agentType}`,
        details: error.message
      });
      setSystemStatus('idle');
      throw error;
    }
  };

  const executeRitual = async (ritualType, params) => {
    try {
      setSystemStatus('processing');

      // Update ritual context
      setRitualContext({
        type: ritualType,
        params,
        startTime: new Date().toISOString()
      });

      const result = await clarityService.executeRitual(ritualType, params);

      // Update ritual context with result
      setRitualContext(prev => ({
        ...prev,
        result,
        endTime: new Date().toISOString()
      }));

      addNotification({
        type: result.success ? 'success' : 'warning',
        message: `Ritual ${ritualType} ${result.success ? 'completed' : 'failed'}`,
        details: result.message
      });

      setSystemStatus('idle');
      return result;
    } catch (error) {
      console.error(`Error executing ritual ${ritualType}:`, error);

      // Update ritual context with error
      setRitualContext(prev => ({
        ...prev,
        error: error.message,
        endTime: new Date().toISOString()
      }));

      addNotification({
        type: 'error',
        message: `Error executing ritual ${ritualType}`,
        details: error.message
      });

      setSystemStatus('idle');
      throw error;
    }
  };

  const addNotification = (notification) => {
    const id = Date.now();
    setNotifications(prev => [
      { id, timestamp: new Date().toISOString(), ...notification },
      ...prev
    ].slice(0, 50)); // Keep only the most recent 50 notifications
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return {
    // State
    activeAgents,
    systemStatus,
    notifications,
    ritualContext,

    // Methods
    activateAgent,
    executeRitual,
    addNotification,
    clearNotifications
  };
};

export default AgenticUIController;