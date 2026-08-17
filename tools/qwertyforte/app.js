/**
 * QwertyForte Application State Manager & UI Controller
 * High-Performance, Zero-Bloat Reactive Controller
 */

(function (global) {
  'use strict';

  class StateManager {
    constructor() {
      this.appMeta = {
        appName: 'QForteApp',
        versionName: 'Production',
        versionNumber: 'v1.0.0'
      };

      this.brands = typeof OSRegistry !== 'undefined' ? OSRegistry.getCoreBrands() : [];
      this.specialized = typeof OSRegistry !== 'undefined' ? OSRegistry.getSpecializedDevices() : [];
      this.languages = typeof LanguageRegistry !== 'undefined' ? LanguageRegistry.getAllLanguages() : [];

      this.agentEngine = typeof AgentEngine !== 'undefined' ? new AgentEngine(this) : null;
      this.mcpBridge = typeof McpBridge !== 'undefined' ? new McpBridge(this) : null;

      this.currentTab = 'os-targets';
      this.init();
    }

    init() {
      // Ensure Ticket #001 Genesis Baseline Invariant
      if (typeof TicketStore !== 'undefined') {
        const activeOS = this.getActiveTargetIds();
        const activeLang = this.languages.filter(l => l.active).map(l => l.code);
        TicketStore.ensureGenesis(activeOS, activeLang);
      }
    }

    getActiveTargetIds() {
      const active = [];
      this.brands.forEach(b => {
        b.versions.forEach(v => {
          if (v.active) active.push(`${b.id}_${v.id}`);
        });
      });
      this.specialized.forEach(s => {
        if (s.active) active.push(s.id);
      });
      return active;
    }

    getAllActiveTargets() {
      const list = [];
      this.brands.forEach(b => {
        b.versions.forEach(v => {
          if (v.active) {
            list.push({
              brandId: b.id,
              brandName: b.name,
              ecosystem: b.ecosystem,
              versionId: v.id,
              versionName: v.versionName,
              versionNumber: v.versionNumber,
              arch: v.arch,
              format: v.format,
              tier: v.tier
            });
          }
        });
      });
      this.specialized.forEach(s => {
        if (s.active) {
          list.push({
            brandId: s.id,
            brandName: s.brand,
            ecosystem: s.brand,
            versionId: s.id,
            versionName: s.osName,
            versionNumber: s.version,
            arch: s.arch,
            format: s.format,
            tier: 'specialized'
          });
        }
      });
      return list;
    }

    toggleTarget(brandId, versionId, activeState, author) {
      const prevState = {
        osTargets: this.getActiveTargetIds(),
        languages: this.languages.filter(l => l.active).map(l => l.code)
      };

      let changed = false;
      let targetName = `${brandId} / ${versionId}`;

      // Check core brands
      this.brands.forEach(b => {
        if (b.id === brandId) {
          b.versions.forEach(v => {
            if (v.id === versionId) {
              v.active = typeof activeState === 'boolean' ? activeState : !v.active;
              changed = true;
              targetName = `${b.name} - ${v.versionName}`;
            }
          });
        }
      });

      // Check specialized
      this.specialized.forEach(s => {
        if (s.id === brandId || s.id === versionId) {
          s.active = typeof activeState === 'boolean' ? activeState : !s.active;
          changed = true;
          targetName = s.name;
        }
      });

      if (changed && typeof TicketStore !== 'undefined') {
        const newState = {
          osTargets: this.getActiveTargetIds(),
          languages: this.languages.filter(l => l.active).map(l => l.code)
        };
        const summary = `${activeState ? 'Activated' : 'Deactivated'} ${targetName}`;
        TicketStore.recordChange(summary, prevState, newState, author || 'User Action');
      }

      this.render();
      return { success: changed, activeTargets: this.getActiveTargetIds().length };
    }

    toggleLanguage(langCode, activeState, author) {
      const prevState = {
        osTargets: this.getActiveTargetIds(),
        languages: this.languages.filter(l => l.active).map(l => l.code)
      };

      let changed = false;
      let targetName = langCode;

      this.languages.forEach(l => {
        if (l.code === langCode || l.locale === langCode) {
          l.active = typeof activeState === 'boolean' ? activeState : !l.active;
          changed = true;
          targetName = `${l.name} (${l.code})`;
        }
      });

      if (changed && typeof TicketStore !== 'undefined') {
        const newState = {
          osTargets: this.getActiveTargetIds(),
          languages: this.languages.filter(l => l.active).map(l => l.code)
        };
        const summary = `${activeState ? 'Activated' : 'Deactivated'} language: ${targetName}`;
        TicketStore.recordChange(summary, prevState, newState, author || 'User Action');
      }

      this.render();
      return { success: changed, activeLanguages: this.languages.filter(l => l.active).length };
    }

    batchToggleLanguages(criteria, enableState) {
      const prevState = {
        osTargets: this.getActiveTargetIds(),
        languages: this.languages.filter(l => l.active).map(l => l.code)
      };

      const matched = typeof LanguageRegistry !== 'undefined' ? LanguageRegistry.getLanguagesByCriteria(criteria) : [];
      let count = 0;

      matched.forEach(m => {
        const found = this.languages.find(l => l.code === m.code);
        if (found && found.active !== enableState) {
          found.active = enableState;
          count++;
        }
      });

      if (count > 0 && typeof TicketStore !== 'undefined') {
        const newState = {
          osTargets: this.getActiveTargetIds(),
          languages: this.languages.filter(l => l.active).map(l => l.code)
        };
        const summary = `Batch ${enableState ? 'activated' : 'deactivated'} ${count} languages matching "${criteria}"`;
        TicketStore.recordChange(summary, prevState, newState, 'Agent Slash Command');
      }

      this.render();
      return {
        type: 'agent_response',
        command: enableState ? 'checkmark' : 'checkoff',
        title: `Language Batch ${enableState ? 'Activation' : 'Deactivation'}`,
        message: `Successfully ${enableState ? 'activated' : 'deactivated'} **${count}** languages matching criteria: *"${criteria}"*.`
      };
    }

    batchToggleOSTargets(criteria, enableState) {
      const prevState = {
        osTargets: this.getActiveTargetIds(),
        languages: this.languages.filter(l => l.active).map(l => l.code)
      };

      const c = criteria.toLowerCase();
      let count = 0;

      this.brands.forEach(b => {
        b.versions.forEach(v => {
          const matchYear = (c.includes('2018') && v.releaseYear === 2018) ||
                            (c.includes('2024') && v.releaseYear === 2024) ||
                            (c.includes('legacy') && (v.tier === 'oldest' || v.tier === 'optional')) ||
                            (c.includes('mobile') && b.category === 'mobile') ||
                            (c.includes('desktop') && b.category === 'desktop');

          const matchName = b.name.toLowerCase().includes(c) || v.versionName.toLowerCase().includes(c);

          if (matchYear || matchName) {
            if (v.active !== enableState) {
              v.active = enableState;
              count++;
            }
          }
        });
      });

      this.specialized.forEach(s => {
        if (s.name.toLowerCase().includes(c) || s.brand.toLowerCase().includes(c) || (c.includes('privacy') && s.category.includes('privacy'))) {
          if (s.active !== enableState) {
            s.active = enableState;
            count++;
          }
        }
      });

      if (count > 0 && typeof TicketStore !== 'undefined') {
        const newState = {
          osTargets: this.getActiveTargetIds(),
          languages: this.languages.filter(l => l.active).map(l => l.code)
        };
        const summary = `Batch ${enableState ? 'activated' : 'deactivated'} ${count} OS targets matching "${criteria}"`;
        TicketStore.recordChange(summary, prevState, newState, 'Agent Slash Command');
      }

      this.render();
      return {
        type: 'agent_response',
        command: enableState ? 'checkmark' : 'checkoff',
        title: `OS Target Batch ${enableState ? 'Activation' : 'Deactivation'}`,
        message: `Successfully ${enableState ? 'activated' : 'deactivated'} **${count}** operating system targets matching criteria: *"${criteria}"*.`
      };
    }

    rollbackToTicket(query) {
      if (typeof TicketStore === 'undefined') return { type: 'error', message: 'TicketStore unavailable.' };
      const ticket = TicketStore.findTicketByQuery(query);
      if (!ticket) {
        return {
          type: 'error',
          message: `Could not find a ticket matching "${query}". Please check the Ticket History tab for valid ticket IDs.`
        };
      }

      const prevState = {
        osTargets: this.getActiveTargetIds(),
        languages: this.languages.filter(l => l.active).map(l => l.code)
      };

      const targetOSSet = new Set(ticket.newState.osTargets || []);
      const targetLangSet = new Set(ticket.newState.languages || []);

      // Apply OS state
      this.brands.forEach(b => {
        b.versions.forEach(v => {
          v.active = targetOSSet.has(`${b.id}_${v.id}`);
        });
      });
      this.specialized.forEach(s => {
        s.active = targetOSSet.has(s.id);
      });

      // Apply Language state
      this.languages.forEach(l => {
        l.active = targetLangSet.has(l.code);
      });

      const newState = {
        osTargets: this.getActiveTargetIds(),
        languages: this.languages.filter(l => l.active).map(l => l.code)
      };

      const summary = `Rolled back to Ticket #${ticket.ticketId}: ${ticket.summary}`;
      TicketStore.recordChange(summary, prevState, newState, 'Agent Rollback Command');

      this.render();
      return {
        type: 'agent_response',
        command: 'rollback',
        title: `Rollback Applied: Ticket #${ticket.ticketId}`,
        message: `Successfully restored target and language matrices to state recorded in **Ticket #${ticket.ticketId}** (${ticket.timeFormatted}).`
      };
    }

    exportConfig() {
      return JSON.stringify({
        appName: this.appMeta.appName,
        versionName: this.appMeta.versionName,
        versionNumber: this.appMeta.versionNumber,
        exportedAt: new Date().toISOString(),
        standard: 'QwertyForte v1.0.0',
        activeOSTargets: this.getAllActiveTargets(),
        activeLanguages: this.languages.filter(l => l.active),
        ticketCount: typeof TicketStore !== 'undefined' ? TicketStore.getTickets().length : 0
      }, null, 2);
    }

    importConfig(jsonString) {
      try {
        const cfg = JSON.parse(jsonString);
        if (cfg.appName) this.appMeta.appName = cfg.appName;
        if (cfg.versionName) this.appMeta.versionName = cfg.versionName;
        if (cfg.versionNumber) this.appMeta.versionNumber = cfg.versionNumber;

        if (Array.isArray(cfg.activeOSTargets)) {
          const activeKeys = new Set(cfg.activeOSTargets.map(t => `${t.brandId}_${t.versionId}` || t.brandId));
          this.brands.forEach(b => {
            b.versions.forEach(v => {
              v.active = activeKeys.has(`${b.id}_${v.id}`);
            });
          });
          this.specialized.forEach(s => {
            s.active = activeKeys.has(s.id);
          });
        }

        if (Array.isArray(cfg.activeLanguages)) {
          const langCodes = new Set(cfg.activeLanguages.map(l => l.code));
          this.languages.forEach(l => {
            l.active = langCodes.has(l.code);
          });
        }

        this.render();
        return { success: true, message: 'Profile imported successfully.' };
      } catch (e) {
        return { success: false, error: 'Invalid JSON configuration.' };
      }
    }

    // UI Rendering Bindings
    render() {
      if (typeof document === 'undefined') return;

      // Update counters
      const activeTargets = this.getAllActiveTargets();
      const activeLangs = this.languages.filter(l => l.active);

      const targetCountEl = document.getElementById('stat-active-targets');
      const langCountEl = document.getElementById('stat-active-langs');
      const brandsCountEl = document.getElementById('stat-total-brands');
      const footprintEl = document.getElementById('stat-est-footprint');

      if (targetCountEl) targetCountEl.textContent = activeTargets.length;
      if (langCountEl) langCountEl.textContent = activeLangs.length;
      if (brandsCountEl) brandsCountEl.textContent = this.brands.length;
      if (footprintEl) footprintEl.textContent = `~${(activeTargets.length * 1.8).toFixed(1)} MB`;

      // Render OS Grid
      this.renderOSGrid();

      // Render Languages Grid
      this.renderLanguagesGrid();

      // Render Packager Table
      this.renderPackagerTable(activeTargets);

      // Render Ticket Timeline
      this.renderTickets();
    }

    renderOSGrid() {
      const container = document.getElementById('brands-grid-container');
      if (!container) return;

      let html = '';
      this.brands.forEach(brand => {
        const activeCount = brand.versions.filter(v => v.active).length;
        html += `
          <div class="brand-card">
            <div class="brand-card-header">
              <div class="brand-card-title">
                <span>${brand.icon}</span>
                <span>${brand.name}</span>
                <span class="brand-badge">${activeCount}/${brand.versions.length} active</span>
              </div>
            </div>
            <div class="brand-versions-list">
              ${brand.versions.map(v => `
                <div class="version-row">
                  <div class="version-meta">
                    <span class="version-name">${v.versionName}</span>
                    <div class="version-badges">
                      <span class="chip">${v.arch}</span>
                      <span class="chip">${v.format}</span>
                      <span class="chip chip-tier">${v.tier}</span>
                      <span class="chip">${v.releaseYear}</span>
                    </div>
                  </div>
                  <label class="switch">
                    <input type="checkbox" ${v.active ? 'checked' : ''} onchange="window.qwertyApp.toggleTarget('${brand.id}', '${v.id}', this.checked)">
                    <span class="slider"></span>
                  </label>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      });

      // Add Specialized Privacy Devices Card
      const activeSpecCount = this.specialized.filter(s => s.active).length;
      html += `
        <div class="brand-card">
          <div class="brand-card-header">
            <div class="brand-card-title">
              <span>ðŸ›¡ï¸</span>
              <span>Privacy & Minimalist Devices</span>
              <span class="brand-badge">${activeSpecCount}/${this.specialized.length} active</span>
            </div>
          </div>
          <div class="brand-versions-list">
            ${this.specialized.map(s => `
              <div class="version-row">
                <div class="version-meta">
                  <span class="version-name">${s.name}</span>
                  <div class="version-badges">
                    <span class="chip">${s.arch}</span>
                    <span class="chip">${s.format}</span>
                    <span class="chip chip-tier">${s.osName}</span>
                  </div>
                </div>
                <label class="switch">
                  <input type="checkbox" ${s.active ? 'checked' : ''} onchange="window.qwertyApp.toggleTarget('${s.id}', '${s.id}', this.checked)">
                  <span class="slider"></span>
                </label>
              </div>
            `).join('')}
          </div>
        </div>
      `;

      container.innerHTML = html;
    }

    renderLanguagesGrid() {
      const container = document.getElementById('languages-grid-container');
      if (!container) return;

      const html = this.languages.map(l => `
        <div class="lang-card">
          <div class="lang-info">
            <span class="lang-name">${l.name}</span>
            <span class="lang-endonym">${l.endonym} (${l.locale})</span>
            <div class="lang-meta-tags">
              <span class="chip">${l.region}</span>
              <span class="chip">${l.family}</span>
              ${l.officialUN ? '<span class="chip chip-tier">UN</span>' : ''}
              ${l.officialEU ? '<span class="chip chip-tier">EU</span>' : ''}
            </div>
          </div>
          <label class="switch">
            <input type="checkbox" ${l.active ? 'checked' : ''} onchange="window.qwertyApp.toggleLanguage('${l.code}', this.checked)">
            <span class="slider"></span>
          </label>
        </div>
      `).join('');

      container.innerHTML = html;
    }

    renderPackagerTable(activeTargets) {
      const tbody = document.getElementById('packages-table-body');
      if (!tbody || typeof Packager === 'undefined') return;

      const packages = Packager.buildAllActivePackages(this.appMeta, activeTargets);
      tbody.innerHTML = packages.map((pkg, idx) => `
        <tr>
          <td>${idx + 1}</td>
          <td><strong>${pkg.fileName}</strong></td>
          <td><code>${pkg.target.arch}</code></td>
          <td><code>${pkg.target.format}</code></td>
          <td><code>${pkg.sha256.substring(0, 16)}...</code></td>
          <td><code>${pkg.relativePath}</code></td>
        </tr>
      `).join('');
    }

    renderTickets() {
      const container = document.getElementById('tickets-timeline-container');
      if (!container || typeof TicketStore === 'undefined') return;

      const tickets = TicketStore.getTickets().slice().reverse();
      container.innerHTML = tickets.map(t => `
        <div class="ticket-card">
          <div class="ticket-header">
            <span class="ticket-id">Ticket #${t.ticketId}: ${t.summary}</span>
            <span class="ticket-time">${t.timeFormatted}</span>
          </div>
          <div class="ticket-source">
            Source: ${t.source.browser || 'Browser'} | ${t.source.platform || 'OS'} | ${t.author || 'User'}
          </div>
          <div class="ticket-delta">
            ${(t.delta.added || []).map(a => `<span class="delta-pill-add">+ ${a}</span>`).join('')}
            ${(t.delta.removed || []).map(r => `<span class="delta-pill-remove">- ${r}</span>`).join('')}
          </div>
          <div style="margin-top: 8px;">
            <button class="btn btn-secondary btn-sm" onclick="window.qwertyApp.rollbackToTicket('${t.ticketId}')">Rollback to this state</button>
          </div>
        </div>
      `).join('');
    }
  }

  // Instantiate and bind to global
  const app = new StateManager();

  if (typeof window !== 'undefined') {
    window.qwertyApp = app;
    window.addEventListener('DOMContentLoaded', () => {
      app.render();

      // Tab switching handlers
      document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
          document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));

          btn.classList.add('active');
          const tabId = btn.getAttribute('data-tab');
          const pane = document.getElementById(`tab-pane-${tabId}`);
          if (pane) pane.classList.add('active');
          app.currentTab = tabId;
        });
      });

      // OmniBar Input Handler
      const omniInput = document.getElementById('omnibar-input');
      const omniDropdown = document.getElementById('omnibar-dropdown');
      const agentBanner = document.getElementById('agent-banner');

      if (omniInput) {
        omniInput.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            const result = app.agentEngine.processInput(omniInput.value);
            if (agentBanner && result.type !== 'search') {
              agentBanner.classList.add('active');
              agentBanner.innerHTML = `
                <h3>${result.title || 'Agent Notice'}</h3>
                <div>${result.message || ''}</div>
              `;
            }
            if (omniDropdown) omniDropdown.classList.remove('open');
          }
        });

        omniInput.addEventListener('input', () => {
          const val = omniInput.value.trim();
          if (val.startsWith('/') || val.length < 2) {
            if (omniDropdown) omniDropdown.classList.remove('open');
            return;
          }

          if (typeof OSRegistry !== 'undefined' && omniDropdown) {
            const matches = OSRegistry.searchCatalog(val);
            if (matches.length > 0) {
              omniDropdown.innerHTML = matches.slice(0, 8).map(m => `
                <div class="dropdown-item" onclick="window.qwertyApp.selectOmniResult('${m.title}')">
                  <span class="item-title">${m.title}</span>
                  <span class="item-sub">${m.subtitle}</span>
                </div>
              `).join('');
              omniDropdown.classList.add('open');
            } else {
              omniDropdown.classList.remove('open');
            }
          }
        });
      }

      // Metadata inputs
      const appNameIn = document.getElementById('meta-app-name');
      const verNameIn = document.getElementById('meta-ver-name');
      const verNumIn = document.getElementById('meta-ver-num');

      if (appNameIn) {
        appNameIn.addEventListener('input', (e) => {
          app.appMeta.appName = e.target.value || 'QForteApp';
          app.renderPackagerTable(app.getAllActiveTargets());
        });
      }
      if (verNameIn) {
        verNameIn.addEventListener('input', (e) => {
          app.appMeta.versionName = e.target.value || 'Production';
          app.renderPackagerTable(app.getAllActiveTargets());
        });
      }
      if (verNumIn) {
        verNumIn.addEventListener('input', (e) => {
          app.appMeta.versionNumber = e.target.value || 'v1.0.0';
          app.renderPackagerTable(app.getAllActiveTargets());
        });
      }

      // Language Switcher
      const langSwitcher = document.getElementById('global-lang-select');
      if (langSwitcher && typeof I18n !== 'undefined') {
        langSwitcher.addEventListener('change', (e) => {
          I18n.setLanguage(e.target.value);
          // Update placeholder
          if (omniInput) {
            omniInput.placeholder = I18n.t('searchPlaceholder');
          }
        });
      }
    });
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = app;
  }
})(typeof window !== 'undefined' ? window : this);

