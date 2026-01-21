// Project data for portfolio
// Edit this file to update project information across the site

const PROJECTS_DATA = [
  {
    id: 'slice-of-life',
    title: 'Slice of Life',
    description: 'A minimalist daily journaling app showcasing the power of vanilla web technologies. Built without frameworks or build tools—just semantic HTML, CSS, and vanilla JavaScript. Features PocketBase for backend-as-a-service with built-in authentication, real-time data sync, and SQLite database. Demonstrates modern web development without the complexity of heavy frameworks, proving that simple tools can create powerful applications.',
    technologies: ['HTML/CSS', 'JavaScript', 'PocketBase', 'HTMX', 'Pico CSS'],
    githubUrl: 'https://github.com/carwbrown/slice-of-life',
    liveUrl: '/login.html',
    year: 2026,
    category: 'Featured Project',
    featured: true
  },
  {
    id: 'math-facts',
    title: 'Math Facts Practice',
    description: 'An educational web application designed to make learning multiplication tables engaging and fun for kids. Built with Next.js and TypeScript, featuring customizable difficulty levels, real-time progress tracking, and smooth animations. Includes timed challenges, achievement badges, and adaptive difficulty that grows with the student. Deployed on Netlify with continuous integration.',
    technologies: ['Next.js', 'Tailwind CSS', 'TypeScript', 'Netlify'],
    githubUrl: 'https://github.com/carwbrown/multi-ply',
    liveUrl: 'https://multi-ply.netlify.app/',
    year: 2025,
    category: 'Side Project',
    featured: true
  },
  {
    id: 'call-time',
    title: 'Call Time',
    description: 'A comprehensive production scheduling and crew management SaaS platform built for the video production industry. Features real-time collaboration for production teams, drag-and-drop scheduling, automated call sheets, crew availability tracking, and location management. Built on AWS Amplify with GraphQL API, DynamoDB for scalable data storage, and Cognito for secure authentication. Serves production companies managing complex multi-day shoots with distributed teams.',
    technologies: ['React', 'AWS Amplify', 'GraphQL', 'DynamoDB', 'Cognito'],
    githubUrl: null,
    liveUrl: 'https://calltime.io',
    year: 2021,
    category: 'SaaS Application',
    featured: true
  },
  {
    id: 'zoomer-ipsum',
    title: 'Zoomer Ipsum',
    description: 'A playful lorem ipsum generator featuring Gen-Z slang, internet culture references, and modern phrases. Perfect for designers and developers who want placeholder text that resonates with younger audiences. Built with Rsbuild for blazing-fast development and hot module replacement. Features a clean Tailwind CSS interface, copy-to-clipboard functionality, and customizable paragraph counts. A fun exploration of modern build tools and CSS frameworks.',
    technologies: ['Rsbuild', 'Tailwind CSS', 'TypeScript'],
    githubUrl: 'https://github.com/carwbrown/zoomer-ipsum',
    liveUrl: 'https://zoomer-ipsum.netlify.app/',
    year: 2025,
    category: 'Side Project',
    featured: false
  },
  {
    id: 'react-playground',
    title: 'Rick and Morty React Playground',
    description: 'A TypeScript learning playground built to explore React patterns and API integration. Uses the Rick and Morty API to demonstrate REST and GraphQL queries, custom hooks, Apollo Client integration, Material-UI components, and TypeScript best practices. Features character browsing, episode tracking, and location exploration. Built with Create React App and deployed to GitHub Pages, showcasing setTimeout patterns, state management, and functional component design.',
    technologies: ['React', 'TypeScript', 'Apollo GraphQL', 'Material-UI'],
    githubUrl: 'https://github.com/carwbrown/rick.morty',
    liveUrl: 'https://carwbrown.github.io/rick.morty/',
    year: 2023,
    category: 'Learning Project',
    featured: false
  },
  {
    id: 'discord-bot',
    title: 'Discord Bot',
    description: 'A community Discord bot for the CCS channel. Features custom commands, moderation tools, and server management utilities.',
    technologies: ['JavaScript', 'Discord.js', 'Node.js'],
    githubUrl: 'https://github.com/carwbrown/ccs-bot',
    liveUrl: null,
    year: 2022,
    category: 'Side Project',
    featured: false
  },
  {
    id: 'cwb-redux',
    title: 'CWB Redux',
    description: 'An academic reimplementation of Redux state management library. Built to understand the core principles and patterns of Redux from scratch.',
    technologies: ['JavaScript', 'State Management', 'Redux Pattern'],
    githubUrl: 'https://github.com/carwbrown/cwbdux',
    liveUrl: null,
    year: 2021,
    category: 'Learning Project',
    featured: false
  },
  {
    id: 'hots-drafter',
    title: 'HotS Drafter',
    description: 'A draft strategy tool for Heroes of the Storm. Helps teams plan hero selections and counter-picks during competitive matches.',
    technologies: ['TypeScript', 'React', 'Game Tools'],
    githubUrl: 'https://github.com/carwbrown/hots-draft',
    liveUrl: 'https://carwbrown.github.io/hots-draft/',
    year: 2021,
    category: 'Side Project',
    featured: false
  },
  {
    id: 'araknoid-game',
    title: 'Araknoid Game',
    description: 'A 3D breakout-style game built with React Three Fiber. Demonstrates WebGL capabilities and 3D game mechanics in the browser.',
    technologies: ['React Three Fiber', 'WebGL', 'Three.js'],
    githubUrl: 'https://github.com/carwbrown/r3f-ludo-model',
    liveUrl: null,
    year: 2021,
    category: '3D Experiment',
    featured: false
  },
  {
    id: 'minecraft-clone',
    title: 'Minecraft Clone',
    description: 'A first-person voxel game inspired by Minecraft. Built with React Three Fiber, featuring world generation, block placement, and first-person controls.',
    technologies: ['React Three Fiber', 'First Person', 'Game Dev'],
    githubUrl: 'https://github.com/carwbrown/cb-minecraft',
    liveUrl: null,
    year: 2021,
    category: '3D Experiment',
    featured: false
  },
  {
    id: 'master-chef',
    title: 'Master Chef',
    description: 'Recipe management and cooking application. (Work in progress)',
    technologies: ['CSS', 'JavaScript'],
    githubUrl: 'https://github.com/carwbrown/master-chef',
    liveUrl: null,
    year: 2026,
    category: 'Side Project',
    featured: false
  },
  {
    id: 'movie-fone',
    title: 'Movie Fone',
    description: 'Movie discovery and tracking application. (Work in progress)',
    technologies: ['JavaScript'],
    githubUrl: 'https://github.com/carwbrown/movie-fone',
    liveUrl: null,
    year: 2026,
    category: 'Side Project',
    featured: false
  }
];

// Utility functions for filtering projects
const getProjectById = (id) => PROJECTS_DATA.find(p => p.id === id);
const getFeaturedProjects = () => PROJECTS_DATA.filter(p => p.featured);
const getProjectsByYear = (year) => PROJECTS_DATA.filter(p => p.year === year);
const getProjectsByCategory = (category) => PROJECTS_DATA.filter(p => p.category === category);
const getAllProjects = () => [...PROJECTS_DATA].sort((a, b) => b.year - a.year);
