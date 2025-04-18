
import React, { useRef, useState } from "react";
import { ResumeSection } from "./ResumeSection";
import { ResumePreview } from "./ResumePreview";
import { useReactToPrint } from "react-to-print";
import { Download } from "lucide-react";

export function ResumeEditor() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [education, setEducation] = useState([{ school: "", degree: "", year: "" }]);
  const [experience, setExperience] = useState([{ company: "", role: "", period: "" }]);
  const [skills, setSkills] = useState([""]);

  const previewRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => previewRef.current,
    documentTitle: name ? `${name.replace(/\s+/g, "_")}_Resume` : "Resume",
    removeAfterPrint: true,
  });

  return (
    <div className="flex flex-col md:flex-row gap-10 mt-10 px-2 md:px-0">
      <main className="w-full md:w-1/2 max-w-xl mx-auto p-6 bg-white/90 dark:bg-neutral-900/90 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-800 transition-colors duration-300">
        <ResumeSection title="Personal Info">
          <input
            className="input mb-2"
            placeholder="Full Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            className="input mb-2"
            placeholder="Job Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            className="input mb-2"
            placeholder="Short Summary"
            value={summary}
            onChange={e => setSummary(e.target.value)}
            rows={2}
          />
        </ResumeSection>
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
              {education.length > 1 && (
                <button
                  className="ml-2 text-xs text-red-500 hover:underline"
                  onClick={() => setEducation(education.filter((_, idx) => idx !== i))}
                  type="button"
                  aria-label="Remove education"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            className="text-xs px-3 py-1 rounded bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition"
            onClick={() => setEducation([...education, { school: "", degree: "", year: "" }])}
            type="button"
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
              {experience.length > 1 && (
                <button
                  className="ml-2 text-xs text-red-500 hover:underline"
                  onClick={() => setExperience(experience.filter((_, idx) => idx !== i))}
                  type="button"
                  aria-label="Remove experience"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            className="text-xs px-3 py-1 rounded bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition"
            onClick={() => setExperience([...experience, { company: "", role: "", period: "" }])}
            type="button"
          >
            + Add Experience
          </button>
        </ResumeSection>
        <ResumeSection title="Skills">
          <div className="flex flex-wrap gap-2 mb-3">
            {skills.map((skill, i) => (
              <div key={i} className="flex items-center gap-1">
                <input
                  className="input w-40"
                  placeholder="Skill"
                  value={skill}
                  onChange={e => {
                    const arr = [...skills];
                    arr[i] = e.target.value;
                    setSkills(arr);
                  }}
                />
                {skills.length > 1 && (
                  <button
                    className="text-xs text-red-500 hover:underline"
                    onClick={() => setSkills(skills.filter((_, idx) => idx !== i))}
                    type="button"
                    aria-label="Remove skill"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            className="text-xs px-3 py-1 rounded bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition"
            onClick={() => setSkills([...skills, ""])}
            type="button"
          >
            + Add Skill
          </button>
        </ResumeSection>
        <div className="flex justify-end mt-8">
          <button
            className="flex items-center gap-2 px-6 py-2 rounded-lg font-semibold bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow transition hover:scale-105 hover:bg-neutral-700 dark:hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-400"
            onClick={handlePrint}
            type="button"
          >
            <Download className="w-5 h-5" />
            Download PDF
          </button>
        </div>
      </main>
      <aside className="w-full md:w-1/2 max-w-a4 mx-auto md:sticky md:top-24 h-fit animate-fade-in">
        <div className="mb-4 text-center text-neutral-500 text-sm font-medium">Live Preview</div>
        <ResumePreview
          ref={previewRef}
          name={name}
          title={title}
          summary={summary}
          education={education}
          experience={experience}
          skills={skills}
        />
      </aside>
    </div>
  );
}