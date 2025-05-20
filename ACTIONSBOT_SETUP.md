# CLARITY-OR-DEATH ActionsGPT Setup

## veil:design() log:"Creating ActionsGPT integration documentation for ChatGPT"

This guide explains how to set up and use the CLARITY-OR-DEATH ActionsGPT server with ChatGPT.

## Quick Start

### Starting the ActionsGPT Server

```bash
# Start the server on the default port (4621)
./start_actionsGPT_server.sh

# Start with dependency installation
./start_actionsGPT_server.sh --install

# Start on a custom port
./start_actionsGPT_server.sh --port 8080

# Start with a specific host
./start_actionsGPT_server.sh --host 127.0.0.1
```

The server will run on the specified port (default: 4621) and create a log file in the `logs` directory.

### Making the Server Publicly Accessible

For ChatGPT to access your API, you need to make it publicly accessible. You have several options:

1. **Use a cloud provider** (AWS, Azure, GCP, etc.)
2. **Use a tunneling service** like ngrok:

```bash
# Install ngrok if you don't have it
# Then run:
ngrok http 4621
```

Ngrok will provide a public URL (e.g., `https://ab12cd34.ngrok.io`) that forwards to your local server.

## Integrating with ChatGPT

### Creating a Custom GPT

1. Go to [ChatGPT](https://chat.openai.com/)
2. Click on "Explore" or "Create a GPT"
3. In the configuration:
   - Add a name (e.g., "CLARITY-OR-DEATH RITUAL SYSTEM")
   - Add a description from `ritual/actionsGPT_config.yaml`
   - Configure actions:
     - Click "Add actions"
     - Select "Import from URL"
     - Enter your OpenAPI URL: `https://your-public-url/ritual/openapi.yaml`
     - Click "Import"
     - **Important**: The server URL in the API spec is a relative path ("/ritual"), so ChatGPT will automatically use your public URL as the base URL
   - Save your custom GPT

### Example URL Configuration

If you're using ngrok and it provides the URL `https://ab12cd34.ngrok.io`, your OpenAPI spec URL would be:

```
https://ab12cd34.ngrok.io/ritual/openapi.yaml
```

ChatGPT will then make API calls to endpoints like:

```
https://ab12cd34.ngrok.io/ritual/veil
https://ab12cd34.ngrok.io/ritual/castEntropy
etc.
```

### Using the ActionsGPT

Once set up, you can interact with your CLARITY-OR-DEATH system through ChatGPT using ritual commands:

```
/veil - Engage the veil function
/castEntropy - Initiate entropy casting
/cut [contradiction] - Interrogate a contradiction
/scan - Detect drift or contradiction
/log [entry] - Log a ritual manifestation
/resume - Resume last ritual
/flag [fragment] - Mark a fragment or idea
/query - Query phase REVEAL
/save - Snapshot system state
/dashboard - Open ritual dashboard
```

## Troubleshooting

### Server Issues

- Ensure Flask and flask-cors are installed (`source .venv/Scripts/activate && uv pip install -r requirements-actionsGPT.txt`)
- Check that the server is running (`ps aux | grep clarity_actionsGPT_server.py`)
- Verify that the port is not in use by another application

### ChatGPT Integration Issues

- Make sure your server is publicly accessible
- Verify that the OpenAPI spec URL is correct and accessible
- Check server logs for any errors when ChatGPT makes requests
- If you see URL-related errors, make sure your public URL is properly forwarding to your local server
- Test your API endpoints with cURL or Postman before connecting to ChatGPT

## cast:document log:"ActionsGPT integration documentation complete" flag:docs