/**
 * QwertyForte AI Agent Command Engine
 * Handles OmniBar slash commands (/libre, /freeform, /help & aliases, /checkmark, /checkoff, tickets)
 * and intelligent semantic filters for cross-platform OS & Language matrices.
 */

(function (global) {
  'use strict';

  class AgentEngine {
    constructor(stateManager) {
      this.stateManager = stateManager;
    }

    processInput(rawInput) {
      if (!rawInput || typeof rawInput !== 'string') {
        return { type: 'noop', message: 'Empty input.' };
      }

      const input = rawInput.trim();

      // Check if it's a slash command
      if (input.startsWith('/')) {
        const parts = input.substring(1).trim().split(/\s+/);
        const command = parts[0].toLowerCase();
        const args = parts.slice(1).join(' ').trim();

        return this.executeSlashCommand(command, args);
      }

      // Regular search / text query
      return {
        type: 'search',
        query: input
      };
    }

    executeSlashCommand(command, args) {
      const i18n = typeof I18n !== 'undefined' ? I18n : null;

      // 1. Check for /help and ANY of the global reserved multilingual help keywords
      if (command === 'help' || (i18n && i18n.isReservedHelpKeyword(command))) {
        return this.handleHelp(command, args);
      }

      // 2. /libre or /freeform
      if (command === 'libre' || command === 'freeform') {
        return this.handleLibre(args);
      }

      // 3. /checkmark
      if (command === 'checkmark') {
        return this.handleCheckmark(args);
      }

      // 4. /checkoff
      if (command === 'checkoff') {
        return this.handleCheckoff(args);
      }

      // 5. /qforte or /qwertyforte
      if (command === 'qforte' || command === 'qwertyforte') {
        return {
          type: 'agent_response',
          command: command,
          title: 'QwertyForte Scaffolding & Matrix Orchestrator',
          message: 'QwertyForte is active. You can toggle target platforms across 10 brands, manage 200+ project languages, run semantic commands (/checkmark, /checkoff), and generate spec-compliant packages for instant zero-touch deployment.'
        };
      }

      return {
        type: 'unknown_command',
        command: command,
        message: `Unknown command "/${command}". Type "/help" or your language alias (e.g. "/ayuda", "/aide", "/hilfe") for a list of available agent capabilities.`
      };
    }

    handleHelp(cmd, topic) {
      const lang = typeof I18n !== 'undefined' ? I18n.getCurrentLanguage() : 'en';
      const alias = typeof I18n !== 'undefined' ? I18n.getLocalizedHelpAlias(lang) : 'help';

      let helpBody = `
### 🛠️ QwertyForte OmniBar Agent Commands

- **\`/${alias}\` / \`/help [topic]\`**: Displays contextual documentation and help in your active language.
- **\`/libre [prompt]\`** or **\`/freeform [prompt]\`**: Ask open-ended questions about architecture, toolchains, or target packaging.
- **\`/checkmark [criteria]\`**: Batch activate OS targets or languages matching criteria:
  - *Temporal*: \`/checkmark all operating systems released in 2018\`
  - *Languages*: \`/checkmark all official UN languages\` or \`/checkmark all Romance languages\`
  - *Tickets & Rollback*: \`/checkmark ticket 1\` or \`/checkmark go back to how it was this morning\`
- **\`/checkoff [criteria]\`**: Batch deactivate matching OS targets or languages.
- **\`/qforte\` / \`/qwertyforte\`**: Triggers the interactive developer scaffolding workflow.
      `.trim();

      if (topic) {
        helpBody += `\n\n*Filtering help for topic:* **${topic}**`;
      }

      return {
        type: 'help',
        title: `QwertyForte Help Subsystem (Command: /${cmd})`,
        message: helpBody
      };
    }

    handleLibre(prompt) {
      if (!prompt) {
        return {
          type: 'agent_response',
          command: 'libre',
          title: 'AI Agent Freeform Dialogue',
          message: 'Please provide a prompt after `/libre` or `/freeform` (e.g. `/libre What are the compiler toolchains for Symbian Belle and BlackBerry 10?`).'
        };
      }

      const p = prompt.toLowerCase();
      let response = `**Agent Response:** Analyzed inquiry: *"${prompt}"*\n\n`;

      if (p.includes('symbian') || p.includes('blackberry')) {
        response += `For legacy mobile platforms:
- **Symbian Belle FP2**: Uses GCCE (GCC for ARM Symbian) or RVCT (ARM RealView) toolchains compiling to EPOC executable formats packaged into signed \`.sisx\` packages.
- **BlackBerry 10**: Uses QNX Momentics IDE / QCC toolchains targeting ARMv7 architecture packaged into \`.bar\` manifests.
- **BlackBerry OS 7.1**: Built using RIM BlackBerry Java SDK generating bytecode archives (\`.cod\`) and descriptor manifests (\`.jad\`).`;
      } else if (p.includes('windows') || p.includes('microsoft')) {
        response += `For Microsoft ecosystems:
- **Windows 11 / 10**: Built into modern MSIX / Win32 bundles with AppxManifest descriptors.
- **Windows Phone 10 Mobile / 8.1**: Targeted as \`.appx\` and \`.xap\` packages for ARM64 and ARMv7 architectures.
- **Windows 3.1 Legacy**: Portable 16-bit Win16 executable descriptor.`;
      } else if (p.includes('security') || p.includes('sandbox')) {
        response += `QwertyForte prioritizes defense-in-depth:
- Zero dynamic code evaluation (\`eval\` / unvalidated innerHTML).
- Deterministic SHA-256 package integrity verification.
- Complete isolation of scaffolding tooling from final application runtime binaries.`;
      } else {
        response += `QwertyForte development standard is ready. All 10 pre-enlisted operating system brands and 200+ world languages are indexed and ready for target matrix generation.`;
      }

      return {
        type: 'agent_response',
        command: 'libre',
        title: 'AI Assistant Response',
        message: response
      };
    }

    handleCheckmark(prompt) {
      if (!prompt) {
        return {
          type: 'error',
          message: 'Please provide criteria after `/checkmark` (e.g. `/checkmark all official UN languages` or `/checkmark ticket 1`).'
        };
      }

      const p = prompt.toLowerCase().trim();

      // Check if this is a ticket rollback
      if (p.includes('ticket') || p.includes('morning') || p.includes('yesterday') || p.includes('genesis') || p.includes('go back')) {
        return this.stateManager.rollbackToTicket(prompt);
      }

      // Check if it's a language query
      if (p.includes('language') || p.includes('un') || p.includes('romance') || p.includes('germanic') || p.includes('slavic') || p.includes('speakers')) {
        return this.stateManager.batchToggleLanguages(prompt, true);
      }

      // Default: OS batch activation
      return this.stateManager.batchToggleOSTargets(prompt, true);
    }

    handleCheckoff(prompt) {
      if (!prompt) {
        return {
          type: 'error',
          message: 'Please provide criteria after `/checkoff` (e.g. `/checkoff all Romance languages` or `/checkoff legacy`).'
        };
      }

      const p = prompt.toLowerCase().trim();

      if (p.includes('language') || p.includes('un') || p.includes('romance') || p.includes('germanic') || p.includes('slavic') || p.includes('scandinavian')) {
        return this.stateManager.batchToggleLanguages(prompt, false);
      }

      return this.stateManager.batchToggleOSTargets(prompt, false);
    }
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = AgentEngine;
  } else {
    global.AgentEngine = AgentEngine;
  }
})(typeof window !== 'undefined' ? window : this);
