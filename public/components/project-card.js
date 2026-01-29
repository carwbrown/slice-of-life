/**
 * Project Card Web Component
 * Displays a project with title, description, technologies, and links
 *
 * Usage:
 *   const card = document.createElement('project-card');
 *   card.project = { title, category, description, technologies, githubUrl, liveUrl, featured };
 */

import './icon-link.js';

class ProjectCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._project = null;
  }

  set project(data) {
    this._project = data;
    this.render();
  }

  get project() {
    return this._project;
  }

  connectedCallback() {
    if (this._project) this.render();
  }

  render() {
    const p = this._project || {};
    const titleLink = p.liveUrl || p.githubUrl || '#';
    const isExternal = titleLink.startsWith('http');
    const techItems = (p.technologies || []).map(tech => `<li>${tech}</li>`).join('');

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }

        article {
          display: grid;
          gap: 1rem;
          position: relative;
        }

        .overline {
          font-family: var(--font-mono, 'SF Mono', monospace);
          font-size: 0.875rem;
          color: var(--accent, #64ffda);
          margin-bottom: 0.5rem;
        }

        h3 {
          font-size: 1.5rem;
          color: var(--text-primary, #ccd6f6);
          margin: 0 0 1rem 0;
          font-weight: 600;
        }

        h3 a {
          color: inherit;
          text-decoration: none;
          transition: color 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
        }

        h3 a:hover {
          color: var(--accent, #64ffda);
        }

        .description {
          background: var(--bg-secondary, #112240);
          padding: 1.5rem;
          border-radius: 4px;
          line-height: 1.7;
          color: var(--text-secondary, #8892b0);
          box-shadow: 0 10px 30px -15px rgba(2, 12, 27, 0.7);
        }

        .tech-list {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          list-style: none;
          margin: 1.5rem 0;
          padding: 0;
          font-family: var(--font-mono, 'SF Mono', monospace);
          font-size: 0.875rem;
          color: var(--text-secondary, #8892b0);
        }

        .links {
          display: flex;
          gap: 1rem;
        }

        .links icon-link {
          color: var(--text-primary, #ccd6f6);
        }
      </style>

      <article class="${p.featured ? 'featured' : ''}">
        <p class="overline">${p.category || ''}</p>
        <h3>
          <a href="${titleLink}" ${isExternal ? 'target="_blank" rel="noopener noreferrer"' : ''}>${p.title || ''}</a>
        </h3>
        <div class="description">${p.description || ''}</div>
        <ul class="tech-list">${techItems}</ul>
        <div class="links">
          ${p.githubUrl ? `<icon-link type="github" href="${p.githubUrl}" label="GitHub Link"></icon-link>` : ''}
          ${p.liveUrl ? `<icon-link type="external" href="${p.liveUrl}" label="Live Demo"></icon-link>` : ''}
        </div>
      </article>
    `;
  }
}

customElements.define('project-card', ProjectCard);

export { ProjectCard };
