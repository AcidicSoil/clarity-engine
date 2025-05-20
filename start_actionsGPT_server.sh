#!/bin/bash

# CLARITY-OR-DEATH ActionsGPT Server Startup Script
# veil:cast() log:"Starting ActionsGPT server for ChatGPT integration"

set -e

# Define variables
PORT=4621
HOST="0.0.0.0"
LOG_DIR="logs"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
LOG_FILE="${LOG_DIR}/actionsGPT_server_${TIMESTAMP}.log"

# Create logs directory if it doesn't exist
mkdir -p ${LOG_DIR}

echo "============================================================"
echo "CLARITY-OR-DEATH ActionsGPT Server"
echo "veil:cast() log:\"Initiating ActionsGPT server for ritual operations\""
echo "============================================================"

# Check if Python virtual environment exists
if [ ! -d ".venv" ]; then
    echo "Creating Python virtual environment..."
    python -m venv .venv
fi

# Activate virtual environment
echo "Activating virtual environment..."
source .venv/Scripts/activate

# Install dependencies if needed
if [ "$1" == "--install" ] || [ "$2" == "--install" ]; then
    echo "Installing dependencies..."
    uv pip install -r requirements-actionsGPT.txt
fi

# Set port if provided
if [ "$1" == "--port" ] && [ ! -z "$2" ]; then
    PORT=$2
elif [ "$2" == "--port" ] && [ ! -z "$3" ]; then
    PORT=$3
fi

# Set host if provided
if [ "$1" == "--host" ] && [ ! -z "$2" ]; then
    HOST=$2
elif [ "$2" == "--host" ] && [ ! -z "$3" ]; then
    HOST=$3
fi

# Log the startup
echo "Starting ActionsGPT server on ${HOST}:${PORT}"
echo "Logs will be written to: ${LOG_FILE}"
echo

# Start the server
echo "Server starting... Press Ctrl+C to stop."
python clarity_actionsGPT_server.py --host ${HOST} --port ${PORT} 2>&1 | tee -a ${LOG_FILE}

# Deactivate virtual environment on exit
trap "echo 'Stopping server and deactivating virtual environment...'; deactivate" EXIT