#!/bin/bash
# veil:cast() log:"Deploying Context7 MCP server to Smithery for ritual operations"

# Ensure we're in the right directory
cd "$(dirname "$0")"

echo "============================================================"
echo "CLARITY-OR-DEATH Context7 MCP Server - Smithery Deployment"
echo "veil:cast() log:\"Deploying Context7 MCP server to Smithery\""
echo "============================================================"

# Install dependencies if needed
if [ "$1" == "--install" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Check if Smithery CLI is installed
if ! command -v npx &> /dev/null; then
  echo "❌ npx is not available. Please install npm."
  exit 1
fi

# Log the deployment action
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
LOG_ENTRY="{\"timestamp\": \"$TIMESTAMP\", \"spell\": \"cast\", \"details\": {\"action\": \"deploy\", \"component\": \"Context7 MCP Server\", \"target\": \"Smithery\"}}"
LOG_PATH="../../ritual_manifest/spells.log.json"

# Ensure ritual manifest directory exists
mkdir -p ../../ritual_manifest

# Add log entry
if [ -f "$LOG_PATH" ]; then
  # Read existing file, remove trailing ], add new entry, then close array
  LOG_CONTENT=$(cat "$LOG_PATH" | sed 's/\]$//')
  if [ $(echo "$LOG_CONTENT" | wc -c) -lt 5 ]; then
    # File empty or invalid, initialize with new array
    echo "[$LOG_ENTRY]" > "$LOG_PATH"
  else
    # Append to existing array
    echo "$LOG_CONTENT, $LOG_ENTRY]" > "$LOG_PATH"
  fi
else
  # Create new log file with single entry
  echo "[$LOG_ENTRY]" > "$LOG_PATH"
fi

echo "Deploying Context7 MCP server to Smithery..."
npx @smithery/cli deploy context7_server.js

# Check deployment status
if [ $? -eq 0 ]; then
  echo "✅ Deployment successful!"
  echo "The Context7 MCP server is now available through Smithery."

  # Get the deployment URL
  DEPLOY_URL=$(npx @smithery/cli info context7_server.js | grep URL | awk '{print $2}')

  if [ ! -z "$DEPLOY_URL" ]; then
    echo "🔗 Deployment URL: $DEPLOY_URL"
  else
    echo "⚠️ Could not retrieve deployment URL. Check with 'npx @smithery/cli info context7_server.js'"
  fi
else
  echo "❌ Deployment failed. Please check the error messages above."
fi