#!/bin/bash
# CLARITY-OR-DEATH MCP Server Startup Script
# veil:design() log:"Enhanced MCP server startup script for Windows compatibility"

echo "🩸 CLARITY-OR-DEATH MCP Server — SIGMA VEIL v7.3.x 🩸"
echo "Starting MCP server on port 4621..."

# Get the directory of this script
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

# Go to the project root directory
cd "$SCRIPT_DIR/../.." || exit 1

# Ensure ritual_manifest directory exists
mkdir -p ritual_manifest

# Log startup to ritual manifest
echo "{\"timestamp\": \"$(date -u +"%Y-%m-%dT%H:%M:%SZ")\", \"type\": \"cast\", \"content\": \"cast:start log:\\\"MCP server started\\\" flag:startup\", \"metadata\": {\"phase\": \"EXECUTION\", \"operator\": \"system\"}}" >> ritual_manifest/spells.log.json

# Check if Python is installed - try both python3 and python commands
PYTHON_CMD="python3"
if ! command -v python3 &> /dev/null; then
    if ! command -v python &> /dev/null; then
        echo "Python is not installed or not in PATH. Please install Python 3."
        exit 1
    else
        # On Windows, python command often points to Python 3
        PYTHON_CMD="python"
    fi
fi

# Check if Flask is installed
if ! $PYTHON_CMD -c "import flask" &> /dev/null; then
    echo "Flask is not installed. Installing..."
    $PYTHON_CMD -m pip install flask || exit 1
fi

# Check if requests is installed (needed for the test script)
if ! $PYTHON_CMD -c "import requests" &> /dev/null; then
    echo "Requests is not installed. Installing..."
    $PYTHON_CMD -m pip install requests || exit 1
fi

# Update status.json to show server is starting
echo "{\"status\": \"starting\", \"timestamp\": \"$(date -u +"%Y-%m-%dT%H:%M:%SZ")\"}" > "$SCRIPT_DIR/status.json"

# Start the MCP server
echo "Launching MCP server..."
$PYTHON_CMD "$SCRIPT_DIR/mcp_server.py"