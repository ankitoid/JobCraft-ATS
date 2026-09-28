import { ResumeData, JobApplication } from '@/types';

export const TECH_SKILLS_DICTIONARY: Record<string, string[]> = {
  frontend: [
    'react', 'next.js', 'typescript', 'javascript', 'vue', 'angular', 'html', 'css',
    'tailwind', 'tailwind css', 'sass', 'redux', 'zustand', 'graphql', 'webpack',
    'vite', 'jest', 'cypress', 'playwright', 'responsive design', 'web accessibility', 'wcag'
  ],
  backend: [
    'node.js', 'express', 'nest.js', 'python', 'django', 'fastapi', 'flask',
    'java', 'spring boot', 'go', 'golang', 'rust', 'c#', '.net', 'c++', 'ruby', 'ruby on rails',
    'rest api', 'restful', 'grpc', 'microservices', 'serverless'
  ],
  databases: [
    'postgresql', 'postgres', 'mysql', 'mongodb', 'redis', 'elasticsearch',
    'dynamodb', 'sqlite', 'cassandra', 'prisma', 'typeorm', 'sql', 'nosql', 'firebase', 'supabase'
  ],
  cloud_devops: [
    'aws', 'amazon web services', 'azure', 'gcp', 'google cloud', 'docker',
    'kubernetes', 'k8s', 'terraform', 'ci/cd', 'github actions', 'jenkins',
    'linux', 'nginx', 'helm', 'ansible', 'prometheus', 'grafana'
  ],
  aiml_data: [
    'machine learning', 'deep learning', 'pytorch', 'tensorflow', 'pandas',
    'numpy', 'scikit-learn', 'llm', 'langchain', 'openai', 'hugging face',
    'nlp', 'computer vision', 'data science', 'r', 'spark'
  ],
  practices: [
    'agile', 'scrum', 'system design', 'distributed systems', 'unit testing',
    'integration testing', 'test driven development', 'tdd', 'git', 'oop',
    'design patterns', 'code review', 'performance optimization', 'security'
  ]
};

export const SOFT_SKILLS_DICTIONARY = [
  'leadership', 'communication', 'collaboration', 'problem solving', 'cross-functional',
  'stakeholder management', 'mentorship', 'critical thinking', 'team player',
  'adaptability', 'time management', 'initiative', 'ownership', 'decision making'
];

export const STRONG_ACTION_VERBS = [
  'architected', 'spearheaded', 'orchestrated', 'engineered', 'implemented',
  'streamlined', 'optimized', 'accelerated', 'transformed', 'pioneered',
  'revamped', 'automated', 'delivered', 'formulated', 'maximized',
  'reduced', 'increased', 'scaled', 'mentored', 'established', 'championed',
  'centralized', 'designed', 'built', 'deployed', 'overhauled', 'boosted'
];

export const WEAK_VERBS = [
  'worked on', 'helped with', 'assisted', 'handled', 'was responsible for',
  'tried to', 'participated in', 'did', 'attempted', 'supported'
];

export const SAMPLE_RESUME: ResumeData = {
  id: 'default-resume',
  title: 'Full Stack Software Engineer Resume',
  lastModified: new Date().toISOString(),
  personalInfo: {
    fullName: 'Alex Morgan',
    jobTitle: 'Senior Full Stack Software Engineer',
    email: 'alex.morgan@email.com',
    phone: '+1 (555) 349-2810',
    location: 'San Francisco, CA (Open to Remote)',
    linkedin: 'linkedin.com/in/alexmorgan-dev',
    github: 'github.com/alexmorgan',
    portfolio: 'alexmorgan.dev'
  },
  summary: 'Results-driven Senior Full Stack Engineer with 5+ years of experience designing and scaling high-concurrency web platforms using Next.js, TypeScript, Node.js, and AWS. Proven track record of reducing latency by 45% and leading cross-functional teams to deliver enterprise-grade microservices for over 1M+ active users.',
  experience: [
    {
      id: 'exp-1',
      company: 'TechFlow Systems',
      role: 'Senior Software Engineer',
      location: 'San Francisco, CA',
      startDate: '2023-01',
      endDate: 'Present',
      current: true,
      bulletPoints: [
        'Architected high-throughput microservices using Node.js, TypeScript, and Redis, reducing p99 API response latency by 48% across 12M monthly transactions.',
        'Spearheaded frontend migration to Next.js 14 and Tailwind CSS, improving Core Web Vitals score by 35% and elevating SEO organic conversion by 22%.',
        'Implemented automated CI/CD deployment pipelines using GitHub Actions and AWS ECS/Docker, trimming deployment release cycles from 4 hours to 12 minutes.',
        'Mentored 4 junior engineers on distributed system design, clean architecture, and rigorous test-driven development (TDD).'
      ]
    },
    {
      id: 'exp-2',
      company: 'CloudScale Interactive',
      role: 'Full Stack Developer',
      location: 'Austin, TX',
      startDate: '2021-03',
      endDate: '2022-12',
      current: false,
      bulletPoints: [
        'Engineered responsive real-time analytics dashboard with React, TypeScript, and WebSocket infrastructure, supporting 85,000 concurrent enterprise users.',
        'Optimized PostgreSQL queries, indexing, and connection pools, decreasing average database query execution time by 62%.',
        'Built automated Stripe billing integration handling over $4.2M in annual recurring subscription revenue with zero billing errors.',
        'Collaborated cross-functionally with product managers and UX designers in two-week agile sprint cycles to launch 8 core features on schedule.'
      ]
    }
  ],
  education: [
    {
      id: 'edu-1',
      institution: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      fieldOfStudy: 'Computer Science',
      startDate: '2017',
      endDate: '2021',
      gpa: '3.8/4.0',
      location: 'Berkeley, CA'
    }
  ],
  skills: {
    languages: ['TypeScript', 'JavaScript', 'Python', 'Go', 'SQL', 'HTML5', 'CSS3'],
    frameworks: ['React', 'Next.js', 'Node.js', 'Express', 'Tailwind CSS', 'Redux Toolkit'],
    developerTools: ['Docker', 'Git', 'GitHub Actions', 'Terraform', 'Postman', 'Vite'],
    librariesAndDatabases: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma ORM', 'GraphQL', 'AWS (S3, ECS, Lambda)'],
    softSkills: ['System Design', 'Agile/Scrum Leadership', 'Cross-Functional Collaboration', 'Mentorship']
  },
  projects: [
    {
      id: 'proj-1',
      name: 'OmniStream: Real-time Distributed Event Bus',
      description: 'Distributed event processing system built in Go and Kafka with sub-5ms routing latency.',
      technologies: ['Go', 'Kafka', 'Docker', 'Prometheus', 'Grafana'],
      link: 'github.com/alexmorgan/omnistream',
      bulletPoints: [
        'Engineered distributed pub-sub messaging broker capable of handling 50,000 msg/sec with zero message loss.',
        'Configured Prometheus metric scraping and Grafana alerts for real-time observability and anomaly detection.'
      ]
    }
  ],
  certifications: [
    'AWS Certified Solutions Architect - Associate',
    'HashiCorp Certified Terraform Associate'
  ]
};

export const SAMPLE_JOB_DESCRIPTION = `Senior Full Stack Software Engineer - SaaS Cloud Platform

About the Role:
We are looking for a high-performing Senior Full Stack Engineer to build and scale our next-generation cloud collaboration platform. You will be responsible for designing resilient microservices, building high-speed React/Next.js client applications, and optimizing database pipelines.

Key Responsibilities:
- Design, build, and maintain highly scalable full-stack applications using TypeScript, React, Next.js, and Node.js.
- Architect robust RESTful and GraphQL APIs connecting to PostgreSQL, MongoDB, and Redis caches.
- Lead cloud infrastructure deployments on AWS (ECS, Lambda, CloudFront, S3) using Docker and Terraform.
- Establish best practices for automated testing (Jest, Cypress), CI/CD pipelines with GitHub Actions, and code review standards.
- Collaborate closely with Product, Design, and DevOps teams to deliver critical product roadmap initiatives in an Agile environment.
- Mentor junior and mid-level engineers, fostering technical excellence and system design rigor.

Qualifications & Requirements:
- 4+ years of professional software engineering experience building production web applications.
- Strong proficiency in modern JavaScript/TypeScript, React, Next.js, HTML5, and CSS/Tailwind CSS.
- Solid backend expertise in Node.js, Express, or Python (FastAPI/Django).
- Deep experience with relational databases (PostgreSQL/MySQL) and caching (Redis).
- Hands-on experience with Docker containerization, Kubernetes, and AWS cloud ecosystem.
- Proven track record of performance optimization, reducing latency, and scaling systems for 100k+ users.
- Excellent communication, ownership mindset, and cross-functional leadership skills.
- Bachelor's degree in Computer Science or equivalent practical experience.`;

export const SAMPLE_JOBS: JobApplication[] = [
  {
    id: 'job-1',
    company: 'Stripe',
    position: 'Senior Full Stack Engineer',
    location: 'San Francisco, CA (Hybrid)',
    jobType: 'Full-time',
    salary: '$185,000 - $225,000 + Equity',
    status: 'interviewing',
    appliedDate: '2026-09-18',
    url: 'https://stripe.com/jobs',
    jobDescription: SAMPLE_JOB_DESCRIPTION,
    notes: 'Completed technical screen with hiring manager. System design round scheduled for next Thursday.',
    matchScore: 92,
    contactPerson: 'Sarah Jenkins (Technical Recruiter)',
    contactEmail: 'sjenkins@stripe.com'
  },
  {
    id: 'job-2',
    company: 'Datadog',
    position: 'Staff Frontend Infrastructure Engineer',
    location: 'Remote (US)',
    jobType: 'Remote',
    salary: '$200,000 - $240,000',
    status: 'applied',
    appliedDate: '2026-09-22',
    url: 'https://datadoghq.com/careers',
    jobDescription: 'Seeking expert React/TypeScript engineers to optimize high-volume real-time metric dashboards and canvas renderers.',
    notes: 'Submitted tailored resume highlighting Core Web Vitals optimization and WebSocket experience.',
    matchScore: 84
  },
  {
    id: 'job-3',
    company: 'Linear',
    position: 'Product Engineer (Full Stack)',
    location: 'Remote',
    jobType: 'Remote',
    salary: '$170,000 - $210,000 + Equity',
    status: 'offer',
    appliedDate: '2026-09-02',
    url: 'https://linear.app/careers',
    jobDescription: 'High craftsmanship product engineer with deep focus on UI micro-interactions, local-first sync, and TypeScript.',
    notes: 'Offer received! $195k base + equity package. Reviewing terms before decision deadline.',
    matchScore: 89
  },
  {
    id: 'job-4',
    company: 'Vercel',
    position: 'Next.js Platform Engineer',
    location: 'San Francisco, CA / Remote',
    jobType: 'Full-time',
    salary: '$190,000 - $230,000',
    status: 'saved',
    appliedDate: '2026-09-27',
    url: 'https://vercel.com/careers',
    jobDescription: 'Work directly on Next.js, Turbopack, and edge runtime primitives.',
    notes: 'Need to tailor resume to emphasize compiler, AST, and open-source contributions before applying.',
    matchScore: 78
  }
];
