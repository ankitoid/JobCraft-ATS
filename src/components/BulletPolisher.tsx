'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  TrendingUp,
  Award,
  Zap,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  ArrowRight
} from 'lucide-react';

interface BulletPolisherProps {
  onInsertBulletToResume?: (bullet: string) => void;
  onNavigateToBuilder?: () => void;
}

const ACTION_VERB_CATEGORIES = {
  'Engineering & Architecture': [
    'Architected', 'Engineered', 'Built', 'Implemented', 'Designed', 'Orchestrated',
    'Configured', 'Refactored', 'Deployed', 'Constructed', 'Formulated'
  ],
  'Optimization & Performance': [
    'Optimized', 'Accelerated', 'Streamlined', 'Trimmed', 'Boosted', 'Elevated',
    'Maximized', 'Automated', 'Consolidated', 'Overhauled', 'Revamped'
  ],
  'Leadership & Ownership': [
    'Spearheaded', 'Pioneered', 'Led', 'Championed', 'Mentored', 'Directed',
    'Established', 'Governed', 'Founded', 'Steered', 'Empowered'
  ],
  'Scale & Impact': [
    'Scaled', 'Expanded', 'Delivered', 'Generated', 'Produced', 'Attained',
    'Amplified', 'Achieved', 'Surpassed'
  ]
};

const BEFORE_AFTER_EXAMPLES = [
  {
    role: 'Full Stack Engineer',
    weak: 'Worked on the frontend and improved the page load speed.',
    polished: 'Spearheaded frontend migration to Next.js 14 and SSR caching, reducing initial page load times by 48% for 350K+ monthly active users.',
    impact: '+48% page speed • 350k users'
  },
  {
    role: 'Backend / DevOps',
    weak: 'Helped with database issues and setup Docker deployments.',
    polished: 'Architected automated Docker CI/CD pipelines and indexed PostgreSQL query execution plans, slashing deployment release cycles by 75% and query latency by 60%.',
    impact: '75% faster releases • 60% latency reduction'
  },
  {
    role: 'Frontend Developer',
    weak: 'Built the checkout page and worked with the Stripe API.',
    polished: 'Engineered high-conversion checkout flow integrated with Stripe API and Zustand state management, processing $3.4M in annual recurring revenue with 99.99% payment success.',
    impact: '$3.4M ARR • 99.99% payment success'
  }
];

export const BulletPolisher: React.FC<BulletPolisherProps> = ({
  onInsertBulletToResume,
  onNavigateToBuilder,
}) => {
  // XYZ Builder State
  const [actionVerb, setActionVerb] = useState('Architected');
  const [accomplishment, setAccomplishment] = useState('a high-throughput distributed microservice');
  const [metric, setMetric] = useState('reducing p99 API latency by 45%');
  const [method, setMethod] = useState('by implementing Redis caching and Go concurrency routines');
  const [copiedFormula, setCopiedFormula] = useState(false);

  // Live Bullet Checker State
  const [inputBullet, setInputBullet] = useState(
    'Led migration of monolithic backend to Next.js and Node.js microservices, cutting cloud infrastructure costs by 35% across 500k monthly requests.'
  );
  const [copiedSampleIdx, setCopiedSampleIdx] = useState<number | null>(null);

  // Combine XYZ formula
  const generatedBullet = `${actionVerb} ${accomplishment}, ${metric} ${method}.`.replace(/\s+/g, ' ');

  // Analyze input bullet
  const hasMetric = /(\b\d+(\.\d+)?%|\$\d+|\b\d+\s*(k|m|ms|sec|seconds|users|transactions|requests)\b|\b\d+\+)/i.test(inputBullet);
  const words = inputBullet.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const startsWithStrongVerb = Object.values(ACTION_VERB_CATEGORIES)
    .flat()
    .some((v) => words[0]?.toLowerCase() === v.toLowerCase());

  const handleCopy = (text: string, isFormula: boolean = false, sampleIdx?: number) => {
    navigator.clipboard.writeText(text);
    if (isFormula) {
      setCopiedFormula(true);
      setTimeout(() => setCopiedFormula(false), 2000);
    } else if (typeof sampleIdx === 'number') {
      setCopiedSampleIdx(sampleIdx);
      setTimeout(() => setCopiedSampleIdx(null), 2000);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Intro Hero */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-900 border border-indigo-500/20 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
            <Award className="w-3.5 h-3.5" />
            <span>Google XYZ Resume Formula</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Resume Bullet Point Polisher
          </h1>
          <p className="text-slate-400 text-sm max-w-2xl">
            "Accomplished <strong>[X]</strong> as measured by <strong>[Y]</strong>, by doing <strong>[Z]</strong>".
            Top tech recruiters filter resumes by quantifiable impact. Use our formula workshop and power action verb dictionary to turn weak lines into winning bullet points.
          </p>
        </div>
      </div>

      {/* Interactive Google XYZ Generator */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <span>Interactive Formula Builder</span>
          </h3>
          <span className="text-xs text-indigo-400 font-mono">X + Y + Z Formula</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="text-slate-400 block mb-1 font-semibold uppercase tracking-wider">
              1. Power Verb
            </label>
            <select
              value={actionVerb}
              onChange={(e) => setActionVerb(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              {Object.values(ACTION_VERB_CATEGORIES).flat().map((verb) => (
                <option key={verb} value={verb}>
                  {verb}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-slate-400 block mb-1 font-semibold uppercase tracking-wider">
              2. Accomplishment [X]
            </label>
            <input
              type="text"
              value={accomplishment}
              onChange={(e) => setAccomplishment(e.target.value)}
              placeholder="e.g. automated test infrastructure"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="text-slate-400 block mb-1 font-semibold uppercase tracking-wider">
              3. Measurable Impact [Y]
            </label>
            <input
              type="text"
              value={metric}
              onChange={(e) => setMetric(e.target.value)}
              placeholder="e.g. reducing regression bugs by 40%"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="text-slate-400 block mb-1 font-semibold uppercase tracking-wider">
              4. Tech Stack / Method [Z]
            </label>
            <input
              type="text"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              placeholder="e.g. by authoring Jest and Cypress suites"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Generated Bullet Preview */}
        <div className="bg-slate-950 border border-indigo-500/30 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">
              Generated ATS-Ready Bullet:
            </span>
            <p className="text-sm font-medium text-slate-100 leading-relaxed">
              • {generatedBullet}
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={() => handleCopy(generatedBullet, true)}
              className="flex items-center space-x-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow transition"
            >
              {copiedFormula ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedFormula ? 'Copied!' : 'Copy Bullet'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Live Bullet Tester */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">Live Bullet Quality Analyzer</h3>
          </div>
          <p className="text-xs text-slate-400">
            Paste any bullet from your resume to check its action verb strength, quantifiable impact, and length.
          </p>

          <textarea
            value={inputBullet}
            onChange={(e) => setInputBullet(e.target.value)}
            rows={4}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />

          {/* Quality Checklist */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center space-x-2 text-xs">
              {startsWithStrongVerb ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              )}
              <span className={startsWithStrongVerb ? 'text-slate-200 font-medium' : 'text-slate-400'}>
                Starts with a strong action verb ({words[0] || 'none'})
              </span>
            </div>

            <div className="flex items-center space-x-2 text-xs">
              {hasMetric ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
              )}
              <span className={hasMetric ? 'text-slate-200 font-medium' : 'text-slate-400'}>
                Contains quantifiable metric / data / percentage
              </span>
            </div>

            <div className="flex items-center space-x-2 text-xs">
              {wordCount >= 12 && wordCount <= 28 ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
              )}
              <span className="text-slate-300">
                Ideal length: {wordCount} words (optimal range is 12–28 words)
              </span>
            </div>
          </div>
        </div>

        {/* Real-World Before & After Transformations */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white">Before vs. After Transformations</h3>
          </div>
          <p className="text-xs text-slate-400">
            Notice how mundane task statements become high-value achievement stories.
          </p>

          <div className="space-y-3">
            {BEFORE_AFTER_EXAMPLES.map((ex, i) => (
              <div key={i} className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-slate-300">{ex.role}</span>
                  <span className="text-emerald-400 font-mono text-[10px]">{ex.impact}</span>
                </div>
                <div className="text-xs text-rose-400/80 line-through">
                  Weak: "{ex.weak}"
                </div>
                <div className="text-xs text-slate-200 font-medium leading-relaxed">
                  ✓ {ex.polished}
                </div>
                <div className="flex justify-end pt-1">
                  <button
                    onClick={() => handleCopy(ex.polished, false, i)}
                    className="flex items-center space-x-1 text-[11px] text-blue-400 hover:text-blue-300"
                  >
                    {copiedSampleIdx === i ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedSampleIdx === i ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Verb Power Dictionary */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center space-x-2">
          <Lightbulb className="w-5 h-5 text-amber-400" />
          <h3 className="text-base font-bold text-white">High-Impact Action Verb Thesaurus</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {Object.entries(ACTION_VERB_CATEGORIES).map(([cat, verbs]) => (
            <div key={cat} className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl space-y-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                {cat}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {verbs.map((verb) => (
                  <button
                    key={verb}
                    onClick={() => setActionVerb(verb)}
                    className="px-2 py-0.5 rounded bg-slate-800 hover:bg-indigo-600 hover:text-white text-slate-300 text-xs font-mono transition"
                    title="Click to use in formula"
                  >
                    {verb}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
