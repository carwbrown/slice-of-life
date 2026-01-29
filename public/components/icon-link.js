/**
 * Icon Link Web Component
 * A reusable component for icon links (GitHub, external, LinkedIn)
 *
 * Usage:
 *   <icon-link type="github" href="https://github.com/user" label="GitHub"></icon-link>
 *   <icon-link type="external" href="https://example.com" label="Live Demo"></icon-link>
 *   <icon-link type="linkedin" href="https://linkedin.com/in/user" label="LinkedIn"></icon-link>
 */

const ICONS = {
  github: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>`,
  external: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>`,
  linkedin: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>`
};

class IconLink extends HTMLElement {
  static get observedAttributes() {
    return ['type', 'href', 'label', 'size'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const type = this.getAttribute('type') || 'external';
    const href = this.getAttribute('href') || '#';
    const label = this.getAttribute('label') || '';
    const size = this.getAttribute('size') || '20';
    const newTab = href.startsWith('http');

    const icon = ICONS[type] || ICONS.external;
    const sizedIcon = icon
      .replace(/width="(\d+)"/, `width="${size}"`)
      .replace(/height="(\d+)"/, `height="${size}"`);

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-flex;
        }
        a {
          color: inherit;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          transition: color 0.25s cubic-bezier(0.645, 0.045, 0.355, 1),
                      transform 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
        }
        a:hover {
          color: var(--accent, #64ffda);
          transform: translateY(-2px);
        }
        svg {
          display: block;
        }
      </style>
      <a href="${href}"
         ${newTab ? 'target="_blank" rel="noopener noreferrer"' : ''}
         aria-label="${label}">
        ${sizedIcon}
      </a>
    `;
  }
}

customElements.define('icon-link', IconLink);

export { IconLink };
