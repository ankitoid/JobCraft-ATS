import {
  ATSAnalysisResult,
  KeywordMatch,
  SectionScore,
  ResumeData
} from '@/types';
import {
  TECH_SKILLS_DICTIONARY,
  SOFT_SKILLS_DICTIONARY,
  STRONG_ACTION_VERBS,
  WEAK_VERBS
} from './constants';

// Clean and normalize text
function normalizeText(text: string): string {
  return text.toLowerCase().replace(/[\r\n\t]+/g, ' ');
}

// Convert ResumeData into searchable unified text
export function resumeDataToText(resume: ResumeData): string {
  const parts: string[] = [];
  parts.push(resume.personalInfo.fullName);
  parts.push(resume.personalInfo.jobTitle);
  parts.push(resume.personalInfo.email);
  parts.push(resume.personalInfo.phone);
  parts.push(resume.personalInfo.location);
  parts.push(resume.summary);

  resume.experience.forEach(exp => {
    parts.push(exp.company);
    parts.push(exp.role);
    parts.push(exp.location);
    parts.push(...exp.bulletPoints);
  });

  resume.education.forEach(edu => {
    parts.push(edu.institution);
    parts.push(edu.degree);
    parts.push(edu.fieldOfStudy);
    if (edu.gpa) parts.push(`GPA ${edu.gpa}`);
  });

  parts.push(...resume.skills.languages);
  parts.push(...resume.skills.frameworks);
  parts.push(...resume.skills.developerTools);
  parts.push(...resume.skills.librariesAndDatabases);
  parts.push(...resume.skills.softSkills);

  resume.projects.forEach(proj => {
    parts.push(proj.name);
    parts.push(proj.description);
    parts.push(...proj.technologies);
    parts.push(...proj.bulletPoints);
  });

  parts.push(...resume.certifications);

  return parts.join(' \n ');
}

// Extract keywords from Job Description
export function extractKeywordsFromJob(jobDescription: string): {
  hardSkills: { keyword: string; count: number }[];
  softSkills: { keyword: string; count: number }[];
  tools: { keyword: string; count: number }[];
} {
  const normalizedJD = normalizeText(jobDescription);
  const foundHard: { keyword: string; count: number }[] = [];
  const foundSoft: { keyword: string; count: number }[] = [];
  const foundTools: { keyword: string; count: number }[] = [];

  // Check tech skills
  Object.entries(TECH_SKILLS_DICTIONARY).forEach(([category, skills]) => {
    skills.forEach(skill => {
      // Escape for regex
      const escaped = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      // Word boundary regex
      const regex = new RegExp(`\\b${escaped}\\b`, 'gi');
      const matches = normalizedJD.match(regex);
      if (matches && matches.length > 0) {
        if (category === 'cloud_devops' || category === 'databases') {
          foundTools.push({ keyword: skill, count: matches.length });
        } else {
          foundHard.push({ keyword: skill, count: matches.length });
        }
      }
    });
  });

  // Check soft skills
  SOFT_SKILLS_DICTIONARY.forEach(skill => {
    const escaped = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escaped}\\b`, 'gi');
    const matches = normalizedJD.match(regex);
    if (matches && matches.length > 0) {
      foundSoft.push({ keyword: skill, count: matches.length });
    }
  });

  // Sort by frequency
  return {
    hardSkills: foundHard.sort((a, b) => b.count - a.count),
    softSkills: foundSoft.sort((a, b) => b.count - a.count),
    tools: foundTools.sort((a, b) => b.count - a.count),
  };
}

// Check bullet points for quantifiable metrics (e.g. 50%, $10M, 350ms, 20k+, 5x)
export function analyzeQuantifiableImpact(text: string): {
  quantifiedBulletsCount: number;
  totalBulletsCount: number;
  percentage: number;
} {
  const metricRegex = /(\b\d+(\.\d+)?%|\$\d+(\.\d+)?\s*(k|m|b|million|billion)?|\b\d+\s*(k|m|x|ms|s|sec|seconds|minutes|hours|users|customers|clients|requests|transactions)\b|\b\d+([,.]\d+)?\+)/i;

  const lines = text.split(/\n+/).map(l => l.trim()).filter(l => l.length > 20);
  let quantified = 0;

  lines.forEach(line => {
    if (metricRegex.test(line)) {
      quantified++;
    }
  });

  const total = Math.max(lines.length, 1);
  return {
    quantifiedBulletsCount: quantified,
    totalBulletsCount: lines.length,
    percentage: Math.min(100, Math.round((quantified / total) * 100)),
  };
}

// Action Verbs Analysis
export function analyzeActionVerbs(text: string): {
  strongVerbsFound: string[];
  weakVerbsFound: string[];
} {
  const normalized = normalizeText(text);
  const strongFound = new Set<string>();
  const weakFound = new Set<string>();

  STRONG_ACTION_VERBS.forEach(verb => {
    const regex = new RegExp(`\\b${verb}\\b`, 'gi');
    if (regex.test(normalized)) {
      strongFound.add(verb);
    }
  });

  WEAK_VERBS.forEach(verb => {
    const regex = new RegExp(`\\b${verb}\\b`, 'gi');
    if (regex.test(normalized)) {
      weakFound.add(verb);
    }
  });

  return {
    strongVerbsFound: Array.from(strongFound),
    weakVerbsFound: Array.from(weakFound),
  };
}

// Comprehensive ATS Analyzer
export function runATSAnalysis(
  resumeText: string,
  jobDescriptionText: string
): ATSAnalysisResult {
  const normResume = normalizeText(resumeText);
  const normJD = normalizeText(jobDescriptionText);

  // 1. Keyword Extraction from JD
  const extracted = extractKeywordsFromJob(jobDescriptionText);

  const matchedKeywords: KeywordMatch[] = [];
  const missingKeywords: KeywordMatch[] = [];

  const processCategory = (
    items: { keyword: string; count: number }[],
    category: 'hardSkill' | 'softSkill' | 'tool'
  ) => {
    items.forEach(({ keyword, count }) => {
      const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`\\b${escaped}\\b`, 'gi');
      const foundInResume = regex.test(normResume);

      const importance: 'high' | 'medium' | 'low' =
        count >= 3 ? 'high' : count >= 2 ? 'medium' : 'low';

      const matchObj: KeywordMatch = {
        keyword,
        category,
        foundInResume,
        frequencyInJob: count,
        importance,
      };

      if (foundInResume) {
        matchedKeywords.push(matchObj);
      } else {
        missingKeywords.push(matchObj);
      }
    });
  };

  processCategory(extracted.hardSkills, 'hardSkill');
  processCategory(extracted.softSkills, 'softSkill');
  processCategory(extracted.tools, 'tool');

  // If no specific dictionary skills matched from the JD, extract high-frequency non-stop words
  if (matchedKeywords.length === 0 && missingKeywords.length === 0) {
    const commonWords = new Set([
      'the', 'and', 'for', 'with', 'you', 'will', 'are', 'our', 'that', 'this',
      'from', 'have', 'work', 'team', 'experience', 'about', 'role', 'years', 'skills'
    ]);
    const words = normJD.match(/\b[a-z]{3,}\b/g) || [];
    const freq: Record<string, number> = {};
    words.forEach(w => {
      if (!commonWords.has(w)) {
        freq[w] = (freq[w] || 0) + 1;
      }
    });

    Object.entries(freq)
      .filter(([_, count]) => count >= 2)
      .slice(0, 15)
      .forEach(([w, count]) => {
        const found = normResume.includes(w);
        const obj: KeywordMatch = {
          keyword: w,
          category: 'general',
          foundInResume: found,
          frequencyInJob: count,
          importance: count >= 3 ? 'high' : 'medium',
        };
        if (found) matchedKeywords.push(obj);
        else missingKeywords.push(obj);
      });
  }

  // Calculate Keyword Score
  const totalKeywords = matchedKeywords.length + missingKeywords.length;
  const keywordScore = totalKeywords > 0
    ? Math.round((matchedKeywords.length / totalKeywords) * 100)
    : 70;

  // 2. Metrics & Quantifiable Impact
  const impactAnalysis = analyzeQuantifiableImpact(resumeText);
  const impactScore = impactAnalysis.percentage;

  // 3. Action Verbs
  const verbAnalysis = analyzeActionVerbs(resumeText);
  const actionVerbScore = Math.min(
    100,
    Math.round(
      (verbAnalysis.strongVerbsFound.length * 15) -
      (verbAnalysis.weakVerbsFound.length * 10)
    )
  );
  const boundedActionVerbScore = Math.max(20, actionVerbScore);

  // 4. Formatting and Brevity
  const wordsCount = resumeText.trim().split(/\s+/).filter(Boolean).length;
  let formattingScore = 90;
  if (wordsCount < 200) formattingScore = 40;
  else if (wordsCount < 350) formattingScore = 65;
  else if (wordsCount > 1200) formattingScore = 70;
  else if (wordsCount > 1600) formattingScore = 55;

  // 5. Section Completeness Check
  const sectionScores: SectionScore[] = [];

  // Contact Info
  const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(resumeText);
  const hasPhone = /(\+\d{1,3}[- ]?)?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}/.test(resumeText);
  const hasLinkedIn = /linkedin\.com/i.test(resumeText);
  const contactScore = (hasEmail ? 40 : 0) + (hasPhone ? 30 : 0) + (hasLinkedIn ? 30 : 15);
  sectionScores.push({
    section: 'Contact Information',
    score: Math.min(100, contactScore),
    status: contactScore >= 90 ? 'excellent' : contactScore >= 60 ? 'good' : 'needs_work',
    feedback: [
      hasEmail ? '✓ Professional email included' : '✗ Missing contact email',
      hasPhone ? '✓ Phone number included' : '✗ Missing phone number',
      hasLinkedIn ? '✓ LinkedIn profile link included' : '⚠ Consider adding a direct LinkedIn URL',
    ],
  });

  // Summary
  const hasSummary = /summary|profile|objective|about/i.test(resumeText);
  sectionScores.push({
    section: 'Professional Summary',
    score: hasSummary ? 95 : 60,
    status: hasSummary ? 'excellent' : 'needs_work',
    feedback: hasSummary
      ? ['✓ Well-defined summary section found']
      : ['⚠ Add a 2-3 sentence executive summary tailored to this position'],
  });

  // Experience
  const hasExperience = /experience|work history|employment/i.test(resumeText);
  sectionScores.push({
    section: 'Work Experience',
    score: hasExperience ? 95 : 40,
    status: hasExperience ? 'excellent' : 'missing',
    feedback: hasExperience
      ? [
          `✓ Found ${impactAnalysis.totalBulletsCount} bullet points`,
          impactAnalysis.percentage >= 50
            ? `✓ ${impactAnalysis.percentage}% of bullets contain measurable data`
            : `⚠ Only ${impactAnalysis.percentage}% of bullets have quantified impact (target: 60%+)`,
        ]
      : ['✗ Experience section is missing or poorly formatted'],
  });

  // Skills
  const hasSkills = /skills|technical skills|competencies/i.test(resumeText);
  sectionScores.push({
    section: 'Skills & Tech Stack',
    score: hasSkills ? 95 : 50,
    status: hasSkills ? 'excellent' : 'needs_work',
    feedback: hasSkills
      ? [`✓ Found ${matchedKeywords.length} matching skills from job description`]
      : ['⚠ Ensure your skills section explicitly lists hard skills and developer tools'],
  });

  // Education
  const hasEducation = /education|university|college|degree|bachelor|master/i.test(resumeText);
  sectionScores.push({
    section: 'Education & Credentials',
    score: hasEducation ? 95 : 45,
    status: hasEducation ? 'excellent' : 'needs_work',
    feedback: hasEducation
      ? ['✓ Education credentials clearly highlighted']
      : ['⚠ Missing clear education or degree section'],
  });

  const completenessScore = Math.round(
    sectionScores.reduce((acc, curr) => acc + curr.score, 0) / sectionScores.length
  );

  // Overall Weighted Score
  // Weights: Keyword (40%), Impact Metrics (25%), Action Verbs (15%), Completeness (10%), Formatting (10%)
  const overallScore = Math.round(
    keywordScore * 0.40 +
    impactScore * 0.25 +
    boundedActionVerbScore * 0.15 +
    completenessScore * 0.10 +
    formattingScore * 0.10
  );

  const grade: 'A+' | 'A' | 'B' | 'C' | 'D' =
    overallScore >= 92 ? 'A+' :
    overallScore >= 83 ? 'A' :
    overallScore >= 72 ? 'B' :
    overallScore >= 60 ? 'C' : 'D';

  // Tailoring Suggestions
  const tailoringSuggestions = [];

  // Missing high impact keywords
  const highImpactMissing = missingKeywords.filter(k => k.importance === 'high');
  if (highImpactMissing.length > 0) {
    const listStr = highImpactMissing.slice(0, 5).map(k => `"${k.keyword}"`).join(', ');
    tailoringSuggestions.push({
      title: 'Incorporate High-Frequency Missing Skills',
      description: `The job posting repeatedly mentions ${listStr}. Add these to your Skills list and weave them naturally into your bullet points.`,
      priority: 'high' as const,
      suggestedBullets: highImpactMissing.slice(0, 3).map(k =>
        `Architected and maintained production systems utilizing ${k.keyword}, ensuring high availability and zero downtime across deployments.`
      ),
    });
  }

  // Weak action verbs suggestion
  if (verbAnalysis.weakVerbsFound.length > 0) {
    tailoringSuggestions.push({
      title: 'Replace Passive Verbs with Power Verbs',
      description: `Found weak or passive phrasing: ${verbAnalysis.weakVerbsFound.map(v => `"${v}"`).join(', ')}. Replace them with assertive verbs like "Architected", "Engineered", "Spearheaded", or "Optimized".`,
      priority: 'medium' as const,
    });
  }

  // Quantifiable metrics suggestion
  if (impactAnalysis.percentage < 55) {
    tailoringSuggestions.push({
      title: 'Apply the Google XYZ Impact Formula',
      description: 'Strengthen bullet points by answering: "Accomplished [X] as measured by [Y], by doing [Z]". Example: "Reduced database query latency by 45% by implementing Redis cache and query indexing."',
      priority: 'high' as const,
      suggestedBullets: [
        'Streamlined release pipeline by implementing automated CI/CD workflows, shortening deployment cycle times by 40%.',
        'Scaled microservices infrastructure to support 150K+ daily concurrent users with 99.98% service uptime.'
      ]
    });
  }

  return {
    overallScore,
    grade,
    breakdown: {
      keywordMatchScore: keywordScore,
      impactMetricScore: impactScore,
      actionVerbScore: boundedActionVerbScore,
      formattingScore,
      completenessScore,
    },
    keywords: {
      matched: matchedKeywords,
      missing: missingKeywords,
    },
    metrics: {
      quantifiedBulletsCount: impactAnalysis.quantifiedBulletsCount,
      totalBulletsCount: impactAnalysis.totalBulletsCount,
      quantifiedPercentage: impactAnalysis.percentage,
      strongActionVerbsCount: verbAnalysis.strongVerbsFound.length,
      weakActionVerbsFound: verbAnalysis.weakVerbsFound,
      wordCount: wordsCount,
      readingTimeMinutes: Math.max(1, Math.round(wordsCount / 200)),
    },
    sectionScores,
    tailoringSuggestions,
  };
}
