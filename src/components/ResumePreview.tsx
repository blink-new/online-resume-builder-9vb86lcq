
import React, { forwardRef } from "react";

interface Education {
  school: string;
  degree: string;
  year: string;
}
interface Experience {
  company: string;
  role: string;
  period: string;
}
interface ResumePreviewProps {
  name: string;
  title: string;
  summary: string;
  education: Education[];
  experience: Experience[];
  skills: string[];
}

export const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(
  (
    { name, title, summary, education, experience, skills },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className="w-full max-w-a4 mx-auto bg-white dark:bg-neutral-900 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-800 px-10 py-8 print:shadow-none print:border-none print:rounded-none print:px-0 print:py-0 print:bg-white print:text-black transition-colors duration-300 font-sans"
        style={{
          minHeight: "1100px",
          color: "var(--resume-fg)",
          background: "var(--resume-bg)",
        }}
      >
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-3xl font-bold font-serif tracking-tight mb-1">{name || "Your Name"}</h1>
          <h2 className="text-lg font-medium text-neutral-500 dark:text-neutral-400 mb-2">{title || "Job Title"}</h2>
          <p className="text-base text-center max-w-2xl">{summary || "A short professional summary goes here."}</p>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold font-serif border-b border-neutral-300 dark:border-neutral-700 pb-1 mb-2">Education</h3>
          {education.filter(e => e.school || e.degree || e.year).length === 0 ? (
            <p className="text-neutral-400 italic">No education added.</p>
          ) : (
            <ul>
              {education.map((ed, i) =>
                (ed.school || ed.degree || ed.year) ? (
                  <li key={i} className="mb-2">
                    <span className="font-medium">{ed.school}</span>
                    {ed.degree && <span className="ml-2 text-neutral-500 dark:text-neutral-400">{ed.degree}</span>}
                    {ed.year && <span className="ml-2 text-neutral-400 dark:text-neutral-500">{ed.year}</span>}
                  </li>
                ) : null
              )}
            </ul>
          )}
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold font-serif border-b border-neutral-300 dark:border-neutral-700 pb-1 mb-2">Experience</h3>
          {experience.filter(e => e.company || e.role || e.period).length === 0 ? (
            <p className="text-neutral-400 italic">No experience added.</p>
          ) : (
            <ul>
              {experience.map((ex, i) =>
                (ex.company || ex.role || ex.period) ? (
                  <li key={i} className="mb-2">
                    <span className="font-medium">{ex.company}</span>
                    {ex.role && <span className="ml-2 text-neutral-500 dark:text-neutral-400">{ex.role}</span>}
                    {ex.period && <span className="ml-2 text-neutral-400 dark:text-neutral-500">{ex.period}</span>}
                  </li>
                ) : null
              )}
            </ul>
          )}
        </div>
        <div>
          <h3 className="text-xl font-semibold font-serif border-b border-neutral-300 dark:border-neutral-700 pb-1 mb-2">Skills</h3>
          {skills.filter(s => s.trim()).length === 0 ? (
            <p className="text-neutral-400 italic">No skills added.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {skills.filter(s => s.trim()).map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 text-sm font-medium border border-neutral-200 dark:border-neutral-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
);

ResumePreview.displayName = "ResumePreview";