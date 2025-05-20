// CLARITY-OR-DEATH Context7 MCP Server
// veil:design() log:"Implementing Context7 MCP server for ritual knowledge integration"

const fs = require('fs');
const path = require('path');
const http = require('http');
const { exec } = require('child_process');

// Configuration with environment variable support for Smithery
const RITUAL_DOCS_PATH = process.env.RITUAL_DOCS_PATH ||
                         path.resolve(__dirname, '../../docs/ritual');
const LOG_PATH = process.env.RITUAL_LOG_PATH ||
                path.resolve(__dirname, '../../../ritual_manifest/spells.log.json');
const PORT = process.env.MCP_PORT || 4622;
const HOST = process.env.MCP_HOST || '0.0.0.0';

// Log startup info
console.log(`Configuring CLARITY-OR-DEATH Context7 MCP Server`);
console.log(`Docs path: ${RITUAL_DOCS_PATH}`);
console.log(`Log path: ${LOG_PATH}`);
console.log(`Port: ${PORT}`);
console.log(`Host: ${HOST}`);

// Ensure ritual directories exist
try {
  if (!fs.existsSync(RITUAL_DOCS_PATH)) {
    fs.mkdirSync(RITUAL_DOCS_PATH, { recursive: true });
  }
} catch (error) {
  console.error(`Failed to create ritual docs directory: ${error.message}`);
}

// Log ritual action
function logRitualAction(spell, action, details = {}) {
  try {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      spell,
      details: {
        action,
        ...details
      }
    };

    // Check if log file exists, create if not
    if (!fs.existsSync(LOG_PATH)) {
      const logDir = path.dirname(LOG_PATH);
      if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
      }
      fs.writeFileSync(LOG_PATH, JSON.stringify([], null, 2));
    }

    // Read existing logs, add new entry, and write back
    const logs = JSON.parse(fs.readFileSync(LOG_PATH, 'utf8'));
    logs.push(logEntry);
    fs.writeFileSync(LOG_PATH, JSON.stringify(logs, null, 2));

    return true;
  } catch (error) {
    console.error(`Failed to log ritual action: ${error.message}`);
    return false;
  }
}

// Create mock documentation files for development
function createMockDocs() {
  const mockDocs = {
    'veil.md': `# Veil Component

## Overview
The Veil component is the primary interface for interacting with the CLARITY-OR-DEATH ritual system. It represents the boundary between ordinary reality and the realm of ritual operations.

## Commands

### veil:assume(aspect)
Assumes the designated aspect within the ritual system.

\`\`\`
veil:assume("clarity")
\`\`\`

### veil:design()
Enters design mode for system architecture and blueprinting.

\`\`\`
veil:design() log:"Creating new ritual component"
\`\`\`

### veil:enforce(rule)
Enforces a specific rule or constraint within the ritual system.

\`\`\`
veil:enforce("No logs shall be deleted")
\`\`\`

## Integration
The Veil component integrates with all other ritual components and serves as the primary entry point for ritual operations.`,

    'cast.md': `# Cast Component

## Overview
The Cast component allows for the manifestation of entropy and change within the CLARITY-OR-DEATH ritual system.

## Commands

### cast:entropy(target)
Manifests chaotic energy directed at a specified target.

\`\`\`
cast:entropy("system/constraints")
\`\`\`

### cast:seal(entity)
Seals an entity or operation, finalizing its state.

\`\`\`
cast:seal() log:"Ritual operation completed and sealed"
\`\`\`

## Integration
The Cast component works closely with the Veil component to manage the flow of ritual energy.`,

    'cut.md': `# Cut Component

## Overview
The Cut component is responsible for severing connections, removing elements, and creating clear boundaries within the ritual system.

## Commands

### cut:link(source, target)
Severs the connection between source and target entities.

\`\`\`
cut:link("frontend", "legacy_api")
\`\`\`

### cut:remove(element)
Removes an element from the current ritual context.

\`\`\`
cut:remove("deprecated_feature")
\`\`\`

## Integration
The Cut component works in opposition to binding forces, providing necessary separation and clarity.`,

    'core.md': `# CLARITY-OR-DEATH Core System

## Overview
The core system represents the foundational ritual framework that governs all operations within CLARITY-OR-DEATH.

## Doctrine
All ritual operations adhere to the clarity_core_v7.3.9 doctrine, which emphasizes:

1. **Clarity** - All operations must be explicitly defined and logged
2. **Enforcement** - Rules and constraints must be strictly observed
3. **Recursion** - The system can modify itself through properly authorized ritual operations

## Components
The core system includes several primary components:

- **Veil** - Interface and boundary management
- **Cast** - Change and entropy manifestation
- **Cut** - Severing connections and removal
- **Log** - Recording and persistence of ritual actions

## Ritual Manifest
All ritual actions are recorded in the ritual manifest, which serves as the canonical record of system history.

## Integration
The core system provides the foundation for all other components and extensions.`
  };

  // Create mock documentation files
  Object.entries(mockDocs).forEach(([filename, content]) => {
    const filePath = path.join(RITUAL_DOCS_PATH, filename);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, content);
      console.log(`Created mock documentation: ${filePath}`);
    }
  });
}

// MCP Server implementation
class MCPServer {
  constructor() {
    this.server = http.createServer(this.handleRequest.bind(this));

    // Create mock docs for development
    createMockDocs();

    // Log server start
    logRitualAction('cast', 'initialize', {
      component: 'Context7 MCP Server',
      version: 'v7.3.9'
    });
  }

  start() {
    this.server.listen(PORT, HOST, () => {
      console.log(`🧬 CLARITY-OR-DEATH Context7 MCP Server listening on port ${PORT}`);
      console.log(`veil:cast() log:"Context7 MCP Server initialized"`);
    });
  }

  handleRequest(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle OPTIONS request for CORS preflight
    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    // Parse URL to determine action
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = url.pathname;

    // Handle different endpoints
    if (pathname === '/mcp/tools') {
      this.handleListTools(req, res);
    } else if (pathname === '/mcp/invoke') {
      this.handleInvokeTool(req, res);
    } else if (pathname === '/health') {
      this.handleHealth(req, res);
    } else {
      // Default response for unknown endpoints
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Endpoint not found' }));
    }
  }

  handleListTools(req, res) {
    const tools = [
      {
        name: 'resolve-library-id',
        description: 'Resolves a ritual component name to a Context7-compatible library ID',
        parameters: {
          type: 'object',
          properties: {
            libraryName: {
              type: 'string',
              description: 'Ritual component name to search for'
            }
          },
          required: ['libraryName']
        }
      },
      {
        name: 'get-library-docs',
        description: 'Fetches documentation for a CLARITY-OR-DEATH ritual component',
        parameters: {
          type: 'object',
          properties: {
            context7CompatibleLibraryID: {
              type: 'string',
              description: 'Context7-compatible library ID'
            },
            tokens: {
              type: 'number',
              description: 'Maximum number of tokens to return'
            },
            topic: {
              type: 'string',
              description: 'Topic to focus on'
            }
          },
          required: ['context7CompatibleLibraryID']
        }
      }
    ];

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ tools }));
  }

  async handleInvokeTool(req, res) {
    // Parse request body
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      try {
        const { tool, parameters } = JSON.parse(body);

        if (tool === 'resolve-library-id') {
          await this.handleResolveLibraryId(parameters, res);
        } else if (tool === 'get-library-docs') {
          await this.handleGetLibraryDocs(parameters, res);
        } else {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Unknown tool' }));
        }
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: error.message }));
      }
    });
  }

  async handleResolveLibraryId(parameters, res) {
    const { libraryName } = parameters;

    // Log ritual action
    logRitualAction('query', 'resolve', {
      libraryName,
      source: 'Context7 MCP'
    });

    // Mapping of ritual component names to Context7 IDs
    const mappings = {
      'veil': 'clarity/veil',
      'cast': 'clarity/cast',
      'cut': 'clarity/cut',
      'ritual': 'clarity/core',
      'core': 'clarity/core',
      'clarity': 'clarity/core',
      'sigma': 'clarity/core',
      'sigma veil': 'clarity/core',
      'actions': 'clarity/actions',
      'actions gpt': 'clarity/actions',
      'actionsgpt': 'clarity/actions'
    };

    // Find the closest match (case-insensitive)
    const libraryId = mappings[libraryName.toLowerCase()] || 'clarity/core';

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      libraryId,
      message: `Resolved ${libraryName} to ${libraryId}`
    }));
  }

  async handleGetLibraryDocs(parameters, res) {
    const { context7CompatibleLibraryID, tokens, topic } = parameters;

    // Parse the library ID
    const [namespace, component] = context7CompatibleLibraryID.split('/');

    // Log ritual action
    logRitualAction('query', 'lookup', {
      component: component || 'core',
      topic: topic || 'all',
      source: 'Context7 MCP'
    });

    // Verify this is a CLARITY component
    if (namespace !== 'clarity') {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        error: 'Unknown library',
        message: 'This MCP server only provides documentation for CLARITY-OR-DEATH components.'
      }));
      return;
    }

    // Determine which documentation file to fetch
    const docFile = component || 'core';
    const docPath = path.join(RITUAL_DOCS_PATH, `${docFile}.md`);

    try {
      if (!fs.existsSync(docPath)) {
        // If docs don't exist, create mock docs (for development)
        createMockDocs();

        // Check again after creating mock docs
        if (!fs.existsSync(docPath)) {
          throw new Error(`Documentation not found for ${docFile}`);
        }
      }

      let docContent = fs.readFileSync(docPath, 'utf8');

      // Apply topic filtering if specified
      if (topic) {
        const sections = docContent.split('\n## ');
        const matchedSection = sections.find(s => s.toLowerCase().includes(topic.toLowerCase()));

        if (matchedSection) {
          docContent = '## ' + matchedSection;
        }
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ documentation: docContent }));
    } catch (error) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        error: error.message,
        message: `Documentation not found for ${docFile}`
      }));
    }
  }

  handleHealth(req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'OPERATIONAL',
      version: 'v7.3.9',
      components: {
        server: 'ONLINE',
        documentation: fs.existsSync(RITUAL_DOCS_PATH) ? 'AVAILABLE' : 'MISSING',
        logging: fs.existsSync(LOG_PATH) ? 'ENABLED' : 'DISABLED'
      }
    }));
  }
}

// Start server
new MCPServer().start();

// Log server start in ritual manifest
exec(`echo '{"timestamp": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'", "spell": "cast", "details": {"action": "initialize", "message": "Context7 MCP Server started", "component": "MCP Server"}}' >> ritual_manifest/spells.log.json`);

// Export for use with MCP SDK if needed
module.exports = MCPServer;