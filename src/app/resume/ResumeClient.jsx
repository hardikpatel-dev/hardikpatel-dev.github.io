"use client";

import { useState } from "react";
import { IconArrowDown, IconBrandGithub, IconBrandLinkedin, IconBriefcase, IconCode, IconTrophy, IconSchool, IconCertificate, IconSparkles } from "@tabler/icons-react";
import { toast } from "sonner";

export default function ResumeClient({ items, pdfUrl }) {
  const [activeSection, setActiveSection] = useState("experience");

  // Filter items
  const getItems = (type) => items.filter(it => it.isActive && it.type === type).sort((a,b) => a.sortOrder - b.sortOrder);
  
  const ObjectMap = {
    experience: getItems("EXPERIENCE"),
    projects: getItems("PROJECT"),
    skills: getItems("SKILL"),
    education: getItems("EDUCATION"),
    achievements: getItems("ACHIEVEMENT"),
    hobbies: getItems("HOBBY")
  };

  const tabs = [
    { id: "experience", label: "Work" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "education", label: "Education" }
  ];

  return (
    <div className="min-h-screen bg-primary text-gray-900 dark:text-white transition-colors duration-300 font-whyte relative pb-32 print:bg-white print:text-black print:pb-0 print:min-h-0 rounded-xl">
      {/* Optimized Layout Version - Rebuild Trigger */}
      
      {/* Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 pt-12 md:pt-16 leading-relaxed print:max-w-none print:p-0">


        {/* Resume Header & Profile */}
        <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-12 border-b border-gray-200 dark:border-white/10 pb-8 print:pb-8">
          <div className="flex-1">
            <h1 className="text-4xl md:text-8xl font-bold tracking-tighter text-gray-900 dark:text-white flex items-center gap-3 md:gap-6 flex-wrap leading-none">
              Resume <span className="text-yellow-400">.</span>
            </h1>
           
          </div>

          <div className="flex flex-wrap gap-2 mt-10 md:mt-0 print:hidden shrink-0">
            {pdfUrl ? (
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-yellow-400 text-yellow-950 font-bold px-4 py-2.5 rounded-full flex items-center gap-2 hover:bg-yellow-500 hover:scale-105 transition-all text-xs shadow-sm ring-2 ring-transparent hover:ring-yellow-400/50 no-print"
              >
                <IconArrowDown size={14} /> Download PDF
              </a>
            ) : (
              <button
                onClick={() => toast.info("Resume PDF is being updated. Check back soon!")}
                className="bg-gray-200 dark:bg-white/10 text-gray-400 dark:text-white/40 font-bold px-4 py-2.5 rounded-full flex items-center gap-2 cursor-not-allowed text-xs shadow-sm no-print"
                disabled
              >
                <IconArrowDown size={14} /> Download PDF
              </button>
            )}

            <a
              href="https://github.com/hardikpatel-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-200 dark:bg-white/10 text-gray-800 dark:text-white font-medium px-4 py-2.5 rounded-full flex items-center gap-2 hover:bg-gray-300 dark:hover:bg-white/20 transition-all text-xs"
            >
              <IconBrandGithub size={14} /> Github
            </a>
            <a
              href="https://linkedin.com/in/hardik-kumar-patel-564798227"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-200 dark:bg-white/10 text-gray-800 dark:text-white font-medium px-4 py-2.5 rounded-full flex items-center gap-2 hover:bg-gray-300 dark:hover:bg-white/20 transition-all text-xs"
            >
              <IconBrandLinkedin size={14} /> LinkedIn
            </a>
          </div>
        </div>

        {/* Strict Tabs Sub-Nav */}
        <div className="flex overflow-x-auto gap-2 mb-12 tabs-nav no-print pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
          {tabs.map(tab => (
             <button
             key={tab.id}
             onClick={() => setActiveSection(tab.id)}
             className={`px-5 py-2.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all flex-shrink-0 ${
               activeSection === tab.id
                 ? "bg-yellow-400 text-yellow-950 shadow-md scale-105"
                 : "text-gray-500 dark:text-white/60 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/5 bg-gray-100 dark:bg-transparent"
             }`}
           >
             {tab.label}
           </button>
          ))}
        </div>

        {/* --- SECTIONS (Strict Rendering) --- */}

        {/* WORK EXPERIENCE */}
        <section className={`resume-section ${activeSection === "experience" ? "block" : "hidden"} print:!block animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both`}>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8 print:text-2xl print:mt-12">Work Experience</h2>
          <div className="relative ml-0 sm:ml-2 space-y-12 pb-4">
            <div className="absolute left-[7px] md:left-[6px] top-[24px] bottom-0 w-[2px] bg-gray-200 dark:bg-white/10 print:bg-gray-200"></div>
            {ObjectMap.experience.length === 0 ? <EmptyState /> : ObjectMap.experience.map(exp => (
              <div key={exp.id} className="relative grid grid-cols-1 md:grid-cols-[1fr_2.5fr] gap-6 md:gap-10 items-start pl-8 md:pl-10 print:gap-8">
                <span className="absolute left-0 top-[24px] w-4 h-4 rounded-full bg-yellow-400 ring-[6px] ring-[#F8F9FA] dark:ring-[#0B0C10] print:ring-white shadow-sm z-10 block"></span>
                <div className="bg-white dark:bg-[#151515] p-6 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-md dark:shadow-none hover:border-yellow-400/50 dark:hover:border-yellow-400/30 transition-all relative z-10 print:border-gray-200 print:shadow-none">
                  <div className="text-[10px] uppercase font-bold tracking-widest text-yellow-600 dark:text-yellow-400 mb-2">Role</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 leading-tight">{exp.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-white/60 mb-6 font-medium">{exp.subtitle}</p>
                  <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-white/10 print:border-gray-200">
                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-white/50 bg-gray-50 dark:bg-white/5 w-fit px-3 py-1.5 rounded-lg border border-gray-100 dark:border-transparent print:bg-white print:border-gray-100">
                      <IconBriefcase size={14} className="text-yellow-600 dark:text-yellow-400/70" /> {exp.dateRange}
                    </div>
                  </div>
                </div>
                <div className="bg-white dark:bg-[#121212] p-6 md:p-8 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm leading-relaxed z-10 h-full print:border-gray-200 print:shadow-none">
                  <ul className="space-y-4">
                    {exp.bullets.map((b, i) => (
                      <li key={i} className="flex gap-4 text-sm text-gray-700 dark:text-white/80 print:text-black">
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 dark:bg-yellow-400 opacity-80 shrink-0 mt-2"></span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section className={`resume-section ${activeSection === "projects" ? "block" : "hidden"} print:!block animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both mt-24 print:mt-16`}>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8 print:text-2xl">Projects</h2>
          <div className="space-y-8">
            {ObjectMap.projects.length === 0 ? <EmptyState /> : ObjectMap.projects.map(proj => (
              <div key={proj.id} className="bg-white dark:bg-[#151515] p-6 md:p-8 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-md dark:shadow-none hover:border-yellow-400/50 dark:hover:border-yellow-400/30 transition-all flex flex-col md:flex-row gap-6 md:gap-12 group print:border-gray-200 print:shadow-none">
                <div className="w-full md:w-1/3">
                  <div className="flex flex-col gap-3">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{proj.title}</h3>
                    <p className="text-[11px] uppercase font-bold tracking-widest text-yellow-600 dark:text-yellow-500 flex flex-wrap gap-x-2 leading-relaxed opacity-90">{proj.subtitle}</p>
                  </div>
                </div>
                <div className="w-full md:w-2/3 md:pl-8 md:border-l border-gray-100 dark:border-white/10 pt-4 md:pt-0 print:border-gray-200">
                  <ul className="space-y-4">
                    {proj.bullets.map((b, i) => (
                      <li key={i} className="flex gap-3 text-sm text-gray-700 dark:text-white/70 leading-relaxed print:text-black">
                        <span className="text-yellow-500 dark:text-yellow-400/50 font-bold opacity-80 shrink-0 mt-0.5">—</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section className={`resume-section ${activeSection === "skills" ? "block" : "hidden"} print:!block animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both mt-20 print:mt-16`}>
          <div className="mb-10">
            <h2 className="text-3xl font-bold tracking-tight mb-2 print:text-2xl">Technical Proficiency</h2>
            <div className="h-1.5 w-20 bg-yellow-400 rounded-full"></div>
          </div>
          <div className="bg-white dark:bg-[#121212] p-6 lg:p-12 rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-sm print:border-gray-200 print:shadow-none">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
              {ObjectMap.skills.length === 0 ? <EmptyState /> : ObjectMap.skills.map((skill, index) => (
                <div key={skill.id} className={`flex flex-col gap-4 ${index < ObjectMap.skills.length - 2 ? 'border-b border-gray-100 dark:border-white/5 pb-8' : ''} md:border-none md:pb-0 print:border-none print:pb-0`}>
                  <div className="flex items-center gap-2.5 opacity-80">
                    <IconCode size={16} className="text-gray-400 dark:text-gray-500" />
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-white/50">{skill.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2 group">
                    {skill.bullets.map((b, i) => (
                      <span key={i} className="bg-gray-50 dark:bg-[#1A1A1A] text-[13px] font-semibold text-gray-700 dark:text-white/80 px-4 py-2 rounded-xl border border-gray-100 dark:border-white/5 hover:-translate-y-1 hover:border-yellow-400 hover:text-yellow-600 dark:hover:text-yellow-400 hover:bg-yellow-50 transition-all duration-300 print:border-gray-200 print:text-black">
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EDUCATION & HOBBIES */}
        <section className={`resume-section ${activeSection === "education" ? "block" : "hidden"} print:!block animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both mt-24 print:mt-16`}>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8 print:text-2xl">Education & Awards</h2>
          <div className="space-y-12">
            <div>
              <div className="flex items-center gap-2 mb-6 opacity-60">
                <IconSchool size={18} />
                <h3 className="font-bold uppercase tracking-widest text-xs">Academic History</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {ObjectMap.education.map(edu => (
                  <div key={edu.id} className="relative bg-white dark:bg-[#151515] p-8 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm overflow-hidden group hover:border-yellow-400/50 transition-all print:border-gray-200 print:shadow-none">
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-yellow-50/50 dark:from-yellow-400/5 to-transparent pointer-events-none no-print"></div>
                    <div className="flex justify-between items-start">
                      <div className="z-10 relative pr-4">
                        <div className="text-[10px] uppercase font-bold tracking-widest text-gray-400 dark:text-white/40 mb-2">{edu.title}</div>
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2 leading-tight max-w-[80%] print:text-black">{edu.subtitle || edu.title}</h4>
                        <p className="text-xs text-gray-500 dark:text-white/50 font-medium">{edu.dateRange}</p>
                      </div>
                      {edu.bullets && edu.bullets.length > 0 && (
                        <div className="z-10 bg-yellow-400 text-yellow-950 px-5 py-2.5 rounded-full font-bold text-sm shrink-0 shadow-lg shadow-yellow-400/20 tabular-nums no-print">
                          {edu.bullets[0]}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {ObjectMap.achievements.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-6 opacity-60">
                  <IconTrophy size={18} />
                  <h3 className="font-bold uppercase tracking-widest text-xs">Notable Achievements</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {ObjectMap.achievements.map((ach) => (
                    <div key={ach.id} className="bg-white dark:bg-[#1A1A1A] p-6 rounded-2xl border border-gray-100 dark:border-white/5 flex flex-col gap-4 group hover:border-yellow-400/50 transition-colors shadow-sm print:border-gray-200 print:shadow-none">
                      <div className="w-10 h-10 rounded-full bg-yellow-50 dark:bg-yellow-400/10 flex items-center justify-center shrink-0 border border-yellow-200 dark:border-yellow-400/30 group-hover:scale-110 transition-transform no-print">
                        <IconCertificate size={20} className="text-yellow-600 dark:text-yellow-400" />
                      </div>
                      <p className="text-sm text-gray-700 dark:text-white/80 leading-relaxed font-medium print:text-black">"{ach.bullets[0] || ach.title}"</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {ObjectMap.hobbies.length > 0 && (
              <div className="print:block">
                <div className="flex items-center gap-2 mb-6 opacity-60">
                  <IconSparkles size={18} />
                  <h3 className="font-bold uppercase tracking-widest text-xs">Interests</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {ObjectMap.hobbies.map((hobby) => (
                    <div key={hobby.id} className="px-5 py-2.5 bg-gray-100 dark:bg-white/5 rounded-full border border-gray-100 dark:border-white/5 text-sm font-semibold text-gray-700 dark:text-white/80 select-none print:bg-white print:border-gray-200 print:text-black">
                      {hobby.title}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="p-8 text-center bg-gray-50 dark:bg-white/5 rounded-2xl border border-dashed border-gray-200 dark:border-white/5">
      <p className="text-sm text-gray-500 dark:text-white/40 font-medium tracking-wide">Data is being prepared.</p>
    </div>
  );
}
