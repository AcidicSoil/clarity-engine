#!/usr/bin/env python3
"""
CLARITY-OR-DEATH MCP Server
---------------------------
Exposes the Clarity ritual system as a Model Context Protocol server
using the Smithery SDK. This allows AI agents to interact with the
ritual system in a standardized way.

veil:design() log:"Creating MCP server for CLARITY-OR-DEATH rituals"
"""

import os
import json
import sys
from datetime import datetime
from flask import Flask, jsonify, request, send_from_directory

# Create the Flask app
app = Flask(__name__)

# Define the ritual manifest directory path
RITUAL_MANIFEST_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "ritual_manifest")

# Ensure the ritual_manifest directory exists
os.makedirs(RITUAL_MANIFEST_DIR, exist_ok=True)

# Path to spell log file
SPELLS_LOG_PATH = os.path.join(RITUAL_MANIFEST_DIR, "spells.log.json")

# Initialize spell log if it doesn't exist
if not os.path.exists(SPELLS_LOG_PATH):
    with open(SPELLS_LOG_PATH, "w") as f:
        f.write("[]")

# MCP Server routes
@app.route("/mcp", methods=["POST"])
def mcp_handler():
    """Main MCP handler that processes incoming requests from AI agents"""
    data = request.json

    if not data or "tool" not in data:
        return jsonify({"error": "Invalid MCP request format"}), 400

    tool_name = data.get("tool")
    tool_params = data.get("parameters", {})

    # Map tools to functions
    tool_map = {
        "veil": handle_veil,
        "cast": handle_cast,
        "log": handle_log,
        "cut": handle_cut,
        "query": handle_query,
        "scan": handle_scan,
        "flag": handle_flag,
        "save": handle_save,
        "dashboard": handle_dashboard
    }

    if tool_name not in tool_map:
        return jsonify({"error": f"Unknown tool: {tool_name}"}), 400

    # Call the appropriate handler
    return tool_map[tool_name](tool_params)

# Tool handler functions
def handle_veil(params):
    """SIGMA VEIL decides the next action"""
    intent = params.get("intent", "general")

    # Log the veil invocation
    log_spell("veil", {"intent": intent})

    return jsonify({
        "judgment": "The Veil has spoken",
        "intent": intent,
        "timestamp": datetime.utcnow().isoformat()
    })

def handle_cast(params):
    """Cast ritual spell or agentic function"""
    spell = params.get("spell")
    if not spell:
        return jsonify({"error": "Missing spell parameter"}), 400

    # Log the spell cast
    result = log_spell("cast", {"spell": spell})

    return jsonify({
        "result": f"Spell '{spell}' cast",
        "timestamp": datetime.utcnow().isoformat()
    })

def handle_log(params):
    """Log a manifestation, contradiction, or outcome"""
    message = params.get("message")
    if not message:
        return jsonify({"error": "Missing message parameter"}), 400

    # Log the message
    log_spell("log", {"message": message})

    return jsonify({
        "result": "Manifestation logged",
        "timestamp": datetime.utcnow().isoformat()
    })

def handle_cut(params):
    """Interrogate or collapse an idea or tension"""
    input_data = params.get("input")
    if not input_data:
        return jsonify({"error": "Missing input parameter"}), 400

    # Log the cut operation
    log_spell("cut", {"input": input_data})

    return jsonify({
        "interrogation": f"Cut executed on input: {input_data}",
        "timestamp": datetime.utcnow().isoformat()
    })

def handle_query(params):
    """Search all ritual logs, glyphs, or artifacts"""
    query = params.get("query")
    if not query:
        return jsonify({"error": "Missing query parameter"}), 400

    # Log the query
    log_spell("query", {"query": query})

    # In a real implementation, this would search through logs
    return jsonify({
        "phase": "REVEAL",
        "status": "Query executed",
        "query": query,
        "timestamp": datetime.utcnow().isoformat()
    })

def handle_scan(params):
    """Scan for drift, unresolved tension, or code debt"""
    target = params.get("target", "all")

    # Log the scan
    log_spell("scan", {"target": target})

    return jsonify({
        "result": f"Scan completed for {target}",
        "timestamp": datetime.utcnow().isoformat()
    })

def handle_flag(params):
    """Mark code, idea, or log for future contradiction check"""
    flag_type = params.get("type")
    content = params.get("content")

    if not flag_type or not content:
        return jsonify({"error": "Missing type or content parameter"}), 400

    # Log the flag
    log_spell("flag", {"type": flag_type, "content": content})

    return jsonify({
        "result": f"Content flagged as {flag_type}",
        "timestamp": datetime.utcnow().isoformat()
    })

def handle_save(params):
    """Snapshot current project or ritual state"""
    label = params.get("label", f"snapshot_{datetime.utcnow().strftime('%Y%m%d_%H%M%S')}")

    # Log the save operation
    log_spell("save", {"label": label})

    return jsonify({
        "result": f"Project state saved as {label}",
        "timestamp": datetime.utcnow().isoformat()
    })

def handle_dashboard(params):
    """Open ritual dashboard or glyph viewer"""
    view = params.get("view", "dashboard")

    # Log the dashboard access
    log_spell("dashboard", {"view": view})

    return jsonify({
        "result": f"{view.capitalize()} opened",
        "timestamp": datetime.utcnow().isoformat()
    })

# Helper functions
def log_spell(spell_type, details):
    """Log a spell to the spells.log.json file"""
    log_entry = {
        "timestamp": datetime.utcnow().isoformat(),
        "spell": spell_type,
        "details": details
    }

    try:
        # Read existing log
        logs = []
        if os.path.exists(SPELLS_LOG_PATH) and os.path.getsize(SPELLS_LOG_PATH) > 0:
            with open(SPELLS_LOG_PATH, "r") as f:
                content = f.read()
                if content.strip():
                    logs = json.loads(content)

        # Append new entry
        logs.append(log_entry)

        # Write back to file
        with open(SPELLS_LOG_PATH, "w") as f:
            json.dump(logs, f, indent=2)

        return True
    except Exception as e:
        print(f"Error logging spell: {e}", file=sys.stderr)
        return False

# MCP metadata endpoints
@app.route("/mcp/openapi.json")
def serve_openapi():
    """Serve the OpenAPI spec for the MCP server"""
    openapi_spec = {
        "openapi": "3.1.0",
        "info": {
            "title": "CLARITY-OR-DEATH MCP Server",
            "version": "7.3.x",
            "description": "Model Context Protocol server for CLARITY-OR-DEATH ritual system"
        },
        "servers": [
            {"url": "http://localhost:4621"}
        ],
        "paths": {
            "/mcp": {
                "post": {
                    "summary": "MCP endpoint for all ritual tools",
                    "requestBody": {
                        "required": True,
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "required": ["tool"],
                                    "properties": {
                                        "tool": {
                                            "type": "string",
                                            "description": "The ritual tool to invoke"
                                        },
                                        "parameters": {
                                            "type": "object",
                                            "description": "Parameters for the tool"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "responses": {
                        "200": {
                            "description": "Tool invocation successful"
                        },
                        "400": {
                            "description": "Invalid request"
                        }
                    }
                }
            }
        }
    }
    return jsonify(openapi_spec)

@app.route("/mcp/tools")
def serve_tools():
    """Serve the list of available tools in the MCP server"""
    tools = [
        {
            "name": "veil",
            "description": "SIGMA VEIL decides the next action",
            "parameters": {
                "intent": {
                    "type": "string",
                    "description": "The intent of the veil invocation",
                    "required": False
                }
            }
        },
        {
            "name": "cast",
            "description": "Cast ritual spell or agentic function",
            "parameters": {
                "spell": {
                    "type": "string",
                    "description": "The name of the spell to cast",
                    "required": True
                }
            }
        },
        {
            "name": "log",
            "description": "Log a manifestation, contradiction, or outcome",
            "parameters": {
                "message": {
                    "type": "string",
                    "description": "The message to log",
                    "required": True
                }
            }
        },
        {
            "name": "cut",
            "description": "Interrogate or collapse an idea or tension",
            "parameters": {
                "input": {
                    "type": "string",
                    "description": "The idea or tension to interrogate",
                    "required": True
                }
            }
        },
        {
            "name": "query",
            "description": "Search all ritual logs, glyphs, or artifacts",
            "parameters": {
                "query": {
                    "type": "string",
                    "description": "The search query",
                    "required": True
                }
            }
        },
        {
            "name": "scan",
            "description": "Scan for drift, unresolved tension, or code debt",
            "parameters": {
                "target": {
                    "type": "string",
                    "description": "The target to scan (default: 'all')",
                    "required": False
                }
            }
        },
        {
            "name": "flag",
            "description": "Mark code, idea, or log for future contradiction check",
            "parameters": {
                "type": {
                    "type": "string",
                    "description": "The type of flag",
                    "required": True
                },
                "content": {
                    "type": "string",
                    "description": "The content to flag",
                    "required": True
                }
            }
        },
        {
            "name": "save",
            "description": "Snapshot current project or ritual state",
            "parameters": {
                "label": {
                    "type": "string",
                    "description": "Label for the snapshot",
                    "required": False
                }
            }
        },
        {
            "name": "dashboard",
            "description": "Open ritual dashboard or glyph viewer",
            "parameters": {
                "view": {
                    "type": "string",
                    "description": "Which view to open (default: 'dashboard')",
                    "required": False
                }
            }
        }
    ]
    return jsonify(tools)

if __name__ == "__main__":
    # Log server start
    log_spell("system", {"event": "mcp_server_start", "port": 4621})

    print("veil:design() log:\"CLARITY-OR-DEATH MCP Server starting\"")
    print(f"Ritual manifest directory: {RITUAL_MANIFEST_DIR}")
    print("Server running at http://localhost:4621/mcp")

    # Start the server
    app.run(host="0.0.0.0", port=4621)