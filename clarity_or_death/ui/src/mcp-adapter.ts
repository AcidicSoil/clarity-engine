/**
 * CLARITY-OR-DEATH MCP Server TypeScript Adapter
 * ----------------------------------------------
 * This adapter provides a TypeScript interface for the CLARITY-OR-DEATH MCP server,
 * following the patterns from the Smithery SDK.
 *
 * veil:design() log:"Creating MCP adapter for CLARITY-OR-DEATH UI"
 */

/**
 * ClarityMCP acts as an adapter between the UI and the Clarity MCP system.
 * It provides a standard interface for ritual operations.
 */
export class ClarityMCP {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  /**
   * Make a general MCP API call
   */
  private async callMcpApi(endpoint: string, method: string = 'GET', data?: any): Promise<any> {
    try {
      const options: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      };

      if (data && (method === 'POST' || method === 'PUT')) {
        options.body = JSON.stringify(data);
      }

      const response = await fetch(`${this.baseUrl}/${endpoint}`, options);

      if (!response.ok) {
        throw new Error(`MCP API call failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error calling MCP API (${endpoint}):`, error);
      throw error;
    }
  }

  // RITUAL COMMAND INTERFACE

  /**
   * Veil operation - System design and governance
   */
  async veil(params: { intent?: string }): Promise<any> {
    return this.callMcpApi('ritual/veil', 'POST', params);
  }

  /**
   * Cast operation - Execute a ritual spell
   */
  async cast(params: { spell: string }): Promise<any> {
    return this.callMcpApi('ritual/cast', 'POST', params);
  }

  /**
   * Log operation - Record a ritual log entry
   */
  async log(params: { message: string }): Promise<any> {
    return this.callMcpApi('ritual/log', 'POST', params);
  }

  /**
   * Cut operation - Resolve a contradiction
   */
  async cut(params: { input: string }): Promise<any> {
    return this.callMcpApi('ritual/cut', 'POST', params);
  }

  /**
   * Query operation - Search ritual logs and artifacts
   */
  async query(params: { query: string }): Promise<any> {
    return this.callMcpApi('ritual/query', 'POST', params);
  }

  /**
   * Scan operation - Scan for drift or contradictions
   */
  async scan(params: { target?: string }): Promise<any> {
    return this.callMcpApi('ritual/scan', 'POST', params);
  }

  /**
   * Flag operation - Mark an issue for later investigation
   */
  async flag(params: { type: string, content: string }): Promise<any> {
    return this.callMcpApi('ritual/flag', 'POST', params);
  }

  /**
   * Save operation - Snapshot current state
   */
  async save(params: { label?: string }): Promise<any> {
    return this.callMcpApi('ritual/save', 'POST', params);
  }

  /**
   * Dashboard operation - Open ritual dashboard
   */
  async dashboard(params: { view?: string }): Promise<any> {
    return this.callMcpApi('ritual/dashboard', 'POST', params);
  }

  // SYSTEM OPERATIONS

  /**
   * Get available tools and actions
   */
  async getTools(): Promise<any> {
    return this.callMcpApi('system/tools');
  }

  /**
   * Get server API specification
   */
  async getOpenAPI(): Promise<any> {
    return this.callMcpApi('system/openapi');
  }

  /**
   * Ping the server to check connection
   */
  async ping(): Promise<{ status: string, timestamp: string }> {
    return this.callMcpApi('system/ping');
  }
}

// Example usage:
/*
const clarityMCP = new ClarityMCP();

// Invoke the veil
clarityMCP.veil({ intent: 'design' })
  .then(response => console.log(response.data))
  .catch(error => console.error(error));

// Cast a spell
clarityMCP.cast({ spell: 'refactor' })
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
*/

export default ClarityMCP;