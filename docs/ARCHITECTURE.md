# QwertyForte System Architecture

> **Document Status:** Official Architecture Specification  
> **Audited by:** Expert Human Engineers & Novice Developers  
> **Version:** 1.0.0  

---

## 1. High-Level Architectural Overview

QwertyForte is architected around the principle of **clean separation of concerns**: development scaffolding and build matrix orchestration are strictly decoupled from the final application runtime.

```
+-------------------------------------------------------------------------------+
|                             QwertyForte Orchestration Layer                   |
|                                                                               |
|  +---------------------+   +-----------------------+   +-------------------+  |
|  |   OS Matrix Registry|   | Language Matrix (i18n)|   | Rich Ticket Store |  |
|  |   (10 Brands/3 Tiers|   | (200+ Locales/Codes)  |   | (Genesis #001)    |  |
|  +----------+----------+   +-----------+-----------+   +---------+---------+  |
|             |                          |                         |            |
|             +--------------------------+-------------------------+            |
|                                        |                                      |
|                       +----------------v---------------+                      |
|                       |    OmniBar AI Agent Engine     |                      |
|                       | (/libre, /help, /checkmark)    |                      |
|                       +----------------+---------------+                      |
|                                        |                                      |
|                       +----------------v---------------+                      |
|                       |   Packager & Naming Engine     |                      |
|                       | (SHA-256 Checksums, Manifests) |                      |
|                       +----------------+---------------+                      |
+----------------------------------------|--------------------------------------+
                                         |
                                         v
                         +-------------------------------+
                         |   dist/builds/[Brand]/[Arch]  |
                         |   - iOS (.ipa)                |
                         |   - Windows (.msix)           |
                         |   - Windows Phone (.appx)     |
                         |   - Android (.apk)            |
                         |   - macOS (.dmg)              |
                         |   - Linux (.deb)              |
                         |   - BSD (.pkg)                |
                         |   - BlackBerry (.bar / .cod)  |
                         |   - Symbian (.sisx / .sis)    |
                         |   - ChromeOS (.crx)           |
                         +-------------------------------+
```

---

## 2. Component Breakdown

### 2.1 OS Registry (`tools/qwertyforte/os_database.js`)
Maintains metadata for:
- 10 Core Brands with 3-tier version matrices (Newest, Most Popular, Oldest Supported).
- Privacy and minimalist hardware targets (PinePhone, Librem 5, Fairphone, Volla, GrapheneOS, Punkt MP02, Minimal Phone).
- 100+ global platforms and kernels indexed for instant autocomplete.

### 2.2 Language Registry (`tools/qwertyforte/language_database.js`)
Indexes 200+ human spoken languages with BCP-47 locale tags, native endonyms, script direction (LTR/RTL), speaker estimates, and official international designations.

### 2.3 Ticket Store (`tools/qwertyforte/ticket_store.js`)
Guarantees continuous state auditability. The ticket history is never empty, initializing on boot with `Ticket #001: Genesis Baseline Matrix`. Each subsequent change records timestamp, client source info, exact delta (`+` added, `-` removed), and previous vs. new state snapshots.

### 2.4 Agent Engine (`tools/qwertyforte/agent_engine.js`)
Parses and executes slash commands:
- `/libre` & `/freeform`: Conversational AI assistance.
- `/help` + **Global Reserved Multilingual Help Keywords Registry**: Guarantees that translations of "help" across all world languages route to help.
- `/checkmark` & `/checkoff`: Batch activation/deactivation via semantic queries, dates, publication mentions, or ticket rollbacks.

### 2.5 Packager Engine (`tools/qwertyforte/packager.js`)
Enforces the standard naming formula:
$$\text{AppName\_VersionName\_VersionNumber\_TargetOS\_OSVersion\_Arch.ext}$$
Generates manifests, filesystem hierarchies, and SHA-256 hashes for all active targets.
