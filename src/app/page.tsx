'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/Header';
import { AtsMatcher } from '@/components/AtsMatcher';
import { ResumeBuilder } from '@/components/ResumeBuilder';
import { JobTracker } from '@/components/JobTracker';
import { BulletPolisher } from '@/components/BulletPolisher';
import { JdIntelligence } from '@/components/JdIntelligence';
import { CommandPalette } from '@/components/CommandPalette';
import { SmoothScroll } from '@/components/SmoothScroll';
import { ResumeData, JobApplication } from '@/types';
import {
  loadSavedResume,
  saveResume,
  loadJobs,
  saveJobs,
  exportAllData,
  importAllData
} from '@/lib/storage';
import { SAMPLE_RESUME, SAMPLE_JOBS, SAMPLE_JOB_DESCRIPTION } from '@/lib/constants';
import { Hero } from '@/components/Hero';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'ats' | 'builder' | 'tracker' | 'polisher' | 'intelligence'>('ats');
  const [showLanding, setShowLanding] = useState(true);
  const [resume, setResume] = useState<ResumeData>(SAMPLE_RESUME);
  const [jobs, setJobs] = useState<JobApplication[]>(SAMPLE_JOBS);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Load persisted data on client mount
  useEffect(() => {
    const loadedResume = loadSavedResume();
    const loadedJobs = loadJobs();
    setResume(loadedResume);
    setJobs(loadedJobs);
    setIsLoaded(true);
  }, []);

  // Global Keyboard shortcut listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
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

  const handlePrintResume = () => {
    setActiveTab('builder');
    setTimeout(() => {
      window.print();
    }, 300);
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-400">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <span>Initializing JobCraft workspace...</span>
        </div>
      </div>
    );
  }

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenSearch={() => setIsSearchOpen(true)}
          onExportData={handleExportData}
          onImportData={handleImportData}
        />

        <CommandPalette
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onNavigate={(tab) => setActiveTab(tab)}
          onTriggerScan={() => setActiveTab('ats')}
          onPrintResume={handlePrintResume}
        />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
              {activeTab === 'ats' && (
                <AtsMatcher
                  currentResume={resume}
                  jobs={jobs}
                  onUpdateResumeWithKeyword={handleAddKeywordToResume}
                  onLinkJobScore={handleLinkJobScore}
                  onNavigateToBuilder={() => setActiveTab('builder')}
                  onNavigateToTracker={() => setActiveTab('tracker')}
                  onNavigateToIntelligence={() => setActiveTab('intelligence')}
                />
              )}

              {activeTab === 'intelligence' && (
                <JdIntelligence
                  jobDescription={SAMPLE_JOB_DESCRIPTION}
                  resume={resume}
                  onNavigateToBuilder={() => setActiveTab('builder')}
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
            </motion.div>
          </AnimatePresence>
        </main>

        <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500 print:hidden">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>JobCraft • AI ATS Resume Optimizer & Career Command Center</span>
            <span className="text-[11px] text-slate-600">
              Press <kbd className="px-1 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">⌘K</kbd> to search anywhere
            </span>
          </div>
        </footer>
      </div>
    </SmoothScroll>
  );
}
