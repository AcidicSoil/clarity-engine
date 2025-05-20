# CLARITY-OR-DEATH

## veil:design() log:"Reorganized CLARITY-OR-DEATH codebase"

This is the reorganized structure for the CLARITY-OR-DEATH ritual system.

## Directory Structure

- **api/**: API servers and endpoints
  - **ritual_api.py**: Flask API for ritual operations
  - **mcp_server/**: Model Context Protocol server implementation
- **core/**: Core engine functionality
  - **engine/**: Main engine implementation
  - **ritual/**: Ritual system implementation
  - **veil/**: SIGMA VEIL implementation
- **ui/**: User interface components
  - **components/**: React components
  - **public/**: Static assets
  - **src/**: Source code
- **tools/**: Utility tools and scripts
  - **vibe-check/**: Vibe check tools
  - **utils/**: General utilities
- **ritual_manifest/**: Ritual configuration and logs
- **docs/**: Project documentation
- **tests/**: Tests for all components

## Quick Start

### Starting the API Server

```bash
# Navigate to the api directory
cd api

# Start the ritual API server
python ritual_api.py
```

### Starting the UI

```bash
# Navigate to the UI directory
cd ui

# Install dependencies (first time only)
./install-deps.sh

# Start the UI
./simple-start.sh
```

## cast:document log:"Reorganized codebase documentation complete" flag:docs
