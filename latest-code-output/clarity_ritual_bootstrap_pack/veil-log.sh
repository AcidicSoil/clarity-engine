#!/bin/bash
# veil-log.sh — Ritual log exporter (appends as JSON line)

LOG_PATH="./ritual_manifest/spells.log.json"
SPELL="$1"
RESULT="$2"
NOTES="$3"

TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
ENTRY="{\"timestamp\":\"$TIMESTAMP\",\"spell\":\"$SPELL\",\"result\":\"$RESULT\",\"notes\":\"$NOTES\"}"

if [ ! -f "$LOG_PATH" ]; then
  echo "[]" > "$LOG_PATH"
fi

# Append new entry
jq ". += [ $ENTRY ]" "$LOG_PATH" > tmp.$$.json && mv tmp.$$.json "$LOG_PATH"
echo "[VEIL LOG] $TIMESTAMP: $SPELL — $RESULT"
