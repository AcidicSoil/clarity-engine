# Cody (Sourcegraph) — Ritual Agent Configuration

## Purpose
- AI code review, search, and automated agent for source graphs.

## LM Studio/Custom Backend
- In Cody settings, point to your LM Studio server as the LLM provider.
- Set system prompt to the latest clarity doctrine, with explicit memory warning.

## Ritual Logging
- Cody’s agentic actions (refactors, suggestions, completions) should be batch-logged to `spells.log.json` at end-of-day.
- Include any detected contradictions, failed merges, or “unexplained diff” events in log notes.

## Memory Constraint
- Cody does not persist context; manual log export is required for full ritual continuity.

## Governance
- Any new agent or code mutation protocol must be declared using `veil:design()` before enabling.
