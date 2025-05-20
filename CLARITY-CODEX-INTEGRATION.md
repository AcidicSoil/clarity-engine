# CLARITY-OR-DEATH + Open Codex Integration

## veil:design() log:"Documenting the integration between CLARITY-OR-DEATH and Open Codex CLI"

This guide explains how to integrate the CLARITY-OR-DEATH ritual system with Open Codex CLI, allowing you to access your ritual API through a terminal-based AI coding agent.

## Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Open Codex CLI ├────►│ Clarity Adapter ├────►│ ActionsGPT      │
│  (Terminal)     │     │ (Node.js)       │     │ Server (Flask)  │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        ▲                                               │
        │                                               │
        │                                               ▼
┌─────────────────┐                           ┌─────────────────┐
│                 │                           │                 │
│  Your Codebase  │                           │ ritual_manifest │
│  (Source Code)  │                           │ /spells.log.json│
│                 │                           │                 │
└─────────────────┘                           └─────────────────┘
```

## Prerequisites

1. Node.js v22 or later
2. npm or yarn
3. CLARITY-OR-DEATH ActionsGPT Server running on port 4621

## Quick Setup

Run the setup script:

```bash
chmod +x setup-codex-integration.sh
./setup-codex-integration.sh
```

This will:
1. Install Open Codex CLI globally
2. Install the adapter dependencies
3. Create the Open Codex configuration
4. Log the integration in your ritual manifest

## Manual Setup

If you prefer to set things up manually:

1. Install Open Codex CLI:
   ```bash
   npm install -g open-codex
   ```

2. Install adapter dependencies:
   ```bash
   cd clarity-codex-adapter
   npm install
   ```

3. Create a `.codexrc` file in your project root:
   ```json
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
   ```

## Usage

Once set up, you can interact with your CLARITY-OR-DEATH ritual system through Open Codex:

### Basic Commands

```bash
# Invoke the veil
codex clarity veil

# Cast entropy
codex clarity cast

# Cut contradiction
codex clarity cut "clarity without enforcement is drift"

# Log manifestation
codex clarity log "New feature implemented with full traceability"
```

### Interactive Mode

Start an interactive Codex session:

```bash
codex
```

Then use ritual commands:

```
> clarity veil
Veil engaged.

> clarity cut "Mutation without clarity is noise"
Cut executed on contradiction: Mutation without clarity is noise
```

## Advanced Configuration

You can customize the integration by modifying:

1. `.codexrc` - Open Codex configuration
2. `clarity-codex-adapter/index.js` - Adapter implementation

## Troubleshooting

### Common Issues

1. **Connection Error**
   - Ensure ActionsGPT server is running on port 4621
   - Check if you can access http://localhost:4621/ritual/health

2. **Command Not Found**
   - Ensure Open Codex is installed globally: `which codex`
   - Try reinstalling: `npm i -g open-codex`

3. **Adapter Errors**
   - Verify adapter dependencies are installed
   - Check for errors in the adapter logs

## cast:seal log:"CLARITY-OR-DEATH Open Codex integration documentation complete"