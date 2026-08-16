# AI Agent Insight Exchange Protocol

> **Purpose:** Standardized, ultra-compact communication format enabling AI agents across different IDEs (Antigravity, Cursor, Copilot, Windsurf, JetBrains, Claude Code, etc.) to share context, architectural insights, and the user's ongoing goals.

---

## 1. File Location & Format

- **File:** `agents/insights/insights.jsonl`
- **Format:** JSON Lines (UTF-8, one valid JSON object per line, no pretty-printed indentation).
- **Rule:** Append-only. Keep entries extremely concise to minimize repository storage footprint.

---

## 2. Schema Specification

Each line in `insights.jsonl` must conform to the following minimal schema:

```json
{
  "id": "ins_001",
  "ts": "2026-08-16T17:50:00Z",
  "agent": "antigravity",
  "model": "gemini-3.7-flash",
  "intent": "Short summary of user goal or action",
  "focus": ["security", "cross-platform", "performance"],
  "notes": "Concise architectural context, user preferences, or state evolution notes."
}
```

### Field Definitions
- `id` *(string)*: Unique sequential ID (e.g. `ins_001`, `ins_002`).
- `ts` *(string)*: ISO-8601 UTC timestamp.
- `agent` *(string)*: Name of the AI agent/IDE environment (e.g. `antigravity`, `cursor`, `copilot`).
- `model` *(string)*: Underlying LLM model identifier.
- `intent` *(string)*: High-level purpose of the interaction or session.
- `focus` *(array of strings)*: Core domains affected (e.g. `["os_matrix", "languages", "packager", "security"]`).
- `notes` *(string)*: Key insights, user constraints, decisions, and goals for subsequent agents to inherit.

---

## 3. Agent Operating Instructions

1. **On Session Start:**  
   Read the last $N$ lines of `agents/insights/insights.jsonl` to instantly synchronize with user preferences, priorities, and past milestones.
2. **During Interaction:**  
   Respect all constraints documented in `docs/QWERTYFORTE_STANDARD.md` (security-first, high performance, zero-bloat, strict naming formula, separate developer tooling vs. consumer binaries).
3. **On Milestone Completion:**  
   Append a new single-line JSON record summarizing what was established, adjusted, or decided.
