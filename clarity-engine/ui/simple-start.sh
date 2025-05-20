#!/bin/bash

# veil:design() log:"Enhanced simplified UI startup script with explicit Node.js path"

# Navigate to the UI directory
cd "$(dirname "$0")"

echo "Starting CLARITY-OR-DEATH UI..."
echo "==============================="

# Find Node.js path
NODE_PATH=$(where node 2>/dev/null | head -1)
if [ -z "$NODE_PATH" ]; then
  NODE_PATH="C:\Program Files\nodejs\node.exe"
  if [ ! -f "$NODE_PATH" ]; then
    echo "ERROR: Node.js not found. Please install Node.js or add it to your PATH."
    exit 1
  fi
fi

echo "Using Node.js at: $NODE_PATH"

# Check if node_modules exists and has react-scripts
if [ ! -d "node_modules/react-scripts" ]; then
  echo "React scripts not found. Running dependency installation..."
  ./install-deps.sh
fi

# Check if MCP server is running
if ! curl -s http://localhost:4621/status > /dev/null; then
  echo "WARNING: MCP server doesn't appear to be running at http://localhost:4621"
  echo "Some UI features may not work correctly."
  echo "Consider starting the MCP server with: python ../daemon/mcp_server.py"
fi

echo "Starting UI with npx..."
# Start the development server using npx with explicit node path
"$NODE_PATH" ./node_modules/.bin/react-scripts start

# Log the startup
echo "cast:start log:\"UI system started\" flag:startup" >> ../../ritual_manifest/spells.log.json