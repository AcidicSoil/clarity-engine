#!/bin/bash
# veil:cast() log:"Deploying Clarity Veil server to Smithery"

set -e

echo "============================================================"
echo "CLARITY-OR-DEATH Veil Server - Smithery Deployment"
echo "veil:cast() log:\"Deploying Clarity Veil server to Smithery\""
echo "============================================================"

# Default configuration
INSTALL_DEPS=false

# Parse command line arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --install)
      INSTALL_DEPS=true
      shift
      ;;
    *)
      echo "Unknown option: $1"
      echo "Usage: $0 [--install]"
      exit 1
      ;;
  esac
done

# Create ritual directories if they don't exist
mkdir -p clarity_or_death/docs/ritual
mkdir -p ritual_manifest

# Ensure ritual log file exists
if [ ! -f "ritual_manifest/spells.log.json" ]; then
  echo "[]" > ritual_manifest/spells.log.json
fi

# Create a smithery.yaml file if it doesn't exist
if [ ! -f "smithery.yaml" ]; then
  cat > smithery.yaml << EOL
# CLARITY-OR-DEATH Smithery Root Configuration
# veil:design() log:"Designing root Smithery deployment configuration"

startCommand:
  type: stdio
  configSchema:
    type: object
    properties:
      logPath:
        type: string
        description: Path to the ritual manifest log file
      docsPath:
        type: string
        description: Path to ritual documentation files
      port:
        type: integer
        description: Port to run the server on
    required:
      - logPath
      - docsPath
  commandFunction: |-
    (config) => ({
      command: 'node',
      args: ['clarity_or_death/api/mcp_server/context7_server.js'],
      env: {
        MCP_PORT: config.port || 4622,
        RITUAL_LOG_PATH: config.logPath || 'ritual_manifest/spells.log.json',
        RITUAL_DOCS_PATH: config.docsPath || 'clarity_or_death/docs/ritual'
      }
    })
  exampleConfig:
    logPath: ritual_manifest/spells.log.json
    docsPath: clarity_or_death/docs/ritual
    port: 4622
EOL
  echo "✅ Created smithery.yaml configuration file"
fi

# Install dependencies if requested
if [[ "$INSTALL_DEPS" == true ]]; then
  echo "Installing dependencies..."
  npm install -g @smithery/cli
  cd clarity_or_death/api/mcp_server
  npm install
  cd ../../..
fi

# Check for Smithery CLI
if ! command -v npx &> /dev/null; then
  echo "❌ npx is not available. Please install npm."
  exit 1
fi

# Log the ritual action
echo "{\"timestamp\": \"$(date -u +"%Y-%m-%dT%H:%M:%SZ")\", \"spell\": \"cast\", \"details\": {\"action\": \"deploy\", \"message\": \"Clarity Veil server deployment to Smithery initiated\", \"component\": \"Clarity Veil Server\"}}" >> ritual_manifest/spells.log.json

# Deploy to Smithery
echo "Deploying Clarity Veil server to Smithery..."
npx @smithery/cli deploy clarity_or_death/api/mcp_server/context7_server.js

# Check deployment status
if [ $? -eq 0 ]; then
  echo "✅ Deployment successful!"
  echo "The Clarity Veil server is now available through Smithery."

  # Get the deployment URL
  DEPLOY_URL=$(npx @smithery/cli info clarity_or_death/api/mcp_server/context7_server.js | grep URL | awk '{print $2}')

  if [ ! -z "$DEPLOY_URL" ]; then
    echo "🔗 Deployment URL: $DEPLOY_URL"

    # Log the success
    echo "{\"timestamp\": \"$(date -u +"%Y-%m-%dT%H:%M:%SZ")\", \"spell\": \"cast\", \"details\": {\"action\": \"success\", \"message\": \"Clarity Veil server deployed to Smithery\", \"component\": \"Clarity Veil Server\", \"url\": \"$DEPLOY_URL\"}}" >> ritual_manifest/spells.log.json

    echo ""
    echo "To use this URL in your AI assistant configuration:"
    echo ""
    echo "{\"mcpServers\": {\"clarity\": {\"url\": \"$DEPLOY_URL\"}}}"
    echo ""
  else
    echo "⚠️ Could not retrieve deployment URL. Check with 'npx @smithery/cli info clarity_or_death/api/mcp_server/context7_server.js'"
  fi
else
  echo "❌ Deployment failed. Please check the error messages above."

  # Log the failure
  echo "{\"timestamp\": \"$(date -u +"%Y-%m-%dT%H:%M:%SZ")\", \"spell\": \"cut\", \"details\": {\"action\": \"failure\", \"message\": \"Clarity Veil server deployment to Smithery failed\", \"component\": \"Clarity Veil Server\"}}" >> ritual_manifest/spells.log.json
fi