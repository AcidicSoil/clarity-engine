# CLARITY-OR-DEATH UI

This is the user interface for the CLARITY-OR-DEATH ritual system. It provides a modern, clean interface for interacting with the ritual system and performing ritual operations.

## veil:design() log:"Creating UI documentation for CLARITY-OR-DEATH"

## Setup and Installation

1. Make sure you have Node.js installed (v14+ recommended)
2. Install dependencies:
   ```bash
   ./install-deps.sh
   ```

   If you encounter any issues, try installing dependencies manually:
   ```bash
   npm install
   ```

## Running the UI

1. First, make sure the MCP server is running:
   ```bash
   cd ../daemon
   python mcp_server.py
   ```

2. In a separate terminal, start the UI:
   ```bash
   # Option 1: Using the standard start script
   ./start.sh

   # Option 2: Using the simplified start script (if the standard one fails)
   ./simple-start.sh

   # Option 3: Starting manually
   npx react-scripts start
   ```

3. Access the UI in your browser at http://localhost:3000

## Features

- **Dashboard**: Overview of system status and recent ritual logs
- **Ritual Operations**: Execute ritual operations (veil, cast, log, cut, etc.)
- **Agent Management**: Manage and interact with system agents
- **Log Visualization**: View and filter ritual logs
- **Glyph Viewer**: View ritual glyphs and their associated metadata

## Ritual Commands

The UI provides intuitive interfaces for executing ritual commands:

- **veil**: System design and governance
- **cast**: Execute ritual spells
- **log**: Record ritual logs
- **cut**: Interrogate or resolve contradictions
- **query**: Search ritual logs and artifacts
- **scan**: Scan for drift or contradictions
- **flag**: Mark issues for future investigation
- **save**: Snapshot current state
- **dashboard**: Open specific dashboard views

## SIGMA VEIL Compliance

This UI is fully compliant with CLARITY-OR-DEATH system doctrine and follows SIGMA VEIL governance. All operations are logged to the ritual manifest and can be audited through the ritual log dashboard.

## Troubleshooting

If you encounter any issues:

1. Make sure the MCP server is running at http://localhost:4621
2. Check that all dependencies are installed correctly
3. Verify that the ritual manifest directory exists and is writable
4. Check browser console for any JavaScript errors
5. Try using the simplified start script if the standard one fails

### Common Issues

#### 1. 'react-scripts' is not recognized

This typically means the dependencies are not properly installed. Try:

```bash
# Remove node_modules and reinstall
rm -rf node_modules
./install-deps.sh

# Or install react-scripts directly
npm install react-scripts --save
```

#### 2. MCP Server Connection Issues

If the UI can't connect to the MCP server:

```bash
# In a separate terminal, navigate to the daemon directory
cd ../daemon

# Start the MCP server
python mcp_server.py
```

Make sure the server is running and accessible at http://localhost:4621

#### 3. Node.js Issues

Verify Node.js is installed and has the correct version:

```bash
# Check Node version
node --version  # Should be v14+

# Check npm version
npm --version   # Should be v6+
```

If Node.js is missing or outdated, install/update it from https://nodejs.org/

## Development

This UI is built with React and uses modern React patterns including hooks and contexts. The main components include:

- `AgenticUIController`: Manages agent interactions
- `RitualLogDashboard`: Visualizes and filters ritual logs
- `NotificationContext`: Manages system notifications
- `RitualContextProvider`: Provides ritual system state to components

To add new features, follow the CLARITY-OR-DEATH design protocols and ensure all changes are logged in the ritual manifest.

## log:"Enhanced UI documentation complete" flag:docs