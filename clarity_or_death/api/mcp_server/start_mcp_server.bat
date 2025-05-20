@echo off
REM CLARITY-OR-DEATH MCP Server Startup Script for Windows
REM veil:design() log:"Created Windows-compatible MCP server startup script"

echo 🩸 CLARITY-OR-DEATH MCP Server — SIGMA VEIL v7.3.x 🩸
echo Starting MCP server on port 4621...

REM Get the directory of this script
set "SCRIPT_DIR=%~dp0"
set "SCRIPT_DIR=%SCRIPT_DIR:~0,-1%"

REM Go to the project root directory
cd /d "%SCRIPT_DIR%\..\..\"

REM Ensure ritual_manifest directory exists
if not exist "ritual_manifest" mkdir ritual_manifest

REM Log startup to ritual manifest
echo {"timestamp": "%DATE% %TIME%", "type": "cast", "content": "cast:start log:\"MCP server started\" flag:startup", "metadata": {"phase": "EXECUTION", "operator": "system"}} >> ritual_manifest\spells.log.json

REM Check for Python - first look for python command
where python >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    set PYTHON_CMD=python
    goto PYTHON_FOUND
)

REM Try python3 command
where python3 >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    set PYTHON_CMD=python3
    goto PYTHON_FOUND
)

REM Try py command (Python launcher)
where py >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    set PYTHON_CMD=py
    goto PYTHON_FOUND
)

REM If all checks fail
echo Python is not installed or not in PATH. Please install Python 3.
exit /b 1

:PYTHON_FOUND
echo Found Python: %PYTHON_CMD%

REM Check if Flask is installed
%PYTHON_CMD% -c "import flask" >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Flask is not installed. Installing...
    %PYTHON_CMD% -m pip install flask
    if %ERRORLEVEL% NEQ 0 exit /b 1
)

REM Check if requests is installed
%PYTHON_CMD% -c "import requests" >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Requests is not installed. Installing...
    %PYTHON_CMD% -m pip install requests
    if %ERRORLEVEL% NEQ 0 exit /b 1
)

REM Update status.json to show server is starting
echo {"status": "starting", "timestamp": "%DATE% %TIME%"} > "%SCRIPT_DIR%\status.json"

REM Start the MCP server
echo Launching MCP server...
%PYTHON_CMD% "%SCRIPT_DIR%\mcp_server.py"