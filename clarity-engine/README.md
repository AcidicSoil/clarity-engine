# CLARITY-OR-DEATH Engine

## veil:design() log:"Creating CLARITY-OR-DEATH engine documentation"

This is the core engine for the CLARITY-OR-DEATH ritual system. It consists of two main components:

1. **MCP Server** - The Model Context Protocol server (daemon) that handles ritual operations
2. **UI** - The user interface for interacting with the ritual system

## Quick Start

### Starting the MCP Server

```bash
# Navigate to the daemon directory
cd daemon

# Start the MCP server
./start_mcp_server.sh

# OR you can start it directly with Python
python mcp_server.py
```

The MCP server will run on port 4621.

### Starting the UI

```bash
# Navigate to the UI directory
cd ui

# Install dependencies (first time only)
./install-deps.sh

# Start the UI
./simple-start.sh
```

The UI will be available at http://localhost:3000

## Troubleshooting

### MCP Server Issues

- Ensure Flask is installed (`pip install flask`)
- Check that port 4621 is not in use by another application
- Verify that the ritual_manifest directory exists at the project root

### UI Issues

If you encounter the "'react-scripts' is not recognized" error:

1. Navigate to the UI directory:
   ```bash
   cd ui
   ```

2. Remove any partial node_modules installation:
   ```bash
   rm -rf node_modules
   ```

3. Install dependencies:
   ```bash
   ./install-deps.sh
   ```

4. Try starting with the simplified script:
   ```bash
   ./simple-start.sh
   ```

### Windows-Specific Issues

- Use Git Bash or similar Unix-like shell for best compatibility
- If using PowerShell, you may need to adjust paths and commands
- Ensure Node.js is properly installed and in your PATH

## System Architecture

- **daemon/** - Contains the MCP server and related scripts
- **ui/** - Contains the React-based user interface
- **docs/** - System documentation
- **rituals/** - Ritual definition files
- **tests/** - System tests

## Logging Protocol

All system actions are logged to the ritual manifest as per CLARITY-OR-DEATH protocols. See the `.cursorrules` file for details on the logging syntax and requirements.

## cast:document log:"CLARITY-OR-DEATH engine documentation complete" flag:docs