@echo off
REM CLARITY-OR-DEATH UI Startup Script for Windows
REM veil:design() log:"Windows-specific UI startup script"

echo 🩸 CLARITY-OR-DEATH UI — SIGMA VEIL v7.3.x 🩸
echo Starting UI on port 3000...

REM Check if Node.js is installed
where node >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo ERROR: Node.js not found in PATH.
    echo Please install Node.js from https://nodejs.org/
    exit /b 1
)

REM Check for react-scripts in node_modules
if not exist "node_modules\react-scripts\" (
    echo React scripts not found. Installing dependencies...
    call npm install --no-fund
    call npm install react-scripts --save --no-fund
    echo "cast:install log:\"UI dependencies installed\" flag:setup" >> "..\..\ritual_manifest\spells.log.json"
)

REM Check if MCP server is running
curl -s http://localhost:4621/status >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo WARNING: MCP server doesn't appear to be running at http://localhost:4621
    echo Some UI features may not work correctly.
    echo Consider starting the MCP server with: python ..\daemon\mcp_server.py
)

echo Starting UI...
echo "cast:start log:\"UI system started\" flag:startup" >> "..\..\ritual_manifest\spells.log.json"
npx react-scripts start