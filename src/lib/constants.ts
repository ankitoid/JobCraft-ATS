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
  id: "new-resume",
  title: "My Resume",
  lastModified: new Date().toISOString(),
  personalInfo: { fullName: "", jobTitle: "", email: "", phone: "", location: "", linkedin: "", github: "", portfolio: "" },
  summary: "",
  experience: [],
  education: [],
  skills: { languages: [], frameworks: [], developerTools: [], librariesAndDatabases: [], softSkills: [] },
  projects: [],
  certifications: []
};

export const SAMPLE_JOB_DESCRIPTION = "";

export const SAMPLE_JOBS: JobApplication[] = [];
