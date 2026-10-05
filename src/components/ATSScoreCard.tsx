import React from 'react';
import { ATSAnalysisResult } from '@/types';

interface ATSScoreCardProps {
  analysis: ATSAnalysisResult;
}

export const ATSScoreCard: React.FC<ATSScoreCardProps> = ({ analysis }) => {
  const { overallScore, grade, breakdown } = analysis;

  const getStatusLabel = (score: number) => {
    if (score >= 80) return { label: 'Strong', color: 'text-emerald-400' };
    if (score >= 65) return { label: 'Needs improvement', color: 'text-amber-400' };
    return { label: 'At risk', color: 'text-rose-400' };
  };

  const status = getStatusLabel(overallScore);

  // Simple explanation based on score ranges
  const explanation =
    overallScore >= 80
      ? 'Your resume aligns well with ATS expectations. Minor tweaks could further optimize results.'
      : overallScore >= 65
      ? 'There are notable gaps that may affect ATS parsing. Focus on the highlighted sections.'
      : 'Significant issues detected. Consider revising structure, keywords, and formatting.';

  return (
    <div className="space-y-6">
      {/* Top circular score */}
      <div className="flex flex-col items-center">
        <div className="relative w-32 h-32">
          <svg viewBox="0 0 36 36" className="w-full h-full">
            <path
              className="text-slate-800"
              fill="currentColor"
              d="M18 2.0845
                 a 15.9155 15.9155 0 0 1 0 31.831
                 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className={status.color}
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeDasharray={`${overallScore}, 100`}
              d="M18 2.0845
                 a 15.9155 15.9155 0 0 1 0 31.831
                 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-white">{overallScore}%</span>
            <span className={`text-sm ${status.color}`}>{status.label}</span>
          </div>
        </div>
      </div>

      {/* Explanation */}
      <p className="text-center text-slate-300 text-sm max-w-md mx-auto">{explanation}</p>

      {/* Breakdown cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(breakdown).map(([key, value]) => {
          const score = typeof value === 'number' ? value : (value as any).score;
          const label = key.replace(/([A-Z])/g, ' $1').trim();
          const cardStatus = getStatusLabel(score as number);
          return (
            <div
              key={key}
              className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between"
            >
              <div className="text-xs text-slate-400 uppercase font-semibold">{label}</div>
              <div className="flex items-baseline space-x-2 mt-2">
                <span className="text-2xl font-bold text-white">{score}%</span>
                <span className="text-xs text-slate-400">weight {(value as any).weight || ''}</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
                <div
                  className={`h-full rounded-full ${cardStatus.color}`}
                  style={{ width: `${score}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
