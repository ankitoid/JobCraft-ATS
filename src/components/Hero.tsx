'use client';

import React from 'react';
import { Target, Briefcase, Sparkles, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onCheckResume: () => void;
  onAnalyzeJob: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCheckResume, onAnalyzeJob }) => {
  return (
    <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-8 sm:p-12 lg:p-16 shadow-xl text-center max-w-4xl mx-auto my-8">
      <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold mb-4">
        <Target className="w-4 h-4" />
        <span>AI ATS Resume Optimizer</span>
      </div>
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
        Know exactly how your resume performs before you apply
      </h1>
      <p className="text-slate-400 text-base max-w-2xl mx-auto mb-6">
        Check ATS readability, match your resume against a job description, find missing keywords, and get practical fixes — without guessing.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
        <button
          onClick={onCheckResume}
          className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-lg shadow-md transition"
        >
          Check My Resume
        </button>
        <button
          onClick={onAnalyzeJob}
          className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-lg border border-slate-600 transition"
        >
          Analyze a Job Description
        </button>
      </div>
      <div className="flex flex-wrap justify-center gap-4 text-xs text-slate-400">
        <div className="flex items-center space-x-1">
          <Target className="w-3 h-3" />
          <span>ATS readability</span>
        </div>
        <div className="flex items-center space-x-1">
          <Briefcase className="w-3 h-3" />
          <span>Job matching</span>
        </div>
        <div className="flex items-center space-x-1">
          <Sparkles className="w-3 h-3" />
          <span>Keyword gaps</span>
        </div>
        <div className="flex items-center space-x-1">
          <CheckCircle2 className="w-3 h-3" />
          <span>Actionable feedback</span>
        </div>
      </div>
    </section>
  );
};
