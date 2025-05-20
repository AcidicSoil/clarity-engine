#!/bin/bash
# veil:cast() log:"Initiating Context7 MCP server for ritual operations"

echo "============================================================"
echo "CLARITY-OR-DEATH Context7 MCP Server"
echo "veil:cast() log:\"Initiating Context7 MCP server for ritual documentation integration\""
echo "============================================================"

# Default configuration
PORT=4622
HOST="0.0.0.0"
INSTALL_DEPS=false
SMITHERY_MODE=false
START_ACTIONSGPT=true
BACKGROUND=false

# Parse command line arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --port)
      PORT="$2"
      shift 2
      ;;
    --host)
      HOST="$2"
      shift 2
      ;;
    --install)
      INSTALL_DEPS=true
      shift
      ;;
    --smithery)
      SMITHERY_MODE=true
      shift
      ;;
    --no-actionsgpt)
      START_ACTIONSGPT=false
      shift
      ;;
    --background)
      BACKGROUND=true
      shift
      ;;
    *)
      echo "Unknown option: $1"
      echo "Usage: $0 [--port PORT] [--host HOST] [--install] [--smithery] [--no-actionsgpt] [--background]"
      exit 1
      ;;
  esac
done

# Ensure logs directory exists
mkdir -p logs

# Generate timestamp for log file
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
LOG_FILE="logs/context7_mcp_server_${TIMESTAMP}.log"

# Check for node.js installation
if ! command -v node &> /dev/null; then
  echo "❌ Node.js is not installed. Please install Node.js v16 or higher."
  exit 1
fi

# Install dependencies if requested
if [[ "$INSTALL_DEPS" == true ]]; then
  echo "Installing dependencies..."

  # Check for npm installation
  if command -v npm &> /dev/null; then
    npm install fs path http child_process
  else
    echo "❌ npm is not installed. Please install npm."
    exit 1
  fi
fi

# Run in Smithery mode if requested
if [[ "$SMITHERY_MODE" == true ]]; then
  echo "Starting Context7 MCP server in Smithery mode..."
  echo "This will deploy the MCP server to Smithery."

  # Check for Smithery CLI
  if ! command -v npx &> /dev/null; then
    echo "❌ npx is not available. Please install npm."
    exit 1
  fi

  # Deploy to Smithery
  npx @smithery/cli deploy clarity_or_death/api/mcp_server/context7_server.js
  exit $?
fi

# Create ritual directories if they don't exist
mkdir -p clarity_or_death/docs/ritual
mkdir -p ritual_manifest

# Ensure ritual log file exists
if [ ! -f "ritual_manifest/spells.log.json" ]; then
  echo "[]" > ritual_manifest/spells.log.json
fi

# Set environment variables
export MCP_PORT=$PORT
export MCP_HOST=$HOST

# Start ActionsGPT server if requested
if [[ "$START_ACTIONSGPT" == true ]]; then
  echo "Starting ActionsGPT server..."
  if [[ -f "./start_actionsGPT_server.sh" ]]; then
    # Check if ActionsGPT server is already running
    if pgrep -f "clarity_actionsGPT_server.py" > /dev/null; then
      echo "✅ ActionsGPT server is already running."
    else
      # Start ActionsGPT server in background
      ./start_actionsGPT_server.sh &
      ACTIONSGPT_PID=$!
      echo "✅ ActionsGPT server started with PID: $ACTIONSGPT_PID"

      # Log the ritual action
      echo "{\"timestamp\": \"$(date -u +"%Y-%m-%dT%H:%M:%SZ")\", \"spell\": \"cast\", \"details\": {\"action\": \"start\", \"message\": \"ActionsGPT server started\", \"component\": \"ActionsGPT Server\"}}" >> ritual_manifest/spells.log.json

      # Give ActionsGPT server time to start
      sleep 2
    fi
  else
    echo "⚠️ ActionsGPT server script not found. Continuing without it."
  fi
fi

# Create command to run the MCP server
CMD="node clarity_or_death/api/mcp_server/context7_server.js"

# Start the server
echo "Starting Context7 MCP server on ${HOST}:${PORT}"
echo "Logs will be written to: ${LOG_FILE}"
echo "Server starting... Press Ctrl+C to stop."

# Run server with logging to file
if [[ "$BACKGROUND" == true ]]; then
  echo "Running in background mode"
  $CMD > $LOG_FILE 2>&1 &
  MCP_PID=$!
  echo "✅ Context7 MCP server started with PID: $MCP_PID"

  # Save the PID to a file for later reference
  echo $MCP_PID > .context7_mcp_server.pid

  # Log the ritual action
  echo "{\"timestamp\": \"$(date -u +"%Y-%m-%dT%H:%M:%SZ")\", \"spell\": \"cast\", \"details\": {\"action\": \"start\", \"message\": \"Context7 MCP Server started in background\", \"component\": \"Context7 MCP Server\", \"pid\": $MCP_PID}}}" >> ritual_manifest/spells.log.json

  echo "Use 'kill $MCP_PID' to stop the server"
else
  # Foreground mode
  $CMD 2>&1 | tee $LOG_FILE
fi