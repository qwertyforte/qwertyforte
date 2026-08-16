# Implementation Plan: QwertyForte Cross-Platform Target Control Panel & Packager

Build **QwertyForte**, a portable, cloud-ready developer control panel, build matrix orchestrator, and multi-OS packaging engine. QwertyForte enables granular activation/deactivation of target operating systems across legacy and modern ecosystems, provides a dedicated **Project Languages Tab** for managing internationalization/locale target matrices, integrates seamlessly with **AI Agents & IDEs (Antigravity, Cursor, Copilot, VS Code, JetBrains)** via native Agent Skills, MCP (Model Context Protocol), and CLI interfaces, generates spec-compliant application installation packages with standardized naming, features an embedded AI agentic slash-command omni-bar, provides comprehensive global OS & Language registries with real-time autocomplete, and includes a full state-ticket history system with multilingual documentation.

---

## User Review Required

> [!IMPORTANT]
> **Cloud & Repository Portability**:
> - Anyone with authorization to clone/download the repository can run QwertyForte immediately with zero external dependencies (via `serve-qwertyforte.ps1` / `serve-qwertyforte.sh` or standalone browser launch).
> - All configurations (`qwertyforte.config.json`), ticket history, target profiles, and manifests are completely portable across repos and cloud environments.

> [!IMPORTANT]
> **IDE & AI Agent Interoperability (Antigravity, Cursor, Copilot, Windsurf, etc.)**:
> - **Interactive Agent Onboarding**: When a developer in Antigravity or any supported AI IDE states *"I want to start an application with QwertyForte"*, the AI agent automatically activates the QwertyForte workflow and guides the developer through fast, structured setup steps (App metadata $\rightarrow$ Target OS brands $\rightarrow$ Supported languages $\rightarrow$ Build orchestration $\rightarrow$ Dashboard launch).
> - **Agent Skill & MCP Tool Integration**: Includes standardized Agent Skill descriptors (`SKILL.md`), CLI bridge, and MCP (Model Context Protocol) definitions so AI agents can query, toggle, build, and audit target packages programmatically.

> [!IMPORTANT]
> **Windows Target Matrix**:
> - **Pre-Activated Defaults**: Windows 11 (Newest) and Windows 10 (Most Popular).
> - **Oldest Supported Option**: Windows 3.1 (`x86`/`i286`, `.exe`).
> - **Available Non-Active Options**: Windows 8.1, Windows 7 SP1, Windows XP SP3, and Windows 95/98. (The "Windows 9" typo has been removed).

> [!IMPORTANT]
> **Operating System Brand Expansions**:
> - Added **Windows Phone** with its 3-tier matrix (Newest: Windows 10 Mobile, Most Popular: Windows Phone 8.1, Oldest: Windows Phone 7.5 / Windows Mobile 6.5).
> - Added **Linux** (Newest: Ubuntu 24.04 LTS / Kernel 6.10, Most Popular: Ubuntu 22.04 LTS / Debian 12, Oldest: Slackware 1.0 / Linux 1.0).
> - Added **BSD** (Newest: FreeBSD 14.1 / OpenBSD 7.5, Most Popular: FreeBSD 13.3, Oldest: 386BSD 0.1 / FreeBSD 1.0).
> - Each of these 10 core OS brands comes pre-activated with the 3-tier matrix (Newest, Most Popular, Oldest Supported).

> [!IMPORTANT]
> **Dedicated "Supported Languages" Tab**:
> - Manages project-level internationalization (i18n) target languages and regional locale codes.
> - English pre-activated by default.
> - Full OmniBar integration for semantic batch commands (e.g. `"/checkmark all official UN languages"`, `"/checkmark all Romance languages"`).

> [!IMPORTANT]
> **Global Reserved Multilingual Help Keywords & `/freeform` Alias**:
> - Enforces a Global Reserved Help Keywords Registry across all known world languages (`help`, `ayuda`, `aide`, `hilfe`, `aiuto`, `ajuda`, `pomoc`, `hjelp`, `hjalp`, `apua`, `hjælp`, `yardim`, `segitseg`, `tasukete`, `bangzhu`, `doyoume`, `madad`, `musaaeda`, `ezer`, `socorro`, `auxilio`, etc.).
> - Added `/freeform` as an official, interchangeable alias for `/libre`.

---

## Open Questions

> [!NOTE]
> None. All user feedback has been incorporated into the core architecture.

---

## Proposed Architecture & File Structure

```
focused-franklin/
├── dist/                                  # Generated package output directory
│   └── builds/                            # Clean, organized target folder hierarchy
│       ├── apple/
│       │   ├── ios/
│       │   └── macos/
│       ├── google/
│       │   ├── android/
│       │   └── chromeos/
│       ├── microsoft/
│       │   ├── windows/
│       │   └── windows_phone/
│       ├── linux/
│       ├── bsd/
│       ├── blackberry/
│       └── symbian/
├── tools/
│   └── qwertyforte/                       # QwertyForte Developer Control Panel (Isolated from end-user runtime)
│       ├── index.html                     # Snappy, zero-bloat, dark-mode developer control panel UI (Tabs: OS Targets, Languages, Packager)
│       ├── styles.css                     # High-performance CSS (no heavy frameworks, zero layout shifts)
│       ├── app.js                         # Core state management, UI reactivity, tab switching, and orchestrator
│       ├── os_database.js                 # Comprehensive global OS registry (100+ OSes, kernels, ABIs, formats)
│       ├── language_database.js           # Comprehensive global Language registry (200+ languages, locales, scripts, families)
│       ├── agent_engine.js                # Slash command parser (/libre, /freeform, reserved multilingual /help, tickets)
│       ├── ticket_store.js                # State snapshot manager with timeline history and rollback engine
│       ├── i18n.js                        # Dynamic i18n localization & reserved keywords dictionary
│       ├── packager.js                    # Package naming engine, file generator, and manifest builder
│       ├── mcp_bridge.js                  # Model Context Protocol (MCP) & REST/Agent connector for IDEs
│       └── qwertyforte.config.json        # Portable project target configuration (import/export ready)
├── skills/
│   └── qwertyforte-starter/               # Native Agent Skill for Antigravity & AI IDEs
│       └── SKILL.md                       # Teaches AI agents to guide users through "I want to start an application with QwertyForte"
├── docs/                                  # Audited documentation for novices and expert engineers
│   ├── ARCHITECTURE.md                    # Detailed architecture overview
│   ├── IMPLEMENTATION_PLAN.md             # Versioned implementation plan
│   ├── AGENT_INTEROP.md                   # AI Agent & IDE communication protocol guide
│   └── USER_GUIDE.md                      # Comprehensive user guide with multilingual support
├── serve-qwertyforte.ps1                  # Single-command local dev server for QwertyForte (Windows)
└── serve-qwertyforte.sh                   # Single-command local dev server for QwertyForte (Linux/macOS/POSIX)
```

---

## Proposed Changes

### 1. IDE & AI Agent Interoperability (`skills/qwertyforte-starter/SKILL.md` & `tools/qwertyforte/mcp_bridge.js`)
#### [NEW] [`SKILL.md`](file:///c:/Users/retlu/Documents/antigravity/focused-franklin/skills/qwertyforte-starter/SKILL.md)
#### [NEW] [`mcp_bridge.js`](file:///c:/Users/retlu/Documents/antigravity/focused-franklin/tools/qwertyforte/mcp_bridge.js)
#### [NEW] [`docs/AGENT_INTEROP.md`](file:///c:/Users/retlu/Documents/antigravity/focused-franklin/docs/AGENT_INTEROP.md)
- **Agent Skill Trigger**: Triggers automatically whenever a developer says *"I want to start an application with QwertyForte"* (or related phrasing in any IDE/environment).
- **Fast Interactive Workflow**:
  1. Prompt developer for App Name, Display Name, and initial Version (`v1.0.0`).
  2. Confirm target platforms (defaults to pre-activated 10 brands or customized selection).
  3. Confirm supported languages (defaults to English + selected localizations).
  4. Scaffolds initial package targets, creates `qwertyforte.config.json`, and outputs the `dist/builds/` hierarchy.
  5. Launches the QwertyForte web control panel.
- **MCP Tools Integration**: Exposes callable programmatic tools: `qwertyforte_get_targets`, `qwertyforte_set_target_state`, `qwertyforte_get_languages`, `qwertyforte_build_packages`, and `qwertyforte_execute_command`.

---

### 2. Global Operating System Registry (`tools/qwertyforte/os_database.js`)
#### [NEW] [`os_database.js`](file:///c:/Users/retlu/Documents/antigravity/focused-franklin/tools/qwertyforte/os_database.js)
- Registry of **10 Core Pre-Enlisted Brands** with their 3-tier version matrices:
  - **Apple (iOS)**: Newest: iOS 18.0 (`arm64`, `.ipa`), Most Popular: iOS 17.5 (`arm64`, `.ipa`), Oldest Supported: iOS 4.3 (`armv7`, `.ipa`).
  - **Apple (macOS)**: Newest: macOS 15 Sequoia (`arm64`, `.dmg`), Most Popular: macOS 14 Sonoma (`universal2`, `.dmg`), Oldest Supported: Mac OS X 10.6 Snow Leopard (`x86`, `.dmg`).
  - **Google (Android)**: Newest: Android 15 (`arm64-v8a`, `.apk`), Most Popular: Android 14 (`arm64-v8a`, `.apk`), Oldest Supported: Android 4.4 KitKat (`armeabi-v7a`, `.apk`).
  - **Google (ChromeOS)**: Newest: ChromeOS 126 (`x86_64`, `.crx`), Most Popular: ChromeOS 115 LTS (`x86_64`, `.crx`), Oldest Supported: ChromeOS 60 (`x86`, `.crx`).
  - **Microsoft (Windows)**: Newest: Windows 11 24H2 (`x86_64`, `.msix`), Most Popular: Windows 10 22H2 (`x86_64`, `.msix`), Oldest Supported: Windows 3.1 (`x86`/`i286`, `.exe`), plus optional Windows 8.1, 7, XP, 95/98.
  - **Microsoft (Windows Phone)**: Newest: Windows 10 Mobile (`armv7`/`arm64`, `.appx`), Most Popular: Windows Phone 8.1 (`armv7`, `.xap`), Oldest Supported: Windows Phone 7.5 / Mobile 6.5 (`armv7`/`armv5`, `.xap`/`.cab`).
  - **Linux**: Newest: Ubuntu 24.04 LTS / Kernel 6.10 (`x86_64`, `.deb`), Most Popular: Ubuntu 22.04 LTS (`x86_64`, `.deb`), Oldest Supported: Slackware 1.0 / Linux 1.0 (`i386`, `.tar.gz`).
  - **BSD**: Newest: FreeBSD 14.1 (`x86_64`, `.pkg`), Most Popular: FreeBSD 13.3 (`x86_64`, `.pkg`), Oldest Supported: 386BSD 0.1 / FreeBSD 1.0 (`i386`, `.tar.gz`).
  - **BlackBerry (RIM / BB10)**: Newest: BlackBerry 10.3.3 (`armv7`, `.bar`), Most Popular: BlackBerry OS 7.1 (`armv5te`, `.cod`), Oldest Supported: BlackBerry OS 4.5 (`armv5`, `.cod`).
  - **Symbian (Symbian Foundation / Nokia)**: Newest: Symbian Belle FP2 (`armv7`, `.sisx`), Most Popular: Symbian S60 5th Ed (`armv6`, `.sisx`), Oldest Supported: Symbian S60 1st/2nd Ed (`armv4t`, `.sis`).
- Privacy, Minimalist & Specialized Devices in Registry (PinePhone, Librem 5, Sailfish, Fairphone, Volla, GrapheneOS, Mudita Pure, Punkt MP02, The Minimal Phone) + 100+ global platforms with real-time autocomplete.

---

### 3. Global Language Registry & Languages Tab (`tools/qwertyforte/language_database.js`)
#### [NEW] [`language_database.js`](file:///c:/Users/retlu/Documents/antigravity/focused-franklin/tools/qwertyforte/language_database.js)
- Comprehensive database of **200+ World Languages & Locales**:
  - Organized by Region and Language Family with BCP-47 locale tags, native endonyms, script direction, speaker counts, and official international status.
  - Pre-activated by default: **English** (`en`).

---

### 4. Omni-Bar, Agentic Slash Commands & State Ticket Engine
#### [NEW] [`agent_engine.js`](file:///c:/Users/retlu/Documents/antigravity/focused-franklin/tools/qwertyforte/agent_engine.js)
#### [NEW] [`ticket_store.js`](file:///c:/Users/retlu/Documents/antigravity/focused-franklin/tools/qwertyforte/ticket_store.js)
- Unified Omni-Bar across tabs for live autocomplete search or AI agentic slash commands (`/libre`, `/freeform`, `/help` + global reserved multilingual help keywords, `/checkmark`, `/checkoff`).
- Automatic state snapshot tickets (`#001`, `#002`, ...) for instant rollbacks via UI or natural language prompts.

---

### 5. Package Engine & Naming Convention (`tools/qwertyforte/packager.js`)
#### [NEW] [`packager.js`](file:///c:/Users/retlu/Documents/antigravity/focused-franklin/tools/qwertyforte/packager.js)
- Strict adherence to naming formula:
  $$\text{FileName} = \text{App Name} + \text{"\_"} + \text{Version Name} + \text{"\_"} + \text{Version Number} + \text{"\_"} + \text{Target OS} + \text{"\_"} + \text{OS Version} + \text{"\_"} + \text{Microprocessor Type} + \text{Extension}$$
- Generates compliant package bundles, manifests, SHA-256 integrity checksums, and deployment descriptors organized under `dist/builds/[Brand]/[OS_Slug]/[Arch]/`.

---

### 6. QwertyForte Control Panel Interface (`tools/qwertyforte/index.html` & `styles.css` & `app.js`)
#### [NEW] [`index.html`](file:///c:/Users/retlu/Documents/antigravity/focused-franklin/tools/qwertyforte/index.html)
#### [NEW] [`styles.css`](file:///c:/Users/retlu/Documents/antigravity/focused-franklin/tools/qwertyforte/styles.css)
#### [NEW] [`app.js`](file:///c:/Users/retlu/Documents/antigravity/focused-franklin/tools/qwertyforte/app.js)
- Responsive dark-mode dashboard with tab navigation: **OS Targets**, **Supported Languages**, **Build & Packaging**, and **Ticket History**.
- Fast search/filter input with autocomplete on all tabs.
- Live ticket history timeline drawer and omni-bar command terminal.
- Single-click package compilation and portable JSON profile import/export (`qwertyforte.config.json`).

---

### 7. Zero-Dependency Multi-Platform Server Scripts (`serve-qwertyforte.ps1` & `serve-qwertyforte.sh`)
#### [NEW] [`serve-qwertyforte.ps1`](file:///c:/Users/retlu/Documents/antigravity/focused-franklin/serve-qwertyforte.ps1)
#### [NEW] [`serve-qwertyforte.sh`](file:///c:/Users/retlu/Documents/antigravity/focused-franklin/serve-qwertyforte.sh)
- Zero-dependency local servers for Windows (PowerShell) and Linux/macOS (POSIX shell/Python/Node fallback) to run QwertyForte instantly upon cloning.

---

## Verification Plan

### Automated & Functional Tests
1. **Agent Skill Onboarding Trigger**:
   - Verify that the agent skill in `skills/qwertyforte-starter/SKILL.md` correctly responds to *"I want to start an application with QwertyForte"* and executes the fast multi-step setup flow.
2. **Initial Matrix Verification**:
   - Verify pre-activated OS targets across all 10 brands.
   - Verify pre-activated default language (English) in the Languages tab.
3. **Languages Tab & OmniBar Integration**:
   - Test search and autocomplete for languages.
   - Test `/checkmark all official UN languages` and `/checkoff all Romance languages`.
4. **Slash Command, `/freeform` & Reserved Help Keywords Execution**:
   - Test `/libre`, `/freeform`, and multiple reserved global help aliases (`/help`, `/ayuda`, `/aide`, `/hilfe`, `/socorro`, `/tasukete`, `/bangzhu`).
5. **Ticket History & Multi-Tab Rollback**:
   - Verify state snapshots are logged to `#001`, `#002`, and rollback cleanly restores both OS and language target states.
6. **Package Generation & File Output**:
   - Execute package generation and verify the `dist/builds/` hierarchy and naming formats.

### Manual Verification
- Launch QwertyForte in browser, test agent onboarding flow, switch tabs, test language toggles, execute slash commands, and verify ticket history.
