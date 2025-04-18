
import React, { useState } from "react";
import { ResumeSection } from "./ResumeSection";

export function ResumeEditor() {
  const [education, setEducation] = useState([{ school: "", degree: "", year: "" }]);
  const [experience, setExperience] = useState([{ company: "", role: "", period: "" }]);
  const [skills, setSkills] = useState([""]);

  // Animations: fade-in for section, focus ring for inputs
  return (
    <main className="max-w-2xl mx-auto mt-10 p-6 bg-white/90 dark:bg-neutral-900/90 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-800 transition-colors duration-300">
      <ResumeSection title="Education">
        {education.map((ed, i) => (
          <div key={i} className="flex flex-col md:flex-row gap-2 mb-3">
            <input
              className="input"
              placeholder="School"
              value={ed.school}
              onChange={e => {
                const arr = [...education];
                arr[i].school = e.target.value;
                setEducation(arr);
              }}
            />
            <input
              className="input"
              placeholder="Degree"
              value={ed.degree}
              onChange={e => {
                const arr = [...education];
                arr[i].degree = e.target.value;
                setEducation(arr);
              }}
            />
            <input
              className="input"
              placeholder="Year"
              value={ed.year}
              onChange={e => {
                const arr = [...education];
                arr[i].year = e.target.value;
                setEducation(arr);
              }}
            />
          </div>
        ))}
        <button
          className="text-xs px-3 py-1 rounded bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition"
          onClick={() => setEducation([...education, { school: "", degree: "", year: "" }])}
        >
          + Add Education
        </button>
      </ResumeSection>
      <ResumeSection title="Experience">
        {experience.map((ex, i) => (
          <div key={i} className="flex flex-col md:flex-row gap-2 mb-3">
            <input
              className="input"
              placeholder="Company"
              value={ex.company}
              onChange={e => {
                const arr = [...experience];
                arr[i].company = e.target.value;
                setExperience(arr);
              }}
            />
            <input
              className="input"
              placeholder="Role"
              value={ex.role}
              onChange={e => {
                const arr = [...experience];
                arr[i].role = e.target.value;
                setExperience(arr);
              }}
            />
            <input
              className="input"
              placeholder="Period"
              value={ex.period}
              onChange={e => {
                const arr = [...experience];
                arr[i].period = e.target.value;
                setExperience(arr);
              }}
            />
          </div>
        ))}
        <button
          className="text-xs px-3 py-1 rounded bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition"
          onClick={() => setExperience([...experience, { company: "", role: "", period: "" }])}
        >
          + Add Experience
        </button>
      </ResumeSection>
      <ResumeSection title="Skills">
        <div className="flex flex-wrap gap-2 mb-3">
          {skills.map((skill, i) => (
            <input
              key={i}
              className="input w-40"
              placeholder="Skill"
              value={skill}
              onChange={e => {
                const arr = [...skills];
                arr[i] = e.target.value;
                setSkills(arr);
              }}
            />
          ))}
        </div>
        <button
          className="text-xs px-3 py-1 rounded bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition"
          onClick={() => setSkills([...skills, ""])}
        >
          + Add Skill
        </button>
      </ResumeSection>
      <div className="flex justify-end mt-8">
        <button
          className="px-6 py-2 rounded-lg font-semibold bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow transition hover:scale-105 hover:bg-neutral-700 dark:hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-400"
          disabled
        >
          Download PDF (Coming Soon)
        </button>
      </div>
    </main>
  );
}