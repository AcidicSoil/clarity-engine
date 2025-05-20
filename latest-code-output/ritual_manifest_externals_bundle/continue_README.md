# Continue.dev — Clarity Agent Integration

## Overview
- Provides AI agents directly in the IDE for rapid workflow, context-specific code actions, and pair-programming rituals.

## LM Studio Connection
- Configure LLM backend to LM Studio using “Custom LLM” setting (`http://localhost:1234/v1`).
- Model: Llama-3-70B-Instruct or as per doctrine.
- Set parameters: temperature 0.15–0.25, top_p 0.9.

## Ritual Manifestation Protocols
- After major agentic cycles (e.g., plan generation, context switch, resolved contradiction), export session history and append to `spells.log.json`.
- Use `/ritual_manifest/commands.md` short-hands in code review comments to link sessions to glyphs.

## Memory and Search
- Continue.dev agents **do not** have global memory. Export, backup, and session-link as above.

## Blueprinting Note
- Agent modifications or new script injections must be done under SIGMA VEIL governance, per blueprinting supervision clause.
