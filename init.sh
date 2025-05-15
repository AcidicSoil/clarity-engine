#!/bin/bash
echo "🌀 INITIALIZING CLARITY ENGINE..."

# Start daemon loop
echo "🔁 Starting Cast Loop Daemon..."
node daemon/castLoop.js &

# Launch UI
echo "🖥️ Launching Agentic Ritual UI..."
# Note: Replace with actual command to serve the UI (placeholder)
echo "Run 'npm run dev' inside ./ui for UI interface"

# Monitor system state
echo "🧠 System status file: ./daemon/status.json"
echo "📜 Spell log: ./ritual_manifest/spells.log.json"

# Note: Assume logs and multiverse tasks are separately triggered as needed
echo "✅ All base systems are initialized."
