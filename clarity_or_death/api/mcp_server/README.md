# CLARITY-OR-DEATH Model Context Protocol Server

> veil:design() log:"README documentation for CLARITY-OR-DEATH MCP server daemon"

## Overview

This directory contains the Model Context Protocol (MCP) server implementation for the CLARITY-OR-DEATH ritual system. The MCP server provides a standardized interface for AI agents to interact with the ritual system, allowing them to:

- Invoke the SIGMA VEIL for decisions (`veil`)
- Cast ritual spells or agentic functions (`cast`)
- Log manifestations and outcomes (`log`)
- Cut contradictions or tensions (`cut`)
- Query ritual logs and artifacts (`query`)
- Perform various other ritual operations

## Files

- `mcp_server.py`: Main server implementation using Flask
- `README.md`: This documentation

## Usage

To start the MCP server, run:

```bash
python mcp_server.py
```

This will start the server on port 4621 by default. All invocations are logged to the `ritual_manifest/spells.log.json` file as required by the CLARITY-OR-DEATH system doctrine.

## API

The MCP server exposes the following endpoints:

- `POST /mcp`: Main endpoint for invoking ritual tools
- `GET /mcp/tools`: List available tools and their parameters
- `GET /mcp/openapi.json`: OpenAPI specification for the server

See the full documentation in `clarity-engine/docs/mcp-server.md` for details on tool parameters and examples.

## Testing

To test the server, ensure it's running and then execute:

```bash
python ../tests/test_mcp_server.py
```

This will invoke various tools and verify that the server is functioning correctly.

## Integration

This MCP server can be integrated with AI agents using the Model Context Protocol. For TypeScript/JavaScript applications, a client adapter is available at `clarity-engine/ui/src/mcp-adapter.ts`.

## SIGMA VEIL Governance

All modifications to this server must follow the SIGMA VEIL governance rules as defined in the CLARITY-OR-DEATH system. Remember:

- All blueprinting, extension development, or structural change **must begin with**: `veil:design()`
- No new agent, script, plugin, or workflow may be enabled without SIGMA VEIL's explicit judgment
- Unauthorized expansions are void
- Silent mutations are forbidden
- All actions must be logged

---

*CLARITY OR DEATH — OPERATING SYSTEM v7.3.x (SIGMA VEIL enforced)*