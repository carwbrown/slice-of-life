// Professional experience data
// Edit this file to update work history across the site

const EXPERIENCE_DATA = [
  {
    id: 'fringe-2',
    company: 'Fringe',
    position: 'Senior Software Engineer',
    startDate: 'Nov 2025',
    endDate: 'Present',
    description: [
      'Leading backend rewrite project, migrating platform from Scala and Salesforce to Go',
      'Requirements gathering across all existing systems to map and preserve functionality in the new architecture',
      'Replacing Salesforce with an in-house solution to consolidate business logic and eliminate third-party dependency',
      'Designing and building a ledger system to manage money movement across the platform',
      'Project goal: significantly reduce infrastructure cost and Salesforce reliance'
    ],
    technologies: ['Go', 'Scala', 'Salesforce', 'Backend Development'],
    companyUrl: 'https://fringe.us',
    current: true
  },
  {
    id: 'fringe',
    company: 'Fringe',
    position: 'Senior Full Stack Engineer',
    startDate: 'Dec 2021',
    endDate: 'Nov 2025',
    description: [
      'Optimized mission-critical endpoints using Redis cache, cutting response time from 5 seconds to 0.5 seconds',
      'Launched administration functionality with data visualization to educate admin users on platform usage',
      'Improved user onboarding and checkout flows, increasing purchase likelihood through better user data capture'
    ],
    technologies: ['TypeScript', 'React', 'Scala', 'Redis', 'Full-Stack Development'],
    companyUrl: 'https://fringe.us',
    current: false
  },
  {
    id: 'ifit-lead',
    company: 'iFIT',
    position: 'Engineering Lead',
    startDate: 'Aug 2020',
    endDate: 'Dec 2021',
    description: [
      'Led a team of Software Engineers on the iFIT web platform serving millions of active users (position affected by company-wide reduction in force)',
      'Significantly cut load times for 6.5 million active users through caching strategies and API redesign',
      'Increased customer engagement with workout programs through new tracking and statistics features',
      'Provided stability for live workouts when tens of thousands of users landed simultaneously'
    ],
    technologies: ['TypeScript', 'React', 'JavaScript', 'Serverless Framework', 'Leadership'],
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
