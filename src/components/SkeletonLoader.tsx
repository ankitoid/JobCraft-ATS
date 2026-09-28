'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Loader2, Sparkles, Target } from 'lucide-react';

interface ScannerProgressModalProps {
  currentStep: number;
}

const SCAN_STEPS = [
  'Tokenizing resume and parsing section headers...',
  'Extracting technical skills, mobile frameworks & AI stack...',
  'Evaluating quantifiable metrics & Google XYZ formula compliance...',
  'Synthesizing gap analysis and generating tailored recommendations...',
];

export const ScannerProgressModal: React.FC<ScannerProgressModalProps> = ({ currentStep }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="w-full max-w-md bg-slate-900 border border-blue-500/30 rounded-2xl p-6 shadow-2xl space-y-6"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Target className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">AI ATS Deep Scanner</h3>
            <p className="text-xs text-slate-400">Simulating enterprise recruiter filters...</p>
          </div>
        </div>

        {/* Steps List */}
        <div className="space-y-3">
          {SCAN_STEPS.map((step, idx) => {
            const isCompleted = idx < currentStep;
            const isCurrent = idx === currentStep;

            return (
              <div
                key={idx}
                className={`flex items-center space-x-3 p-2.5 rounded-xl border text-xs transition-all ${
                  isCurrent
                    ? 'bg-blue-600/10 border-blue-500/40 text-blue-300 font-semibold'
                    : isCompleted
                    ? 'bg-slate-950/60 border-slate-800 text-emerald-400'
                    : 'bg-slate-950/30 border-slate-900 text-slate-500'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 text-blue-400 animate-spin shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-700 shrink-0" />
                )}
                <span>{step}</span>
              </div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full"
            initial={{ width: '10%' }}
            animate={{ width: `${Math.min(100, (currentStep + 1) * 25)}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export const CardSkeleton: React.FC = () => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-5 w-32 bg-slate-800 rounded" />
        <div className="h-5 w-12 bg-slate-800 rounded" />
      </div>
      <div className="space-y-2">
        <div className="h-4 w-full bg-slate-800/60 rounded" />
        <div className="h-4 w-5/6 bg-slate-800/60 rounded" />
        <div className="h-4 w-3/4 bg-slate-800/60 rounded" />
      </div>
      <div className="flex gap-2 pt-2">
        <div className="h-6 w-16 bg-slate-800 rounded-lg" />
        <div className="h-6 w-20 bg-slate-800 rounded-lg" />
        <div className="h-6 w-14 bg-slate-800 rounded-lg" />
      </div>
    </div>
  );
};
