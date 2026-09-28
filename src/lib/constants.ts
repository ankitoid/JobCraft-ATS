import { ResumeData, JobApplication } from '@/types';

export const TECH_SKILLS_DICTIONARY: Record<string, string[]> = {
  frontend: [
    'react', 'next.js', 'react native', 'typescript', 'javascript', 'vue', 'angular', 'html', 'css',
    'tailwind', 'tailwind css', 'sass', 'redux', 'redux toolkit', 'zustand', 'graphql', 'webpack',
    'vite', 'jest', 'cypress', 'playwright', 'responsive design', 'web accessibility', 'wcag', 'mobile'
  ],
  backend: [
    'node.js', 'express', 'express.js', 'nest.js', 'python', 'django', 'fastapi', 'flask',
    'java', 'spring boot', 'go', 'golang', 'rust', 'c#', '.net', 'c++', 'ruby', 'ruby on rails',
    'rest api', 'restful', 'grpc', 'microservices', 'serverless', 'websockets', 'jwt', 'authentication',
    'payments', 'pos', 'ordering', 'integrations'
  ],
  databases: [
    'supabase', 'postgresql', 'postgres', 'mysql', 'mongodb', 'redis', 'elasticsearch',
    'dynamodb', 'sqlite', 'cassandra', 'prisma', 'typeorm', 'sql', 'nosql', 'firebase'
  ],
  cloud_devops: [
    'aws', 'amazon web services', 'azure', 'gcp', 'google cloud', 'docker',
    'kubernetes', 'k8s', 'terraform', 'ci/cd', 'github actions', 'jenkins',
    'linux', 'nginx', 'helm', 'ansible', 'prometheus', 'grafana', 'vercel', 'pm2'
  ],
  aiml_data: [
    'ai', 'llm', 'langfuse', 'braintrust', 'openai', 'prompt engineering', 'prompt evaluation',
    'ai observability', 'tracing', 'machine learning', 'deep learning', 'pytorch', 'tensorflow',
    'pandas', 'numpy', 'scikit-learn', 'langchain', 'hugging face', 'nlp'
  ],
  practices: [
    'agile', 'scrum', 'system design', 'distributed systems', 'unit testing',
    'integration testing', 'test driven development', 'tdd', 'git', 'oop',
    'design patterns', 'code review', 'performance optimization', 'security', 'end-to-end'
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
  id: 'ankit-tailored-resume',
  title: 'Full-Stack Engineer Resume (AI, Web & Mobile)',
  lastModified: new Date().toISOString(),
  personalInfo: {
    fullName: 'Ankit Singh Ghosh',
    jobTitle: 'Frontend-Led Full-Stack Engineer (React, Next.js, React Native, Node.js)',
    email: 'ankitsingh.builds@gmail.com',
    phone: '+91-6265227382',
    location: 'Noida, India (Open to Remote / Hybrid)',
    linkedin: 'linkedin.com/in/ankitoid',
    github: 'github.com/ankitoid',
    portfolio: 'github.com/ankitoid'
  },
  summary: 'Frontend-Led Full-Stack Engineer with 2+ years of experience designing and shipping high-performance web (Next.js, React) and mobile (React Native) products end to end. Proven track record building transactional ordering systems, real-time geolocation tracking, payment integrations, and AI-assisted workflows. Experienced in small, fast-moving teams taking ambiguous product requirements from concept to App Store/Play Store deployment and production scale.',
  experience: [
    {
      id: 'exp-1',
      company: 'GlobalXperts',
      role: 'Full-Stack Software Engineer',
      location: 'Noida, India (Remote-friendly)',
      startDate: '2024-07',
      endDate: 'Present',
      current: true,
      bulletPoints: [
        'Shipped 2 commercial full-stack platforms end to end (DryDash, quick-commerce ordering platform, and Shiptos, a multi-tenant operations ERP) as a core engineer on a fast-paced cross-functional product team.',
        'Built and published the customer-facing mobile application on both iOS (App Store) and Android (Google Play) using React Native and TypeScript, managing the full checkout flow: cart state, slot scheduling, payment gateway integration, and referral mechanics.',
        'Engineered real-time delivery tracking integrating Google Maps Geolocation and WebSockets, cutting missed delivery slot windows by 32% across 10+ fulfillment hubs.',
        'Architected admin CMS/CRM dashboards using React, Next.js, and Node.js for managers to orchestrate catalog pricing, live ordering status, and multi-location inventory.',
        'Integrated modern AI-assisted engineering workflows (Cursor, Copilot, structured prompt templates) to accelerate feature development velocity by 40% while maintaining clean test coverage.',
        'Optimized backend API response times by 45% by implementing Redis caching layers and indexing PostgreSQL/MongoDB query execution plans.',
        'Recipient of the "GX-Elevate Unmatched Dedication Award" (2025), recognized by CEO and CTO for exceptional product ownership and high-reliability engineering delivery.'
      ]
    },
    {
      id: 'exp-2',
      company: 'NexLearn (AI-Enabled Product Initiative)',
      role: 'Lead Full-Stack Engineer',
      location: 'Remote',
      startDate: '2023-01',
      endDate: '2023-12',
      current: false,
      bulletPoints: [
        'Architected an AI-powered interactive learning platform supporting 2,000+ active users with server-side rendered Next.js, TypeScript, and Tailwind CSS.',
        'Integrated LLM capabilities via OpenAI APIs, incorporating prompt evaluation and observability tracing (Langfuse) to monitor latency, token usage, and hallucination rates.',
        'Engineered payment and subscription lifecycles with Stripe webhooks and Supabase auth, processing recurring membership transactions with 99.9% uptime.'
      ]
    },
    {
      id: 'exp-3',
      company: 'Yhills',
      role: 'Software Engineer Intern',
      location: 'Remote',
      startDate: '2022-09',
      endDate: '2022-11',
      current: false,
      bulletPoints: [
        'Delivered 10+ production REST API endpoints and modular React UI components within a distributed agile team, reducing customer issue ticket turnaround by 25%.',
        'Led end-to-end debugging and unit testing across MERN stack services, resolving 15+ critical data synchronization issues across staging and production.'
      ]
    }
  ],
  education: [
    {
      id: 'edu-1',
      institution: 'SD Bansal College of Engineering',
      degree: 'B.Tech',
      fieldOfStudy: 'Computer Science and Engineering',
      startDate: '2020',
      endDate: '2024',
      gpa: '7.77 / 10',
      location: 'Indore, India'
    }
  ],
  skills: {
    languages: ['TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'SQL'],
    frameworks: ['React', 'React Native', 'Next.js 14', 'Node.js', 'Express.js', 'Tailwind CSS', 'Redux Toolkit'],
    developerTools: ['Docker', 'Git', 'GitHub Actions', 'Vercel', 'Postman', 'Cursor AI', 'Langfuse', 'Mobile App Store Releases'],
    librariesAndDatabases: ['Supabase', 'PostgreSQL', 'MongoDB', 'Redis', 'WebSockets', 'REST APIs', 'Stripe Webhooks', 'AWS (EC2, S3, Lambda)'],
    softSkills: ['End-to-End Ownership', 'Fast-Paced Ambiguity', 'System Design', 'Agile / Scrum', 'Prompt Engineering']
  },
  projects: [
    {
      id: 'proj-1',
      name: 'DryDash & Shiptos Platform Suite',
      description: 'Quick-commerce customer ordering mobile app and multi-tenant operations ERP.',
      technologies: ['React Native', 'Next.js', 'Node.js', 'MongoDB', 'PostgreSQL', 'WebSockets'],
      link: 'github.com/ankitoid',
      bulletPoints: [
        'Published customer ordering application on iOS & Android with integrated payment gateways and real-time delivery GPS tracking.',
        'Scaled admin operations dashboards used by warehouse managers across Delhi NCR.'
      ]
    }
  ],
  certifications: [
    'GX-Elevate Unmatched Dedication Award (Recognized by CEO & CTO, 2025)',
    'Smart India Hackathon (SIH) - 1st Rank College Level Scalable Prototype (2023)',
    'IIT Bombay Programming Basics Certification (Grade A+, 2022)'
  ]
};

export const SAMPLE_JOB_DESCRIPTION = `Full-Stack Engineer - Nomni (Hospitality Tech)
Join the revolution in hospitality tech! Nomni is the all-in-one platform built for hospitality operators - bringing POS, payments, ordering, loyalty, procurement, marketing, and data together in one system, with AI at its core. 35,000 venues already on the platform across Australia and Southeast Asia.

About the role:
Experienced Full-Stack Engineer who enjoys building products end to end and turning early ideas into practical, high-quality user experiences. Frontend-led with technical breadth across mobile applications, backend services, integrations, databases, and supporting infrastructure.

What you'll do:
- Build polished product experiences across web and mobile using React, React Native, Next.js, TypeScript, and JavaScript.
- Develop supporting services and APIs using Node.js.
- Work with Supabase, databases, REST APIs, and third-party integrations.
- Take features from early concepts through implementation, testing, deployment, and production.
- Use modern AI-assisted development workflows to improve delivery speed and productivity.
- Build, integrate, and improve AI-enabled product capabilities.
- Support AI evaluation, experimentation, observability, tracing, and debugging (Langfuse, Braintrust).
- Proven experience building and releasing mobile applications on iOS & Android.`;

export const SAMPLE_JOBS: JobApplication[] = [
  {
    id: 'job-nomni',
    company: 'Nomni',
    position: 'Full-Stack Engineer (Hospitality & AI)',
    location: 'Australia / Southeast Asia (Remote)',
    jobType: 'Full-time',
    salary: '$130,000 - $160,000 AUD + Equity',
    status: 'applied',
    appliedDate: new Date().toISOString().split('T')[0],
    url: 'https://nomni.com',
    jobDescription: SAMPLE_JOB_DESCRIPTION,
    notes: 'Tailored resume submitted emphasizing React Native mobile releases, Supabase, payments/POS workflows, and Langfuse AI tracing.',
    matchScore: 94
  },
  {
    id: 'job-1',
    company: 'Stripe',
    position: 'Senior Full Stack Engineer',
    location: 'San Francisco, CA (Hybrid / Remote)',
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
  }
];
