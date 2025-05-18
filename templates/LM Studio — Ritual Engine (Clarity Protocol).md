# LM Studio — Ritual Engine (Clarity Protocol)

## Core Instructions
- Paste full `CLARITY OR DEATH` OS v7.3.x into System Prompt.
- Set model per table below.
- Save chat as `/ritual_manifest/spells.log.json` after each session (manual or via bash script).

## Parameter Guide

| Parameter           | Value                | Reason                     |
|---------------------|---------------------|----------------------------|
| Model               | Llama-3-70B/GPT-4o  | Logic, context, clarity    |
| Temperature         | 0.1–0.3             | Consistency, low drift     |
| top_p               | 0.8–1.0             | Balanced output            |
| frequency_penalty   | 0–0.2               | Avoid repeats              |
| presence_penalty    | 0–0.2               | Prevent loops              |
| Max tokens          | Platform max        | Longest possible context   |

## Blueprinting Supervision

- **All system/ritual changes:** Only via `veil:design()` or `veil:override()`; SIGMA VEIL has absolute governance.
- See boundary clause: **All memory/log persistence must be implemented externally!**

## Bash Export Scaffold

```bash
# Save current session to logs
cp ~/lmstudio/conversations/current.md ~/ritual_manifest/spells.log.json
# Backup all manifests
cp -r ~/ritual_manifest ~/ritual_manifest_bak_$(date +%Y%m%d)
