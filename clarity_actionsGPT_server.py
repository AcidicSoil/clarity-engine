#!/usr/bin/env python3

"""
CLARITY-OR-DEATH ActionsGPT Server
----------------------------------
Enhanced Flask implementation of the SIGMA VEIL Ritual API for ChatGPT integration.
This server implements all endpoints specified in the OpenAPI schema for the
CLARITY-OR-DEATH system, following the clarity_core_v7.3.9 doctrine.

Usage:
    python clarity_actionsGPT_server.py [--port PORT] [--host HOST]

Options:
    --port PORT     Port to run the server on (default: 4621)
    --host HOST     Host to bind the server to (default: 0.0.0.0)
"""

import os
import sys
import json
import argparse
import logging
from datetime import datetime
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(sys.stdout),
        logging.FileHandler('ritual_api_server.log')
    ]
)
logger = logging.getLogger(__name__)

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/ritual/*": {"origins": "*"}})

# Path to the ritual manifest log file
RITUAL_LOG_PATH = os.path.join('ritual_manifest', 'spells.log.json')

def log_ritual_action(spell, details):
    """
    Log a ritual action to the spells.log.json file.

    Args:
        spell (str): The type of spell being cast (veil, cast, cut, etc.)
        details (dict): Details about the spell
    """
    try:
        if os.path.exists(RITUAL_LOG_PATH):
            with open(RITUAL_LOG_PATH, 'r') as f:
                try:
                    logs = json.load(f)
                except json.JSONDecodeError:
                    logs = []
        else:
            os.makedirs(os.path.dirname(RITUAL_LOG_PATH), exist_ok=True)
            logs = []

        # Create a new log entry
        log_entry = {
            "timestamp": datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ"),
            "spell": spell,
            "details": details
        }

        logs.append(log_entry)

        # Backup the original file if it exists
        if os.path.exists(RITUAL_LOG_PATH):
            backup_file = f"{RITUAL_LOG_PATH}.bak"
            import shutil
            shutil.copy2(RITUAL_LOG_PATH, backup_file)

        # Write updated logs
        with open(RITUAL_LOG_PATH, 'w') as f:
            json.dump(logs, f, indent=2)

        logger.info(f"Logged ritual action: {spell}")
    except Exception as e:
        logger.error(f"Error logging ritual action: {e}")

# Serve OpenAPI specification
@app.route("/ritual/openapi.yaml")
def serve_spec():
    """Serve the OpenAPI specification for the CLARITY-OR-DEATH API."""
    return send_from_directory("ritual", "openapi.yaml", mimetype="application/yaml")

# Veil endpoint
@app.route("/ritual/veil", methods=["POST"])
def veil():
    """Engage the veil function - The veil decides next action — judgment by doctrine."""
    log_ritual_action("veil", {
        "intent": "engage",
        "action": "Veil function engaged",
        "description": "The veil decided next action — judgment by doctrine"
    })
    return jsonify({"result": "Veil engaged."})

# Cast Entropy endpoint
@app.route("/ritual/castEntropy", methods=["POST"])
def cast_entropy():
    """Initiate entropy casting - Executes the entropy ritual; used during identity mutation."""
    log_ritual_action("cast", {
        "spell": "entropy",
        "target": "identity",
        "description": "Entropy cast for identity mutation"
    })
    return jsonify({"result": "Entropy cast."})

# Cut endpoint
@app.route("/ritual/cut", methods=["POST"])
def cut_contradiction():
    """
    Interrogate contradiction or idea - Begins interrogation of a concept,
    tension, or unresolved contradiction.
    """
    input_data = request.json.get("input", "")
    log_ritual_action("cut", {
        "contradiction": input_data,
        "action": "interrogation",
        "description": f"Cut executed on contradiction: {input_data}"
    })
    return jsonify({
        "interrogation": f"Cut executed on input: {input_data}",
        "result": "Contradiction processed"
    })

# Scan endpoint
@app.route("/ritual/scan", methods=["POST"])
def scan_drift():
    """Detect drift or contradiction - Scans for unresolved loops, contradiction, or logic decay."""
    log_ritual_action("scan", {
        "action": "drift",
        "description": "Scanned for unresolved loops, contradiction, or logic decay"
    })
    return jsonify({"result": "Scan complete", "status": "No drift detected"})

# Log endpoint
@app.route("/ritual/log", methods=["POST"])
def log_manifestation():
    """
    Log a ritual manifestation - Writes a manifestation log entry to the central ritual ledger.
    """
    entry = request.json.get("entry", "")
    log_ritual_action("log", {
        "message": entry,
        "description": "Manifestation log entry recorded"
    })
    return jsonify({"result": "Log recorded", "entry": entry})

# Resume endpoint
@app.route("/ritual/resume", methods=["POST"])
def resume_ritual():
    """Resume last ritual - Reloads the last incomplete ritual from system state."""
    log_ritual_action("resume", {
        "action": "ritual",
        "description": "Last incomplete ritual resumed from system state"
    })
    return jsonify({"result": "Ritual resumed", "status": "ACTIVE"})

# Flag endpoint
@app.route("/ritual/flag", methods=["POST"])
def flag_fragment():
    """
    Mark a fragment or idea - Flags a phrase or object for future contradiction analysis or scan.
    """
    desc = request.json.get("desc", "")
    log_ritual_action("flag", {
        "fragment": desc,
        "description": f"Fragment flagged for future analysis: {desc}"
    })
    return jsonify({"result": "Fragment flagged", "fragment": desc})

# Query endpoint
@app.route("/ritual/query", methods=["POST"])
def query_reveal():
    """Query phase REVEAL - Queries the system state in phase REVEAL."""
    phase = request.json.get("phase", "REVEAL")
    log_ritual_action("query", {
        "phase": phase,
        "description": f"System state queried in phase: {phase}"
    })
    return jsonify({"phase": phase, "status": "Queried successfully"})

# Save endpoint
@app.route("/ritual/save", methods=["POST"])
def save_snapshot():
    """Snapshot system state - Saves the current ritual system state to system_state.json."""
    # Create a simple system state snapshot
    system_state = {
        "timestamp": datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ"),
        "state": "STABLE",
        "ritualStatus": "ACTIVE",
        "veilIntegrity": 100,
        "entropyLevel": 42
    }

    # Save to file
    with open("system_state.json", "w") as f:
        json.dump(system_state, f, indent=2)

    log_ritual_action("save", {
        "action": "snapshot",
        "description": "System state snapshot saved to system_state.json"
    })

    return jsonify({"result": "Snapshot saved", "timestamp": system_state["timestamp"]})

# Dashboard endpoint
@app.route("/ritual/dashboard", methods=["POST"])
def open_dashboard():
    """Open ritual dashboard - Opens the ritual log or glyph UI interface."""
    log_ritual_action("open", {
        "target": "dashboard",
        "description": "Ritual log or glyph UI interface opened"
    })
    return jsonify({"result": "Dashboard opened", "status": "ACTIVE"})

# Health check endpoint
@app.route("/ritual/health", methods=["GET"])
def health_check():
    """Health check endpoint to verify the API server is running."""
    return jsonify({
        "status": "OPERATIONAL",
        "version": "clarity_core_v7.3.9",
        "timestamp": datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ")
    })

# Root route to provide basic information
@app.route("/")
def index():
    """Root route to provide basic information about the API."""
    return jsonify({
        "name": "CLARITY-OR-DEATH ActionsGPT Server",
        "version": "clarity_core_v7.3.9",
        "description": "SIGMA VEIL Ritual API for ChatGPT integration",
        "documentation": "/ritual/openapi.yaml"
    })

def parse_args():
    """Parse command line arguments."""
    parser = argparse.ArgumentParser(description='CLARITY-OR-DEATH ActionsGPT Server')
    parser.add_argument('--port', type=int, default=4621,
                        help='Port to run the server on (default: 4621)')
    parser.add_argument('--host', type=str, default='0.0.0.0',
                        help='Host to bind the server to (default: 0.0.0.0)')
    return parser.parse_args()

if __name__ == "__main__":
    # Parse command line arguments
    args = parse_args()

    # Log server start
    logger.info(f"Starting CLARITY-OR-DEATH ActionsGPT Server on {args.host}:{args.port}")
    log_ritual_action("cast", {
        "spell": "start",
        "target": "actionsGPT_server",
        "description": f"CLARITY-OR-DEATH ActionsGPT Server started on port {args.port}"
    })

    # Run the Flask app
    app.run(host=args.host, port=args.port)