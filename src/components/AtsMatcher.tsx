'use client';

import React, { useState } from 'react';
import {
  Target,
  FileText,
  Briefcase,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Copy,
  Check,
  TrendingUp,
  Award,
  Zap,
  RefreshCw,
  PlusCircle,
  ArrowRight,
  UploadCloud,
  FileCheck,
  Loader2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { ResumeData, ATSAnalysisResult, JobApplication } from '@/types';
import { ATSScoreCard } from '@/components/ATSScoreCard';
import { ResumeSummaryCard } from '@/components/ResumeSummaryCard';
import { ParsedResumePreview } from '@/components/ParsedResumePreview';
import { runATSAnalysis, resumeDataToText } from '@/lib/atsEngine';
  import { SAMPLE_JOB_DESCRIPTION, STRONG_ACTION_VERBS } from '@/lib/constants';
import { extractTextFromFile } from '@/lib/pdfExtractor';
import { ScannerProgressModal } from './SkeletonLoader';

interface AtsMatcherProps {
  currentResume: ResumeData;
  onUpdateResumeWithKeyword?: (keyword: string) => void;
  onNavigateToBuilder: () => void;
  onNavigateToIntelligence?: () => void;
}

export const AtsMatcher: React.FC<AtsMatcherProps> = ({
  currentResume,
  onUpdateResumeWithKeyword,
  onNavigateToBuilder,
  onNavigateToIntelligence,
}) => {
  const [resumeMode, setResumeMode] = useState<'upload' | 'builder' | 'paste'>('upload');
  const [customResumeText, setCustomResumeText] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const [extractedPdfText, setExtractedPdfText] = useState<string>('');
  const [isExtractingPdf, setIsExtractingPdf] = useState(false);
  const [pdfExtractError, setPdfExtractError] = useState<string | null>(null);
  const [jobDescription, setJobDescription] = useState(SAMPLE_JOB_DESCRIPTION);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [analysis, setAnalysis] = useState<ATSAnalysisResult | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'missing' | 'matched'>('all');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const resume = currentResume;

  const handleFileUpload = async (file: File) => {
    setIsExtractingPdf(true);
    setPdfExtractError(null);
    try {
      const text = await extractTextFromFile(file);
      if (!text || text.trim().length === 0) {
        throw new Error('No text found in the PDF. Please ensure the document is not an image-only scan.');
      }
      setExtractedPdfText(text);
      setUploadedFileName(file.name);
      if (jobDescription.trim()) {
        triggerScanningFlow(text, jobDescription);
      }
    } catch (err: any) {
      setPdfExtractError(err.message || 'Failed to extract text from file.');
    } finally {
      setIsExtractingPdf(false);
    }
  };

  const triggerScanningFlow = (resumeText: string, jdText: string) => {
    setIsScanning(true);
    setScanStep(0);
    setTimeout(() => setScanStep(1), 300);
    setTimeout(() => setScanStep(2), 650);
    setTimeout(() => setScanStep(3), 1000);
    setTimeout(() => {
      const res = runATSAnalysis(resumeText, jdText);
      setAnalysis(res);
      setIsScanning(false);
    }, 1300);
  };

  const handleRunAnalysis = () => {
    const resumeTextToAnalyze =
      resumeMode === 'builder'
        ? resumeDataToText(currentResume)
        : resumeMode === 'upload'
        ? extractedPdfText
        : customResumeText;

    if (!resumeTextToAnalyze.trim()) {
      alert(
        resumeMode === 'upload'
          ? 'Please upload a PDF or text resume first.'
          : 'Please enter or load resume content to analyze.'
      );
      return;
    }
    if (!jobDescription.trim()) {
      alert('Please paste a job description to analyze.');
      return;
    }

    triggerScanningFlow(resumeTextToAnalyze, jobDescription);
  };

  const handleCopyBullet = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };


  const filteredKeywords = analysis
    ? activeFilter === 'all'
      ? [...analysis.keywords.matched, ...analysis.keywords.missing]
      : activeFilter === 'missing'
      ? analysis.keywords.missing
      : analysis.keywords.matched
    : [];

  return (
    <div className="space-y-8 pb-12">
      {isScanning && <ScannerProgressModal currentStep={scanStep} />}

      {/* Hero Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
              <Zap className="w-3.5 h-3.5" />
              <span>Applicant Tracking System (ATS) Scanner</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Optimize Your Resume for Exact Job Match
            </h1>
            <p className="text-slate-400 text-sm max-w-2xl">
              Compare your resume against any target job description. Identify missing tech keywords, detect weak phrasing, evaluate quantifiable metrics, and generate tailored bullet points that beat recruiter filters.
            </p>
          </div>

          {/* Quick Stats Summary if analysis exists */}
          {analysis && (
            <div className="flex items-center space-x-4 bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 self-start md:self-auto">
              <div className="text-center">
                <div className={`text-4xl font-black ${
                  analysis.overallScore >= 80 ? 'text-emerald-400' :
                  analysis.overallScore >= 65 ? 'text-amber-400' : 'text-rose-400'
                }`}>
                  {analysis.overallScore}%
                </div>
                <div className="text-xs uppercase tracking-wider font-semibold text-slate-400 mt-1">
                  ATS Match Score
                </div>
              </div>
              <div className="h-10 w-px bg-slate-800" />
              <div className="text-center px-2">
                <div className="text-3xl font-black text-blue-400">{analysis.grade}</div>
                <div className="text-xs uppercase tracking-wider font-semibold text-slate-400 mt-1">
                  Grade
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input Section: Resume vs Job Description */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Resume Input */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-blue-400" />
                <h2 className="text-lg font-bold text-white">1. Your Resume</h2>
              </div>
              <div className="flex items-center space-x-1 bg-slate-800 p-1 rounded-lg text-xs">
                <button
                  type="button"
                  onClick={() => setResumeMode('upload')}
                  className={`px-3 py-1 rounded-md font-medium transition ${
                    resumeMode === 'upload'
                      ? 'bg-blue-600 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Upload PDF
                </button>
                <button
                  type="button"
                  onClick={() => setResumeMode('builder')}
                  className={`px-3 py-1 rounded-md font-medium transition ${
                    resumeMode === 'builder'
                      ? 'bg-blue-600 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  From Builder
                </button>
                <button
                  type="button"
                  onClick={() => setResumeMode('paste')}
                  className={`px-3 py-1 rounded-md font-medium transition ${
                    resumeMode === 'paste'
                      ? 'bg-blue-600 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Paste Text
                </button>
              </div>
            </div>

            {/* Mode 1: PDF File Upload */}
            {resumeMode === 'upload' && (
              <div className="space-y-3">
                <label
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const file = e.dataTransfer.files?.[0];
                    if (file) handleFileUpload(file);
                  }}
                  className="flex flex-col items-center justify-center border-2 border-dashed border-slate-700 hover:border-blue-500 rounded-xl p-6 bg-slate-950/60 cursor-pointer transition group"
                >
                  <input
                    type="file"
                    accept=".pdf,.txt"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file);
                    }}
                  />
                  {isExtractingPdf ? (
                    <div className="flex flex-col items-center space-y-2 text-blue-400">
                      <Loader2 className="w-8 h-8 animate-spin" />
                      <span className="text-xs font-semibold">Extracting text from PDF...</span>
                    </div>
                  ) : uploadedFileName ? (
                    <div className="flex flex-col items-center space-y-2 text-emerald-400">
                      <FileCheck className="w-8 h-8" />
                      <div className="text-center">
                        <span className="text-xs font-bold text-slate-200 block">{uploadedFileName}</span>
                        <span className="text-[11px] text-emerald-400">
                          ✓ Successfully extracted ({extractedPdfText.split(/\s+/).filter(Boolean).length} words)
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 underline mt-1">
                        Click or drag to replace PDF
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center space-y-2 text-slate-400 group-hover:text-blue-400">
                      <UploadCloud className="w-8 h-8 transition-transform group-hover:scale-110" />
                      <div className="text-center">
                        <span className="text-xs font-semibold text-slate-200 block">
                          Drop your Resume PDF here or click to browse
                        </span>
                        <span className="text-[11px] text-slate-500">
                          Supports .pdf and .txt formats
                        </span>
                      </div>
                    </div>
                  )}
                </label>

                {pdfExtractError && (
                  <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{pdfExtractError}</span>
                  </div>
                )}

                {extractedPdfText && (
                  <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl space-y-1">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold">
                      <span>Extracted PDF Content Preview</span>
                      <span>{extractedPdfText.split(/\s+/).filter(Boolean).length} words</span>
                    </div>
                    <p className="text-xs text-slate-300 line-clamp-3 font-mono">
                      {extractedPdfText}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Mode 2: From Resume Builder */}
            {resumeMode === 'builder' && (
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-200">
                    {currentResume.personalInfo.fullName || 'Candidate Name'}
                  </span>
                  <span className="text-xs text-blue-400 font-mono">
                    {currentResume.personalInfo.jobTitle}
                  </span>
                </div>
                <p className="text-xs text-slate-400 line-clamp-3">
                  {currentResume.summary}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800">
                  <span className="text-[11px] text-slate-400 self-center mr-1">Skills:</span>
                  {[
                    ...currentResume.skills.languages,
                    ...currentResume.skills.frameworks
                  ].slice(0, 7).map(skill => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px] font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                  <span className="text-[11px] text-slate-400 self-center">+ more</span>
                </div>
                <div className="flex justify-end pt-1">
                  <button
                    onClick={onNavigateToBuilder}
                    className="text-xs text-blue-400 hover:text-blue-300 flex items-center space-x-1"
                  >
                    <span>Edit in Resume Builder</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}

            {/* Mode 3: Paste Text */}
            {resumeMode === 'paste' && (
              <div>
                <textarea
                  value={customResumeText}
                  onChange={(e) => setCustomResumeText(e.target.value)}
                  placeholder="Paste your plain text resume here..."
                  rows={8}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono resize-y"
                />
              </div>
            )}
          </div>

          <div className="pt-4 text-xs text-slate-400 flex items-center justify-between">
            <span>ATS parsing handles text, skills, bullet points, and dates.</span>
          </div>
        </div>

        {/* Right Column: Job Description Input */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Briefcase className="w-5 h-5 text-indigo-400" />
                <h2 className="text-lg font-bold text-white">2. Target Job Description</h2>
              </div>
            </div>



            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the target job description here..."
              rows={8}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-sans resize-y"
            />
          </div>

          <div className="pt-4 flex items-center justify-between">
            <span className="text-xs text-slate-400">Paste full JD text including responsibilities & requirements.</span>
            <button
              onClick={handleRunAnalysis}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-600/25 transition"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Scan & Match</span>
            </button>
          </div>
        </div>
      </div>

      {/* Analysis Results View */}
      {analysis && (
        <div className="space-y-8 animate-fadeIn">
          {/* Main Scorecard Overview */}
                      {/* Summary Card */}
            <ResumeSummaryCard resume={resume} />
            {/* Premium ATS Score Card */}
            <ATSScoreCard analysis={analysis} />
            {/* Parsed Resume Preview */}
            <ParsedResumePreview resume={resume} analysis={analysis} />
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
              <div className="text-xs text-slate-400 uppercase font-semibold">Keywords Match</div>
              <div className="flex items-baseline space-x-2 mt-2">
                <span className="text-2xl font-bold text-white">{analysis.breakdown.keywordMatchScore}%</span>
                <span className="text-xs text-slate-400">weight 40%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
                <div
                  className="bg-blue-500 h-full rounded-full"
                  style={{ width: `${analysis.breakdown.keywordMatchScore}%` }}
                />
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
              <div className="text-xs text-slate-400 uppercase font-semibold">Quantified Impact</div>
              <div className="flex items-baseline space-x-2 mt-2">
                <span className="text-2xl font-bold text-white">{analysis.metrics.quantifiedPercentage}%</span>
                <span className="text-xs text-slate-400">weight 25%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full"
                  style={{ width: `${analysis.metrics.quantifiedPercentage}%` }}
                />
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
              <div className="text-xs text-slate-400 uppercase font-semibold">Action Verbs</div>
              <div className="flex items-baseline space-x-2 mt-2">
                <span className="text-2xl font-bold text-white">{analysis.breakdown.actionVerbScore}%</span>
                <span className="text-xs text-slate-400">weight 15%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
                <div
                  className="bg-purple-500 h-full rounded-full"
                  style={{ width: `${analysis.breakdown.actionVerbScore}%` }}
                />
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
              <div className="text-xs text-slate-400 uppercase font-semibold">Completeness</div>
              <div className="flex items-baseline space-x-2 mt-2">
                <span className="text-2xl font-bold text-white">{analysis.breakdown.completenessScore}%</span>
                <span className="text-xs text-slate-400">weight 10%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
                <div
                  className="bg-amber-500 h-full rounded-full"
                  style={{ width: `${analysis.breakdown.completenessScore}%` }}
                />
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between col-span-2 md:col-span-1">
              <div className="text-xs text-slate-400 uppercase font-semibold">Word Count & Length</div>
              <div className="flex items-baseline space-x-2 mt-2">
                <span className="text-2xl font-bold text-white">{analysis.metrics.wordCount}</span>
                <span className="text-xs text-slate-400">words (~{analysis.metrics.readingTimeMinutes} min)</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
                <div
                  className="bg-sky-500 h-full rounded-full"
                  style={{ width: `${analysis.breakdown.formattingScore}%` }}
                />
              </div>
            </div>
          

          {/* Keywords Match Matrix */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                  <Target className="w-5 h-5 text-blue-400" />
                  <span>Keyword & Skill Breakdown</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Skills extracted directly from the job description and compared against your resume.
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`px-3 py-1 rounded-md transition ${
                    activeFilter === 'all'
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  All ({analysis.keywords.matched.length + analysis.keywords.missing.length})
                </button>
                <button
                  onClick={() => setActiveFilter('missing')}
                  className={`px-3 py-1 rounded-md transition ${
                    activeFilter === 'missing'
                      ? 'bg-rose-600 text-white font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Missing ({analysis.keywords.missing.length})
                </button>
                <button
                  onClick={() => setActiveFilter('matched')}
                  className={`px-3 py-1 rounded-md transition ${
                    activeFilter === 'matched'
                      ? 'bg-emerald-600 text-white font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Matched ({analysis.keywords.matched.length})
                </button>
              </div>
            </div>

            {/* Keyword Badges */}
            <div className="flex flex-wrap gap-2">
              {filteredKeywords.length === 0 ? (
                <p className="text-sm text-slate-400 italic">No keywords in this filter category.</p>
              ) : (
                filteredKeywords.map((kw, i) => (
                  <div
                    key={`${kw.keyword}-${i}`}
                    className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono border ${
                      kw.foundInResume
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                        : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                    }`}
                  >
                    {kw.foundInResume ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                    )}
                    <span className="font-semibold">{kw.keyword}</span>
                    <span className="text-[10px] opacity-70">({kw.frequencyInJob}x)</span>

                    {/* Quick Add to Resume button for missing keywords */}
                    {!kw.foundInResume && onUpdateResumeWithKeyword && (
                      <button
                        title="Add skill to Resume Builder"
                        onClick={() => {
                          onUpdateResumeWithKeyword(kw.keyword);
                          alert(`Added "${kw.keyword}" to your Resume Skills!`);
                        }}
                        className="ml-1 p-0.5 hover:bg-rose-500/20 rounded text-rose-300 transition"
                      >
                        <PlusCircle className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Instant Tailored Bullet Generator (Google XYZ) */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold text-white">
                  Tailored Bullet Points for Missing Keywords
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Drop these pre-formulated bullets into your resume experience section to immediately boost your match score:
              </p>
            </div>

            <div className="space-y-3">
              {analysis.tailoringSuggestions.flatMap(s => s.suggestedBullets || []).slice(0, 4).map((bullet, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 flex items-start justify-between gap-4 group hover:border-slate-700 transition"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-[11px] font-semibold text-amber-400 uppercase tracking-wider">
                      <TrendingUp className="w-3 h-3" />
                      <span>Google XYZ Formula Compliant</span>
                    </div>
                    <p className="text-sm text-slate-200 leading-relaxed font-sans">{bullet}</p>
                  </div>
                  <button
                    onClick={() => handleCopyBullet(bullet, idx)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition shrink-0"
                    title="Copy to clipboard"
                  >
                    {copiedIndex === idx ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Section Health & Action Verbs Deep Dive */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Section Health */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <FileText className="w-4 h-4 text-blue-400" />
                <span>Resume Section Health</span>
              </h3>
              <div className="space-y-3">
                {analysis.sectionScores.map((sec) => (
                  <div key={sec.section} className="bg-slate-950/70 border border-slate-800/70 rounded-xl p-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-semibold text-slate-200">{sec.section}</span>
                      <span className={`text-xs font-bold ${
                        sec.score >= 80 ? 'text-emerald-400' : 'text-amber-400'
                      }`}>
                        {sec.score}%
                      </span>
                    </div>
                    <div className="space-y-1">
                      {sec.feedback.map((fb, idx) => (
                        <p key={idx} className="text-[11px] text-slate-400">
                          {fb}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Verbs Review */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Zap className="w-4 h-4 text-purple-400" />
                <span>Action Verbs & Impact Tone</span>
              </h3>
              <div className="space-y-4">
                <div className="bg-slate-950/70 border border-slate-800/70 rounded-xl p-3 space-y-2">
                  <div className="text-xs font-semibold text-emerald-400">
                    Strong Verbs Detected ({analysis.metrics.strongActionVerbsCount}):
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {analysis.metrics.strongActionVerbsCount > 0 ? (
                      STRONG_ACTION_VERBS.filter(v =>
                        resumeDataToText(currentResume).toLowerCase().includes(v)
                      ).map(verb => (
                        <span key={verb} className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono">
                          {verb}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-400">None detected. Add strong verbs like Architected, Spearheaded.</span>
                    )}
                  </div>
                </div>

                <div className="bg-slate-950/70 border border-slate-800/70 rounded-xl p-3 space-y-2">
                  <div className="text-xs font-semibold text-rose-400">
                    Weak / Passive Verbs Found ({analysis.metrics.weakActionVerbsFound.length}):
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {analysis.metrics.weakActionVerbsFound.length > 0 ? (
                      analysis.metrics.weakActionVerbsFound.map(verb => (
                        <span key={verb} className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-mono">
                          {verb}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-emerald-400 font-medium">✓ No weak passive verbs found! Great assertive tone.</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
