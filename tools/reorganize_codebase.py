#!/usr/bin/env python3

"""
Codebase Reorganization Script for clarity_or_death project.
This script implements the reorganization plan to create a more structured
project layout.

Usage:
    python reorganize_codebase.py [--dry-run]

Options:
    --dry-run    Show what would be done without making any changes
"""

import os
import shutil
import sys
import json
from datetime import datetime

# Root directory of the project
PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))

# Target directory structure
NEW_STRUCTURE = {
    'clarity_or_death': {
        'api': {
            'ritual_api.py': None,  # Will be created from serve_ritual_api.py
            'mcp_server': {}  # Will be populated from clarity-engine/daemon
        },
        'core': {
            'engine': {},
            'ritual': {},
            'veil': {}
        },
        'ui': {
            'components': {},
            'public': {},
            'src': {}
        },
        'tools': {
            'vibe-check': {},
            'utils': {}
        },
        'ritual_manifest': {},  # Will be copied from existing ritual_manifest
        'docs': {},
        'tests': {}
    }
}

# File mapping: source -> destination
FILE_MAPPING = [
    # API files
    {'src': 'serve_ritual_api.py',
     'dst': 'clarity_or_death/api/ritual_api.py'},

    # Engine daemon files
    {'src': 'clarity-engine/daemon',
     'dst': 'clarity_or_death/api/mcp_server'},

    # UI files
    {'src': 'clarity-engine/ui/src',
     'dst': 'clarity_or_death/ui/src'},
    {'src': 'clarity-engine/ui/public',
     'dst': 'clarity_or_death/ui/public'},
    {'src': 'clarity-engine/ui/RitualLogDashboard.jsx',
     'dst': 'clarity_or_death/ui/components/RitualLogDashboard.jsx'},
    {'src': 'clarity-engine/ui/AgenticUIController.jsx',
     'dst': 'clarity_or_death/ui/components/AgenticUIController.jsx'},
    {'src': 'clarity-engine/ui/package.json',
     'dst': 'clarity_or_death/ui/package.json'},
    {'src': 'clarity-engine/ui/tsconfig.json',
     'dst': 'clarity_or_death/ui/tsconfig.json'},
    {'src': 'clarity-engine/ui/install-deps.sh',
     'dst': 'clarity_or_death/ui/install-deps.sh'},
    {'src': 'clarity-engine/ui/start.sh',
     'dst': 'clarity_or_death/ui/start.sh'},
    {'src': 'clarity-engine/ui/simple-start.sh',
     'dst': 'clarity_or_death/ui/simple-start.sh'},
    {'src': 'clarity-engine/ui/start-ui.bat',
     'dst': 'clarity_or_death/ui/start-ui.bat'},

    # Ritual implementation
    {'src': 'ritual', 'dst': 'clarity_or_death/core/ritual'},

    # Ritual manifest
    {'src': 'ritual_manifest', 'dst': 'clarity_or_death/ritual_manifest'},

    # Documentation
    {'src': 'clarity-engine/docs', 'dst': 'clarity_or_death/docs/engine'},
    {'src': 'ritual_docs', 'dst': 'clarity_or_death/docs/ritual'},
    {'src': 'actionsGPT_docs', 'dst': 'clarity_or_death/docs/actionsGPT'},

    # Tests
    {'src': 'clarity-engine/tests', 'dst': 'clarity_or_death/tests/engine'},

    # Vibe check tools
    {'src': 'vibe-check-mcp-server/src/tools',
     'dst': 'clarity_or_death/tools/vibe-check'},
    {'src': 'vibe-check-mcp-server/src/utils',
     'dst': 'clarity_or_death/tools/utils'}
]


def create_directory_structure(root, structure, dry_run=False):
    """Create the target directory structure"""
    for name, substructure in structure.items():
        path = os.path.join(root, name)
        if not os.path.exists(path):
            print(f"Creating directory: {path}")
            if not dry_run:
                os.makedirs(path, exist_ok=True)
        if substructure and isinstance(substructure, dict):
            create_directory_structure(path, substructure, dry_run)


def copy_files(mappings, dry_run=False):
    """Copy files according to the mapping"""
    for mapping in mappings:
        src_path = os.path.join(PROJECT_ROOT, mapping['src'])
        dst_path = os.path.join(PROJECT_ROOT, mapping['dst'])

        if not os.path.exists(src_path):
            print(f"Warning: Source not found: {src_path}")
            continue

        # If source is a directory
        if os.path.isdir(src_path):
            print(f"Copying directory: {src_path} -> {dst_path}")
            if not dry_run:
                if os.path.exists(dst_path):
                    # Remove existing destination if it exists
                    shutil.rmtree(dst_path)
                shutil.copytree(src_path, dst_path)
        else:
            # Make sure the destination directory exists
            dst_dir = os.path.dirname(dst_path)
            if not os.path.exists(dst_dir) and not dry_run:
                os.makedirs(dst_dir, exist_ok=True)

            print(f"Copying file: {src_path} -> {dst_path}")
            if not dry_run:
                shutil.copy2(src_path, dst_path)


def log_restructuring(dry_run=False):
    """Log the restructuring operation to the spells.log.json file"""
    log_file = os.path.join(PROJECT_ROOT, 'ritual_manifest', 'spells.log.json')
    if not os.path.exists(log_file):
        print(f"Warning: Cannot find log file at {log_file}")
        return

    try:
        with open(log_file, 'r') as f:
            logs = json.load(f)
    except Exception:
        logs = []

    # Create a new log entry
    log_entry = {
        "timestamp": datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ"),
        "spell": "veil",
        "details": {
            "intent": "design",
            "action": "Codebase Reorganization",
            "description": "Restructured codebase for better organization"
        }
    }

    logs.append(log_entry)

    if not dry_run:
        # Backup the original file
        backup_file = f"{log_file}.bak"
        shutil.copy2(log_file, backup_file)

        # Write updated logs
        with open(log_file, 'w') as f:
            json.dump(logs, f, indent=2)

        print(f"Updated log file: {log_file}")
        print(f"Created backup: {backup_file}")


def create_readme(dry_run=False):
    """Create a README.md file in the reorganized structure"""
    readme_path = os.path.join(PROJECT_ROOT, 'clarity_or_death', 'README.md')

    readme_content = """# CLARITY-OR-DEATH

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
"""

    print(f"Creating README: {readme_path}")
    if not dry_run:
        with open(readme_path, 'w') as f:
            f.write(readme_content)


def main():
    dry_run = '--dry-run' in sys.argv

    print("=" * 50)
    print("CLARITY-OR-DEATH Codebase Reorganization")
    if dry_run:
        print("(DRY RUN - No changes will be made)")
    print("=" * 50)

    # Create the target directory structure
    create_directory_structure(PROJECT_ROOT, NEW_STRUCTURE, dry_run)

    # Copy files according to the mapping
    copy_files(FILE_MAPPING, dry_run)

    # Create README
    create_readme(dry_run)

    # Log the restructuring
    log_restructuring(dry_run)

    print("\nReorganization complete!")
    if dry_run:
        print("This was a dry run. No changes were made.")
    print("=" * 50)


if __name__ == "__main__":
    main()