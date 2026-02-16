/**
 * Entry Card Web Component
 * Displays a journal entry for the app section
 *
 * Usage:
 *   const card = document.createElement('entry-card');
 *   card.entry = { date: '2024-01-15', content: 'Today was a good day...' };
 */

import { escapeHTML } from '../scripts/security.js';

class EntryCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._entry = null;
  }

  set entry(data) {
    this._entry = data;
    this.render();
  }

  get entry() {
    return this._entry;
  }

  connectedCallback() {
    if (this._entry) this.render();
  }

  render() {
    const e = this._entry || {};

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }

        .entry {
          background: var(--card-background, rgba(17, 34, 64, 0.3));
          border: 1px solid var(--card-border, rgba(100, 255, 218, 0.1));
          border-radius: 8px;
          padding: 1.5rem;
          margin-bottom: 1rem;
          transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
        }

        .entry:hover {
          border-color: var(--accent, rgba(100, 255, 218, 0.3));
          transform: translateY(-2px);
          box-shadow: 0 5px 20px -5px rgba(0, 0, 0, 0.3);
        }

        h3 {
          font-family: var(--font-mono, 'SF Mono', monospace);
          font-size: 0.875rem;
          color: var(--accent, #64ffda);
          margin: 0 0 0.75rem 0;
          font-weight: 500;
        }

        p {
          color: var(--text-secondary, #8892b0);
          line-height: 1.7;
          margin: 0;
          font-size: 0.95rem;
        }
      </style>

      <article class="entry">
        <h3>${e.date || ''}</h3>
        <p>${escapeHTML(e.content || '')}</p>
      </article>
    `;
  }
}

customElements.define('entry-card', EntryCard);

export { EntryCard };
