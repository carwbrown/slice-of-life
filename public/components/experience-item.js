/**
 * Experience Item Web Component
 * Displays a work experience entry with timeline
 *
 * Usage:
 *   const item = document.createElement('experience-item');
 *   item.experience = { position, company, companyUrl, startDate, endDate, current, description, technologies, consulting };
 */

class ExperienceItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._experience = null;
  }

  set experience(data) {
    this._experience = data;
    this.render();
  }

  get experience() {
    return this._experience;
  }

  connectedCallback() {
    if (this._experience) this.render();
  }

  render() {
    const exp = this._experience || {};

    const companyLink = exp.companyUrl
      ? `<a href="${exp.companyUrl}" target="_blank" rel="noopener noreferrer">${exp.company}</a>`
      : exp.company;

    const dateRange = exp.current
      ? `${exp.startDate} - <span class="current-role">Present</span>`
      : `${exp.startDate} - ${exp.endDate}`;

    const bulletPoints = (exp.description || []).map(desc => `<li>${desc}</li>`).join('');
    const techTags = (exp.technologies || []).map(tech => `<span class="tech-tag">${tech}</span>`).join('');

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: grid;
          grid-template-columns: 140px 1fr;
          gap: 2rem;
          position: relative;
        }

        .timeline {
          text-align: left;
          position: relative;
          padding-right: 3rem;
        }

        .timeline-marker {
          position: absolute;
          right: -8px;
          top: 8px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: var(--accent, #64ffda);
          border: 4px solid var(--bg-primary, #0a192f);
          box-shadow: 0 0 0 2px var(--accent, #64ffda);
          z-index: 1;
        }

        .timeline-date {
          font-family: var(--font-mono, 'SF Mono', monospace);
          font-size: 0.9rem;
          color: var(--text-secondary, #8892b0);
          font-weight: 500;
          line-height: 1.6;
        }

        .current-role {
          color: var(--accent, #64ffda);
          font-weight: 700;
          display: block;
          margin-top: 0.25rem;
        }

        .content {
          background: rgba(17, 34, 64, 0.3);
          border-radius: 12px;
          padding: 2rem 2.5rem;
          transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
          border: 1px solid rgba(100, 255, 218, 0.1);
          position: relative;
        }

        .content::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--accent, #64ffda), transparent);
          opacity: 0;
          transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
          border-radius: 12px 12px 0 0;
        }

        :host(:hover) .content {
          transform: translateX(8px);
          background: rgba(17, 34, 64, 0.5);
          border-color: rgba(100, 255, 218, 0.3);
          box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.4);
        }

        :host(:hover) .content::before {
          opacity: 1;
        }

        .header {
          margin-bottom: 1.5rem;
        }

        h3 {
          font-size: 1.5rem;
          color: var(--text-primary, #ccd6f6);
          margin: 0 0 0.75rem 0;
          font-weight: 700;
          line-height: 1.3;
        }

        h4 {
          font-size: 1.125rem;
          font-weight: 600;
          margin: 0;
        }

        h4 a {
          color: var(--accent, #64ffda);
          text-decoration: none;
          transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
        }

        h4 a:hover {
          text-decoration: underline;
        }

        .consulting-wrapper {
          margin-top: 0.75rem;
        }

        .consulting-badge {
          font-size: 0.8rem;
          font-family: var(--font-mono, 'SF Mono', monospace);
          color: var(--accent, #64ffda);
          background: rgba(100, 255, 218, 0.1);
          padding: 0.5rem 1rem;
          border-radius: 20px;
          border: 1px solid rgba(100, 255, 218, 0.3);
          font-weight: 500;
          display: inline-block;
        }

        .description {
          list-style: none;
          margin: 0 0 2rem 0;
          padding: 0;
        }

        .description li {
          position: relative;
          padding-left: 2rem;
          margin-bottom: 1rem;
          color: var(--text-secondary, #8892b0);
          line-height: 1.7;
          font-size: 0.95rem;
        }

        .description li::before {
          content: '▹';
          position: absolute;
          left: 0;
          color: var(--accent, #64ffda);
          font-size: 1.5rem;
          line-height: 1;
          top: -2px;
        }

        .tech {
          display: flex;
          flex-wrap: wrap;
          gap: 0.625rem;
        }

        .tech-tag {
          font-family: var(--font-mono, 'SF Mono', monospace);
          font-size: 0.8rem;
          color: var(--accent, #64ffda);
          background: rgba(100, 255, 218, 0.08);
          padding: 0.5rem 0.875rem;
          border-radius: 6px;
          border: 1px solid rgba(100, 255, 218, 0.2);
          transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
          font-weight: 500;
        }

        .tech-tag:hover {
          background: rgba(100, 255, 218, 0.15);
          transform: translateY(-2px);
          border-color: rgba(100, 255, 218, 0.4);
        }

        @media (max-width: 900px) {
          :host {
            grid-template-columns: 1fr;
            gap: 0;
          }

          .timeline {
            text-align: left;
            padding-right: 0;
            padding-left: 3rem;
            padding-bottom: 1rem;
          }

          .timeline-marker {
            left: -8px;
            right: auto;
          }

          .content {
            padding: 1.75rem 2rem;
          }

          h3 {
            font-size: 1.25rem;
          }

          h4 {
            font-size: 1rem;
          }
        }
      </style>

      <article>
        <div class="timeline">
          <div class="timeline-marker"></div>
          <div class="timeline-date">${dateRange}</div>
        </div>
        <div class="content">
          <div class="header">
            <h3>${exp.position || ''}</h3>
            <h4>${companyLink || ''}</h4>
            ${exp.consulting ? `<div class="consulting-wrapper"><span class="consulting-badge">via CWB Software Consulting</span></div>` : ''}
          </div>
          <ul class="description">${bulletPoints}</ul>
          <div class="tech">${techTags}</div>
        </div>
      </article>
    `;
  }
}

customElements.define('experience-item', ExperienceItem);

export { ExperienceItem };
