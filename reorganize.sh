#!/bin/bash

# Reorganize Codebase Script for clarity_or_death
# This script executes the reorganization and logs the output

set -e

echo "============================================================"
echo "CLARITY-OR-DEATH Codebase Reorganization"
echo "veil:design() log:\"Initiating codebase reorganization\""
echo "============================================================"

# Create logs directory if it doesn't exist
mkdir -p logs

# Generate timestamp for log files
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
LOG_FILE="logs/reorganize_${TIMESTAMP}.log"

# Ask for confirmation
echo "This script will reorganize your codebase according to the plan."
echo "A log will be saved to: ${LOG_FILE}"
echo
echo "Do you want to run a dry run first? (y/n)"
read -p "> " DRY_RUN_CHOICE

if [[ "$DRY_RUN_CHOICE" == "y" || "$DRY_RUN_CHOICE" == "Y" ]]; then
  echo "Running in dry run mode..."
  echo "============================================================" | tee -a "${LOG_FILE}"
  echo "CLARITY-OR-DEATH Codebase Reorganization - DRY RUN" | tee -a "${LOG_FILE}"
  echo "Date: $(date)" | tee -a "${LOG_FILE}"
  echo "============================================================" | tee -a "${LOG_FILE}"

  python tools/reorganize_codebase.py --dry-run 2>&1 | tee -a "${LOG_FILE}"

  echo "============================================================" | tee -a "${LOG_FILE}"
  echo "Dry run complete. Review the log file for details: ${LOG_FILE}"

  echo
  echo "Do you want to proceed with the actual reorganization? (y/n)"
  read -p "> " PROCEED_CHOICE

  if [[ "$PROCEED_CHOICE" != "y" && "$PROCEED_CHOICE" != "Y" ]]; then
    echo "Reorganization cancelled."
    exit 0
  fi
fi

# Run the actual reorganization
echo "============================================================" | tee -a "${LOG_FILE}"
echo "CLARITY-OR-DEATH Codebase Reorganization - LIVE RUN" | tee -a "${LOG_FILE}"
echo "Date: $(date)" | tee -a "${LOG_FILE}"
echo "============================================================" | tee -a "${LOG_FILE}"

python tools/reorganize_codebase.py 2>&1 | tee -a "${LOG_FILE}"

echo "============================================================" | tee -a "${LOG_FILE}"
echo "cast:implement log:\"Codebase reorganization complete\"" | tee -a "${LOG_FILE}"
echo "Reorganization complete. Log saved to: ${LOG_FILE}"
echo "============================================================"

# Return to the reorganized directory
echo "You can now cd into the reorganized codebase:"
echo "cd clarity_or_death"