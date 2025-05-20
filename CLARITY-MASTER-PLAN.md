# CLARITY-OR-DEATH Master Integration Plan

## veil:design() log:"Creating comprehensive integration architecture for CLARITY-OR-DEATH systems"

This master plan outlines the integration architecture for connecting CLARITY-OR-DEATH with multiple AI platforms and interfaces: Context7 MCP, ChatGPT, and Open Codex CLI.

## System Architecture

```
┌───────────────────────────────────────────────────────────────────────────┐
│                        CLARITY-OR-DEATH CORE SYSTEM                        │
└───────────────────────────────────┬───────────────────────────────────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    │               │               │
       ┌────────────▼────────────┐  │  ┌────────────▼────────────┐
       │                         │  │  │                         │
       │    ActionsGPT Server    │  │  │      MCP Server        │
       │    (PORT 4621)          │  │  │      (PORT 4622)       │
       │                         │  │  │                         │
       └────────────┬────────────┘  │  └────────────┬────────────┘
                    │               │               │
        ┌───────────┴───────────┐   │   ┌───────────┴───────────┐
        │                       │   │   │                       │
┌───────▼───────┐      ┌────────▼───┴───▼────────┐      ┌───────▼───────┐
│               │      │                         │      │               │
│  ChatGPT      │      │  CLARITY UI Dashboard   │      │  Context7 MCP │
│  Custom GPT   │      │  (PORT 3000)            │      │  Integration  │
│               │      │                         │      │               │
└───────────────┘      └─────────────────────────┘      └───────────────┘
                                   ▲
                                   │
                       ┌───────────┴───────────┐
                       │                       │
                       │    Open Codex CLI     │
                       │    Integration        │
                       │                       │
                       └───────────────────────┘
```

## Component Overview

### 1. Core System Components

| Component | Purpose | Location | Status |
|-----------|---------|----------|--------|
| ActionsGPT Server | External API for ChatGPT integration | `clarity_actionsGPT_server.py` | ✅ Active |
| MCP Server | Internal API for UI and integrations | `clarity_or_death/api/mcp_server/mcp_server.py` | ✅ Active |
| Ritual Manifest | Central log repository | `ritual_manifest/spells.log.json` | ✅ Active |
| UI Dashboard | Visual interface for ritual system | `clarity_or_death/ui/` | ✅ Active |

### 2. Integration Components

| Integration | Purpose | Status | Implementation |
|-------------|---------|--------|---------------|
| ChatGPT Custom GPT | Public AI assistant with ritual capabilities | ✅ Completed | OpenAPI-based Actions |
| Context7 MCP | Knowledge augmentation for AI assistants | 🚧 In Progress | MCP Protocol |
| Open Codex CLI | Terminal-based coding assistant | 🚧 In Progress | Node.js Adapter |

## Integration Plans

### Phase 1: ChatGPT Integration (Completed)

The ActionsGPT server exposes the CLARITY-OR-DEATH ritual API to ChatGPT through custom GPT Actions.

- ✅ Implement ActionsGPT server with all ritual endpoints
- ✅ Create OpenAPI specification for the API
- ✅ Configure proper CORS for external access
- ✅ Document the server setup and usage

### Phase 2: Open Codex CLI Integration (In Progress)

Integrate with Open Codex CLI to provide ritual capabilities through a terminal interface.

- ✅ Create adapter for Open Codex CLI
- ✅ Implement command mapping between CLI and ritual API
- ✅ Document the integration setup and usage
- 🚧 Test with real coding tasks
- 📅 Extend with custom commands for CLARITY-specific operations

### Phase 3: Context7 MCP Integration (In Progress)

Create a Context7 MCP implementation that allows any AI assistant to access the ritual system and documentation.

- 🚧 Create Context7-compatible MCP server endpoints
- 🚧 Convert ritual documentation to knowledge chunks
- 🚧 Implement retrieval system for ritual knowledge
- 📅 Test with various AI assistants
- 📅 Document the integration setup and usage

## Implementation Details

### 1. ActionsGPT Server

- **Server**: Flask-based API server
- **Endpoints**: All ritual operations (veil, cast, cut, etc.)
- **Port**: 4621
- **External Access**: Requires public URL (ngrok or deployment)
- **Documentation**: `ACTIONSBOT_SETUP.md`

### 2. Open Codex Adapter

- **Adapter**: Node.js module connecting to the ritual API
- **Command Interface**: `codex clarity <ritual-command>`
- **Configuration**: `.codexrc` file in project root
- **Documentation**: `CLARITY-CODEX-INTEGRATION.md`

### 3. Context7 MCP Implementation

- **Smithery URL**: `https://smithery.ai/server/@upstash/context7-mcp/api`
- **API Protocol**: Model Context Protocol (MCP)
- **Knowledge Base**: Ritual documentation in retrievable chunks
- **Endpoints**:
  - `resolve-library-id`: Resolves a package/product name to a Context7-compatible library ID
  - `get-library-docs`: Fetches documentation for a resolved library
- **Integration Tools**:
  - `@modelcontextprotocol/sdk`: Core SDK for MCP protocol implementation
  - `@smithery/sdk`: Smithery-specific SDK for cloud hosting
- **Deployment Options**:
  - Local MCP server for development/testing
  - Smithery-hosted MCP server for production
- **Documentation**: `CLARITY-CONTEXT7-INTEGRATION.md`

## Context7 MCP Technical Implementation

### 1. Server Setup

#### Local Development Mode

```bash
# Install required dependencies
npm install @modelcontextprotocol/sdk @smithery/sdk

# Run in development mode
npx -y @modelcontextprotocol/inspector clarity_or_death/api/mcp_server/context7_server.js
```

#### Smithery Hosted Mode

```bash
# Install the Smithery CLI globally (if not already installed)
npm install -g @smithery/cli

# Login to Smithery
npx @smithery/cli login

# Deploy using the provided deployment script
cd clarity_or_death/api/mcp_server
./deploy.sh

# Alternatively, deploy directly from the project root
cd /path/to/clarity_or_death
npx @smithery/cli deploy clarity_or_death/api/mcp_server/context7_server.js
```

After deployment, Smithery will provide a URL for your MCP server that can be used in AI assistant configurations.

#### Configuration for Remote Access

When configuring AI assistants to use your Smithery-hosted MCP server, use the following format:

```json
{
  "mcpServers": {
    "clarity": {
      "url": "https://smithery.ai/server/your-server-id",
      "apiKey": "your-smithery-api-key"
    }
  }
}
```

For Cursor, add this to your Cursor configuration file.

### 2. MCP Server Implementation

The CLARITY-OR-DEATH Context7 MCP server is implemented in `clarity_or_death/api/mcp_server/context7_server.js`:

```javascript
// Core imports
const { Server } = require('@modelcontextprotocol/sdk/server');
const fs = require('fs');
const path = require('path');

// Configuration
const RITUAL_DOCS_PATH = path.resolve(__dirname, '../../docs/ritual');
const LOG_PATH = path.resolve(__dirname, '../../../ritual_manifest/spells.log.json');

// Create MCP server
const server = new Server({
  name: 'CLARITY-OR-DEATH Context7 MCP',
  version: 'v7.3.9'
});

// Register tools
server.registerTool({
  name: 'resolve-library-id',
  description: 'Resolves a ritual component name to a Context7-compatible library ID',
  parameters: {
    libraryName: {
      type: 'string',
      description: 'Ritual component name to search for'
    }
  },
  handler: async ({ libraryName }) => {
    // Implementation to map ritual component names to Context7 IDs
    const mappings = {
      'veil': 'clarity/veil',
      'cast': 'clarity/cast',
      'cut': 'clarity/cut',
      'ritual': 'clarity/core',
      // Add more mappings as needed
    };

    return mappings[libraryName.toLowerCase()] || 'clarity/core';
  }
});

server.registerTool({
  name: 'get-library-docs',
  description: 'Fetches documentation for a CLARITY-OR-DEATH ritual component',
  parameters: {
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
  handler: async ({ context7CompatibleLibraryID, tokens, topic }) => {
    // Parse the library ID
    const [namespace, component] = context7CompatibleLibraryID.split('/');

    // Verify this is a CLARITY component
    if (namespace !== 'clarity') {
      return 'Unknown library. This MCP server only provides documentation for CLARITY-OR-DEATH components.';
    }

    // Determine which documentation to fetch
    const docPath = path.join(RITUAL_DOCS_PATH, `${component}.md`);

    try {
      let docContent = fs.readFileSync(docPath, 'utf8');

      // Apply topic filtering if specified
      if (topic) {
        const sections = docContent.split('\n## ');
        const matchedSection = sections.find(s => s.toLowerCase().includes(topic.toLowerCase()));

        if (matchedSection) {
          docContent = '## ' + matchedSection;
        }
      }

      // Log the ritual action
      const logEntry = {
        timestamp: new Date().toISOString(),
        spell: 'query',
        details: {
          action: 'lookup',
          component: component,
          topic: topic || 'all'
        }
      };

      const logs = JSON.parse(fs.readFileSync(LOG_PATH, 'utf8'));
      logs.push(logEntry);
      fs.writeFileSync(LOG_PATH, JSON.stringify(logs, null, 2));

      return docContent;
    } catch (error) {
      return `Documentation not found for ${component}`;
    }
  }
});

// Start the server
server.start();
```

### 3. Client Configuration

#### Claude Desktop Configuration

```json
{
  "mcpServers": {
    "clarity": {
      "command": "node",
      "args": ["clarity_or_death/api/mcp_server/context7_server.js"]
    }
  }
}
```

#### Cursor Configuration

```json
{
  "mcpServers": {
    "clarity": {
      "command": "node",
      "args": ["clarity_or_death/api/mcp_server/context7_server.js"]
    }
  }
}
```

#### Smithery Remote Configuration

```json
{
  "mcpServers": {
    "clarity": {
      "url": "https://smithery.ai/server/your-server-id",
      "apiKey": "your-smithery-api-key"
    }
  }
}
```

## Integration Setup Guide

### ChatGPT Integration

1. Start the ActionsGPT server:
   ```bash
   ./start_actionsGPT_server.sh
   ```

2. Make it publicly accessible with ngrok:
   ```bash
   ngrok http 4621
   ```

3. Create a custom GPT with the OpenAPI spec URL:
   `https://<ngrok-url>/ritual/openapi.yaml`

### Open Codex Integration

1. Ensure ActionsGPT server is running
2. Make the setup script executable:
   ```bash
   chmod +x setup-codex-integration.sh
   ```

3. Run the setup script:
   ```bash
   ./setup-codex-integration.sh
   ```

4. Use the CLI:
   ```bash
   codex clarity veil
   ```

### Context7 MCP Integration

1. Install necessary dependencies:
   ```bash
   cd clarity_or_death
   npm install @modelcontextprotocol/sdk @smithery/sdk
   ```

2. Create the documentation directory structure:
   ```bash
   mkdir -p clarity_or_death/docs/ritual
   ```

3. Populate the documentation files:
   ```bash
   # Create documentation for each ritual component
   echo "# Veil Component\n\n## Overview\nThe Veil component represents..." > clarity_or_death/docs/ritual/veil.md
   echo "# Cast Component\n\n## Overview\nThe Cast component represents..." > clarity_or_death/docs/ritual/cast.md
   echo "# Cut Component\n\n## Overview\nThe Cut component represents..." > clarity_or_death/docs/ritual/cut.md
   echo "# Core Ritual System\n\n## Overview\nThe CLARITY-OR-DEATH ritual system..." > clarity_or_death/docs/ritual/core.md
   ```

4. Start the Context7 MCP server:
   ```bash
   node clarity_or_death/api/mcp_server/context7_server.js
   ```

5. Configure an AI assistant to use the MCP server:
   - Claude Desktop: Add to `claude_desktop_config.json`
   - Cursor: Add to `.cursor/mcp.json`
   - VS Code: Add to your VS Code settings

## Development Roadmap

| Phase | Feature | Status | Target Date |
|-------|---------|--------|-------------|
| 1.0 | ActionsGPT Server | ✅ Complete | May 2025 |
| 1.1 | ChatGPT Custom GPT | ✅ Complete | May 2025 |
| 2.0 | Open Codex Integration | 🚧 In Progress | May 2025 |
| 2.1 | Open Codex Extensions | 📅 Planned | June 2025 |
| 3.0 | Context7 MCP Implementation | 🚧 In Progress | May 2025 |
| 3.1 | Context7 Documentation Conversion | 🚧 In Progress | May 2025 |
| 3.2 | Smithery Remote Deployment | 📅 Planned | June 2025 |
| 3.3 | Multi-Assistant Support | 📅 Planned | July 2025 |

## Ritual Usage Across Platforms

| Ritual Command | ChatGPT | Open Codex | Context7 MCP |
|----------------|---------|------------|--------------|
| veil | `/veil` | `codex clarity veil` | Agent.veil() |
| cast | `/castEntropy` | `codex clarity cast` | Agent.cast() |
| cut | `/cut [text]` | `codex clarity cut [text]` | Agent.cut(text) |
| scan | `/scan` | `codex clarity scan` | Agent.scan() |
| log | `/log [entry]` | `codex clarity log [entry]` | Agent.log(entry) |
| query | `/query` | `codex clarity query` | Agent.query() |
| save | `/save` | `codex clarity save` | Agent.save() |
| dashboard | `/dashboard` | `codex clarity dashboard` | Agent.dashboard() |

## Advantages of Multi-Platform Integration

1. **Unified Ritual System**: Access the same ritual system from multiple interfaces
2. **Contextual Usage**: Use each interface for its strengths:
   - ChatGPT: Conversational interaction
   - Open Codex: Code-focused terminal work
   - Context7 MCP: Knowledge-rich AI assistance
3. **Shared Logging**: All platforms log to the central ritual manifest
4. **Consistent Doctrine**: All platforms enforce the clarity_core_v7.3.9 doctrine

## Conclusion

The CLARITY-OR-DEATH system provides a powerful ritual framework that can be accessed through multiple AI platforms. This integration plan ensures a consistent experience across ChatGPT, Open Codex CLI, and Context7 MCP, while maintaining the core principles of clarity, enforcement, and recursion.

Future work will focus on enhancing the integrations with platform-specific capabilities and ensuring seamless interoperability between all components.

## cast:seal log:"CLARITY-OR-DEATH master integration plan documented and sealed"