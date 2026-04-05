require("dotenv/config");
const { randomBytes, scryptSync } = require("node:crypto");
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

function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${derivedKey}`;
}

function getSeedAdmin() {
  const name = String(process.env.ADMIN_SEED_NAME || "").trim();
  const email = String(process.env.ADMIN_SEED_EMAIL || "")
    .trim()
    .toLowerCase();
  const password = String(process.env.ADMIN_SEED_PASSWORD || "");

  if (!name && !email && !password) {
    return null;
  }

  if (!name || !email || password.length < 8) {
    throw new Error(
      "ADMIN_SEED_NAME, ADMIN_SEED_EMAIL, and ADMIN_SEED_PASSWORD (min 8 chars) are required to seed an admin user."
    );
  }

  return { name, email, password };
}

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

const testimonials = [
  {
    name: "Jai Prakash Maurya",
    designation: "Team Lead",
    imageUrl: "/assets/testimonial-images/jai-prakash-maurya.webp",
    feedback:
      "Hardik has an eye for detail and a strong sense of responsibility. His ability to take ownership of tasks made our projects run smoother and more efficiently.",
    linkedinUrl: "https://www.linkedin.com/in/jai-prakash-m-2857711a0",
    sortOrder: 1,
    status: "PUBLISHED",
  },
  {
    name: "Bhavesh Singh",
    designation: "Web Developer",
    imageUrl: "/assets/testimonial-images/bhavesh-singh.webp",
    feedback:
      "Collaborating with Hardik was a great experience. He always comes up with creative solutions and ensures the work is both functional and visually appealing.",
    linkedinUrl: "https://www.linkedin.com/in/bhavesh-singh-04a74a1a5",
    sortOrder: 2,
    status: "PUBLISHED",
  },
  {
    name: "Suryadev Vindeshwari",
    designation: "Backend Developer",
    imageUrl: "/assets/testimonial-images/suryadev.webp",
    feedback:
      "Hardik is quick to understand complex requirements and transform them into clean, user-friendly designs. His problem-solving approach makes him stand out.",
    linkedinUrl: "https://www.linkedin.com/in/suryadev-vindeshwari",
    sortOrder: 3,
    status: "PUBLISHED",
  },
  {
    name: "Abhishek Jaiswal",
    designation: "Email Marketer",
    imageUrl: "/assets/testimonial-images/abhishek-jaiswal.webp",
    feedback:
      "Hardik brings a fresh perspective to every project. His creativity and adaptability make him a valuable asset in any team setting.",
    linkedinUrl: "https://www.linkedin.com/in/abhishek-jaiswal-29a515125",
    sortOrder: 4,
    status: "PUBLISHED",
  },
  {
    name: "Abhishek Dubey",
    designation: "Full Stack Web Developer",
    imageUrl: "/assets/testimonial-images/abhishek-dubey.webp",
    feedback:
      "I've worked with Hardik on multiple projects, and his consistency has been remarkable. He's innovative, dependable, and always ready to help the team grow.",
    linkedinUrl: "https://www.linkedin.com/in/abhishek-dubey1",
    sortOrder: 5,
    status: "PUBLISHED",
  },
];

async function main() {
  const fs = require('fs');
  const path = require('path');
  const assetsPath = path.join(process.cwd(), 'public', 'assets', 'tech-stack');

  const techStackData = [
    { id: "react", order: 1, icon: "react.svg", link: "https://react.dev/" },
    { id: "nextjs", order: 2, icon: "nextjs.svg", link: "https://nextjs.org/" },
    { id: "javascript", order: 3, icon: "javascript.svg", link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
    { id: "gsap", order: 4, icon: "gsap.svg", link: "https://gsap.com/" },
    { id: "tailwindcss", order: 5, icon: "tailwindcss.svg", link: "https://tailwindcss.com/" },
    { id: "bootstrap", order: 6, icon: "bootstrap.svg", link: "https://getbootstrap.com/" },
    { id: "css", order: 7, icon: "css.svg", link: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
    { id: "mui", order: 8, icon: "mui.svg", link: "https://mui.com/" },
    { id: "electron", order: 9, icon: "electron.svg", link: "https://www.electronjs.org/" },
    { id: "figma", order: 10, icon: "figma.svg", link: "https://www.figma.com/" },
  ];

  for (const item of techStackData) {
    console.log(`Processing tech item: ${item.id}`);
    const filePath = path.join(assetsPath, item.icon);
    let iconCode = '';
    
    if (fs.existsSync(filePath)) {
      iconCode = fs.readFileSync(filePath, 'utf8');
      iconCode = iconCode.replace(/<\?xml.*?\?>/g, '').trim();
    } else {
      iconCode = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10" stroke-width="2"/></svg>';
    }

    await prisma.techStackItem.upsert({
      where: { id: item.order },
      update: {
        name: String(item.id).charAt(0).toUpperCase() + String(item.id).slice(1),
        iconCode: iconCode,
        link: item.link,
        sortOrder: item.order,
      },
      create: {
        id: item.order,
        name: String(item.id).charAt(0).toUpperCase() + String(item.id).slice(1),
        iconCode: iconCode,
        link: item.link,
        sortOrder: item.order,
      }
    });
  }

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project,
    });
  }

  for (const testimonial of testimonials) {
    await prisma.testimonial.upsert({
      where: {
        id: testimonial.sortOrder,
      },
      update: testimonial,
      create: {
        id: testimonial.sortOrder,
        ...testimonial,
      },
    });
  }

  const seedAdmin = getSeedAdmin();

  if (seedAdmin) {
    await prisma.adminUser.upsert({
      where: { email: seedAdmin.email },
      update: {
        name: seedAdmin.name,
        passwordHash: hashPassword(seedAdmin.password),
      },
      create: {
        name: seedAdmin.name,
        email: seedAdmin.email,
        passwordHash: hashPassword(seedAdmin.password),
      },
    });

    console.log(`Admin user ensured for ${seedAdmin.email}`);
  } else {
    console.log("No admin seed env vars found. Skipping admin user seed.");
  }

  const projectCount = await prisma.project.count();
  const testimonialCount = await prisma.testimonial.count();
  const techCount = await prisma.techStackItem.count();
  const adminCount = await prisma.adminUser.count();
  console.log(
    `Seed completed. Total projects: ${projectCount}. Total testimonials: ${testimonialCount}. Total tech items: ${techCount}. Total admin users: ${adminCount}`
  );
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    if (error.stack) console.error(error.stack);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
