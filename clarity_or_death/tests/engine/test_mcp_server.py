#!/usr/bin/env python3
"""
CLARITY-OR-DEATH MCP Server Test
--------------------------------
Tests the functionality of the CLARITY-OR-DEATH MCP server by invoking
various ritual tools and verifying the responses.

veil:design() log:"Creating MCP server test script"
"""

import sys
import os
import json
import requests
from datetime import datetime

# MCP server URL
MCP_SERVER_URL = "http://localhost:4621/mcp"

# Colors for terminal output
GREEN = "\033[92m"
RED = "\033[91m"
YELLOW = "\033[93m"
RESET = "\033[0m"

def log_test(message, status="info"):
    """Log a test message with color coding."""
    timestamp = datetime.now().strftime("%H:%M:%S")

    if status == "pass":
        color = GREEN
        prefix = "✓ PASS"
    elif status == "fail":
        color = RED
        prefix = "✗ FAIL"
    elif status == "warn":
        color = YELLOW
        prefix = "! WARN"
    else:
        color = RESET
        prefix = "→ INFO"

    print(f"{color}[{timestamp}] {prefix}: {message}{RESET}")

def invoke_tool(tool, parameters=None):
    """Invoke a tool on the MCP server."""
    if parameters is None:
        parameters = {}

    try:
        response = requests.post(
            MCP_SERVER_URL,
            json={"tool": tool, "parameters": parameters},
            headers={"Content-Type": "application/json"}
        )

        return response.status_code, response.json()
    except Exception as e:
        log_test(f"Error invoking tool {tool}: {e}", "fail")
        return None, None

def test_server_available():
    """Test if the MCP server is running and reachable."""
    try:
        response = requests.get(f"{MCP_SERVER_URL.rsplit('/', 1)[0]}/tools")
        if response.status_code == 200:
            log_test("MCP server is running and reachable", "pass")
            return True
        else:
            log_test(f"MCP server responded with status {response.status_code}", "fail")
            return False
    except requests.exceptions.ConnectionError:
        log_test("MCP server is not reachable. Make sure it's running on port 4621.", "fail")
        return False
    except Exception as e:
        log_test(f"Unexpected error testing server availability: {e}", "fail")
        return False

def run_tests():
    """Run all tests against the MCP server."""
    log_test("Starting CLARITY-OR-DEATH MCP server tests")

    if not test_server_available():
        log_test("Aborting tests because server is not available", "fail")
        return

    # Test invoking veil
    log_test("Testing 'veil' tool...")
    status, response = invoke_tool("veil", {"intent": "test"})
    if status == 200 and "judgment" in response:
        log_test("'veil' tool test passed", "pass")
    else:
        log_test(f"'veil' tool test failed. Response: {response}", "fail")

    # Test casting a spell
    log_test("Testing 'cast' tool...")
    status, response = invoke_tool("cast", {"spell": "test_spell"})
    if status == 200 and "result" in response:
        log_test("'cast' tool test passed", "pass")
    else:
        log_test(f"'cast' tool test failed. Response: {response}", "fail")

    # Test logging a message
    log_test("Testing 'log' tool...")
    status, response = invoke_tool("log", {"message": "Test log message"})
    if status == 200 and "result" in response:
        log_test("'log' tool test passed", "pass")
    else:
        log_test(f"'log' tool test failed. Response: {response}", "fail")

    # Test cutting a contradiction
    log_test("Testing 'cut' tool...")
    status, response = invoke_tool("cut", {"input": "Test contradiction"})
    if status == 200 and "interrogation" in response:
        log_test("'cut' tool test passed", "pass")
    else:
        log_test(f"'cut' tool test failed. Response: {response}", "fail")

    # Test querying
    log_test("Testing 'query' tool...")
    status, response = invoke_tool("query", {"query": "test query"})
    if status == 200 and "phase" in response:
        log_test("'query' tool test passed", "pass")
    else:
        log_test(f"'query' tool test failed. Response: {response}", "fail")

    # Verify log entries were created
    log_test("Checking spell log file...")
    ritual_manifest_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "ritual_manifest")
    spells_log_path = os.path.join(ritual_manifest_dir, "spells.log.json")

    if os.path.exists(spells_log_path):
        try:
            with open(spells_log_path, "r") as f:
                logs = json.load(f)

            if isinstance(logs, list) and len(logs) > 0:
                log_test(f"Found {len(logs)} log entries in spells.log.json", "pass")
            else:
                log_test("spells.log.json exists but has no entries", "warn")
        except Exception as e:
            log_test(f"Error reading spells.log.json: {e}", "fail")
    else:
        log_test(f"spells.log.json not found at {spells_log_path}", "fail")

    log_test("All tests completed")

if __name__ == "__main__":
    run_tests()