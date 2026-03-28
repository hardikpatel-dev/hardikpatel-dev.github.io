require("dotenv/config");
const { PrismaClient, ProjectStatus } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set.");
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const projects = [
  {
    title: "AabhyasaInc",
    slug: "aabhyasainc",
    description:
      "Aabhyasa Inc. delivers expert-led webinars in healthcare professional training, empowering individuals with industry-ready skills.",
    liveUrl: "https://aabhyasainc.com",
    faviconUrl: "/assets/designs/aabhyasainc_logo.png",
    thumbnailUrl: "/assets/designs/aabhyasainc.webp",
    videoUrl: "/assets/mockup-video/aabhyasaInc.mp4",
    industry: "Training (Webinar Services)",
    publishedYear: 2025,
    sortOrder: 1,
    featured: true,
    status: ProjectStatus.PUBLISHED,
  },
  {
    title: "Humaanized",
    slug: "humaanized",
    description:
      "A platform for HR-focused webinars delivering insights, strategies, and best practices for professionals.",
    liveUrl: "https://humaanized.com",
    faviconUrl: "/assets/humaanized_element.png",
    thumbnailUrl: "/assets/designs/humaanized-desktop.webp",
    videoUrl: "/assets/mockup-video/humaanized.mp4",
    industry: "Human Resource",
    publishedYear: 2025,
    sortOrder: 2,
    featured: true,
    status: ProjectStatus.PUBLISHED,
  },
  {
    title: "TeamChatX",
    slug: "teamchatx",
    description:
      "A team chat platform for seamless business communication with messaging, groups, bulk chats, and secure meetings.",
    liveUrl: "https://teamchatx.com",
    faviconUrl: "/assets/designs/teamchatXLogo.png",
    thumbnailUrl: "/assets/designs/teamchatx-desktop.webp",
    videoUrl: "/assets/mockup-video/teamchatx.mp4",
    industry: "Communication & Collaboration",
    publishedYear: 2025,
    sortOrder: 3,
    featured: true,
    status: ProjectStatus.PUBLISHED,
  },
  {
    title: "RcmProNetwork",
    slug: "rcmpronetwork",
    description:
      "RCM Pro Network is a global BPO company offering outsourced services like finance, IT, healthcare billing, customer support, and logistics to help businesses cut costs and scale efficiently.",
    liveUrl: "https://www.rcmpronetwork.com",
    faviconUrl: "/assets/designs/rcm-fevicon.png",
    thumbnailUrl: "/assets/designs/rcmpronetwork-desktop.webp",
    videoUrl: "/assets/mockup-video/rcmpronetwork.mp4",
    industry: "Business Process Outsourcing (BPO)",
    publishedYear: 2025,
    sortOrder: 4,
    featured: false,
    status: ProjectStatus.PUBLISHED,
  },
  {
    title: "Aabhyasa",
    slug: "aabhyasa",
    description:
      "Aabhyasa Inc. is a premier provider of cutting-edge webinars across sectors like US healthcare, medical coding & billing, pharmaceuticals, and HR — empowering professionals with insights for today's industries",
    liveUrl: "https://www.aabhyasa.com",
    faviconUrl: "/assets/designs/aabhyasa_logo.png",
    thumbnailUrl: "/assets/designs/aabhyasa-desktop.webp",
    videoUrl: "/assets/mockup-video/aabhyasa.mp4",
    industry: "Professional Education",
    publishedYear: 2024,
    sortOrder: 5,
    featured: false,
    status: ProjectStatus.PUBLISHED,
  },
];

async function main() {
  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project,
    });
  }

  const count = await prisma.project.count();
  console.log(`Seed completed. Total projects: ${count}`);
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
