// Smooth scroll behavior and active nav state
document.addEventListener('DOMContentLoaded', () => {
  // Create wave blobs in hero section
  const heroBackground = document.querySelector('.hero-bg');
  
  const waveBlobs = [
    { size: 1500, x: 20, y: 25, color: 'rgba(100, 255, 218, 0.12)', duration: 6.5, delay: 0 },        // teal - left upper
    { size: 1450, x: 65, y: 20, color: 'rgba(255, 193, 7, 0.11)', duration: 7.25, delay: -2 },     // yellow - right upper
    { size: 1600, x: 30, y: 65, color: 'rgba(156, 39, 176, 0.1)', duration: 7.75, delay: -3.5 },      // purple - left lower
    { size: 1500, x: 75, y: 70, color: 'rgba(59, 130, 246, 0.1)', duration: 6.75, delay: -1.5 },       // blue - right lower
    { size: 1550, x: 45, y: 40, color: 'rgba(52, 211, 153, 0.1)', duration: 7, delay: -4 },     // green - center
    { size: 1400, x: 10, y: 50, color: 'rgba(251, 146, 60, 0.11)', duration: 6.25, delay: -2.75 }     // orange - left middle
  ];
  
  waveBlobs.forEach(blob => {
    const wave = document.createElement('div');
    wave.className = 'wave-blob';
    wave.style.width = `${blob.size}px`;
    wave.style.height = `${blob.size}px`;
    wave.style.left = `${blob.x}%`;
    wave.style.top = `${blob.y}%`;
    wave.style.background = `radial-gradient(ellipse at center, ${blob.color}, transparent 60%)`;
    wave.style.animationDuration = `${blob.duration}s`;
    wave.style.animationDelay = `${blob.delay}s`;
    heroBackground.appendChild(wave);
  });
  
  
  // Update active nav link on scroll
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav a');
  
  function updateActiveNav() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', updateActiveNav);
  
  // Add fade-in animation on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe all sections and projects
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });
  
  document.querySelectorAll('.project').forEach(project => {
    project.style.opacity = '0';
    project.style.transform = 'translateY(20px)';
    project.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(project);
  });
  
  // Hero section should be visible immediately
  hero.style.opacity = '1';
  hero.style.transform = 'translateY(0)';
});
