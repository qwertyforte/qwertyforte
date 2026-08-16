# Implementation Plan: QwertyForte Cross-Platform Target Control Panel & Packager

Build **QwertyForte**, a portable, high-performance developer control panel, build matrix orchestrator, and multi-OS packaging engine. QwertyForte enables granular activation/deactivation of target operating systems across legacy and modern ecosystems, provides a dedicated **Project Languages Tab** for managing internationalization/locale target matrices, generates spec-compliant application installation packages with standardized naming, features an embedded AI agentic slash-command omni-bar, provides comprehensive global OS & Language registries with real-time autocomplete, and includes a full state-ticket history system with multilingual documentation.

---

## User Review Required

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
> **New Dedicated "Supported Languages" Tab**:
> Added a first-class **Supported Languages Tab** in QwertyForte:
> - Manages project-level internationalization (i18n) target languages and regional locale codes (e.g., `en-US`, `es-MX`, `es-ES`, `fr-FR`, `de-DE`, `ja-JP`, `zh-CN`, `ar-SA`, `pt-BR`, `hi-IN`, `ru-RU`, etc.).
> - English is pre-activated by default.
> - Fully integrated with the **OmniBar** engine: developers can search/autocomplete world languages, or execute semantic slash commands (e.g. `"/checkmark all official UN languages"`, `"/checkmark all Romance languages"`, `"/checkmark languages spoken by over 100M people"`, `"/checkoff all Scandinavian languages"`).
> - All language matrix changes generate numbered state tickets (`#001`, `#002`...) for history audit and rollback.

> [!IMPORTANT]
> **Privacy, Niche, and Minimalist Mobile Systems in Registry**:
> Added to the searchable OS registry (available on demand, not pre-activated by default):
> - **PinePhone / PinePhone Pro** (PostmarketOS / Manjaro ARM, `aarch64`, `.tar.xz`/`.apk`)
> - **Purism Librem 5** (PureOS / Phosh, `aarch64`, `.deb`/`.flatpak`)
> - **Sailfish OS Devices** (Sailfish OS 4.x / Jolla, `aarch64`/`armv7hl`, `.rpm`)
> - **Fairphone** (/e/OS / Fairphone OS / CalyxOS, `arm64-v8a`, `.apk`)
> - **Volla Phone** (Volla OS / Ubuntu Touch, `arm64-v8a`, `.click`/`.apk`)
> - **GrapheneOS on Pixel** (GrapheneOS Hardened Android, `arm64-v8a`, `.apk`)
> - **Mudita Pure / Punkt MP02** (MuditaOS / RTOS / AOSP Minimal, `armv7`/`cortex-m`, `.bin`/`.apk`)
> - **The Minimal Phone** (MinimalOS E-Ink Android, `arm64-v8a`, `.apk`)

> [!IMPORTANT]
> **Global Reserved Multilingual Help Keywords & `/freeform` Alias**:
> - The command parser enforces a **Global Reserved Help Keywords Registry** across all known world languages (`help`, `ayuda`, `aide`, `hilfe`, `aiuto`, `ajuda`, `pomoc`, `hjelp`, `hjalp`, `apua`, `hjælp`, `yardim`, `segitseg`, `tasukete`, `bangzhu`, `doyoume`, `madad`, `musaaeda`, `ezer`, `socorro`, `auxilio`, etc.). These words are strictly reserved and guaranteed to always route to the Help subsystem.
> - Added `/freeform` as an official, interchangeable alias for `/libre` for open-ended AI assistant interactions.

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
│       └── qwertyforte.config.json        # Portable project target configuration (import/export ready)
├── docs/                                  # Audited documentation for novices and expert engineers
│   ├── ARCHITECTURE.md                    # Detailed architecture overview
│   ├── IMPLEMENTATION_PLAN.md             # Versioned implementation plan
│   └── USER_GUIDE.md                      # Comprehensive user guide with multilingual support
└── serve-qwertyforte.ps1                  # Single-command local dev server for QwertyForte
```

---

## Proposed Changes

### 1. Global Operating System Registry (`tools/qwertyforte/os_database.js`)
#### [NEW] [`os_database.js`](file:///c:/Users/retlu/Documents/antigravity/focused-franklin/tools/qwertyforte/os_database.js)
- Registry of **10 Core Pre-Enlisted Brands** with their 3-tier version matrices:
  - **Apple (iOS)**:
    - *Newest*: iOS 18.0 (`arm64`, `.ipa`) [Active]
    - *Most Popular*: iOS 17.5 (`arm64`, `.ipa`) [Active]
    - *Oldest Supported*: iOS 4.3 (`armv7`, `.ipa`) [Active]
  - **Apple (macOS)**:
    - *Newest*: macOS 15 Sequoia (`arm64`, `.dmg`) [Active]
    - *Most Popular*: macOS 14 Sonoma (`universal2` / `x86_64+arm64`, `.dmg`) [Active]
    - *Oldest Supported*: Mac OS X 10.6 Snow Leopard (`x86`, `.dmg`) [Active]
  - **Google (Android)**:
    - *Newest*: Android 15 Vanilla Ice Cream (`arm64-v8a`, `.apk`) [Active]
    - *Most Popular*: Android 14 Upside Down Cake (`arm64-v8a`, `.apk`) [Active]
    - *Oldest Supported*: Android 4.4 KitKat (`armeabi-v7a`, `.apk`) [Active]
  - **Google (ChromeOS)**:
    - *Newest*: ChromeOS 126 (`x86_64`, `.crx`/`.tar.gz`) [Active]
    - *Most Popular*: ChromeOS 115 LTS (`x86_64`, `.crx`/`.tar.gz`) [Active]
    - *Oldest Supported*: ChromeOS 60 (`x86`, `.crx`) [Active]
  - **Microsoft (Windows)**:
    - *Newest*: Windows 11 24H2 (`x86_64`, `.msix`) [Active]
    - *Most Popular*: Windows 10 22H2 (`x86_64`, `.msix`) [Active]
    - *Oldest Supported*: Windows 3.1 (`x86`/`i286`, `.exe`) [Option available]
    - *Additional Options*: Windows 8.1, Windows 7 SP1, Windows XP SP3, Windows 95/98 [Options available]
  - **Microsoft (Windows Phone)**:
    - *Newest*: Windows 10 Mobile Build 1709 (`armv7`/`arm64`, `.appx`) [Active]
    - *Most Popular*: Windows Phone 8.1 Lumia Denim (`armv7`, `.xap`/`.appx`) [Active]
    - *Oldest Supported*: Windows Phone 7.5 Mango / Windows Mobile 6.5 (`armv7`/`armv5`, `.xap`/`.cab`) [Active]
  - **Linux**:
    - *Newest*: Ubuntu 24.04 LTS / Kernel 6.10 (`x86_64`, `.deb`/`.AppImage`) [Active]
    - *Most Popular*: Ubuntu 22.04 LTS / Debian 12 (`x86_64`, `.deb`) [Active]
    - *Oldest Supported*: Slackware 1.0 / Linux 1.0 / Debian 0.91 (`i386`, `.tar.gz`) [Active]
  - **BSD**:
    - *Newest*: FreeBSD 14.1 / OpenBSD 7.5 (`x86_64`, `.pkg`/`.txz`) [Active]
    - *Most Popular*: FreeBSD 13.3 (`x86_64`, `.pkg`) [Active]
    - *Oldest Supported*: 386BSD 0.1 / FreeBSD 1.0 (`i386`, `.tar.gz`) [Active]
  - **BlackBerry (RIM / BB10)**:
    - *Newest*: BlackBerry 10.3.3 (`armv7`, `.bar`) [Active]
    - *Most Popular*: BlackBerry OS 7.1 (`armv5te`, `.cod`) [Active]
    - *Oldest Supported*: BlackBerry OS 4.5 (`armv5`, `.cod`) [Active]
  - **Symbian (Symbian Foundation / Nokia)**:
    - *Newest*: Symbian Belle FP2 (Nokia 808) (`armv7`, `.sisx`) [Active]
    - *Most Popular*: Symbian S60 5th Edition / Symbian^1 (`armv6`, `.sisx`) [Active]
    - *Oldest Supported*: Symbian S60 1st/2nd Edition (`armv4t`, `.sis`) [Active]
- **Privacy, Minimalist & Specialized Devices in Registry (Searchable/On-Demand)**:
  - PinePhone / PinePhone Pro, Purism Librem 5, Sailfish OS Devices, Fairphone, Volla Phone, GrapheneOS on Pixel, Mudita Pure / Punkt MP02, The Minimal Phone.
  - Plus 100+ global OS platforms (Fedora, Arch, Alpine, NetBSD, Haiku, QNX, FreeRTOS, Zephyr, KaiOS, Tizen, DOS, watchOS, tvOS, visionOS, RISC OS, AmigaOS, etc.) with real-time autocomplete.

---

### 2. Global Language Registry & Languages Tab (`tools/qwertyforte/language_database.js`)
#### [NEW] [`language_database.js`](file:///c:/Users/retlu/Documents/antigravity/focused-franklin/tools/qwertyforte/language_database.js)
- Comprehensive database of **200+ World Languages & Locales**:
  - Organized into Regions (Americas, Europe, Asia-Pacific, Middle East & Africa) and Language Families (Indo-European, Sino-Tibetan, Afroasiatic, Austronesian, Japonic, Niger-Congo, etc.).
  - Metadata: ISO 639-1 / 639-2 codes, BCP-47 locale tags, native endonyms, script direction (LTR/RTL), estimated speaker count, and official status (e.g. UN official language, EU official language).
  - Pre-activated by default: **English** (`en` / `en-US` / `en-GB`).
  - Interactive activation/deactivation cards with regional collapsible accordions.

---

### 3. Omni-Bar, Agentic Slash Commands & State Ticket Engine
#### [NEW] [`agent_engine.js`](file:///c:/Users/retlu/Documents/antigravity/focused-franklin/tools/qwertyforte/agent_engine.js)
#### [NEW] [`ticket_store.js`](file:///c:/Users/retlu/Documents/antigravity/focused-franklin/tools/qwertyforte/ticket_store.js)
- **Unified Omni-Bar across Tabs**:
  - Automatically context-aware: searches Operating Systems on the "OS Targets" tab and Languages on the "Supported Languages" tab.
  - Slash command mode (`/`): Triggers the AI Agent assistant.
- **Supported Slash Commands**:
  - `/libre [prompt]` and `/freeform [prompt]`: Free-form conversational agent inquiries regarding architecture, build targets, or toolchains.
  - `/help [topic]` + Global Reserved Multilingual Help Keywords: Complete registry of protected keywords (`ayuda`, `aide`, `hilfe`, `aiuto`, `ajuda`, `pomoc`, `hjelp`, `hjalp`, `apua`, `hjælp`, `yardim`, `segitseg`, `tasukete`, `bangzhu`, `doyoume`, `madad`, `musaaeda`, `ezer`, `socorro`, `auxilio`) strictly reserved to always render the Help subsystem.
  - `/checkmark [prompt]`: Intelligent semantic batch activation:
    - *OS Targets Filters*: e.g. `"/checkmark all operating systems released during 2018's FIFA worldcup"`, `"/checkmark all operating systems mentioned in the Times magazine"`.
    - *Language Filters*: e.g. `"/checkmark all official UN languages"`, `"/checkmark all Romance languages"`, `"/checkmark all languages with over 100 million speakers"`.
    - *File Parsing*: e.g. `"/checkmark all operating systems mentioned in [file.html, .txt, .pdf, .doc]"`.
    - *Ticket Rollback*: e.g. `"/checkmark ticket 12"` or `"/checkmark go back to how it was this morning"`.
  - `/checkoff [prompt]`: Semantic batch deactivation for both OS targets and languages.
- **State Ticket System**:
  - Every activation/deactivation generates a discrete ticket: `#001`, `#002`, etc.
  - Captures timestamp, action summary, and full target state snapshot across both OS targets and languages.
  - Enables instant one-click or command-driven state rollbacks.

---

### 4. Documentation & Multilingual Localization (i18n)
#### [NEW] [`i18n.js`](file:///c:/Users/retlu/Documents/antigravity/focused-franklin/tools/qwertyforte/i18n.js)
#### [NEW] [`docs/ARCHITECTURE.md`](file:///c:/Users/retlu/Documents/antigravity/focused-franklin/docs/ARCHITECTURE.md)
#### [NEW] [`docs/USER_GUIDE.md`](file:///c:/Users/retlu/Documents/antigravity/focused-franklin/docs/USER_GUIDE.md)
- Audited, highly readable code and documentation crafted for both novice developers and senior audit engineers.
- Interactive language selector during setup/runtime: English baseline default + seamless switching to user's chosen language with automatic slash-command alias mapping and reserved keywords protection.

---

### 5. Package Engine & Naming Convention (`tools/qwertyforte/packager.js`)
#### [NEW] [`packager.js`](file:///c:/Users/retlu/Documents/antigravity/focused-franklin/tools/qwertyforte/packager.js)
- Strict compliance with requested naming formula:
  $$\text{FileName} = \text{App Name} + \text{"\_"} + \text{Version Name} + \text{"\_"} + \text{Version Number} + \text{"\_"} + \text{Target OS} + \text{"\_"} + \text{OS Version} + \text{"\_"} + \text{Microprocessor Type} + \text{Extension}$$
  *Example*: `FocusedApp_Production_v1.0.0_Microsoft_Windows_Phone_10_Mobile_arm64.appx`
- Generates package bundles, manifests, SHA-256 integrity checksums, and language bundle descriptors organized under `dist/builds/[Brand]/[OS_Slug]/[Arch]/`.

---

### 6. QwertyForte Control Panel Interface (`tools/qwertyforte/index.html` & `styles.css` & `app.js`)
#### [NEW] [`index.html`](file:///c:/Users/retlu/Documents/antigravity/focused-franklin/tools/qwertyforte/index.html)
#### [NEW] [`styles.css`](file:///c:/Users/retlu/Documents/antigravity/focused-franklin/tools/qwertyforte/styles.css)
#### [NEW] [`app.js`](file:///c:/Users/retlu/Documents/antigravity/focused-franklin/tools/qwertyforte/app.js)
- Responsive dark-mode dashboard with tab navigation: **OS Targets**, **Supported Languages**, **Build & Packaging**, and **Ticket History**.
- Fast search/filter input with autocomplete on all tabs.
- Live ticket history timeline drawer and omni-bar command terminal.
- Single-click package compilation and portable JSON profile import/export (`qwertyforte.config.json` containing both OS and language matrices).

---

### 7. Portable PowerShell Server & CLI (`serve-qwertyforte.ps1`)
#### [NEW] [`serve-qwertyforte.ps1`](file:///c:/Users/retlu/Documents/antigravity/focused-franklin/serve-qwertyforte.ps1)
- Zero-dependency local server and automated packaging CLI.

---

## Verification Plan

### Automated & Functional Tests
1. **Initial Matrix Verification**:
   - Verify pre-activated OS targets across all 10 brands.
   - Verify pre-activated default language (English) in the Languages tab.
2. **Languages Tab & OmniBar Integration**:
   - Test search and autocomplete for languages (e.g. Spanish, French, Japanese, Arabic).
   - Test `/checkmark all official UN languages` and verify 6 UN languages (Arabic, Chinese, English, French, Russian, Spanish) are checkmarked.
   - Test `/checkoff all Romance languages`.
3. **Slash Command, `/freeform` & Reserved Help Keywords Execution**:
   - Test `/libre`, `/freeform`, and multiple reserved global help aliases (`/help`, `/ayuda`, `/aide`, `/hilfe`, `/socorro`, `/tasukete`, `/bangzhu`).
4. **Ticket History & Multi-Tab Rollback**:
   - Verify state snapshots are logged to `#001`, `#002`, and rollback cleanly restores both OS and language target states.
5. **Package Generation & File Output**:
   - Execute package generation and verify the `dist/builds/` hierarchy and naming formats.

### Manual Verification
- Launch QwertyForte in browser, switch tabs, test language toggles, execute slash commands, and verify ticket history.
