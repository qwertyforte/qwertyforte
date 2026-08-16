---
name: qwertyforte-starter
description: Fast onboarding and cross-platform target matrix orchestration using the QwertyForte development standard. Triggers on "/qforte", "/qwertyforte", or whenever the user asks to start an application with QwertyForte.
---

# QwertyForte Project Starter & Scaffolding Skill

Activate this skill whenever the developer uses `/qforte`, `/qwertyforte`, or asks to start an application with QwertyForte.

---

## 1. Core Principles to Uphold
1. **Security Above Everything Else:** Defense-in-depth, zero-trust input validation, deterministic SHA-256 package checksums.
2. **Absolute Separation of Concerns:** QwertyForte is scaffolding and build orchestration only. Never bundle QwertyForte tooling files into consumer application production binaries.
3. **Extreme Performance & Low RAM:** Ensure generated applications and control interfaces render swiftly with negligible memory footprint.
4. **Standard Package Naming Formula:**
   $$\text{AppName\_VersionName\_VersionNumber\_TargetOS\_OSVersion\_Arch.ext}$$
5. **Non-Empty Ticket History:** Always log changes with source attribution, timestamp, and explicit deltas.

---

## 2. Fast 5-Step Interactive Onboarding Workflow

When a user triggers QwertyForte:

### Step 1: Confirm Project Metadata
Ask the user for:
- **Application Name** (default: `FocusedApp`)
- **Version Name** (default: `Production`)
- **Version Number** (default: `v1.0.0`)

### Step 2: Select Target Ecosystems
Present the 10 pre-enlisted operating system brands with their 3-tier matrix:
- **Apple:** iOS (18.0, 17.5, 4.3 legacy) & macOS (15 Sequoia, 14 Sonoma, 10.6 Snow Leopard)
- **Google:** Android (15, 14, 4.4 KitKat) & ChromeOS (126, 115 LTS, 60 legacy)
- **Microsoft:** Windows (11 24H2, 10 22H2, Windows 3.1 oldest option) & Windows Phone (10 Mobile, 8.1, 7.5 Mango)
- **Linux:** Ubuntu 24.04, Ubuntu 22.04 / Debian 12, Slackware 1.0 / Linux 1.0
- **BSD:** FreeBSD 14.1, FreeBSD 13.3, 386BSD 0.1
- **BlackBerry:** BB 10.3.3, BB OS 7.1, BB OS 4.5
- **Symbian:** Symbian Belle FP2, Symbian S60 5th Ed, Symbian S60 1st/2nd Ed
*(Optionally include privacy devices like PinePhone, Librem 5, GrapheneOS, or Punkt MP02).*

### Step 3: Configure Supported Languages
Confirm the internationalization matrix (English is active by default; add Spanish, French, German, Japanese, Chinese, etc.).

### Step 4: Scaffold Target Hierarchy
Verify the creation of `qwertyforte.config.json` and generate the clean folder tree under:
$$\text{dist/builds/[Brand]/[OS\_Slug]/[Arch]/}$$

### Step 5: Launch & Synchronize
Direct the user to the local QwertyForte control panel (`serve-qwertyforte.ps1` or `serve-qwertyforte.sh`) and log an insight record into `agents/insights/insights.jsonl`.
