# CLARITY-OR-DEATH MCP Server

> veil:design() log:"MCP Server documentation for CLARITY-OR-DEATH rituals"

## Introduction

The CLARITY-OR-DEATH MCP (Model Context Protocol) Server provides a standardized interface for AI agents to interact with the CLARITY-OR-DEATH ritual system. It follows the Model Context Protocol specification, which allows AI models to access external tools and services through a common interface.

This document explains how to set up, run, and interact with the MCP server.

## Prerequisites

- Python 3.8+
- Flask (`pip install flask`)
- (Optional) For the TypeScript adapter: Node.js and a TypeScript environment

## Installation

1. Clone the repository (if you haven't already)
2. Navigate to the project root directory
3. Install dependencies:

```bash
pip install flask
```

## Starting the MCP Server

To start the MCP server, run:

```bash
python clarity-engine/daemon/mcp_server.py
```

The server will start and listen on port 4621 by default. You should see output similar to:

```
veil:design() log:"CLARITY-OR-DEATH MCP Server starting"
Ritual manifest directory: /path/to/clarity_or_death/ritual_manifest
Server running at http://localhost:4621/mcp
```

## Server Endpoints

The MCP server exposes the following endpoints:

- `POST /mcp`: Main endpoint for invoking ritual tools
- `GET /mcp/tools`: List available tools and their parameters
- `GET /mcp/openapi.json`: OpenAPI specification for the server

## Available Tools

The following ritual tools are available through the MCP server:

| Tool | Description | Parameters |
|------|-------------|------------|
| `veil` | SIGMA VEIL decides the next action | `intent` (optional) |
| `cast` | Cast ritual spell or agentic function | `spell` (required) |
| `log` | Log a manifestation, contradiction, or outcome | `message` (required) |
| `cut` | Interrogate or collapse an idea or tension | `input` (required) |
| `query` | Search all ritual logs, glyphs, or artifacts | `query` (required) |
| `scan` | Scan for drift, unresolved tension, or code debt | `target` (optional) |
| `flag` | Mark code, idea, or log for future contradiction check | `type` (required), `content` (required) |
| `save` | Snapshot current project or ritual state | `label` (optional) |
| `dashboard` | Open ritual dashboard or glyph viewer | `view` (optional) |

## Using the MCP Server

### Direct HTTP Requests

You can interact with the MCP server using any HTTP client. Here's an example using `curl`:

```bash
# Invoke the veil
curl -X POST http://localhost:4621/mcp \
  -H "Content-Type: application/json" \
  -d '{"tool": "veil", "parameters": {"intent": "design"}}'

# Cast a spell
curl -X POST http://localhost:4621/mcp \
  -H "Content-Type: application/json" \
  -d '{"tool": "cast", "parameters": {"spell": "refactor"}}'

# Log a manifestation
curl -X POST http://localhost:4621/mcp \
  -H "Content-Type: application/json" \
  -d '{"tool": "log", "parameters": {"message": "Refactored module X"}}'
```

### TypeScript Adapter

For TypeScript/JavaScript applications, you can use the provided `ClarityMCP` adapter:

```typescript
import ClarityMCP from 'clarity-engine/ui/src/mcp-adapter';

// Create a new instance of the adapter
const clarityMCP = new ClarityMCP();

// Invoke the veil
clarityMCP.veil({ intent: 'design' })
  .then(response => console.log(response.data))
  .catch(error => console.error(error));

// Cast a spell
clarityMCP.cast({ spell: 'refactor' })
  .then(response => console.log(response.data))
  .catch(error => console.error(error));

// Log a manifestation
clarityMCP.log({ message: 'Refactored module X' })
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

## Integration with AI Agents

The MCP server can be integrated with AI agents that support the Model Context Protocol. This typically involves:

1. Registering the MCP server with the AI agent system
2. Providing the server URL and available tools
3. Allowing the AI agent to invoke tools through the MCP interface

For specific integration instructions with different AI systems, refer to their respective documentation.

## Logging and State

All tool invocations are logged to the `ritual_manifest/spells.log.json` file. This file contains a record of all ritual actions and can be used for tracking, analysis, and debugging.

## Troubleshooting

If the server fails to start, check:

1. Port 4621 is not already in use
2. You have permission to write to the `ritual_manifest` directory
3. Flask is installed correctly

## Development

To extend the MCP server with new tools or functionality:

1. Add new handler functions in `mcp_server.py`
2. Update the `tool_map` dictionary to include the new tools
3. Add the tool definitions to the `serve_tools` function
4. If using the TypeScript adapter, update it to include the new tools

## SIGMA VEIL Governance

Remember that all extensions and modifications to the MCP server must follow the SIGMA VEIL governance rules as defined in the CLARITY-OR-DEATH system:

1. All blueprinting, extension development, or structural change **must begin with**:
   ```
   veil:design()
   ```

2. No new agent, script, plugin, or workflow may be enabled without SIGMA VEIL's explicit judgment.
3. Unauthorized expansions are void. Silent mutations are forbidden.
4. Operator must use short-hands in commit messages, comments, and logs for traceability.

---

*CLARITY OR DEATH — OPERATING SYSTEM v7.3.x (SIGMA VEIL enforced)*