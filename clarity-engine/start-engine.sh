#!/bin/bash


# veil:design() log:"Starting CLARITY-OR-DEATH engine"

# Start MCP server
cd clarity-engine/daemon
./start_mcp_server.sh

# Start UI
cd clarity-engine/ui
./install-deps.sh
./simple-start.sh