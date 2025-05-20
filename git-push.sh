#!/bin/bash

# CLARITY-OR-DEATH Git Backup Script
# veil:cast() log:"Creating ritual backup to persistent storage"

set -e

# Configuration
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
COMMIT_MSG_FILE="commit_msg_${TIMESTAMP}.txt"
BRANCH_NAME="main"
BACKUP_DIR="ritual_manifest/backups"

# Create backup directory if it doesn't exist
mkdir -p ${BACKUP_DIR}

echo "============================================================"
echo "CLARITY-OR-DEATH Git Backup"
echo "veil:cast() log:\"Initiating ritual system state backup\""
echo "============================================================"

# Check for any unstaged changes
if [[ -z $(git status --porcelain) ]]; then
    echo "No changes to commit. System state is already in ledger."
    exit 0
fi

# Create a backup of ritual_manifest/spells.log.json
if [[ -f "ritual_manifest/spells.log.json" ]]; then
    echo "Creating backup of ritual manifest..."
    cp "ritual_manifest/spells.log.json" "${BACKUP_DIR}/spells.log.json.${TIMESTAMP}.bak"
    echo "Backup created at ${BACKUP_DIR}/spells.log.json.${TIMESTAMP}.bak"
fi

# Display changes to be committed
echo
echo "The following changes will be committed:"
git status --short
echo

# Ask for commit message
echo "Enter commit message (or leave empty for auto-generated message):"
read -p "> " COMMIT_MESSAGE

if [[ -z "$COMMIT_MESSAGE" ]]; then
    COMMIT_MESSAGE="[Cursor] CLARITY-OR-DEATH ritual state backup - ${TIMESTAMP}"
fi

# Write commit message to file (to handle multi-line messages)
echo "${COMMIT_MESSAGE}" > ${COMMIT_MSG_FILE}

# Add all changes
echo "Adding all changes to git staging area..."
git add .

# Commit changes
echo "Committing changes..."
git commit -F ${COMMIT_MSG_FILE}

# Clean up commit message file
rm ${COMMIT_MSG_FILE}

# Check if user wants to push changes
echo
echo "Do you want to push changes to remote repository? (y/n)"
read -p "> " PUSH_CHOICE

if [[ "$PUSH_CHOICE" == "y" || "$PUSH_CHOICE" == "Y" ]]; then
    echo "Pushing changes to remote repository..."
    git push origin ${BRANCH_NAME}

    echo
    echo "Backup complete. Ritual state has been committed to the persistent ledger."
    echo "cast:backup log:\"Ritual system state backup completed\" flag:milestone"
else
    echo
    echo "Changes committed locally. Use 'git push origin ${BRANCH_NAME}' to push to remote repository."
    echo "cast:backup log:\"Ritual system state backup completed (local only)\" flag:milestone"
fi

echo "============================================================"
