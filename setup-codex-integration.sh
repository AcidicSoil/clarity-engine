#!/bin/bash
# veil:cast() log:"Setting up Open Codex integration with CLARITY-OR-DEATH"

echo "============================================================"
echo "CLARITY-OR-DEATH Open Codex Integration Setup"
echo "veil:cast() log:\"Integrating Open Codex CLI with ActionsGPT server\""
echo "============================================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v22 or later."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm."
    exit 1
fi

# Install Open Codex CLI globally
echo "Installing Open Codex CLI globally..."
npm i -g open-codex

# Install the adapter dependencies
echo "Installing adapter dependencies..."
cd clarity-codex-adapter
npm install
cd ..

# Create codex configuration
echo "Creating Open Codex configuration..."
cat > .codexrc << EOF
{
  "provider": "openai",
  "baseURL": "http://localhost:4621",
  "ritualEndpoint": "/ritual",
  "model": "custom-clarity-model",
  "debug": true,
  "plugins": [
    "./clarity-codex-adapter"
  ]
}
EOF

# Log the ritual action
echo "Logging ritual action..."
curl -s -X POST http://localhost:4621/ritual/log -H "Content-Type: application/json" -d '{"entry": "veil:cast() log:\"Open Codex integration setup completed\""}'

echo ""
echo "✅ CLARITY-OR-DEATH Open Codex integration setup complete!"
echo ""
echo "To use the integration, run:"
echo "  codex clarity veil"
echo "  codex clarity cast"
echo "  codex clarity cut \"your contradiction\""
echo ""
echo "Or start the interactive mode with:"
echo "  codex"
echo ""