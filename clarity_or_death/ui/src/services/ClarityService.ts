import { ClarityMCP } from '../mcp-adapter';

// veil:design() log:"Creating service layer for CLARITY-OR-DEATH UI"

interface LogEntry {
  timestamp: string;
  type: string;
  content: string;
  metadata?: any;
}

interface SystemStatus {
  state: 'disconnected' | 'connected' | 'error';
  message: string;
}

interface Agent {
  id: string;
  type: string;
  status: string;
  startTime: string;
  lastActive: string;
}

interface RitualResult {
  success: boolean;
  message: string;
  data?: any;
}

// Define process.env types
declare const process: {
  env: {
    NODE_ENV: 'development' | 'production' | 'test';
  }
};

/**
 * Service for interfacing with the CLARITY-OR-DEATH backend system.
 * Handles communication with the ritual system, agent management,
 * and log retrieval.
 */
class ClarityService {
  private apiUrl: string;
  private mcpClient: ClarityMCP;

  constructor() {
    // In development, use localhost; in production, use relative URL
    this.apiUrl = process.env.NODE_ENV === 'production'
      ? '/api'
      : 'http://localhost:5000/api';
    this.mcpClient = new ClarityMCP('http://localhost:4621');
  }

  /**
   * Check the status of the system
   */
  async checkSystemStatus(): Promise<SystemStatus> {
    try {
      const response = await fetch(`${this.apiUrl}/status`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error checking system status:', error);
      return {
        state: 'error',
        message: 'Failed to connect to Clarity system'
      };
    }
  }

  /**
   * Retrieve ritual logs from the system
   */
  async getRitualLogs(): Promise<LogEntry[]> {
    try {
      const response = await fetch(`${this.apiUrl}/logs`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching ritual logs:', error);
      // For demo/development, return sample logs
      if (process.env.NODE_ENV === 'development') {
        return this.getSampleLogs();
      }
      throw error;
    }
  }

  /**
   * Execute a ritual operation
   */
  async executeRitual(ritualType: string, params: any): Promise<RitualResult> {
    try {
      const response = await fetch(`${this.apiUrl}/ritual/${ritualType}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      });
      return await response.json();
    } catch (error) {
      console.error(`Error executing ritual ${ritualType}:`, error);
      throw error;
    }
  }

  /**
   * Get active agents in the system
   */
  async getActiveAgents(): Promise<Agent[]> {
    try {
      const response = await fetch(`${this.apiUrl}/agents`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching active agents:', error);
      // For development, return sample data
      if (process.env.NODE_ENV === 'development') {
        return this.getSampleAgents();
      }
      throw error;
    }
  }

  /**
   * Activate a new agent
   */
  async activateAgent(agentType: string, parameters: any): Promise<any> {
    try {
      const response = await fetch(`${this.apiUrl}/agents/activate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: agentType,
          parameters
        })
      });
      return await response.json();
    } catch (error) {
      console.error(`Error activating agent ${agentType}:`, error);
      throw error;
    }
  }

  /**
   * Get ritual glyphs from the system
   */
  async getGlyphs(): Promise<any[]> {
    try {
      const response = await fetch(`${this.apiUrl}/glyphs`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching glyphs:', error);
      // For development, return sample data
      if (process.env.NODE_ENV === 'development') {
        return this.getSampleGlyphs();
      }
      throw error;
    }
  }

  /**
   * Log a ritual action to the system
   */
  async logRitualAction(type: string, content: string, metadata?: any): Promise<any> {
    try {
      const response = await fetch(`${this.apiUrl}/logs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type,
          content,
          metadata,
          timestamp: new Date().toISOString()
        })
      });
      return await response.json();
    } catch (error) {
      console.error('Error logging ritual action:', error);
      throw error;
    }
  }

  // Veil operations
  async invokeVeil(intent?: string) {
    return this.mcpClient.veil({ intent });
  }

  // Cast operations
  async castSpell(spell: string) {
    return this.mcpClient.cast({ spell });
  }

  // Log operations
  async logMessage(message: string) {
    return this.mcpClient.log({ message });
  }

  // Cut operations
  async cutContradiction(input: string) {
    return this.mcpClient.cut({ input });
  }

  // Query operations
  async runQuery(query: string) {
    return this.mcpClient.query({ query });
  }

  // Scan operations
  async scanDrift(target?: string) {
    return this.mcpClient.scan({ target });
  }

  // Flag operations
  async flagIssue(type: string, content: string) {
    return this.mcpClient.flag({ type, content });
  }

  // Save operations
  async saveState(label?: string) {
    return this.mcpClient.save({ label });
  }

  // Dashboard operations
  async openDashboard(view?: string) {
    return this.mcpClient.dashboard({ view });
  }

  // Get available tools
  async getTools() {
    return this.mcpClient.getTools();
  }

  // Get server OpenAPI spec
  async getOpenAPI() {
    return this.mcpClient.getOpenAPI();
  }

  // Sample data for development/demo purposes
  private getSampleLogs(): LogEntry[] {
    return [
      {
        timestamp: new Date().toISOString(),
        type: 'veil',
        content: 'veil:design() log:"UI system initialized"'
      },
      {
        timestamp: new Date(Date.now() - 100000).toISOString(),
        type: 'cast',
        content: 'cast:render log:"Dashboard component rendered"'
      },
      {
        timestamp: new Date(Date.now() - 200000).toISOString(),
        type: 'log',
        content: 'log:"Ritual system connected to MCP server"'
      },
      {
        timestamp: new Date(Date.now() - 300000).toISOString(),
        type: 'cut',
        content: 'cut:"Why is this agent logic duplicated?" flag:logic'
      },
      {
        timestamp: new Date(Date.now() - 400000).toISOString(),
        type: 'scan',
        content: 'scan:drift log:"Found 2 unresolved contradictions"'
      }
    ];
  }

  private getSampleAgents(): Agent[] {
    return [
      {
        id: 'agent-001',
        type: 'observer',
        status: 'active',
        startTime: new Date(Date.now() - 3600000).toISOString(),
        lastActive: new Date().toISOString()
      },
      {
        id: 'agent-002',
        type: 'executor',
        status: 'idle',
        startTime: new Date(Date.now() - 7200000).toISOString(),
        lastActive: new Date(Date.now() - 1800000).toISOString()
      }
    ];
  }

  private getSampleGlyphs(): any[] {
    return [
      {
        id: 'glyph-001',
        name: 'CLARITY_CORE',
        description: 'Core system glyph for ritual invocation',
        content: 'Defines the core principles of clarity within the system.'
      },
      {
        id: 'glyph-002',
        name: 'VEIL_SIGMA',
        description: 'Governance glyph for system mutation',
        content: 'Controls how the system can mutate and evolve over time.'
      },
      {
        id: 'glyph-003',
        name: 'RITUAL_ANCHOR',
        description: 'Anchors rituals to the system state',
        content: 'Provides a stable reference point for ritual actions.'
      }
    ];
  }
}

// Create and export a singleton instance
const clarityService = new ClarityService();
export default clarityService;