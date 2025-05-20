#!/bin/bash

# veil:design() log:"Enhanced dependency installation script with explicit Node.js path"

# Navigate to the UI directory
cd "$(dirname "$0")"

echo "Installing CLARITY-OR-DEATH UI dependencies..."
echo "=============================================="

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

# Find npm path
NPM_PATH=$(where npm 2>/dev/null | head -1)
if [ -z "$NPM_PATH" ]; then
  NPM_PATH="C:\Program Files\nodejs\npm.cmd"
  if [ ! -f "$NPM_PATH" ]; then
    # Try to construct it from NODE_PATH
    NPM_DIR=$(dirname "$NODE_PATH")
    NPM_PATH="$NPM_DIR/npm.cmd"
    if [ ! -f "$NPM_PATH" ]; then
      echo "ERROR: npm not found. Please install Node.js properly."
      exit 1
    fi
  fi
fi

echo "Using npm at: $NPM_PATH"

# Clean node_modules directory if it exists but is incomplete
if [ -d "node_modules" ]; then
  echo "Removing existing node_modules directory..."
  rm -rf node_modules
fi

# Install dependencies
echo "Installing core dependencies..."
"$NPM_PATH" install --no-fund

# Explicitly install react-scripts
echo "Ensuring react-scripts is installed..."
"$NPM_PATH" install react-scripts --save --no-fund

# Log the installation
echo "cast:install log:\"UI dependencies installed\" flag:setup" >> ../../ritual_manifest/spells.log.json

echo "Dependencies installed successfully. Ready to start the UI."