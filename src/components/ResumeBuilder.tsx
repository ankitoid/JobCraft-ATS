'use client';

import React, { useState } from 'react';
import {
  ResumeData,
  WorkExperience,
  Education,
  Project
} from '@/types';
import {
  FileText,
  Plus,
  Trash2,
  Printer,
  Sparkles,
  CheckCircle,
  ExternalLink,
  RotateCcw,
  Save,
  Check
} from 'lucide-react';
import { SAMPLE_RESUME } from '@/lib/constants';

interface ResumeBuilderProps {
  resume: ResumeData;
  onSaveResume: (updated: ResumeData) => void;
  onNavigateToAts: () => void;
}

export const ResumeBuilder: React.FC<ResumeBuilderProps> = ({
  resume,
  onSaveResume,
  onNavigateToAts,
}) => {
  const [data, setData] = useState<ResumeData>(resume);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [template, setTemplate] = useState<'classic' | 'modern' | 'minimal'>('classic');
  const [newSkillCategory, setNewSkillCategory] = useState<keyof ResumeData['skills']>('languages');
  const [newSkillValue, setNewSkillValue] = useState('');
  const [saveStatus, setSaveStatus] = useState<boolean>(false);

  // Sync state if props change
  React.useEffect(() => {
    setData(resume);
  }, [resume]);

  const handleSave = () => {
    onSaveResume(data);
    setSaveStatus(true);
    setTimeout(() => setSaveStatus(false), 2000);
  };

  const handleResetToSample = () => {
    if (confirm('Reset resume to sample template? Your current edits will be overwritten.')) {
      setData(SAMPLE_RESUME);
      onSaveResume(SAMPLE_RESUME);
    }
  };

  const handlePrint = () => {
    setActiveTab('preview');
    setTimeout(() => {
      window.print();
    }, 100);
  };

  // Work Experience Helpers
  const addExperience = () => {
    const newExp: WorkExperience = {
      id: `exp-${Date.now()}`,
      company: 'Company Name',
      role: 'Software Engineer',
      location: 'City, ST',
      startDate: '2023-01',
      endDate: 'Present',
      current: true,
      bulletPoints: [
        'Engineered high-performance feature resulting in 30% reduction in processing time.',
      ],
    };
    setData({ ...data, experience: [newExp, ...data.experience] });
  };

  const updateExperience = (index: number, updated: Partial<WorkExperience>) => {
    const list = [...data.experience];
    list[index] = { ...list[index], ...updated };
    setData({ ...data, experience: list });
  };

  const removeExperience = (index: number) => {
    const list = [...data.experience];
    list.splice(index, 1);
    setData({ ...data, experience: list });
  };

  const addExpBullet = (expIndex: number) => {
    const list = [...data.experience];
    list[expIndex].bulletPoints.push('Accomplished [X] as measured by [Y] by doing [Z].');
    setData({ ...data, experience: list });
  };

  const updateExpBullet = (expIndex: number, bulletIndex: number, text: string) => {
    const list = [...data.experience];
    list[expIndex].bulletPoints[bulletIndex] = text;
    setData({ ...data, experience: list });
  };

  const removeExpBullet = (expIndex: number, bulletIndex: number) => {
    const list = [...data.experience];
    list[expIndex].bulletPoints.splice(bulletIndex, 1);
    setData({ ...data, experience: list });
  };

  // Skill Helpers
  const addSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillValue.trim()) return;
    const skills = { ...data.skills };
    if (!skills[newSkillCategory].includes(newSkillValue.trim())) {
      skills[newSkillCategory].push(newSkillValue.trim());
      setData({ ...data, skills });
    }
    setNewSkillValue('');
  };

  const removeSkill = (category: keyof ResumeData['skills'], skillToRemove: string) => {
    const skills = { ...data.skills };
    skills[category] = skills[category].filter(s => s !== skillToRemove);
    setData({ ...data, skills });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Controls Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('edit')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition ${
                activeTab === 'edit'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Editor View
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition ${
                activeTab === 'preview'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ATS Document Preview
            </button>
          </div>

          {activeTab === 'preview' && (
            <div className="hidden md:flex items-center space-x-2 text-xs">
              <span className="text-slate-400">Template:</span>
              <select
                value={template}
                onChange={(e) => setTemplate(e.target.value as any)}
                className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200"
              >
                <option value="classic">Harvard Classic ATS (Highest Score)</option>
                <option value="modern">Modern Tech Minimalist</option>
                <option value="minimal">Clean Compact</option>
              </select>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleResetToSample}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Sample</span>
          </button>

          <button
            onClick={handleSave}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow transition"
          >
            {saveStatus ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
            <span>{saveStatus ? 'Saved!' : 'Save Resume'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow transition"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / PDF Export</span>
          </button>
        </div>
      </div>

      {/* Editor View */}
      {activeTab === 'edit' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 print:hidden">
          {/* Main Edit Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Info */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <FileText className="w-4 h-4 text-blue-400" />
                <span>1. Personal & Contact Information</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="text-slate-400 font-medium block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={data.personalInfo.fullName}
                    onChange={(e) =>
                      setData({
                        ...data,
                        personalInfo: { ...data.personalInfo, fullName: e.target.value },
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-medium block mb-1">Target Job Title</label>
                  <input
                    type="text"
                    value={data.personalInfo.jobTitle}
                    onChange={(e) =>
                      setData({
                        ...data,
                        personalInfo: { ...data.personalInfo, jobTitle: e.target.value },
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-medium block mb-1">Email</label>
                  <input
                    type="email"
                    value={data.personalInfo.email}
                    onChange={(e) =>
                      setData({
                        ...data,
                        personalInfo: { ...data.personalInfo, email: e.target.value },
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-medium block mb-1">Phone</label>
                  <input
                    type="text"
                    value={data.personalInfo.phone}
                    onChange={(e) =>
                      setData({
                        ...data,
                        personalInfo: { ...data.personalInfo, phone: e.target.value },
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-medium block mb-1">Location</label>
                  <input
                    type="text"
                    value={data.personalInfo.location}
                    onChange={(e) =>
                      setData({
                        ...data,
                        personalInfo: { ...data.personalInfo, location: e.target.value },
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-medium block mb-1">LinkedIn Profile</label>
                  <input
                    type="text"
                    value={data.personalInfo.linkedin}
                    onChange={(e) =>
                      setData({
                        ...data,
                        personalInfo: { ...data.personalInfo, linkedin: e.target.value },
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Professional Summary */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <span>2. Executive Summary</span>
                </h3>
                <span className="text-[11px] text-slate-400">
                  {data.summary.split(/\s+/).filter(Boolean).length} words
                </span>
              </div>
              <textarea
                value={data.summary}
                onChange={(e) => setData({ ...data, summary: e.target.value })}
                rows={4}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 leading-relaxed"
                placeholder="2-3 impactful sentences highlighting your total years of experience, core tech stack, and key career achievements..."
              />
            </div>

            {/* Experience Section */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">3. Professional Experience</h3>
                  <p className="text-xs text-slate-400">Focus on quantifiable results and high-impact action verbs.</p>
                </div>
                <button
                  type="button"
                  onClick={addExperience}
                  className="flex items-center space-x-1.5 px-3 py-1.5 bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 rounded-lg text-xs font-semibold transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Role</span>
                </button>
              </div>

              <div className="space-y-6">
                {data.experience.map((exp, expIdx) => (
                  <div
                    key={exp.id || expIdx}
                    className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                        Role #{expIdx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeExperience(expIdx)}
                        className="text-slate-500 hover:text-rose-400 p-1 transition"
                        title="Delete role"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="text-slate-400 font-medium block mb-1">Company</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => updateExperience(expIdx, { company: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-slate-200"
                        />
                      </div>
                      <div>
                        <label className="text-slate-400 font-medium block mb-1">Job Title</label>
                        <input
                          type="text"
                          value={exp.role}
                          onChange={(e) => updateExperience(expIdx, { role: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-slate-200"
                        />
                      </div>
                      <div>
                        <label className="text-slate-400 font-medium block mb-1">Start Date</label>
                        <input
                          type="text"
                          value={exp.startDate}
                          onChange={(e) => updateExperience(expIdx, { startDate: e.target.value })}
                          placeholder="e.g. 2022-01"
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-slate-200"
                        />
                      </div>
                      <div>
                        <label className="text-slate-400 font-medium block mb-1">End Date</label>
                        <input
                          type="text"
                          value={exp.endDate}
                          onChange={(e) => updateExperience(expIdx, { endDate: e.target.value })}
                          placeholder="e.g. Present"
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-slate-200"
                        />
                      </div>
                    </div>

                    {/* Bullet Points */}
                    <div className="space-y-2 pt-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold text-slate-300">
                          Bullet Points (Impact & Accomplishments)
                        </label>
                        <button
                          type="button"
                          onClick={() => addExpBullet(expIdx)}
                          className="text-[11px] text-blue-400 hover:text-blue-300 flex items-center space-x-1"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add Bullet</span>
                        </button>
                      </div>

                      {exp.bulletPoints.map((bullet, bIdx) => {
                        const hasMetric = /(\b\d+(\.\d+)?%|\$\d+|\b\d+\s*(k|m|ms|users|transactions)\b)/i.test(bullet);
                        return (
                          <div key={bIdx} className="flex items-start space-x-2">
                            <span className="text-xs text-slate-500 mt-2.5">•</span>
                            <div className="flex-1">
                              <textarea
                                value={bullet}
                                onChange={(e) => updateExpBullet(expIdx, bIdx, e.target.value)}
                                rows={2}
                                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                              />
                              <div className="flex items-center justify-between text-[10px] text-slate-500 px-1">
                                {hasMetric ? (
                                  <span className="text-emerald-400 flex items-center space-x-1">
                                    <CheckCircle className="w-3 h-3" />
                                    <span>Quantified metric detected!</span>
                                  </span>
                                ) : (
                                  <span className="text-amber-400/80">
                                    Tip: Add numbers, % or latency metrics for higher ATS score
                                  </span>
                                )}
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeExpBullet(expIdx, bIdx)}
                              className="text-slate-600 hover:text-rose-400 p-1.5 transition"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar: Skills, Education, Projects */}
          <div className="space-y-6">
            {/* Skills Manager */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white">4. Technical Skills</h3>

              {/* Add Skill Form */}
              <form onSubmit={addSkill} className="space-y-2 text-xs">
                <select
                  value={newSkillCategory}
                  onChange={(e) => setNewSkillCategory(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-300"
                >
                  <option value="languages">Languages</option>
                  <option value="frameworks">Frameworks & Libraries</option>
                  <option value="developerTools">Developer Tools & Cloud</option>
                  <option value="librariesAndDatabases">Databases & Architecture</option>
                  <option value="softSkills">Soft Skills / Methodologies</option>
                </select>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newSkillValue}
                    onChange={(e) => setNewSkillValue(e.target.value)}
                    placeholder="e.g. Next.js, Docker, Redis..."
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold"
                  >
                    Add
                  </button>
                </div>
              </form>

              {/* Categorized Skills Chips */}
              <div className="space-y-3 pt-2">
                {Object.entries(data.skills).map(([catKey, skillsList]) => (
                  <div key={catKey} className="space-y-1">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      {catKey.replace(/([A-Z])/g, ' $1')}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {skillsList.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center space-x-1 px-2.5 py-1 rounded bg-slate-800 text-slate-300 text-xs font-mono"
                        >
                          <span>{skill}</span>
                          <button
                            type="button"
                            onClick={() => removeSkill(catKey as any, skill)}
                            className="text-slate-500 hover:text-rose-400 ml-1"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Summary */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white">5. Education</h3>
              {data.education.map((edu, idx) => (
                <div key={edu.id || idx} className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl text-xs space-y-1">
                  <div className="font-semibold text-slate-200">{edu.institution}</div>
                  <div className="text-blue-400">{edu.degree} in {edu.fieldOfStudy}</div>
                  <div className="text-slate-400">{edu.startDate} – {edu.endDate} {edu.gpa ? `• GPA: ${edu.gpa}` : ''}</div>
                </div>
              ))}
            </div>

            {/* Callout to ATS Check */}
            <div className="bg-gradient-to-br from-blue-900/40 to-indigo-900/40 border border-blue-500/20 rounded-2xl p-5 space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span>Ready to test ATS Match?</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Scan your updated resume against real job descriptions to check your score before submitting applications.
              </p>
              <button
                onClick={onNavigateToAts}
                className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold transition"
              >
                Scan with ATS Engine
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview View: Clean ATS-Compliant Document */}
      {activeTab === 'preview' && (
        <div className="max-w-4xl mx-auto bg-white text-slate-900 p-8 sm:p-12 rounded-xl shadow-2xl print:p-0 print:shadow-none print:m-0 print:max-w-none">
          {/* Header */}
          <div className="text-center pb-4 border-b border-slate-300">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight uppercase text-slate-900">
              {data.personalInfo.fullName}
            </h1>
            <p className="text-sm font-semibold text-slate-700 mt-1">
              {data.personalInfo.jobTitle}
            </p>
            <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 text-xs text-slate-600 mt-2">
              {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
              {data.personalInfo.email && <span>• {data.personalInfo.email}</span>}
              {data.personalInfo.phone && <span>• {data.personalInfo.phone}</span>}
              {data.personalInfo.linkedin && <span>• {data.personalInfo.linkedin}</span>}
              {data.personalInfo.github && <span>• {data.personalInfo.github}</span>}
            </div>
          </div>

          {/* Professional Summary */}
          {data.summary && (
            <div className="mt-5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-400 pb-1 mb-2">
                Professional Summary
              </h2>
              <p className="text-xs text-slate-700 leading-relaxed text-justify">
                {data.summary}
              </p>
            </div>
          )}

          {/* Technical Skills */}
          <div className="mt-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-400 pb-1 mb-2">
              Technical Skills
            </h2>
            <div className="space-y-1 text-xs text-slate-800">
              {data.skills.languages.length > 0 && (
                <div>
                  <span className="font-semibold text-slate-900">Languages: </span>
                  <span>{data.skills.languages.join(', ')}</span>
                </div>
              )}
              {data.skills.frameworks.length > 0 && (
                <div>
                  <span className="font-semibold text-slate-900">Frameworks: </span>
                  <span>{data.skills.frameworks.join(', ')}</span>
                </div>
              )}
              {data.skills.developerTools.length > 0 && (
                <div>
                  <span className="font-semibold text-slate-900">Developer Tools & Cloud: </span>
                  <span>{data.skills.developerTools.join(', ')}</span>
                </div>
              )}
              {data.skills.librariesAndDatabases.length > 0 && (
                <div>
                  <span className="font-semibold text-slate-900">Databases & Architecture: </span>
                  <span>{data.skills.librariesAndDatabases.join(', ')}</span>
                </div>
              )}
            </div>
          </div>

          {/* Professional Experience */}
          <div className="mt-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-400 pb-1 mb-3">
              Work Experience
            </h2>
            <div className="space-y-4">
              {data.experience.map((exp) => (
                <div key={exp.id} className="space-y-1">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-bold text-slate-900">
                      {exp.role} <span className="font-normal text-slate-700">| {exp.company}</span>
                    </span>
                    <span className="text-xs text-slate-600 font-medium">
                      {exp.startDate} – {exp.endDate}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 italic">{exp.location}</div>
                  <ul className="list-disc ml-4 space-y-1 text-xs text-slate-800 mt-1">
                    {exp.bulletPoints.map((b, i) => (
                      <li key={i} className="leading-snug">
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          {data.projects.length > 0 && (
            <div className="mt-5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-400 pb-1 mb-3">
                Key Projects
              </h2>
              <div className="space-y-3">
                {data.projects.map((proj) => (
                  <div key={proj.id} className="space-y-1">
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs font-bold text-slate-900">{proj.name}</span>
                      {proj.link && <span className="text-[11px] text-slate-500">{proj.link}</span>}
                    </div>
                    <div className="text-[11px] text-slate-700">
                      <span className="font-semibold">Technologies: </span>
                      {proj.technologies.join(', ')}
                    </div>
                    <ul className="list-disc ml-4 space-y-1 text-xs text-slate-800 mt-1">
                      {proj.bulletPoints.map((b, i) => (
                        <li key={i} className="leading-snug">{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          <div className="mt-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-400 pb-1 mb-2">
              Education
            </h2>
            <div className="space-y-2">
              {data.education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-baseline text-xs">
                  <div>
                    <span className="font-bold text-slate-900">{edu.institution}</span>
                    <span className="text-slate-700"> — {edu.degree} in {edu.fieldOfStudy}</span>
                    {edu.gpa && <span className="text-slate-600"> (GPA: {edu.gpa})</span>}
                  </div>
                  <span className="text-slate-600 font-medium">
                    {edu.startDate} – {edu.endDate}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
