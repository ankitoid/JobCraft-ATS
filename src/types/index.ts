export type JobStatus = 'saved' | 'applied' | 'interviewing' | 'offer' | 'rejected';

export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bulletPoints: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  location?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  bulletPoints: string[];
}

export interface ResumeData {
  id: string;
  title: string;
  lastModified: string;
  personalInfo: {
    fullName: string;
    jobTitle: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    portfolio: string;
  };
  summary: string;
  experience: WorkExperience[];
  education: Education[];
  skills: {
    languages: string[];
    frameworks: string[];
    developerTools: string[];
    librariesAndDatabases: string[];
    softSkills: string[];
  };
  projects: Project[];
  certifications: string[];
}

export interface KeywordMatch {
  keyword: string;
  category: 'hardSkill' | 'softSkill' | 'tool' | 'general';
  foundInResume: boolean;
  frequencyInJob: number;
  importance: 'high' | 'medium' | 'low';
}

export interface SectionScore {
  section: string;
  score: number; // 0 - 100
  status: 'excellent' | 'good' | 'needs_work' | 'missing';
  feedback: string[];
}

export interface ATSAnalysisResult {
  overallScore: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'D';
  breakdown: {
    keywordMatchScore: number;
    impactMetricScore: number;
    actionVerbScore: number;
    formattingScore: number;
    completenessScore: number;
  };
  keywords: {
    matched: KeywordMatch[];
    missing: KeywordMatch[];
  };
  metrics: {
    quantifiedBulletsCount: number;
    totalBulletsCount: number;
    quantifiedPercentage: number;
    strongActionVerbsCount: number;
    weakActionVerbsFound: string[];
    wordCount: number;
    readingTimeMinutes: number;
  };
  sectionScores: SectionScore[];
  tailoringSuggestions: {
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
    actionText?: string;
    suggestedBullets?: string[];
  }[];
}

export interface JobApplication {
  id: string;
  company: string;
  position: string;
  location: string;
  jobType: 'Full-time' | 'Part-time' | 'Contract' | 'Remote' | 'Hybrid';
  salary: string;
  status: JobStatus;
  appliedDate: string;
  deadline?: string;
  url: string;
  jobDescription: string;
  notes: string;
  matchScore?: number;
  linkedResumeId?: string;
  contactPerson?: string;
  contactEmail?: string;
}
