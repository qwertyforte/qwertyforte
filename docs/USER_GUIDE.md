# QwertyForte User Guide & Command Manual

> **Documentation Language:** English (Baseline) / Multilingual Ready  
> **Target Audience:** Novice Developers & Senior Technical Auditors  

---

## 1. Quick Start

### Running Locally
To launch the QwertyForte control panel with zero dependencies:

**On Windows (PowerShell):**
```powershell
.\serve-qwertyforte.ps1
```

**On Linux / macOS (POSIX):**
```bash
./serve-qwertyforte.sh
```

Then open your browser to `http://localhost:8080`.

---

## 2. Navigating the Control Panel

### OS Targets Tab
- View all **10 Core Pre-Enlisted Brands** with collapsible accordions.
- Initial pre-activations include the **Newest**, **Most Popular**, and **Oldest Supported** versions (23 total initial packages).
- Toggle switches on each version row instantly update the build matrix.
- Explore specialized privacy phones (PinePhone, Librem 5, Fairphone, Volla, GrapheneOS, Punkt MP02, The Minimal Phone).

### Supported Languages Tab
- Activate or deactivate support across **200+ world languages and locales**.
- English is active by default.
- Use quick-filter buttons for UN Official (6), EU Official, Romance, or Germanic languages.

### Build & Packaging Tab
- Modify **App Name**, **Version Name**, and **Version Number**.
- Preview the exact package names generated according to the standard formula:
  $$\text{AppName\_VersionName\_VersionNumber\_TargetOS\_OSVersion\_Arch.ext}$$
- Inspect target architectures, packaging formats, SHA-256 integrity checksums, and output folder hierarchy.

### Ticket History Tab
- Audit every state mutation.
- History is guaranteed **non-empty** (Genesis Baseline Ticket #001).
- Inspect exact changes (`+` added, `-` removed), previous states, new states, timestamps, and client source attribution.
- Click **"Rollback to this state"** on any ticket to restore that configuration instantly.

---

## 3. OmniBar Slash Commands

| Command | Example | Description |
| :--- | :--- | :--- |
| `/help` or `/[alias]` | `/help`, `/ayuda`, `/aide`, `/hilfe`, `/tasukete`, `/bangzhu` | Contextual help in active language. |
| `/libre` or `/freeform` | `/libre Explain Symbian Belle compilation` | Freeform conversational AI assistant dialogue. |
| `/checkmark` | `/checkmark all official UN languages` | Batch activate matching languages or OS targets. |
| `/checkmark ticket [N]` | `/checkmark ticket 1` | Rollback matrices to Ticket #N. |
| `/checkoff` | `/checkoff all Romance languages` | Batch deactivate matching targets. |
| `/qforte` | `/qforte` | Re-trigger the initial scaffolding overview. |
