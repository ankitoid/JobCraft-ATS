'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { AtsMatcher } from '@/components/AtsMatcher';
import { ResumeBuilder } from '@/components/ResumeBuilder';
import { JobTracker } from '@/components/JobTracker';
import { BulletPolisher } from '@/components/BulletPolisher';
import { ResumeData, JobApplication } from '@/types';
import {
  loadSavedResume,
  saveResume,
  loadJobs,
  saveJobs,
  exportAllData,
  importAllData
} from '@/lib/storage';
import { SAMPLE_RESUME, SAMPLE_JOBS } from '@/lib/constants';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'ats' | 'builder' | 'tracker' | 'polisher'>('ats');
  const [resume, setResume] = useState<ResumeData>(SAMPLE_RESUME);
  const [jobs, setJobs] = useState<JobApplication[]>(SAMPLE_JOBS);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load persisted data on client mount
  useEffect(() => {
    const loadedResume = loadSavedResume();
    const loadedJobs = loadJobs();
    setResume(loadedResume);
    setJobs(loadedJobs);
    setIsLoaded(true);
  }, []);

  // Update resume and persist
  const handleUpdateResume = (updated: ResumeData) => {
    setResume(updated);
    saveResume(updated);
  };

  // Add missing keyword from ATS directly to Resume
  const handleAddKeywordToResume = (keyword: string) => {
    const updatedSkills = { ...resume.skills };
    if (!updatedSkills.frameworks.includes(keyword) && !updatedSkills.languages.includes(keyword)) {
      updatedSkills.developerTools = [...updatedSkills.developerTools, keyword];
      const updatedResume = { ...resume, skills: updatedSkills };
      handleUpdateResume(updatedResume);
    }
  };

  // Update jobs and persist
  const handleUpdateJobs = (updatedJobs: JobApplication[]) => {
    setJobs(updatedJobs);
    saveJobs(updatedJobs);
  };

  // Link ATS score back to a job
  const handleLinkJobScore = (jobId: string, score: number) => {
    const updatedJobs = jobs.map((j) => (j.id === jobId ? { ...j, matchScore: score } : j));
    handleUpdateJobs(updatedJobs);
  };

  // Select job from Tracker to test in ATS Matcher
  const handleSelectJobForATS = (job: JobApplication) => {
    setActiveTab('ats');
  };

  // Data Export / Import
  const handleExportData = () => {
    const jsonStr = exportAllData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `JobCraft_Backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e: any) => {
      const file = e.target?.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const content = event.target?.result as string;
          if (content && importAllData(content)) {
            setResume(loadSavedResume());
            setJobs(loadJobs());
            alert('Data restored successfully!');
          } else {
            alert('Failed to import data. Please ensure it is a valid JobCraft JSON file.');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-400">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <span>Loading JobCraft workspace...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onExportData={handleExportData}
        onImportData={handleImportData}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'ats' && (
          <AtsMatcher
            currentResume={resume}
            jobs={jobs}
            onUpdateResumeWithKeyword={handleAddKeywordToResume}
            onLinkJobScore={handleLinkJobScore}
            onNavigateToBuilder={() => setActiveTab('builder')}
            onNavigateToTracker={() => setActiveTab('tracker')}
          />
        )}

        {activeTab === 'builder' && (
          <ResumeBuilder
            resume={resume}
            onSaveResume={handleUpdateResume}
            onNavigateToAts={() => setActiveTab('ats')}
          />
        )}

        {activeTab === 'tracker' && (
          <JobTracker
            jobs={jobs}
            onUpdateJobs={handleUpdateJobs}
            onSelectJobForATS={handleSelectJobForATS}
          />
        )}

        {activeTab === 'polisher' && (
          <BulletPolisher
            onNavigateToBuilder={() => setActiveTab('builder')}
          />
        )}
      </main>

      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500 print:hidden">
        <div className="max-w-7xl mx-auto px-4">
          JobCraft • Next-Gen ATS Resume Optimizer & Job Tracker • High-Pass Recruiter Screening
        </div>
      </footer>
    </div>
  );
}
