import React from 'react';
import { ATSAnalysisResult, ResumeData } from '@/types';

interface ParsedResumePreviewProps {
  resume: ResumeData;
  analysis: ATSAnalysisResult;
}

export const ParsedResumePreview: React.FC<ParsedResumePreviewProps> = ({ resume, analysis }) => {
  const { personalInfo, experience, education, skills } = resume;
  const contactFields = [
    { label: 'Name', present: !!personalInfo.fullName },
    { label: 'Email', present: !!personalInfo.email },
    { label: 'Phone', present: !!personalInfo.phone },
  ];

  // Simple detection of sections based on presence of data
  const sections = [
    { label: 'Experience', count: experience?.length ?? 0 },
    { label: 'Education', count: education?.length ?? 0 },
    { label: 'Skills', count: (skills?.languages?.length ?? 0) + (skills?.frameworks?.length ?? 0) },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
      <h3 className="text-lg font-semibold text-white">How JobCraft parses your resume</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-300">
        {/* Contact */}
        <div>
          <h4 className="font-medium text-slate-200 mb-2">Contact</h4>
          {contactFields.map((field) => (
            <div key={field.label} className="flex items-center space-x-2">
              <span className={field.present ? 'text-emerald-400' : 'text-rose-400'}>
                {field.present ? '✓' : '⚠'}
              </span>
              <span>{field.label}</span>
            </div>
          ))}
        </div>
        {/* Sections */}
        <div>
          <h4 className="font-medium text-slate-200 mb-2">Sections</h4>
          {sections.map((sec) => (
            <div key={sec.label} className="flex items-center space-x-2">
              <span className={sec.count > 0 ? 'text-emerald-400' : 'text-rose-400'}>
                {sec.count > 0 ? '✓' : '⚠'}
              </span>
              <span>{sec.label} ({sec.count})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
