import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JobCraft | ATS Resume Optimizer & Job Tracker",
  description: "Boost your job application success with AI ATS scoring, keyword extraction, tailored resume suggestions, and application tracking.",
};

import { SmoothScroll } from "@/components/SmoothScroll";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col font-sans antialiased bg-slate-950 text-slate-100 min-h-screen print:bg-white print:text-black" suppressHydrationWarning>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}

