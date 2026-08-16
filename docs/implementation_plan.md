# Implementation Plan: QwertyForte Cross-Platform Target Control Panel & Packager

Build **QwertyForte**, a standalone, high-performance developer control panel and build matrix orchestrator. QwertyForte enables fine-grained activation/deactivation of target operating systems across legacy and modern ecosystems, generates spec-compliant application installation packages with standardized naming, and provides a searchable database of global operating systems with autocomplete.

---

## User Review Required

> [!IMPORTANT]
> **Windows Target Naming & Scope**: Microsoft jumped from Windows 8.1 directly to Windows 10 (skipping Windows 9). In QwertyForte, we provide dedicated target options for **Windows 11**, **Windows 10**, and legacy Windows editions (**Windows 95/98/ME**, **Windows 7/8.1**, and a transitional **Windows 9 (Threshold)** compatibility profile) to fulfill the Windows 9, 10, 11 requirement.

> [!IMPORTANT]
> **Package Generation Architecture**: Because QwertyForte runs portably in developer environments, its packaging engine generates fully structured, spec-compliant installer archives, package manifests, and installation payloads (e.g., `.ipa` bundle structure, `.apk` manifest & dex container, `.msix` AppxManifest payload, `.dmg` filesystem bundle, `.sisx` Symbian pkg descriptor, `.bar`/`.cod` BlackBerry container, and `.crx` extension archive) organized by target platform and architecture with SHA-256 integrity verification.

---

## Open Questions

> [!NOTE]
> None at this stage. The architecture strictly follows the specified brand breakdown, 3-tier pre-activations (Newest, Most Popular, Oldest Supported), naming convention, search/autocomplete engine, and directory structure.

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
│       │   └── windows/
│       ├── blackberry/
│       └── symbian/
├── tools/
│   └── qwertyforte/                       # QwertyForte Developer Control Panel (Isolated from end-user runtime)
│       ├── index.html                     # Snappy, zero-bloat, dark-mode developer control panel UI
│       ├── styles.css                     # High-performance CSS (no heavy frameworks, zero layout shifts)
│       ├── app.js                         # Core state management, UI reactivity, and builder orchestrator
│       ├── os_database.js                 # Comprehensive global OS registry (100+ OSes, kernels, ABIs, formats)
│       ├── packager.js                    # Package naming engine, file generator, and manifest builder
│       └── qwertyforte.config.json        # Portable project target configuration (import/export ready)
└── serve-qwertyforte.ps1                  # Single-command local dev server for QwertyForte
```

---

## Proposed Changes

### 1. Global Operating System Registry (`tools/qwertyforte/os_database.js`)
#### [NEW] [`os_database.js`](file:///c:/Users/retlu/Documents/antigravity/focused-franklin/tools/qwertyforte/os_database.js)
- Registry of **7 Core Pre-Enlisted Brands** with their 3-tier version matrices:
  - **Apple (iOS)**:
    - *Newest*: iOS 18.0 (`arm64`, `.ipa`)
    - *Most Popular*: iOS 17.5 (`arm64`, `.ipa`)
    - *Oldest Supported*: iOS 4.3 (`armv7`, `.ipa`)
  - **Apple (macOS)**:
    - *Newest*: macOS 15 Sequoia (`arm64`, `.dmg`)
    - *Most Popular*: macOS 14 Sonoma (`universal2` / `x86_64+arm64`, `.dmg`)
    - *Oldest Supported*: Mac OS X 10.6 Snow Leopard (`x86`, `.dmg`)
  - **Google (Android)**:
    - *Newest*: Android 15 Vanilla Ice Cream (`arm64-v8a`, `.apk`)
    - *Most Popular*: Android 14 Upside Down Cake (`arm64-v8a`, `.apk`)
    - *Oldest Supported*: Android 4.4 KitKat (`armeabi-v7a`, `.apk`)
  - **Google (ChromeOS)**:
    - *Newest*: ChromeOS 126 (`x86_64`, `.crx`/`.tar.gz`)
    - *Most Popular*: ChromeOS 115 LTS (`x86_64`, `.crx`/`.tar.gz`)
    - *Oldest Supported*: ChromeOS 60 (`x86`, `.crx`)
  - **Microsoft (Windows)**:
    - *Newest*: Windows 11 24H2 (`x86_64`, `.msix`)
    - *Most Popular*: Windows 10 22H2 (`x86_64`, `.msix`)
    - *Oldest Supported*: Windows 95/98 / Windows 9 Compatibility (`x86`/`i586`, `.exe`)
  - **BlackBerry (RIM / BB10)**:
    - *Newest*: BlackBerry 10.3.3 (`armv7`, `.bar`)
    - *Most Popular*: BlackBerry OS 7.1 (`armv5te`, `.cod`)
    - *Oldest Supported*: BlackBerry OS 4.5 (`armv5`, `.cod`)
  - **Symbian (Symbian Foundation / Nokia)**:
    - *Newest*: Symbian Belle FP2 (Nokia 808) (`armv7`, `.sisx`)
    - *Most Popular*: Symbian S60 5th Edition / Symbian^1 (`armv6`, `.sisx`)
    - *Oldest Supported*: Symbian S60 1st/2nd Edition (`armv4t`, `.sis`)
- Extended searchable database covering **100+ global OS platforms** (Ubuntu, Debian, Fedora, Arch, Alpine, FreeBSD, OpenBSD, NetBSD, Haiku, QNX, FreeRTOS, Zephyr, KaiOS, Tizen, Sailfish, DOS, watchOS, tvOS, visionOS, RISC OS, AmigaOS, etc.) with autocomplete indexing.

---

### 2. Package Engine & Naming Convention (`tools/qwertyforte/packager.js`)
#### [NEW] [`packager.js`](file:///c:/Users/retlu/Documents/antigravity/focused-franklin/tools/qwertyforte/packager.js)
- Strict compliance with the requested naming formula:
  $$\text{FileName} = \text{App Name} + \text{"\_"} + \text{Version Name} + \text{"\_"} + \text{Version Number} + \text{"\_"} + \text{Target OS} + \text{"\_"} + \text{OS Version} + \text{"\_"} + \text{Microprocessor Type} + \text{Extension}$$
  *Example*: `FocusedApp_Production_v1.0.0_Apple_iOS_18.0_arm64.ipa`
- Generation of package bundle structures:
  - Generates manifest files (e.g. `Info.plist`, `AndroidManifest.xml`, `AppxManifest.xml`, `package.pkg`, `manifest.json`, `app.bar.manifest`).
  - Calculates SHA-256 hashes and generates installation descriptor scripts for zero-friction deployment.
  - Builds the exact non-arbitrary folder tree under `dist/builds/[Brand]/[OS_Slug]/[Arch]/`.

---

### 3. QwertyForte Control Panel Interface (`tools/qwertyforte/index.html` & `styles.css` & `app.js`)
#### [NEW] [`index.html`](file:///c:/Users/retlu/Documents/antigravity/focused-franklin/tools/qwertyforte/index.html)
#### [NEW] [`styles.css`](file:///c:/Users/retlu/Documents/antigravity/focused-franklin/tools/qwertyforte/styles.css)
#### [NEW] [`app.js`](file:///c:/Users/retlu/Documents/antigravity/focused-franklin/tools/qwertyforte/app.js)
- **Top Stats Bar**: Active targets counter (initial 21 packages), selected architectures, total storage footprint, project metadata editor (App Name, Version Name, Version Number).
- **Brand Cards with Collapsible Dropdowns**:
  - Each brand accordion displays active/total targets, brand badge, and expandable version matrix.
  - Per-version toggle switch (Newest, Popular, Oldest, plus custom added versions).
  - Chip badges for Microprocessor type (ARM64, x86_64, ARMv7, ARMv5, etc.) and package extension.
- **Global OS Search Input with Real-Time Autocomplete**:
  - Search any OS in the world (by name, kernel, or brand).
  - Single-click to add and activate new brand/OS targets into the project matrix.
- **Batch Actions & Portability**:
  - "Generate All Packages" button with live build log terminal.
  - "Export Target Profile" (`qwertyforte.config.json`) and "Import Profile" for portability across projects.
  - "Download Package Manifest" or "Sync to `dist/builds/`".

---

### 4. Portable PowerShell Server & Build CLI (`serve-qwertyforte.ps1`)
#### [NEW] [`serve-qwertyforte.ps1`](file:///c:/Users/retlu/Documents/antigravity/focused-franklin/serve-qwertyforte.ps1)
- Built-in, zero-dependency HTTP server written in PowerShell that serves QwertyForte locally on `http://localhost:8080` or directly enables headless package generation via CLI arguments.

---

## Verification Plan

### Automated & Functional Tests
1. **Initial State Verification**:
   - Verify that all 7 required brands (Apple iOS, Apple macOS, Google Android, Google ChromeOS, Microsoft Windows, BlackBerry, Symbian) are loaded with their 3 respective tiers (Newest, Most Popular, Oldest Supported = 21 active targets).
2. **Naming Convention Validation**:
   - Test package name output against regex format: `^[A-Za-z0-9]+_[A-Za-z0-9]+_v[0-9.]+_([A-Za-z0-9]+_)+[a-z0-9_-]+\.[a-z0-9]+$`
3. **OS Autocomplete & Dynamic Addition**:
   - Type queries (e.g., "Ubuntu", "FreeBSD", "QNX", "DOS") and verify autocomplete dropdown populates with metadata, and adding it creates an active brand/version card.
4. **Package Generation & File Hierarchy**:
   - Trigger package generation and verify the creation of files under `dist/builds/` adhering to the required directory structure.
5. **Config Portability**:
   - Export configuration to JSON, modify targets, and re-import to verify round-trip persistence.

### Manual Verification
- Open QwertyForte in the browser, test collapsible accordions, toggle versions, search for legacy and modern systems, and run package compilation.
