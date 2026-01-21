// Render projects from data
// This file generates project HTML from the projects-data.js file

function createProjectHTML(project) {
  const githubLink = project.githubUrl ? `
    <a href="${project.githubUrl}" target="_blank" aria-label="GitHub Link">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
      </svg>
    </a>` : '';

  const liveLink = project.liveUrl ? `
    <a href="${project.liveUrl}" ${project.liveUrl.startsWith('http') ? 'target="_blank"' : ''} aria-label="Live Demo">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
        <polyline points="15 3 21 3 21 9"></polyline>
        <line x1="10" y1="14" x2="21" y2="3"></line>
      </svg>
    </a>` : '';

  const techItems = project.technologies.map(tech => `<li>${tech}</li>`).join('');
  const titleLink = project.liveUrl || project.githubUrl || '#';
  const featuredClass = project.featured ? 'featured' : '';

  return `
    <article class="project ${featuredClass}">
      <div class="project-content">
        <p class="project-overline">${project.category}</p>
        <h3 class="project-title">
          <a href="${titleLink}" ${titleLink.startsWith('http') ? 'target="_blank"' : ''}>${project.title}</a>
        </h3>
        <div class="project-description">
          ${project.description}
        </div>
        <ul class="project-tech-list">
          ${techItems}
        </ul>
        <div class="project-links">
          ${githubLink}
          ${liveLink}
        </div>
      </div>
    </article>
  `;
}

function createArchiveProjectHTML(project) {
  const githubLink = project.githubUrl ? `
    <a href="${project.githubUrl}" target="_blank">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
      </svg>
    </a>` : '';

  const liveLink = project.liveUrl ? `
    <a href="${project.liveUrl}" ${project.liveUrl.startsWith('http') ? 'target="_blank"' : ''}>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
        <polyline points="15 3 21 3 21 9"></polyline>
        <line x1="10" y1="14" x2="21" y2="3"></line>
      </svg>
    </a>` : '';

  const techSpans = project.technologies.map(tech => `<span>${tech}</span>`).join('');
  const titleLink = project.liveUrl || project.githubUrl || '#';

  return `
    <tr>
      <td class="project-year">${project.year}</td>
      <td>
        <div class="project-title">
          <a href="${titleLink}" ${titleLink.startsWith('http') ? 'target="_blank"' : ''}>${project.title}</a>
        </div>
        <div class="project-company">${project.category}</div>
      </td>
      <td class="hide-mobile">
        <div class="project-tech">
          ${techSpans}
        </div>
      </td>
      <td>
        <div class="project-links">
          ${githubLink}
          ${liveLink}
        </div>
      </td>
    </tr>
  `;
}

// Render projects on page load
document.addEventListener('DOMContentLoaded', () => {
  const projectList = document.querySelector('.project-list');
  if (projectList) {
    const featuredProjects = getFeaturedProjects();
    projectList.innerHTML = featuredProjects.map(createProjectHTML).join('');
  }

  const archiveTableBody = document.querySelector('.projects-table tbody');
  if (archiveTableBody) {
    const allProjects = getAllProjects();
    archiveTableBody.innerHTML = allProjects.map(createArchiveProjectHTML).join('');
  }
});
