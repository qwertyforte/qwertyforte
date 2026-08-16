# AI Agent & IDE Interoperability Protocol

> **Protocol Version:** 1.0.0  
> **Supported IDEs:** Antigravity, Cursor, GitHub Copilot, Windsurf, JetBrains AI, Claude Code, VS Code  

---

## 1. Overview

QwertyForte is built to establish seamless communication with AI developer assistants and IDE environments. It provides three primary interaction vectors:

1. **Direct Chat Commands (`/qforte`, `/qwertyforte`):**  
   Users in any AI IDE can simply type `/qforte` or state *"I want to start an application with QwertyForte"* to trigger the automated 5-step scaffolding sequence.
2. **Model Context Protocol (MCP) Bridge (`tools/qwertyforte/mcp_bridge.js`):**  
   Exposes native programmatic tools (`qwertyforte_get_targets`, `qwertyforte_toggle_target`, `qwertyforte_get_languages`, `qwertyforte_build_packages`, `qwertyforte_execute_command`).
3. **Cross-Agent Insight Log (`agents/insights/insights.jsonl`):**  
   An ultra-compact, append-only JSON-Lines exchange file allowing multiple AI assistants across sessions to inherit user goals and architectural priorities.

---

## 2. Interactive Scaffolding Sequence

```
Developer: "/qforte"
     │
     ▼
AI Agent: Prompt for Application Name, Version Name, and Version Number.
     │
     ▼
AI Agent: Present 10 Pre-Activated OS Brands (3-tier matrix) & Default Languages.
     │
     ▼
AI Agent: Execute scaffolding, create qwertyforte.config.json, and generate dist/builds/.
     │
     ▼
AI Agent: Launch local control panel via serve-qwertyforte script and log insight record.
```

---

## 3. Tool Reference

| Tool Name | Parameters | Purpose |
| :--- | :--- | :--- |
| `qwertyforte_get_targets` | `{ filter?: string }` | List all available and active OS targets. |
| `qwertyforte_toggle_target` | `{ brandId, versionId, active }` | Toggle specific platform target. |
| `qwertyforte_get_languages` | `{ criteria?: string }` | List supported world languages and locales. |
| `qwertyforte_toggle_language` | `{ code, active }` | Toggle language support in project. |
| `qwertyforte_build_packages` | `{ appName, versionNumber }` | Generate package descriptors and SHA-256 manifests. |
| `qwertyforte_execute_command` | `{ commandString }` | Execute OmniBar slash command. |
