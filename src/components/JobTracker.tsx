'use client';

import React, { useState } from 'react';
import {
  Briefcase,
  Plus,
  Search,
  ExternalLink,
  Target,
  Trash2,
  Calendar,
  Building2,
  MapPin,
  DollarSign,
  ChevronRight,
  ChevronLeft,
  X,
  FileText
} from 'lucide-react';
import { JobApplication, JobStatus } from '@/types';

interface JobTrackerProps {
  jobs: JobApplication[];
  onUpdateJobs: (updatedJobs: JobApplication[]) => void;
  onSelectJobForATS: (job: JobApplication) => void;
}

const STAGES: { key: JobStatus; label: string; color: string; badge: string }[] = [
  { key: 'saved', label: 'Wishlist / Saved', color: 'border-slate-700 bg-slate-800/40', badge: 'bg-slate-700 text-slate-300' },
  { key: 'applied', label: 'Applied', color: 'border-blue-900/60 bg-blue-950/20', badge: 'bg-blue-600/30 text-blue-400' },
  { key: 'interviewing', label: 'Interviewing', color: 'border-amber-900/60 bg-amber-950/20', badge: 'bg-amber-600/30 text-amber-400' },
  { key: 'offer', label: 'Offer Received', color: 'border-emerald-900/60 bg-emerald-950/20', badge: 'bg-emerald-600/30 text-emerald-400' },
  { key: 'rejected', label: 'Rejected / Archived', color: 'border-rose-900/60 bg-rose-950/20', badge: 'bg-rose-600/30 text-rose-400' },
];

export const JobTracker: React.FC<JobTrackerProps> = ({
  jobs,
  onUpdateJobs,
  onSelectJobForATS,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobApplication | null>(null);

  // New Job Form State
  const [formCompany, setFormCompany] = useState('');
  const [formPosition, setFormPosition] = useState('');
  const [formLocation, setFormLocation] = useState('Remote');
  const [formJobType, setFormJobType] = useState<JobApplication['jobType']>('Full-time');
  const [formSalary, setFormSalary] = useState('');
  const [formStatus, setFormStatus] = useState<JobStatus>('applied');
  const [formAppliedDate, setFormAppliedDate] = useState(new Date().toISOString().split('T')[0]);
  const [formUrl, setFormUrl] = useState('');
  const [formJobDescription, setFormJobDescription] = useState('');
  const [formNotes, setFormNotes] = useState('');
  const [formContactPerson, setFormContactPerson] = useState('');
  const [formContactEmail, setFormContactEmail] = useState('');

  const openAddModal = () => {
    setEditingJob(null);
    setFormCompany('');
    setFormPosition('');
    setFormLocation('Remote');
    setFormJobType('Full-time');
    setFormSalary('');
    setFormStatus('applied');
    setFormAppliedDate(new Date().toISOString().split('T')[0]);
    setFormUrl('');
    setFormJobDescription('');
    setFormNotes('');
    setFormContactPerson('');
    setFormContactEmail('');
    setIsModalOpen(true);
  };

  const openEditModal = (job: JobApplication) => {
    setEditingJob(job);
    setFormCompany(job.company);
    setFormPosition(job.position);
    setFormLocation(job.location);
    setFormJobType(job.jobType);
    setFormSalary(job.salary);
    setFormStatus(job.status);
    setFormAppliedDate(job.appliedDate);
    setFormUrl(job.url);
    setFormJobDescription(job.jobDescription);
    setFormNotes(job.notes);
    setFormContactPerson(job.contactPerson || '');
    setFormContactEmail(job.contactEmail || '');
    setIsModalOpen(true);
  };

  const handleSaveJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formCompany.trim() || !formPosition.trim()) {
      alert('Please fill in both Company and Position.');
      return;
    }

    if (editingJob) {
      const updatedList = jobs.map((j) =>
        j.id === editingJob.id
          ? {
              ...j,
              company: formCompany,
              position: formPosition,
              location: formLocation,
              jobType: formJobType,
              salary: formSalary,
              status: formStatus,
              appliedDate: formAppliedDate,
              url: formUrl,
              jobDescription: formJobDescription,
              notes: formNotes,
              contactPerson: formContactPerson,
              contactEmail: formContactEmail,
            }
          : j
      );
      onUpdateJobs(updatedList);
    } else {
      const newJob: JobApplication = {
        id: `job-${Date.now()}`,
        company: formCompany,
        position: formPosition,
        location: formLocation,
        jobType: formJobType,
        salary: formSalary,
        status: formStatus,
        appliedDate: formAppliedDate,
        url: formUrl,
        jobDescription: formJobDescription,
        notes: formNotes,
        contactPerson: formContactPerson,
        contactEmail: formContactEmail,
      };
      onUpdateJobs([newJob, ...jobs]);
    }

    setIsModalOpen(false);
  };

  const handleDeleteJob = (id: string) => {
    if (confirm('Are you sure you want to remove this job application?')) {
      onUpdateJobs(jobs.filter((j) => j.id !== id));
    }
  };

  const handleStatusChange = (jobId: string, newStatus: JobStatus) => {
    onUpdateJobs(
      jobs.map((j) => (j.id === jobId ? { ...j, status: newStatus } : j))
    );
  };

  // Filtered jobs
  const filteredJobs = jobs.filter((j) => {
    const query = searchTerm.toLowerCase();
    return (
      j.company.toLowerCase().includes(query) ||
      j.position.toLowerCase().includes(query) ||
      j.location.toLowerCase().includes(query)
    );
  });

  // Calculate summary metrics
  const totalCount = jobs.length;
  const interviewingCount = jobs.filter((j) => j.status === 'interviewing').length;
  const offerCount = jobs.filter((j) => j.status === 'offer').length;
  const scores = jobs.map((j) => j.matchScore).filter((s): s is number => typeof s === 'number');
  const avgScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;

  return (
    <div className="space-y-6 pb-12">
      {/* Header and Summary Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center space-x-2">
              <Briefcase className="w-5 h-5 text-blue-400" />
              <span>Job Application Pipeline</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Track stages, salary offers, interview notes, and correlate your ATS match scores.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search company or role..."
                className="bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 w-48 sm:w-60"
              />
            </div>
            <button
              onClick={openAddModal}
              className="flex items-center space-x-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add Job</span>
            </button>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800/80">
          <div>
            <div className="text-[11px] text-slate-400 uppercase font-semibold">Total Tracked</div>
            <div className="text-xl font-bold text-white mt-1">{totalCount}</div>
          </div>
          <div>
            <div className="text-[11px] text-slate-400 uppercase font-semibold">In Interviews</div>
            <div className="text-xl font-bold text-amber-400 mt-1">{interviewingCount}</div>
          </div>
          <div>
            <div className="text-[11px] text-slate-400 uppercase font-semibold">Offers Received</div>
            <div className="text-xl font-bold text-emerald-400 mt-1">{offerCount}</div>
          </div>
          <div>
            <div className="text-[11px] text-slate-400 uppercase font-semibold">Avg ATS Match</div>
            <div className="text-xl font-bold text-blue-400 mt-1">{avgScore > 0 ? `${avgScore}%` : 'N/A'}</div>
          </div>
        </div>
      </div>

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {STAGES.map((stage) => {
          const stageJobs = filteredJobs.filter((j) => j.status === stage.key);
          return (
            <div
              key={stage.key}
              className={`rounded-2xl border p-4 flex flex-col ${stage.color} min-h-[500px]`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800/60 mb-3">
                <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                  {stage.label}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${stage.badge}`}>
                  {stageJobs.length}
                </span>
              </div>

              {/* Jobs List */}
              <div className="space-y-3 flex-1 overflow-y-auto">
                {stageJobs.map((job) => (
                  <div
                    key={job.id}
                    className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 space-y-3 shadow-md hover:border-slate-700 transition"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-white leading-tight">
                          {job.position}
                        </h4>
                        <div className="flex items-center space-x-1 text-[11px] text-blue-400 font-medium mt-0.5">
                          <Building2 className="w-3 h-3" />
                          <span>{job.company}</span>
                        </div>
                      </div>

                      {/* ATS Score badge if present */}
                      {typeof job.matchScore === 'number' && (
                        <div
                          title="ATS Match Score"
                          className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                            job.matchScore >= 80
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : 'bg-amber-500/20 text-amber-400'
                          }`}
                        >
                          {job.matchScore}%
                        </div>
                      )}
                    </div>

                    <div className="space-y-1 text-[11px] text-slate-400">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        <span>{job.location} ({job.jobType})</span>
                      </div>
                      {job.salary && (
                        <div className="flex items-center space-x-1 text-slate-300">
                          <DollarSign className="w-3 h-3 text-slate-500" />
                          <span>{job.salary}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-1 text-slate-500">
                        <Calendar className="w-3 h-3" />
                        <span>Applied: {job.appliedDate}</span>
                      </div>
                    </div>

                    {job.notes && (
                      <p className="text-[11px] text-slate-400 italic bg-slate-950/60 p-2 rounded-lg line-clamp-2">
                        {job.notes}
                      </p>
                    )}

                    {/* Actions on Card */}
                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-1">
                      {/* Scan with ATS */}
                      <button
                        onClick={() => onSelectJobForATS(job)}
                        title="Scan this job description against your resume"
                        className="flex items-center space-x-1 px-2 py-1 rounded bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 text-[10px] font-semibold transition"
                      >
                        <Target className="w-3 h-3" />
                        <span>Scan ATS</span>
                      </button>

                      <div className="flex items-center space-x-1">
                        {job.url && (
                          <a
                            href={job.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 text-slate-500 hover:text-slate-300 transition"
                            title="Open job link"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        <button
                          onClick={() => openEditModal(job)}
                          className="p-1 text-slate-500 hover:text-slate-300 text-[11px] transition"
                          title="Edit details"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteJob(job.id)}
                          className="p-1 text-slate-500 hover:text-rose-400 transition"
                          title="Delete application"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Move Status Selector */}
                    <div className="pt-1 flex items-center justify-between">
                      <select
                        value={job.status}
                        onChange={(e) => handleStatusChange(job.id, e.target.value as JobStatus)}
                        className="w-full bg-slate-950 border border-slate-800 rounded px-1.5 py-1 text-[10px] text-slate-300 focus:outline-none"
                      >
                        {STAGES.map((s) => (
                          <option key={s.key} value={s.key}>
                            Move to: {s.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Job Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">
                {editingJob ? 'Edit Job Application' : 'Add New Job Application'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-500 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveJob} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1 font-medium">Company Name *</label>
                  <input
                    type="text"
                    required
                    value={formCompany}
                    onChange={(e) => setFormCompany(e.target.value)}
                    placeholder="e.g. Google, Stripe"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1 font-medium">Job Position *</label>
                  <input
                    type="text"
                    required
                    value={formPosition}
                    onChange={(e) => setFormPosition(e.target.value)}
                    placeholder="e.g. Senior Software Engineer"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1 font-medium">Location</label>
                  <input
                    type="text"
                    value={formLocation}
                    onChange={(e) => setFormLocation(e.target.value)}
                    placeholder="e.g. Remote / New York, NY"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1 font-medium">Work Arrangement</label>
                  <select
                    value={formJobType}
                    onChange={(e) => setFormJobType(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Contract">Contract</option>
                    <option value="Part-time">Part-time</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1 font-medium">Salary Range</label>
                  <input
                    type="text"
                    value={formSalary}
                    onChange={(e) => setFormSalary(e.target.value)}
                    placeholder="e.g. $160k - $190k + Equity"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1 font-medium">Pipeline Stage</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200"
                  >
                    <option value="saved">Wishlist / Saved</option>
                    <option value="applied">Applied</option>
                    <option value="interviewing">Interviewing</option>
                    <option value="offer">Offer Received</option>
                    <option value="rejected">Rejected / Archived</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1 font-medium">Application Date</label>
                  <input
                    type="date"
                    value={formAppliedDate}
                    onChange={(e) => setFormAppliedDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1 font-medium">Job Post URL</label>
                  <input
                    type="url"
                    value={formUrl}
                    onChange={(e) => setFormUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-medium">
                  Job Description (used for ATS Matching)
                </label>
                <textarea
                  value={formJobDescription}
                  onChange={(e) => setFormJobDescription(e.target.value)}
                  rows={4}
                  placeholder="Paste the job description here..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-medium">Interview Notes & Next Steps</label>
                <textarea
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  rows={2}
                  placeholder="e.g. Recruiter call scheduled for Friday at 2 PM..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold"
                >
                  {editingJob ? 'Update Application' : 'Save Application'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
