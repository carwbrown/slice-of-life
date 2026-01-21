// Professional experience data
// Edit this file to update work history across the site

const EXPERIENCE_DATA = [
  {
    id: 'shop-monkey',
    company: 'Shopmonkey',
    position: 'Software Engineer',
    startDate: 'May 2025',
    endDate: 'Present',
    description: [
      'Working on the payment processing team, building secure payment infrastructure',
      'Processing transactions for thousands of mechanic shops across the platform',
      'Developing features using modern TypeScript and Next.js stack'
    ],
    technologies: ['TypeScript', 'Next.js', 'Payment Processing', 'AWS'],
    companyUrl: 'https://www.shopmonkey.io/',
    current: true
  },
  {
    id: 'epic-hire',
    company: 'Epic Hire',
    position: 'Lead Software Engineer',
    startDate: 'May 2024',
    endDate: 'Apr 2025',
    description: [
      'Launched main web application (app.epichire.com) and marketing site using GraphQL, WordPress, and Next.js',
      'Led MongoDB to PostgreSQL migration, architecting new data structure and relations, resulting in reduced bugs and more stable API',
      'Released real-time messaging, event management with QR check-in, and announcement features for student organizations',
      'Raised active unique monthly users 2x in two months through enhanced engagement features',
      'Mentored several interns from first PR to productive team members, with three advancing to junior developer roles'
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Java', 'PostgreSQL', 'MongoDB', 'GraphQL'],
    companyUrl: 'https://epichire.com',
    current: false
  },
  {
    id: 'fringe',
    company: 'Fringe',
    position: 'Senior Full Stack Engineer',
    startDate: 'Dec 2021',
    endDate: 'May 2024',
    description: [
      'Optimized mission-critical endpoints using Redis cache, cutting response time from 5 seconds to 0.5 seconds',
      'Launched administration functionality with data visualization to educate admin users on platform usage',
      'Improved user onboarding and checkout flows, increasing purchase likelihood through better user data capture'
    ],
    technologies: ['TypeScript', 'React', 'Scala', 'Redis', 'Full-Stack Development'],
    companyUrl: 'https://www.getfringe.com/',
    current: false
  },
  {
    id: 'ifit-lead',
    company: 'iFIT',
    position: 'Engineering Lead',
    startDate: 'Jul 2021',
    endDate: 'Dec 2021',
    description: [
      'Led a team of Software Engineers (position affected by company-wide reduction in force)',
      'Significantly cut load times for 6.5 million active users through caching strategies and API redesign',
      'Increased customer engagement with workout programs through new tracking and statistics features',
      'Provided stability for live workouts when tens of thousands of users landed simultaneously'
    ],
    technologies: ['TypeScript', 'React', 'JavaScript', 'Serverless Framework', 'Leadership'],
    companyUrl: 'https://www.ifit.com/',
    current: false
  },
  {
    id: 'ifit-senior',
    company: 'iFIT',
    position: 'Senior Full Stack Developer',
    startDate: 'Aug 2020',
    endDate: 'Jul 2021',
    description: [
      'Promoted to Engineering Lead July 2021',
      'Full-stack development on iFIT web platform serving millions of active users'
    ],
    technologies: ['TypeScript', 'React', 'JavaScript', 'Serverless Framework'],
    companyUrl: 'https://www.ifit.com/',
    current: false
  },
  {
    id: 'pinpoint',
    company: 'Pinpoint',
    position: 'Software Engineer',
    startDate: 'Feb 2019',
    endDate: 'Aug 2020',
    description: [
      'Position affected by company-wide reduction in force',
      'Decreased client onboarding time from days to hours by building intuitive tools for Customer Service Representatives',
      'Simplified user experience from 50 screens to 8, reducing onboarding from 10 hours of calls to 10 minutes in-product',
      'Refactored backend endpoints for 2x faster response times with comprehensive testing'
    ],
    technologies: ['React', 'JavaScript', 'Go', 'Agile Methodologies'],
    companyUrl: null,
    current: false
  },
  {
    id: 'signalpath',
    company: 'SignalPath',
    position: 'Software Engineer',
    startDate: 'Jan 2017',
    endDate: 'Feb 2019',
    description: [
      'Built Enterprise Performance application for Clinical Research Organizations to gauge trial performance',
      'Designed and wrote new reporting microservice with data visualizations in D3',
      'Migrated Angular 1.5 application to hybrid environment supporting Angular 4',
      'Improved contract digitization process, speeding up training and reducing time-to-live for customers'
    ],
    technologies: ['AngularJS', 'JavaScript', 'Scala', 'D3', 'Agile Methodologies'],
    companyUrl: null,
    current: false
  }
];

const CONSULTING_INFO = {
  company: 'CWB Software Consulting LLC',
  founded: '2020',
  description: 'Full-stack React and TypeScript development consulting',
  specialties: ['React', 'TypeScript', 'Next.js', 'Full-Stack Development', 'Application Modernization']
};

// Utility functions
const getCurrentExperience = () => EXPERIENCE_DATA.filter(exp => exp.current);
const getPastExperience = () => EXPERIENCE_DATA.filter(exp => !exp.current);
const getConsultingProjects = () => EXPERIENCE_DATA.filter(exp => exp.throughConsulting);
const getAllExperience = () => [...EXPERIENCE_DATA];
