import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JobCraft | ATS Resume Optimizer & Job Tracker",
  description: "Boost your job application success with AI ATS scoring, keyword extraction, tailored resume suggestions, and application tracking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col font-sans antialiased bg-slate-950 text-slate-100">
        {children}
      </body>
    </html>
  );
}

