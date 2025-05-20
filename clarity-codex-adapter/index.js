// CLARITY-OR-DEATH Codex Adapter
// veil:design() log:"Creating adapter for Open Codex CLI integration"

const axios = require('axios');

class ClarityCodexAdapter {
  constructor(config = {}) {
    this.baseURL = config.baseURL || 'http://localhost:4621';
    this.ritualEndpoint = config.ritualEndpoint || '/ritual';
    this.debug = config.debug || false;
  }

  async initialize() {
    try {
      const response = await axios.get(`${this.baseURL}/ritual/health`);
      if (response.data.status === 'OPERATIONAL') {
        console.log('✅ Connected to CLARITY-OR-DEATH ActionsGPT Server');
        return true;
      }
      return false;
    } catch (error) {
      console.error('❌ Failed to connect to CLARITY-OR-DEATH ActionsGPT Server');
      console.error(error.message);
      return false;
    }
  }

  async executeRitual(ritual, params = {}) {
    try {
      const endpoint = `${this.baseURL}${this.ritualEndpoint}/${ritual}`;
      if (this.debug) console.log(`Executing ritual: ${ritual} with params:`, params);

      const response = await axios.post(endpoint, params);
      return response.data;
    } catch (error) {
      console.error(`❌ Error executing ritual "${ritual}"`);
      console.error(error.message);
      throw error;
    }
  }

  // Mapping Open Codex commands to CLARITY-OR-DEATH rituals
  async processCodexCommand(command, args) {
    // Command mapping
    const commandMap = {
      'help': 'help',
      'veil': 'veil',
      'cast': 'castEntropy',
      'cut': 'cut',
      'scan': 'scan',
      'log': 'log',
      'query': 'query',
      'save': 'save',
      'dashboard': 'dashboard'
    };

    const ritual = commandMap[command] || command;
    return this.executeRitual(ritual, args);
  }

  // Integration with Codex CLI hooks
  registerCodexHooks(codex) {
    codex.registerCommand('clarity', async (args) => {
      const [subCommand, ...restArgs] = args;
      return this.processCodexCommand(subCommand, restArgs);
    });

    // Add more hooks as needed
  }
}

module.exports = ClarityCodexAdapter;