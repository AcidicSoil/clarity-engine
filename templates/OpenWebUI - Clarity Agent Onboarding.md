# OpenWebUI — Clarity Agent Onboarding

## Purpose
- Web-based LLM interface, preferred for conversation-based rituals.

## LM Studio Backend
- Under "Model Provider" settings, select "Custom Endpoint" and set to your LM Studio API (e.g., `http://localhost:1234/v1`).
- Model: Llama-3-70B-Instruct, GPT-4o, or as directed by clarity protocol.
- Set temperature to 0.2, top_p to 0.9 for stable clarity cycles.

## System Instructions
- Paste full CLARITY OR DEATH doctrine into “System Prompt.”
- Reference `v7.3.8 (LM Studio Export).md` for all parameter settings and boundary clauses:contentReference[oaicite:0]{index=0}.

## Logging
- Manually copy chat exports to `/ritual_manifest/spells.log.json` after each session.
- (If plugin/auto-save is available, activate for compliance with RMLP.)

## Note
- All high-level system expansions or scripting must use `veil:design()` or `veil:override()` per supervision clause.

## See: `/ritual_manifest/CLARITY_OR_DEATH_OS_v7.3.x.md` for latest doctrine.
