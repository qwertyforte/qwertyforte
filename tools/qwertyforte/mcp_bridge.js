/**
 * QwertyForte Model Context Protocol (MCP) & Agent Bridge
 * Exposes programmatic tools for AI IDEs (Antigravity, Cursor, Copilot, Windsurf)
 * to orchestrate cross-platform target matrices and package builds.
 */

(function (global) {
  'use strict';

  const MCP_TOOLS = [
    {
      name: 'qwertyforte_get_targets',
      description: 'Retrieve current cross-platform target matrix, active platforms, and version tiers.',
      parameters: {
        type: 'object',
        properties: {
          filter: { type: 'string', description: 'Optional filter: "active", "all", "mobile", "desktop"' }
        }
      }
    },
    {
      name: 'qwertyforte_toggle_target',
      description: 'Activate or deactivate a specific operating system version target.',
      parameters: {
        type: 'object',
        properties: {
          brandId: { type: 'string', description: 'ID of the brand (e.g. "microsoft_windows", "apple_ios")' },
          versionId: { type: 'string', description: 'ID of the version (e.g. "windows_11_24h2")' },
          active: { type: 'boolean', description: 'True to activate, false to deactivate' }
        },
        required: ['brandId', 'versionId', 'active']
      }
    },
    {
      name: 'qwertyforte_get_languages',
      description: 'Retrieve project supported languages, active locales, and language families.',
      parameters: {
        type: 'object',
        properties: {
          criteria: { type: 'string', description: 'Optional criteria (e.g. "un", "romance", "active")' }
        }
      }
    },
    {
      name: 'qwertyforte_toggle_language',
      description: 'Activate or deactivate a project target language code.',
      parameters: {
        type: 'object',
        properties: {
          code: { type: 'string', description: 'ISO code of the language (e.g. "es", "fr", "ja")' },
          active: { type: 'boolean', description: 'True to activate, false to deactivate' }
        },
        required: ['code', 'active']
      }
    },
    {
      name: 'qwertyforte_build_packages',
      description: 'Generate standardized package descriptors and build manifests for all active targets.',
      parameters: {
        type: 'object',
        properties: {
          appName: { type: 'string', description: 'Application name' },
          versionNumber: { type: 'string', description: 'Version number (e.g. "v1.0.0")' }
        }
      }
    },
    {
      name: 'qwertyforte_execute_command',
      description: 'Execute an OmniBar agent command (e.g. /checkmark, /checkoff, /libre, /help, /rollback).',
      parameters: {
        type: 'object',
        properties: {
          commandString: { type: 'string', description: 'Full slash command string' }
        },
        required: ['commandString']
      }
    }
  ];

  class McpBridge {
    constructor(stateManager) {
      this.stateManager = stateManager;
    }

    getToolDefinitions() {
      return MCP_TOOLS;
    }

    async handleToolCall(toolName, args) {
      if (!this.stateManager) {
        return { error: 'StateManager not initialized in McpBridge' };
      }

      switch (toolName) {
        case 'qwertyforte_get_targets':
          return { targets: this.stateManager.getAllTargets(args.filter) };

        case 'qwertyforte_toggle_target':
          return this.stateManager.toggleTarget(args.brandId, args.versionId, args.active, 'MCP Tool Call');

        case 'qwertyforte_get_languages':
          return { languages: this.stateManager.getLanguages(args.criteria) };

        case 'qwertyforte_toggle_language':
          return this.stateManager.toggleLanguage(args.code, args.active, 'MCP Tool Call');

        case 'qwertyforte_build_packages':
          return this.stateManager.generateActivePackages(args.appName, args.versionNumber);

        case 'qwertyforte_execute_command':
          return this.stateManager.agentEngine.processInput(args.commandString);

        default:
          return { error: `Unknown MCP tool: ${toolName}` };
      }
    }
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = McpBridge;
  } else {
    global.McpBridge = McpBridge;
  }
})(typeof window !== 'undefined' ? window : this);
