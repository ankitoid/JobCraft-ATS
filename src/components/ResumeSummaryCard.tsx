import React from 'react';
import { ResumeData } from '@/types';

interface ResumeSummaryCardProps {
  resume: ResumeData;
}

export const ResumeSummaryCard: React.FC<ResumeSummaryCardProps> = ({ resume }) => {
  const { personalInfo, summary, experience, skills } = resume;
  const years = 'N/A';
  const sections = experience?.length ?? 0;
  const skillCount = (skills?.languages?.length ?? 0) + (skills?.frameworks?.length ?? 0) + (skills?.developerTools?.length ?? 0);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-6">
      <h3 className="text-lg font-semibold text-white mb-3">Resume Summary</h3>
      <div className="grid grid-cols-2 gap-4 text-sm text-slate-300">
        <div>
          <span className="font-medium text-slate-200">Name:</span> {personalInfo.fullName || '—'}
        </div>
        <div>
          <span className="font-medium text-slate-200">Target Role:</span> {personalInfo.jobTitle || '—'}
        </div>
        <div>
          <span className="font-medium text-slate-200">Experience:</span> {years} years
        </div>
        <div>
          <span className="font-medium text-slate-200">Sections:</span> {sections}
        </div>
        <div>
          <span className="font-medium text-slate-200">Skills:</span> {skillCount}
        </div>
      </div>
    </div>
  );
};
