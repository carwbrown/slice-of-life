// Render experience from data
// This file generates experience HTML from the experience-data.js file

function createExperienceHTML(experience) {
  const bulletPoints = experience.description.map(desc => `<li>${desc}</li>`).join('');
  const techItems = experience.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('\n        ');
  const companyLink = experience.companyUrl 
    ? `<a href="${experience.companyUrl}" target="_blank" rel="noopener noreferrer">${experience.company}</a>`
    : experience.company;
  
  const dateRange = experience.current 
    ? `${experience.startDate} - <span class="current-role">Present</span>`
    : `${experience.startDate} - ${experience.endDate}`;

  const consultingBadge = experience.throughConsulting 
    ? '<span class="consulting-badge">via CWB Software Consulting</span>'
    : '';

  return `
    <article class="experience-item">
      <div class="experience-timeline">
        <div class="timeline-marker"></div>
        <div class="timeline-date">${dateRange}</div>
      </div>
      <div class="experience-content">
        <div class="experience-header">
          <h3 class="experience-position">${experience.position}</h3>
          <h4 class="experience-company">
            ${companyLink}
          </h4>
          ${consultingBadge ? `<div class="consulting-wrapper">${consultingBadge}</div>` : ''}
        </div>
        <ul class="experience-description">
          ${bulletPoints}
        </ul>
        <div class="experience-tech">
          ${techItems}
        </div>
      </div>
    </article>
  `;
}

// Render experience on page load
document.addEventListener('DOMContentLoaded', () => {
  const experienceContainer = document.getElementById('experience-container');
  if (experienceContainer) {
    const allExperience = getAllExperience();
    experienceContainer.innerHTML = allExperience.map(createExperienceHTML).join('');
  }
});
