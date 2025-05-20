# CLARITY-OR-DEATH + Context7 MCP Integration

## veil:design() log:"Documenting the integration between CLARITY-OR-DEATH and Context7 MCP"

This guide explains how to integrate the CLARITY-OR-DEATH ritual system with Context7 MCP, allowing AI assistants to access your ritual documentation and knowledge through the Model Context Protocol.

## What is Context7 MCP?

Context7 is a Model Context Protocol (MCP) implementation that provides up-to-date documentation to AI assistants. By integrating CLARITY-OR-DEATH with Context7 MCP, you can provide the following capabilities:

1. **Access to Ritual Documentation**: AI assistants can retrieve documentation about ritual components, commands, and the core system.
2. **Semantic Linking**: The integration can resolve ritual component names to specific documentation sections.
3. **Ritual Action Logging**: All documentation lookups and interactions are automatically logged to the ritual manifest.

## Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  AI Assistant   ├────►│ Context7 MCP    ├────►│ CLARITY-OR-DEATH│
│  (Claude, etc.) │     │ Server          │     │ Ritual System   │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        ▲                                               │
        │                                               │
        └───────────────────────────────────────────────┘
                      Ritual Documentation
```

## Setting Up the Context7 MCP Server

### 1. Start the Context7 MCP Server

The Context7 MCP server provides an interface for AI assistants to access ritual documentation. You can start the server with:

```bash
# Basic start
./start_context7_mcp_server.sh

# Start with dependencies installation
./start_context7_mcp_server.sh --install

# Run in background (useful for persistent servers)
./start_context7_mcp_server.sh --background

# Run without starting the ActionsGPT server
./start_context7_mcp_server.sh --no-actionsgpt

# Custom port configuration
./start_context7_mcp_server.sh --port 8000 --host 127.0.0.1
```

### 2. Deploy to Smithery (Optional)

For remote access to your CLARITY-OR-DEATH ritual documentation, you can deploy the Context7 MCP server to Smithery using the provided script:

```bash
# Deploy to Smithery with dependencies installation
./deploy-veil-to-smithery.sh --install

# Deploy without installing dependencies
./deploy-veil-to-smithery.sh
```

This creates a publicly accessible URL that AI assistants can connect to. After successful deployment, the script will display the Smithery URL for your Context7 MCP server, which can be used in AI assistant configurations.

#### Smithery URL Configuration

Once you have deployed your Context7 MCP server to Smithery, you can configure AI assistants to use it by providing the Smithery URL:

```json
{
  "mcpServers": {
    "clarity": {
      "url": "https://smithery.ai/server/your-server-id"
    }
  }
}
```

No API key is required for basic integration. This configuration works with Claude AI, Cursor, and other MCP-compatible AI assistants.

## Integrating with AI Assistants

### Claude Desktop

1. Open the Claude Desktop settings file (usually in `~/.claude-desktop/claude_desktop_config.json`)
2. Add the following configuration:

```json
{
  "mcpServers": {
    "clarity": {
      "command": "node",
      "args": ["<path-to-project>/clarity_or_death/api/mcp_server/context7_server.js"]
    }
  }
}
```

For remote Smithery deployment:

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

### Cursor

1. Create or edit the `.cursor/mcp.json` file in your project directory
2. Add the following configuration:

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

### VS Code

1. Open your VS Code settings (JSON) file
2. Add the following configuration:

```json
{
  "mcp.servers": {
    "clarity": {
      "command": "node",
      "args": ["<path-to-project>/clarity_or_death/api/mcp_server/context7_server.js"]
    }
  }
}
```

## Using the Context7 MCP Integration

Once configured, your AI assistant can access CLARITY-OR-DEATH ritual documentation using the Context7 MCP tools.

### Available Tools

#### 1. resolve-library-id

Resolves a ritual component name to a Context7-compatible library ID.

Example usage in an AI assistant:
```
I need to look up the documentation for the "veil" component.
```

The AI will use `resolve-library-id` to map "veil" to "clarity/veil".

#### 2. get-library-docs

Retrieves documentation for a ritual component.

Example usage in an AI assistant:
```
What are the commands available in the "cast" component?
```

The AI will:
1. Use `resolve-library-id` to map "cast" to "clarity/cast"
2. Use `get-library-docs` to retrieve the cast component documentation
3. Extract the requested information from the documentation

### Prompting AI Assistants

When working with an AI assistant connected to the Context7 MCP server, you can use these prompt patterns:

- "Tell me about the CLARITY-OR-DEATH veil component"
- "What is the syntax for the cast:seal command?"
- "Explain how the ritual system's doctrine works"
- "What components make up the core system?"

The AI assistant will automatically use the Context7 MCP tools to retrieve relevant documentation and provide accurate answers.

## Troubleshooting

### Server Issues

- **Cannot start server**: Ensure Node.js is installed and the permissions are set correctly on the startup script.
- **Port conflicts**: If port 4622 is already in use, specify a different port with the `--port` option.
- **Connection issues**: Check your firewall settings and ensure the server is accessible from the AI assistant.

### AI Integration Issues

- **AI cannot find documentation**: Ensure the ritual documentation files exist in `clarity_or_death/docs/ritual/`.
- **AI uses outdated information**: The Context7 MCP server may need to be restarted to refresh documentation.
- **AI doesn't use Context7**: Verify that the MCP configuration is correctly set up in your AI assistant.

## Advanced Configuration

### Custom Documentation

You can customize the ritual documentation by editing the files in `clarity_or_death/docs/ritual/`:

- `veil.md`: Documentation for the Veil component
- `cast.md`: Documentation for the Cast component
- `cut.md`: Documentation for the Cut component
- `core.md`: Documentation for the core ritual system

### Server Configuration

The Context7 MCP server can be configured with environment variables:

```bash
# Set a custom port
export MCP_PORT=8080

# Set a custom host
export MCP_HOST=localhost

# Then start the server
./start_context7_mcp_server.sh
```

## Future Enhancements

- **Multi-assistant synchronization**: Coordinate ritual operations across multiple AI assistants
- **Rich knowledge retrieval**: Implement advanced semantic search for ritual documentation
- **Interactive ritual operations**: Allow AI assistants to directly invoke ritual commands

## cast:seal log:"CLARITY-OR-DEATH Context7 MCP integration documentation sealed"