import { ResumeData, JobApplication } from '@/types';
import { SAMPLE_RESUME, SAMPLE_JOBS } from './constants';

const STORAGE_KEYS = {
  RESUME: 'jobcraft_active_resume_v1',
  RESUMES_LIST: 'jobcraft_all_resumes_v1',
  JOBS: 'jobcraft_job_applications_v1',
  SETTINGS: 'jobcraft_user_settings_v1',
};

// Safe access for SSR
function isClient(): boolean {
  return typeof window !== 'undefined';
}

export function loadSavedResume(): ResumeData {
  if (!isClient()) return SAMPLE_RESUME;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.RESUME);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Failed to load resume from localStorage:', e);
  }
  return SAMPLE_RESUME;
}

export function saveResume(resume: ResumeData): void {
  if (!isClient()) return;
  try {
    resume.lastModified = new Date().toISOString();
    localStorage.setItem(STORAGE_KEYS.RESUME, JSON.stringify(resume));
  } catch (e) {
    console.error('Failed to save resume to localStorage:', e);
  }
}

export function loadJobs(): JobApplication[] {
  if (!isClient()) return SAMPLE_JOBS;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.JOBS);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Failed to load jobs from localStorage:', e);
  }
  return SAMPLE_JOBS;
}

export function saveJobs(jobs: JobApplication[]): void {
  if (!isClient()) return;
  try {
    localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(jobs));
  } catch (e) {
    console.error('Failed to save jobs to localStorage:', e);
  }
}

export function exportAllData(): string {
  const exportPayload = {
    exportDate: new Date().toISOString(),
    resume: loadSavedResume(),
    jobs: loadJobs(),
  };
  return JSON.stringify(exportPayload, null, 2);
}

export function importAllData(jsonString: string): boolean {
  try {
    const parsed = JSON.parse(jsonString);
    if (parsed.resume) {
      saveResume(parsed.resume);
    }
    if (Array.isArray(parsed.jobs)) {
      saveJobs(parsed.jobs);
    }
    return true;
  } catch (e) {
    console.error('Failed to import backup data:', e);
    return false;
  }
}
