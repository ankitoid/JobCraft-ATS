# JobCraft: AI ATS Resume Optimizer & Job Tracker 🚀

JobCraft is an all-in-one web application designed to help job seekers land interviews by tailoring resumes specifically for ATS (Applicant Tracking System) screening algorithms and managing the complete job search pipeline.

---

## 🌟 Key Features

### 1. 🎯 ATS Matcher & Keyword Gap Analyzer
- **Real-Time ATS Score (0 - 100%)**: Calculates a weighted score considering keyword frequency (40%), quantifiable metrics (25%), strong action verbs (15%), section completeness (10%), and formatting (10%).
- **Keyword Matrix**: Compares your resume against any target job description. Highlights matched skills in green and missing keywords in red.
- **1-Click Skill Injection**: Add any missing skill detected in the job description straight into your resume builder.
- **Google XYZ Bullet Generator**: Automatically generates tailored bullet points for missing skills following the formula: *"Accomplished [X] as measured by [Y], by doing [Z]"*.

### 2. 📄 Interactive Resume Builder & ATS Preview
- **Comprehensive Sections**: Personal info, executive summary, work experience, categorized skills (Languages, Frameworks, Cloud, Databases, Soft skills), education, and projects.
- **Bullet Metric Detector**: Automatically detects whether each bullet point contains quantifiable numbers, percentages, or scale metrics.
- **ATS-Compliant Document Preview**: Clean, single-column Ivy/Harvard ATS format designed to pass automated parsers with 100% readability.
- **Print / PDF Export**: 1-click browser vector PDF export.

### 3. 💼 Job Application Tracker (Kanban Pipeline)
- **Pipeline Stages**:
  - `Wishlist / Saved`
  - `Applied`
  - `Interviewing`
  - `Offer Received 🎉`
  - `Rejected / Archived`
- **ATS Linkage**: Run an ATS scan on any tracked job's description directly from the board and store the resulting score with the card.
- **Application Details**: Salary ranges, interview notes, recruiter contacts, and direct job post links.

### 4. 💡 Google XYZ Bullet Point Polisher
- **Formula Workshop**: Build high-impact bullet points answering:
  1. *Power Action Verb* (Architected, Spearheaded, Accelerated, etc.)
  2. *Accomplishment [X]*
  3. *Measurable Impact [Y]* (45% reduction, $4.2M ARR, 500k users)
  4. *Tech Stack / Method [Z]*
- **Live Quality Checker**: Evaluates word length, strong verbs, and metric presence in real-time.
- **Action Verb Thesaurus**: Categorized strong verbs by Engineering, Optimization, Leadership, and Scale.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Storage**: Client-Side LocalStorage with full JSON Export & Import

---

## 🚀 Running the App Locally

To start the development server:

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your web browser.

To create an optimized production build:

```bash
npm run build
npm start
```
