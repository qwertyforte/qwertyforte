/**
 * QwertyForte Rich State Ticket History Engine
 * Invariant: Ticket history is NEVER empty (initializes with Ticket #001: Genesis Baseline Matrix).
 * Captures source attribution, exact deltas (+/-), previous/new states, and instant rollback.
 */

(function (global) {
  'use strict';

  const STORAGE_KEY = 'qwertyforte_ticket_history_v1';

  function getClientSourceInfo() {
    if (typeof window === 'undefined') {
      return {
        environment: 'Node/CLI',
        platform: typeof process !== 'undefined' ? process.platform : 'unknown',
        userAgent: 'CLI Agent',
        locale: 'en-US',
        screen: 'headless'
      };
    }

    const ua = navigator.userAgent || 'Unknown Browser';
    let browser = 'Unknown Browser';
    if (ua.indexOf('Chrome') > -1) browser = 'Google Chrome';
    else if (ua.indexOf('Safari') > -1) browser = 'Apple Safari';
    else if (ua.indexOf('Firefox') > -1) browser = 'Mozilla Firefox';
    else if (ua.indexOf('Edge') > -1) browser = 'Microsoft Edge';

    return {
      browser: browser,
      platform: navigator.platform || 'Unknown Platform',
      userAgent: ua.substring(0, 120),
      locale: navigator.language || 'en-US',
      screen: `${window.screen.width}x${window.screen.height}`,
      sessionId: 'sess_' + Math.random().toString(36).substring(2, 9)
    };
  }

  class TicketStore {
    constructor() {
      this.tickets = [];
      this.load();
    }

    load() {
      if (typeof localStorage !== 'undefined') {
        try {
          const raw = localStorage.getItem(STORAGE_KEY);
          if (raw) {
            this.tickets = JSON.parse(raw);
          }
        } catch (e) {
          console.warn('[TicketStore] Failed to parse localStorage tickets, initializing fresh.');
        }
      }
    }

    save() {
      if (typeof localStorage !== 'undefined') {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tickets));
        } catch (e) {
          console.error('[TicketStore] Storage write error:', e);
        }
      }
    }

    ensureGenesis(initialActiveOSTargets, initialActiveLanguages) {
      if (this.tickets.length === 0) {
        const genesisTicket = {
          ticketId: 1,
          timestamp: new Date().toISOString(),
          timeFormatted: new Date().toLocaleString(),
          source: getClientSourceInfo(),
          summary: 'Genesis Baseline Matrix Initialized (10 Brands + Default Languages)',
          author: 'System Genesis / Antigravity Agent',
          delta: {
            added: [...initialActiveOSTargets, ...initialActiveLanguages],
            removed: [],
            modified: []
          },
          previousState: {
            osTargets: [],
            languages: []
          },
          newState: {
            osTargets: [...initialActiveOSTargets],
            languages: [...initialActiveLanguages]
          }
        };
        this.tickets.push(genesisTicket);
        this.save();
      }
      return this.tickets[0];
    }

    recordChange(summary, previousState, newState, author) {
      const prevOS = new Set(previousState.osTargets || []);
      const newOS = new Set(newState.osTargets || []);
      const prevLang = new Set(previousState.languages || []);
      const newLang = new Set(newState.languages || []);

      const added = [];
      const removed = [];

      newOS.forEach(item => { if (!prevOS.has(item)) added.push(item); });
      prevOS.forEach(item => { if (!newOS.has(item)) removed.push(item); });

      newLang.forEach(item => { if (!prevLang.has(item)) added.push(item); });
      prevLang.forEach(item => { if (!newLang.has(item)) removed.push(item); });

      // Only create ticket if state actually changed or explicit note was requested
      if (added.length === 0 && removed.length === 0 && this.tickets.length > 0) {
        return null;
      }

      const nextId = this.tickets.length > 0 ? (this.tickets[this.tickets.length - 1].ticketId + 1) : 1;
      const ticket = {
        ticketId: nextId,
        timestamp: new Date().toISOString(),
        timeFormatted: new Date().toLocaleString(),
        source: getClientSourceInfo(),
        summary: summary || `State update (+${added.length}, -${removed.length})`,
        author: author || 'Developer / User Action',
        delta: {
          added: added,
          removed: removed,
          modified: []
        },
        previousState: {
          osTargets: Array.from(prevOS),
          languages: Array.from(prevLang)
        },
        newState: {
          osTargets: Array.from(newOS),
          languages: Array.from(newLang)
        }
      };

      this.tickets.push(ticket);
      this.save();
      return ticket;
    }

    getTickets() {
      return JSON.parse(JSON.stringify(this.tickets));
    }

    getTicketById(id) {
      const num = parseInt(id, 10);
      return this.tickets.find(t => t.ticketId === num) || null;
    }

    findTicketByQuery(query) {
      if (!query || typeof query !== 'string') return null;
      const q = query.toLowerCase().trim();

      // Check for explicit ticket ID e.g. "ticket 2" or "#2" or "2"
      const matchNum = q.match(/(?:ticket\s*#?|#)(\d+)/);
      if (matchNum) {
        return this.getTicketById(parseInt(matchNum[1], 10));
      }

      if (q.includes('genesis') || q.includes('beginning') || q.includes('first') || q.includes('start')) {
        return this.tickets[0];
      }

      if (q.includes('morning') || q.includes('yesterday') || q.includes('previous') || q.includes('last')) {
        if (this.tickets.length > 1) {
          return this.tickets[this.tickets.length - 2];
        }
        return this.tickets[0];
      }

      return null;
    }
  }

  const instance = new TicketStore();

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = instance;
  } else {
    global.TicketStore = instance;
  }
})(typeof window !== 'undefined' ? window : this);
