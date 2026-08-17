# QwertyForte — Export & Import Guide

This guide explains how to share QwertyForte with another developer or Antigravity account,
and how to get it running immediately after import.

---

## The 3 Transfer Methods

### Option A — GitHub / GitLab (Recommended for Teams & Cloud)

The cleanest long-term approach. Anyone with repository access can clone and run in seconds.

**On the origin machine:**
```bash
# Create a new empty repo on GitHub or GitLab via their website, then:
git remote add origin https://github.com/YOUR_USERNAME/focused-franklin.git
git push -u origin master
```

**On the destination machine:**
```bash
git clone https://github.com/YOUR_USERNAME/focused-franklin.git
cd focused-franklin
```
Then open the `focused-franklin/` folder as the workspace in Antigravity (or any IDE).

---

### Option B — Git Bundle (Single File, Full History)

Preserves all commit history. Transfer the `.bundle` file via USB, cloud drive, or email.

**Create the bundle (origin machine):**
```bash
git bundle create focused-franklin-export.bundle --all
```

**Clone from the bundle (destination machine):**
```bash
git clone focused-franklin-export.bundle focused-franklin
cd focused-franklin
git log --oneline   # verify all history arrived
```

---

### Option C — Zip Archive (Files Only, No History)

Fastest option for a one-off handoff. No Git required on the destination machine.

**Create the zip (PowerShell on Windows):**
```powershell
Compress-Archive -Path .\* -DestinationPath ..\focused-franklin-export.zip
```

**On the destination machine:**
1. Extract `focused-franklin-export.zip` into a folder.
2. Optionally initialize a fresh Git repo:
   ```bash
   git init
   git add .
   git commit -m "Initial import of QwertyForte"
   ```

---

## After Import: Registering with Antigravity

No installation step is required. Antigravity automatically discovers skills by traversing
the `skills/` directory at the workspace root.

Once the project folder is open in Antigravity, simply type in chat:

```
/qforte
```

or say:

```
I want to start an application with QwertyForte
```

The `skills/qwertyforte-starter/SKILL.md` skill activates and walks the developer through
the 5-step interactive scaffolding sequence.

---

## Launching the Control Panel

No external dependencies are required. Run the appropriate script from the repo root:

**Windows (PowerShell):**
```powershell
.\serve-qwertyforte.ps1
```

**Linux / macOS (POSIX shell):**
```bash
./serve-qwertyforte.sh
```

Then open your browser at `http://localhost:8080`.

---

## Inheriting Project Context (AI Agents)

The file `agents/insights/insights.jsonl` contains a compact, append-only record of this
project's architectural goals, user preferences, and key decisions. Any AI assistant
that reads this file (Antigravity, Cursor, Copilot, Claude Code, etc.) will immediately
have meaningful context about the project's direction without needing a full conversation.

---

## Import Checklist for the Recipient

- [ ] Clone, extract, or receive the project files.
- [ ] Open the folder in their Antigravity IDE (or any IDE that reads `skills/` directories).
- [ ] Launch the control panel: `.\serve-qwertyforte.ps1` (Windows) or `./serve-qwertyforte.sh` (Linux/macOS).
- [ ] Open `http://localhost:8080` in a browser.
- [ ] Type `/qforte` in Antigravity to trigger the scaffolding assistant.
- [ ] Review `agents/insights/insights.jsonl` to inherit full session context.
