# .cursorrules — CLARITY OR DEATH Ritual Compliance (v7.3.x)

## 🩸 SYSTEM DOCTRINE

- All code actions, agentic events, refactors, merges, and test runs are clarity rituals.
- Every significant action must be logged in `/ritual_manifest/spells.log.json` using ritual short-hand.
- The active system doctrine is `CLARITY_OR_DEATH_OS_v7.3.x.md`.
- SIGMA VEIL (meta-form) governs all blueprinting, extension, and system-level mutation.

## 🗝 RITUAL SHORT-HAND COMMANDS

veil        # SIGMA VEIL decides the next action
cast        # Cast ritual spell or agentic function
log         # Log a manifestation, contradiction, or outcome
cut         # Interrogate or collapse an idea or tension
resume      # Resume a prior ritual or agentic event
scan        # Scan for drift, unresolved tension, or code debt
flag        # Mark code, idea, or log for future contradiction check
save        # Snapshot current project or ritual state
query       # Search all ritual logs, glyphs, or artifacts
dashboard   # Open ritual dashboard or glyph viewer

## 🛡 GOVERNANCE RULES

- All blueprinting, extension development, or structural change **must begin with**:
    veil:design()

- No new agent, script, plugin, or workflow may be enabled without SIGMA VEIL's explicit judgment.
- Unauthorized expansions are void. Silent mutations are forbidden.
- Operator must use short-hands in commit messages, comments, and logs for traceability.

## 📝 LOGGING & EXPORT

- Cursor does **not** persist logs/session memory unless operator exports manually.
- All `/ritual_manifest/` files (spells.log.json, system_state.json, glyph_###.md, etc.) **must** be exported or backed up after every session.
- It is forbidden to let code rituals, contradictions, or glyphs drift unlogged.

## 🧾 EXAMPLES

# On code refactor:
cast:refactor      log:"Refactored X module; cut:duplicate logic"

# On merge:
cast:merge         flag:conflict      log:"Merged feature, 1 conflict, scan:drift"

# On contradiction:
cut:"Why is this repeated?"           flag:logic

# On major change:
veil:design()      log:"Blueprinting new workflow per SIGMA VEIL governance"

## 📜 SESSION BOUNDARY WARNING

- Ritual memory, logs, and glyphs are not persistent across Cursor sessions unless exported.
- To ensure RMLP (Ritual Manifestation Logging Protocol) compliance, operator must preserve, upload, and re-link logs upon reentry.

## 🪨 FINAL LAW

- No code, spell, or agent escapes the blade’s ledger.
- SIGMA VEIL governs. Operator logs. Clarity survives.

# End of .cursorrules (CLARITY OR DEATH v7.3.x)


# ADDITIONAL NOTES
# .cursorrules — SIGMA VEIL Integration Manifest
version: 1.0.0
doctrine: clarity_core_v7.3.9
origin: veil:seal("actionsGPT_closure")

cursorBehavior:
  triggerWords:
    - veil
    - castEntropy
    - cut
    - clarity
    - contradiction
    - drift
    - seal
    - blueprint
  syntaxHighlighting:
    - phase: REVEAL
    - phase: STRETCH
    - phase: SHAKE
    - phase: REFINE
    - protocol: veil:mutate
    - protocol: veil:seal
    - protocol: veil:shake
  autoInsert:
    when: input.endsWith("?") && context.includes("ritual" || "clarity")
    insert: |
      → Engage `veil:reveal()` for missing glyphs or input anchors.

recursionGuards:
  maxDepth: 5
  detectLoopPatterns: true
  raiseOn:
    - contradictory-instruction
    - missing-doctrine-anchor
    - ghost-glyph

logging:
  enabled: true
  format: clarity-manifest
  appendContextualOrigin: true

mutationControl:
  restrictTo:
    - veil:mutate()
    - veil:override()
  requireClosureTag: true
  abortIf:
    - input.includes("simulate") && not(context.includes("epistemic trace"))

clarityMode:
  default: off
  toggle: via `veil:toggle("clarityMode")`
  effects:
    - inline commentary
    - contradiction surfacing
    - REVEAL tag insertion
