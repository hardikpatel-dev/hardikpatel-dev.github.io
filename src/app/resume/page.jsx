import { prisma } from "@/lib/prisma";
import ResumeClient from "./ResumeClient";

export const metadata = {
  title: "Resume | Hardik Patel",
  description: "Comprehensive professional resume, skills, and experience.",
};

export default async function ResumePage() {
  // Fetch from DB
  const [items, settings] = await Promise.all([
    prisma.resumeItem.findMany({
      orderBy: [{ type: 'asc' }, { sortOrder: 'asc' }],
    }),
    prisma.resumeSettings.findFirst()
  ]);

  // Construct JSON-LD Schema
  const experienceItems = items.filter(it => it.type === 'EXPERIENCE' && it.isActive);
  
  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "name": "Hardik Patel",
      "jobTitle": "Frontend Engineer",
      "url": "https://itshardik.vercel.app/resume",
      "sameAs": [
        "https://linkedin.com/in/hardik-kumar-patel-564798227",
        "https://github.com/hardikpatel-dev"
      ],
      "alumniOf": items.find(it => it.type === 'EDUCATION' && it.isActive)?.title || "Institute of Engineering & Technology, Ayodhya",
      "worksFor": experienceItems.length > 0 ? {
        "@type": "Organization",
        "name": experienceItems[0].subtitle || "Aabhyasa Technologies"
      } : undefined
    }
  };

  return (
    <div
      className="bg-primary/5 mx-2 mb-2 rounded-xl"
      data-cursor=""
    >
      {/* Inject SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />
      
      <ResumeClient items={items} pdfUrl={settings?.pdfUrl} />
    </div>
  );
}

