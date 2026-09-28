'use strict';
import React from 'react';
import { Target, FileText, Briefcase, Sparkles, Download, Upload } from 'lucide-react';

interface HeaderProps {
  activeTab: 'ats' | 'builder' | 'tracker' | 'polisher';
  setActiveTab: (tab: 'ats' | 'builder' | 'tracker' | 'polisher') => void;
  onExportData: () => void;
  onImportData: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onExportData,
  onImportData,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('ats')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  JobCraft
                </span>
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  ATS Pro
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">AI Resume Optimizer & Job Tracker</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto py-1">
            <button
              onClick={() => setActiveTab('ats')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'ats'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Target className="w-4 h-4" />
              <span>ATS Matcher</span>
            </button>

            <button
              onClick={() => setActiveTab('builder')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'builder'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Resume Builder</span>
            </button>

            <button
              onClick={() => setActiveTab('tracker')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'tracker'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Job Tracker</span>
            </button>

            <button
              onClick={() => setActiveTab('polisher')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'polisher'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Bullet Polisher</span>
            </button>
          </nav>

          {/* Quick Actions (Backup / Restore) */}
          <div className="hidden lg:flex items-center space-x-2">
            <button
              onClick={onExportData}
              title="Backup your resumes & tracked jobs"
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-800 text-slate-300 text-xs font-medium transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>
            <button
              onClick={onImportData}
              title="Restore from JSON backup"
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-800 text-slate-300 text-xs font-medium transition"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Import</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
