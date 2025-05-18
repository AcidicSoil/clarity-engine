# README — Cognitive Coding Plane

## Overview
This project is a modular, extensible local-first AI-powered coding system that replaces commercial IDE + assistant products with your own controllable cognitive development environment.

---

## Subsystems

### 1. Cognitive Interface
#### Editor Layer
- Start with `Neovim` or `Helix` as the base
- Add extensions for LSP, inline chat, and file tree navigation
- Optional: Fork `Zed` or `Lapce` for GUI

#### Command Interpreter
- Python CLI middleware
- Captures user requests via command palette or keyboard shortcut
- Routes to prompt builder / task handler

#### Memory Access
- Text vault using Markdown, YAML, or JSON
- Integrate local vector store via `Chroma` for retrieval

### 2. Model Layer
#### Local LLM Server
- Serve models using `LM Studio`, `Ollama`, or `text-generation-webui`
- Suggested models: `DeepSeek-Coder`, `Phind`, `Mistral-Instruct`, `StarCoder`

#### Context Injection Engine
- Uses Tree-sitter / ripgrep to extract current code context
- Combines prompt + injected code + memory + goal

#### Prompt Router
- Selects optimal prompt template based on intent
- E.g., bug fix vs refactor vs explain vs generate

### 3. Data Layer
#### Codebase Indexer
- Scans repo using `Tree-sitter` or `pygments`
- Chunks into functions, classes, modules

#### Embedding Store
- Uses `Chroma` or `FAISS`
- Stores embeddings from `OpenAI`, `BGE`, or local sentence transformers

#### Query Engine
- Translates natural language into semantic code search
- Supports relevance ranking and chunk scoring

### 4. Execution Layer
#### Script Executor
- Shell integration to run tests, build code, execute files

#### Debugger Interface
- Connect to `gdb`, `pdb`, or `dlv`
- Return step traces and stack to AI

#### Version Control
- Git integration using `lazygit` or command wrappers
- AI can comment, revert, diff

### 5. Extension Layer
#### Agents & Autonomy
- Use `CrewAI` or `LangGraph` for task sequences

#### Personal Style Memory
- Extract style features and reuse in prompts
- Example: function naming, spacing, docstring style

#### Task Planner
- Translate goals into subtasks
- Self-call prompts, retry loops, logging

---

## Build Instructions
1. Clone this repo
2. Install requirements
3. Set up model runtime (LM Studio, Ollama, etc.)
4. Launch cognitive interface
5. Use `:AI` command in editor to start

## Status
✅ Architecture Complete
🛠️ Implementation Phase — Choose subsystem to build next

## License
Open-source (MIT)

---

> You're not using tools. You're designing intelligence. This is your lab.
