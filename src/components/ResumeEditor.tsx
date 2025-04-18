
import React, { useRef, useState } from "react";
import { ResumeSection } from "./ResumeSection";
import { ResumePreview } from "./ResumePreview";
import { Download, Plus, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Separator } from "./ui/separator";
import { Label } from "./ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
// @ts-ignore
import html2pdf from "html2pdf.js";

export function ResumeEditor() {
  // Prefilled example values for demo
  const [name, setName] = useState("Ada Lovelace");
  const [title, setTitle] = useState("Software Engineer");
  const [summary, setSummary] = useState(
    "Pioneering computer scientist with a passion for algorithms, mathematics, and elegant code. Experienced in analytical engines, collaborative projects, and technical writing."
  );
  const [education, setEducation] = useState([
    { school: "University of London", degree: "BSc Mathematics", year: "1835" },
    { school: "Self-Study", degree: "Computer Science", year: "1837" }
  ]);
  const [experience, setExperience] = useState([
    {
      company: "Analytical Engine Project",
      role: "Lead Programmer",
      period: "1837–1843"
    },
    {
      company: "Royal Society",
      role: "Mathematics Contributor",
      period: "1835–1842"
    }
  ]);
  const [skills, setSkills] = useState([
    "Algorithm Design",
    "Mathematics",
    "Technical Writing",
    "Collaboration",
    "Analytical Thinking"
  ]);
  const [downloading, setDownloading] = useState(false);

  const previewRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (!previewRef.current) return;
    setDownloading(true);
    // Clone the preview node to avoid UI glitches
    const node = previewRef.current.cloneNode(true) as HTMLElement;
    node.style.background = "#fff";
    node.style.color = "#232323";
    node.style.boxShadow = "none";
    node.style.border = "none";
    node.style.borderRadius = "0";
    node.style.padding = "40px";
    node.style.width = "794px";
    node.style.minHeight = "1123px";
    node.style.fontFamily = "'Inter', 'Lora', ui-sans-serif, serif";
    // Remove all print: classes if any
    node.querySelectorAll("[class*='print:']").forEach(el => {
      el.className = el.className
        .split(" ")
        .filter((c: string) => !c.startsWith("print:"))
        .join(" ");
    });

    const opt = {
      margin:       0,
      filename:     (name ? `${name.replace(/\s+/g, "_")}_Resume` : "Resume") + ".pdf",
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true, backgroundColor: "#fff" },
      jsPDF:        { unit: 'pt', format: 'a4', orientation: 'portrait' },
      pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] }
    };

    await html2pdf().set(opt).from(node).save();
    setDownloading(false);
  };

  return (
    <TooltipProvider>
      <div className="flex flex-col md:flex-row gap-10 mt-10 px-2 md:px-0">
        <main className="w-full md:w-1/2 max-w-xl mx-auto p-8 bg-white/90 dark:bg-neutral-900/90 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 transition-colors duration-300">
          <ResumeSection title="Personal Info">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-base font-semibold">Full Name</Label>
                <Input
                  id="name"
                  className="mt-1"
                  placeholder="e.g. Ada Lovelace"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="title" className="text-base font-semibold">Job Title</Label>
                <Input
                  id="title"
                  className="mt-1"
                  placeholder="e.g. Software Engineer"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="summary" className="text-base font-semibold">Summary</Label>
                <Textarea
                  id="summary"
                  className="mt-1 min-h-[60px]"
                  placeholder="A short professional summary goes here."
                  value={summary}
                  onChange={e => setSummary(e.target.value)}
                  rows={2}
                />
              </div>
            </div>
          </ResumeSection>
          <Separator className="my-6" />
          <ResumeSection title="Education">
            <div className="space-y-4">
              {education.map((ed, i) => (
                <div key={i} className="flex flex-col md:flex-row gap-2 items-end group">
                  <div className="flex-1 flex flex-col gap-2">
                    <Input
                      className="transition-all"
                      placeholder="School"
                      value={ed.school}
                      onChange={e => {
                        const arr = [...education];
                        arr[i].school = e.target.value;
                        setEducation(arr);
                      }}
                    />
                    <Input
                      className="transition-all"
                      placeholder="Degree"
                      value={ed.degree}
                      onChange={e => {
                        const arr = [...education];
                        arr[i].degree = e.target.value;
                        setEducation(arr);
                      }}
                    />
                    <Input
                      className="transition-all"
                      placeholder="Year"
                      value={ed.year}
                      onChange={e => {
                        const arr = [...education];
                        arr[i].year = e.target.value;
                        setEducation(arr);
                      }}
                    />
                  </div>
                  {education.length > 1 && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="ml-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900 transition"
                          onClick={() => setEducation(education.filter((_, idx) => idx !== i))}
                          type="button"
                          aria-label="Remove education"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Remove</TooltipContent>
                    </Tooltip>
                  )}
                </div>
              ))}
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => setEducation([...education, { school: "", degree: "", year: "" }])}
                type="button"
              >
                <Plus className="w-4 h-4" />
                Add Education
              </Button>
            </div>
          </ResumeSection>
          <Separator className="my-6" />
          <ResumeSection title="Experience">
            <div className="space-y-4">
              {experience.map((ex, i) => (
                <div key={i} className="flex flex-col md:flex-row gap-2 items-end group">
                  <div className="flex-1 flex flex-col gap-2">
                    <Input
                      className="transition-all"
                      placeholder="Company"
                      value={ex.company}
                      onChange={e => {
                        const arr = [...experience];
                        arr[i].company = e.target.value;
                        setExperience(arr);
                      }}
                    />
                    <Input
                      className="transition-all"
                      placeholder="Role"
                      value={ex.role}
                      onChange={e => {
                        const arr = [...experience];
                        arr[i].role = e.target.value;
                        setExperience(arr);
                      }}
                    />
                    <Input
                      className="transition-all"
                      placeholder="Period"
                      value={ex.period}
                      onChange={e => {
                        const arr = [...experience];
                        arr[i].period = e.target.value;
                        setExperience(arr);
                      }}
                    />
                  </div>
                  {experience.length > 1 && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="ml-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900 transition"
                          onClick={() => setExperience(experience.filter((_, idx) => idx !== i))}
                          type="button"
                          aria-label="Remove experience"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Remove</TooltipContent>
                    </Tooltip>
                  )}
                </div>
              ))}
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => setExperience([...experience, { company: "", role: "", period: "" }])}
                type="button"
              >
                <Plus className="w-4 h-4" />
                Add Experience
              </Button>
            </div>
          </ResumeSection>
          <Separator className="my-6" />
          <ResumeSection title="Skills">
            <div className="flex flex-wrap gap-2 mb-3">
              {skills.map((skill, i) => (
                <div key={i} className="flex items-center gap-1">
                  <Input
                    className="w-40"
                    placeholder="Skill"
                    value={skill}
                    onChange={e => {
                      const arr = [...skills];
                      arr[i] = e.target.value;
                      setSkills(arr);
                    }}
                  />
                  {skills.length > 1 && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900 transition"
                          onClick={() => setSkills(skills.filter((_, idx) => idx !== i))}
                          type="button"
                          aria-label="Remove skill"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Remove</TooltipContent>
                    </Tooltip>
                  )}
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => setSkills([...skills, ""])}
              type="button"
            >
              <Plus className="w-4 h-4" />
              Add Skill
            </Button>
          </ResumeSection>
          <div className="flex justify-end mt-8">
            <Button
              className="flex items-center gap-2 px-6 py-2 rounded-lg font-semibold bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow transition hover:scale-105 hover:bg-neutral-700 dark:hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-400"
              onClick={handleDownloadPDF}
              type="button"
              disabled={downloading}
            >
              <Download className={`w-5 h-5 ${downloading ? "animate-spin" : ""}`} />
              {downloading ? "Generating PDF..." : "Download PDF"}
            </Button>
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
    </TooltipProvider>
  );
}