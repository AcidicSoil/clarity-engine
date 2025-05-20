#!/bin/bash

# veil:design() log:"Creating UI startup script"

# Navigate to the UI directory
cd "$(dirname "$0")"

# Check if node_modules exists, if not install dependencies
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Start the development server
echo "Starting CLARITY-OR-DEATH UI..."
npm start

# Log the startup
echo "cast:start log:\"UI system started\" flag:startup" >> ../../ritual_manifest/spells.log.json