'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Compass,
  CheckCircle2,
  HelpCircle,
  Mail,
  Copy,
  Check,
  Building,
  Cpu,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  MessageSquare
} from 'lucide-react';
import { ResumeData } from '@/types';

interface JdIntelligenceProps {
  jobDescription: string;
  resume: ResumeData;
  onNavigateToBuilder: () => void;
}

export const JdIntelligence: React.FC<JdIntelligenceProps> = ({
  jobDescription,
  resume,
  onNavigateToBuilder,
}) => {
  const [activeTab, setActiveTab] = useState<'insights' | 'interview' | 'coverletter'>('insights');
  const [copiedCoverLetter, setCopiedCoverLetter] = useState(false);

  // Generate tailored cover letter
  const coverLetter = `Dear Hiring Team,

I am writing to express my strong enthusiasm for the Full-Stack Engineer position. With 2+ years of hands-on experience building and shipping high-performance web (Next.js, React) and mobile (React Native) applications end to end, I was immediately drawn to your mission of revolutionizing platform software through modern engineering and AI.

In my recent work, I architected and deployed production quick-commerce and operations platforms live across multiple cities. Key highlights of how my background aligns with your role include:

1. Frontend-Led Full-Stack Breadth: Shipped responsive web applications using Next.js 14 and published production cross-platform mobile apps on both the iOS App Store and Google Play using React Native and TypeScript.
2. Robust Backend & Transactional Pipelines: Designed RESTful Node.js APIs, Supabase/PostgreSQL database structures, Redis caching layers, and resilient payment gateway integrations handling critical order and checkout workflows.
3. AI-Enabled Product Capabilities: Built LLM-assisted features using OpenAI APIs and integrated observability tracing (Langfuse) to monitor latency, cost, and output consistency—while actively utilizing AI-assisted workflows (Cursor, Copilot) to accelerate delivery velocity by 40%.
4. High Ownership in Fast-Moving Teams: Thrived in agile environments taking ambiguous, evolving product requirements from early whiteboard concepts through testing, deployment, and live customer support.

I would welcome the opportunity to discuss how my end-to-end technical execution and passion for product craftsmanship can contribute to your team. Thank you for your time and consideration.

Sincerely,
${resume.personalInfo.fullName}
${resume.personalInfo.email} | ${resume.personalInfo.phone}
${resume.personalInfo.linkedin}`;

  const handleCopyCoverLetter = () => {
    navigator.clipboard.writeText(coverLetter);
    setCopiedCoverLetter(true);
    setTimeout(() => setCopiedCoverLetter(false), 2000);
  };

  const interviewQuestions = [
    {
      type: 'Technical (Frontend & Mobile)',
      question: 'How do you design a React Native mobile checkout experience to remain resilient against flaky network connections in busy venues?',
      talkingPoint: 'Discuss offline caching (Redux/Zustand persist or SQLite/AsyncStorage), optimistic UI updates for cart items, idempotent payment webhook tokens, and queueing background sync when connection resumes.'
    },
    {
      type: 'Technical (AI & Observability)',
      question: 'How do you approach evaluating and monitoring LLM-powered features in production with Langfuse or Braintrust?',
      talkingPoint: 'Highlight prompt versioning, tracking token latency and costs, logging user feedback loops (thumbs up/down), setting up evals for hallucination detection, and tracing multi-step agent chains.'
    },
    {
      type: 'Architecture & Scalability',
      question: 'How do you structure database queries and caching when moving from hundreds to tens of thousands of active venues?',
      talkingPoint: 'Explain read-through Redis caching for frequently accessed menu/catalog data, database indexing on foreign keys (venue_id, order_id), connection pooling with Supabase/PgBouncer, and asynchronous worker queues for notifications.'
    },
    {
      type: 'Behavioral & Culture Fit',
      question: 'Tell me about a time when you received incomplete requirements for a critical feature and had to ship it on a tight deadline.',
      talkingPoint: 'Recall building DryDash delivery scheduling: clarify core user assumptions, build an early prototype to align stakeholders, iterate rapidly with AI-assisted tools, and ship with telemetry to validate behavior.'
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-900 border border-indigo-500/20 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
              <Compass className="w-3.5 h-3.5" />
              <span>Job Intelligence & Interview Suite</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Target Role Deep Dive & Preparation
            </h1>
            <p className="text-slate-400 text-sm max-w-2xl">
              Break down the employer's expectations, master tailored technical interview questions, and generate a customized cover letter.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('insights')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                activeTab === 'insights'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Role Archetype
            </button>
            <button
              onClick={() => setActiveTab('interview')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                activeTab === 'interview'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Interview Prep
            </button>
            <button
              onClick={() => setActiveTab('coverletter')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                activeTab === 'coverletter'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Cover Letter
            </button>
          </div>
        </div>
      </div>

      {/* Tab 1: Insights & Breakdown */}
      {activeTab === 'insights' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Card 1: Must-Haves */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center space-x-2 text-blue-400">
              <ShieldCheck className="w-5 h-5" />
              <h3 className="text-base font-bold text-white">Core Must-Haves</h3>
            </div>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Frontend & Mobile:</strong> React, React Native, Next.js, and TypeScript.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Backend & Data:</strong> Node.js, Supabase, PostgreSQL/REST APIs, and 3rd-party integrations.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Product Ownership:</strong> Taking features from whiteboard to App Store & production.</span>
              </li>
            </ul>
          </div>

          {/* Card 2: Differentiators */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center space-x-2 text-indigo-400">
              <Cpu className="w-5 h-5" />
              <h3 className="text-base font-bold text-white">Key Differentiators</h3>
            </div>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start space-x-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span><strong>AI Capabilities:</strong> LLM integration, prompt engineering, and evaluation.</span>
              </li>
              <li className="flex items-start space-x-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span><strong>AI Observability:</strong> Tracing and debugging with Langfuse or Braintrust.</span>
              </li>
              <li className="flex items-start space-x-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span><strong>AI Tooling:</strong> Fast shipping with Cursor, Copilot, and modern AI workflows.</span>
              </li>
            </ul>
          </div>

          {/* Card 3: Culture & Work Style */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center space-x-2 text-emerald-400">
              <Building className="w-5 h-5" />
              <h3 className="text-base font-bold text-white">Culture & Team Archetype</h3>
            </div>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start space-x-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Small, Fast-Moving:</strong> High autonomy; no bureaucratic waiting on specs.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Comfort with Ambiguity:</strong> Turning incomplete requirements into polished UX.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Operator Focus:</strong> Built for hospitality venues (speed, stability, intuitive flows).</span>
              </li>
            </ul>
          </div>
        </motion.div>
      )}

      {/* Tab 2: Interview Prep Questions */}
      {activeTab === 'interview' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {interviewQuestions.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 hover:border-slate-700 transition"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/20">
                  {item.type}
                </span>
                <span className="text-xs text-slate-500">Question #{idx + 1}</span>
              </div>
              <h4 className="text-sm font-bold text-white leading-relaxed">
                "{item.question}"
              </h4>
              <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3.5 space-y-1.5">
                <div className="flex items-center space-x-1.5 text-xs font-semibold text-amber-400">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Recommended Talking Points for Your Answer:</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {item.talkingPoint}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* Tab 3: Tailored Cover Letter */}
      {activeTab === 'coverletter' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Mail className="w-5 h-5 text-blue-400" />
                <span>Tailored Cover Letter</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Customized for this specific position with your exact background highlighted.
              </p>
            </div>
            <button
              onClick={handleCopyCoverLetter}
              className="flex items-center space-x-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow transition"
            >
              {copiedCoverLetter ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCoverLetter ? 'Copied Letter!' : 'Copy to Clipboard'}</span>
            </button>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 text-xs text-slate-200 font-sans leading-relaxed whitespace-pre-wrap select-all">
            {coverLetter}
          </div>
        </motion.div>
      )}
    </div>
  );
};
