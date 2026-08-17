# QwertyForte

**Universal Cross-Platform Build Matrix & Developer Scaffolding Standard**

QwertyForte is a standalone developer control panel and scaffolding orchestrator. It helps
software engineers launch new cross-platform applications at maximum speed by providing
frictionless, granular control over target deployment platforms — from the latest modern
operating systems down to legacy environments, privacy phones, and embedded devices.

> **QwertyForte is not part of any consumer product.** It is a development-only tool,
> strictly isolated from final application runtime binaries. Only the development team
> has access to it.

---

## What It Does

| Goal | How |
|------|-----|
| **Start fast** | Interactive 5-step scaffolding via `/qforte` in any AI IDE |
| **Target any platform** | Toggle packages across 10 OS brands, 3 version tiers each |
| **Support any language** | Activate 200+ world languages per project |
| **Stay auditable** | Rich non-empty ticket history with source attribution and exact change deltas |
| **Generate standard packages** | Naming formula enforced: `AppName_VersionName_VersionNumber_TargetOS_OSVersion_Arch.ext` |
| **Work everywhere** | Zero dependencies — runs in any browser, clones from any Git host |

---

## Quick Start

### 1 — Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/focused-franklin.git
cd focused-franklin
```

### 2 — Launch the control panel

**Windows (PowerShell):**
```powershell
.\serve-qwertyforte.ps1
```

**Linux / macOS:**
```bash
chmod +x serve-qwertyforte.sh
./serve-qwertyforte.sh
```

Open your browser at **http://localhost:8080** — no install, no build step required.

### 3 — Start with an AI assistant

In Antigravity (or any AI IDE that reads `skills/` directories), type:

```
/qforte
```

or say:

```
I want to start an application with QwertyForte
```

The built-in skill walks you through the full scaffolding sequence in 5 steps.

---

## Pre-Activated Target Platforms (23 Packages by Default)

| Brand | Newest | Most Popular | Oldest Supported |
|-------|--------|-------------|-----------------|
| 🍎 Apple iOS | iOS 18.0 `arm64` `.ipa` | iOS 17.5 `arm64` `.ipa` | iOS 4.3 `armv7` `.ipa` |
| 🖥️ Apple macOS | macOS 15 Sequoia `arm64` `.dmg` | macOS 14 Sonoma `universal2` `.dmg` | Mac OS X 10.6 `x86` `.dmg` |
| 🤖 Google Android | Android 15 `arm64-v8a` `.apk` | Android 14 `arm64-v8a` `.apk` | Android 4.4 `armeabi-v7a` `.apk` |
| 🌐 Google ChromeOS | ChromeOS 126 `x86_64` `.crx` | ChromeOS 115 LTS `x86_64` `.crx` | ChromeOS 60 `x86` `.crx` |
| 🪟 Microsoft Windows | Windows 11 24H2 `x86_64` `.msix` | Windows 10 22H2 `x86_64` `.msix` | Windows 3.1 `x86` `.exe` *(off)* |
| 📱 Microsoft Windows Phone | Win 10 Mobile `arm64` `.appx` | Windows Phone 8.1 `armv7` `.xap` | Windows Phone 7.5 `armv7` `.xap` |
| 🐧 Linux | Ubuntu 24.04 `x86_64` `.deb` | Ubuntu 22.04 / Debian 12 `x86_64` `.deb` | Slackware 1.0 `i386` `.tar.gz` |
| 😈 BSD | FreeBSD 14.1 `x86_64` `.pkg` | FreeBSD 13.3 `x86_64` `.pkg` | 386BSD 0.1 `i386` `.tar.gz` |
| 🫐 BlackBerry | BB 10.3.3 `armv7` `.bar` | BB OS 7.1 `armv5te` `.cod` | BB OS 4.5 `armv5` `.cod` |
| 💠 Symbian | Symbian Belle FP2 `armv7` `.sisx` | S60 5th Ed `armv6` `.sisx` | S60 1st/2nd Ed `armv4t` `.sis` |

Additional searchable platforms include PinePhone, Purism Librem 5, Fairphone, Volla Phone,
GrapheneOS on Pixel, Mudita Pure / Punkt MP02, The Minimal Phone, and 100+ global OS distributions.

---

## OmniBar Slash Commands

Type directly into the search bar on any tab:

| Command | Example | What it does |
|---------|---------|-------------|
| `/help` | `/help` | Contextual help (also: `/ayuda`, `/aide`, `/hilfe`, `/tasukete`, `/bangzhu`, ...) |
| `/libre [prompt]` | `/libre Explain Symbian compilation` | Freeform AI assistant dialogue |
| `/freeform [prompt]` | `/freeform How does BB10 packaging work?` | Alias for `/libre` |
| `/checkmark [criteria]` | `/checkmark all official UN languages` | Batch-activate matching targets |
| `/checkmark ticket [N]` | `/checkmark ticket 1` | Roll back state to Ticket #N |
| `/checkoff [criteria]` | `/checkoff all Romance languages` | Batch-deactivate matching targets |
| `/qforte` | `/qforte` | Trigger the scaffolding assistant |

---

## Package Naming Formula

Every generated package follows this deterministic naming convention:

```
AppName_VersionName_VersionNumber_TargetOS_OSVersion_Arch.ext
```

**Example:**
```
FocusedApp_Production_v1.0.0_apple_ios_ios_18_0_arm64.ipa
FocusedApp_Production_v1.0.0_microsoft_windows_windows_11_24h2_x86_64.msix
FocusedApp_Production_v1.0.0_symbian_os_symbian_belle_fp2_armv7.sisx
```

Output is organized under `dist/builds/[brand]/[version]/[arch]/`.

---

## Project Structure

```
focused-franklin/
├── tools/qwertyforte/       # Control panel UI and all engine modules
│   ├── index.html           # Developer control panel (open in any browser)
│   ├── styles.css           # High-contrast dark theme, zero-bloat CSS
│   ├── app.js               # State controller and UI reactivity
│   ├── os_database.js       # 10 brands × 3 tiers + 100+ global OSes
│   ├── language_database.js # 200+ world languages and locales
│   ├── ticket_store.js      # Non-empty state ticket history engine
│   ├── i18n.js              # Multilingual UI + Reserved Help Keywords
│   ├── agent_engine.js      # OmniBar slash command parser
│   ├── packager.js          # Package naming, manifests, SHA-256 checksums
│   ├── mcp_bridge.js        # MCP tools for AI IDE agents
│   └── qwertyforte.config.json  # Portable configuration profile
├── skills/
│   └── qwertyforte-starter/
│       └── SKILL.md         # AI agent skill (/qforte trigger)
├── agents/
│   ├── INSIGHT_PROTOCOL.md  # Cross-agent JSONL exchange specification
│   └── insights/
│       └── insights.jsonl   # Compact AI context exchange log
├── docs/
│   ├── QWERTYFORTE_STANDARD.md   # Core philosophy and invariants
│   ├── ARCHITECTURE.md           # Technical architecture overview
│   ├── AGENT_INTEROP.md          # AI IDE interoperability protocol
│   ├── USER_GUIDE.md             # Full user and command manual
│   └── EXPORT_IMPORT_GUIDE.md    # How to share this project
├── dist/builds/             # Generated target package tree
├── serve-qwertyforte.ps1    # Windows zero-dependency server & CLI builder
└── serve-qwertyforte.sh     # Linux / macOS zero-dependency server
```

---

## Core Principles

1. **Security above everything.** Defense-in-depth, zero dynamic code evaluation, deterministic SHA-256 integrity checks.
2. **Absolute isolation.** QwertyForte code never ships inside consumer application binaries.
3. **Extreme performance.** Sub-millisecond reactive rendering, negligible RAM footprint.
4. **Non-empty ticket history.** Every state change is recorded with source attribution, exact deltas, and rollback capability. Genesis Ticket #001 is always present.
5. **Standard package naming.** The naming formula is strictly enforced across all targets.
6. **Zero dependencies.** No build tools, no package managers — works straight from a clone.

---

## Sharing & Exporting

See [`docs/EXPORT_IMPORT_GUIDE.md`](docs/EXPORT_IMPORT_GUIDE.md) for full instructions on
transferring this project to another machine or Antigravity account.

---

## AI Agent Cross-Session Context

`agents/insights/insights.jsonl` is an append-only compact log that lets any AI IDE
(Antigravity, Cursor, Copilot, Claude Code, Windsurf, etc.) instantly inherit this
project's architectural goals and user preferences without reading an entire conversation.

See [`agents/INSIGHT_PROTOCOL.md`](agents/INSIGHT_PROTOCOL.md) for the schema specification.

---

*QwertyForte Development Standard — Version 1.0.0*
