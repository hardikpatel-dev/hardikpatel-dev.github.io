              export const dynamic = "force-dynamic";
import Link from "next/link";
import {
  IconArrowUpRight,
  IconChevronLeft,
  IconChevronRight,
  IconExternalLink,
  IconFolders,
  IconLock,
  IconMessage2Heart,
  IconPhoto,
  IconPlus,
  IconSparkles,
} from "@tabler/icons-react";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/app/admin/_lib/auth";
import AdminTopbar from "@/app/admin/_components/AdminTopbar";

export const metadata = {
  title: "Admin Dashboard | Hardik Patel",
};

const numberFormatter = new Intl.NumberFormat("en-IN");

function formatDate(value) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(value);
}

function getProjectSubtitle(project) {
  if (project?.liveUrl) {
    try {
      return new URL(project.liveUrl).hostname.replace(/^www\./, "");
    } catch {
      return project.liveUrl;
    }
  }

  if (project?.industry) {
    return project.industry;
  }

  return "No live website";
}

function getFreshnessLabel(value) {
  if (!value) {
    return "No activity";
  }

  const diffInDays = Math.floor(
    (Date.now() - new Date(value).getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffInDays <= 0) {
    return "Today";
  }

  if (diffInDays === 1) {
    return "1d ago";
  }

  if (diffInDays < 7) {
    return `${diffInDays}d ago`;
  }

  return "Older";
}

function getStatusTone(status) {
  if (status === "PUBLISHED") {
    return "bg-[#e8f5ec] text-[#1d6b3a]";
  }

  if (status === "DRAFT") {
    return "bg-[#eef0f3] text-[#4b515d]";
  }

  return "bg-[#eceef2] text-[#636974]";
}

export default async function AdminDashboardPage() {
  await requireAdminSession();

  const [
    totalProjects,
    publishedProjects,
    featuredProjects,
    liveProjects,
    totalTestimonials,
    publishedTestimonials,
    recentProjects,
  ] = await Promise.all([
    prisma.project.count(),
    prisma.project.count({ where: { status: "PUBLISHED" } }),
    prisma.project.count({ where: { featured: true } }),
    prisma.project.count({ where: { liveUrl: { not: null } } }),
    prisma.testimonial.count(),
    prisma.testimonial.count({ where: { status: "PUBLISHED" } }),
    prisma.project.findMany({
      orderBy: { updatedAt: "desc" },
      take: 5,
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        status: true,
        featured: true,
        liveUrl: true,
        industry: true,
        thumbnailUrl: true,
        updatedAt: true,
      },
    }),
  ]);

  const latestProject = recentProjects[0] || null;
  const todayLabel = formatDate(new Date());
  const publishedRatio = totalProjects ? Math.round((publishedProjects / totalProjects) * 100) : 0;

  const statCards = [
    {
      label: "Total",
      value: totalProjects,
      tone: "bg-[#171717] text-white",
      icon: IconFolders,
      iconClassName: "text-white/10",
    },
    {
      label: "Published",
      value: publishedProjects,
      tone: "bg-[#eef3ff] text-text-heading",
      icon: IconPhoto,
      iconClassName: "text-[#2458cc]/12",
    },
    {
      label: "Live URLs",
      value: liveProjects,
      tone: "bg-[#edf7f1] text-text-heading",
      icon: IconExternalLink,
      iconClassName: "text-[#1d6b3a]/12",
    },
    {
      label: "Featured",
      value: featuredProjects,
      tone: "bg-[#f3f1ff] text-text-heading",
      icon: IconSparkles,
      iconClassName: "text-[#6447cc]/12",
    },
    {
      label: "Testimonials",
      value: totalTestimonials,
      tone: "bg-[#fff6ea] text-text-heading",
      icon: IconMessage2Heart,
      iconClassName: "text-[#af6b00]/12",
    },
  ];

  return (
    <>
      <AdminTopbar title="Overview" meta={todayLabel} />

      <div className="grid gap-3 xl:grid-cols-[minmax(0,1.18fr)_360px]">
        <div className="flex flex-col gap-3">
          <section className="rounded-2xl bg-white/88 p-4 shadow-[0_12px_40px_rgba(17,17,17,0.05)]">
            <div className="flex flex-col gap-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.34em] text-text-muted">
                    Portfolio pulse
                  </p>
                  <h2 className="mt-2 font-whyte text-[clamp(2rem,4vw,2.8rem)] leading-none text-text-heading">
                    {numberFormatter.format(totalProjects)} records in motion
                  </h2>
                </div>
                <div className="hidden rounded-full bg-[#eef0f3] px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-text-muted sm:block">
                  {publishedRatio}% published
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {statCards.map((card) => (
                  <article
                    key={card.label}
                    className={`relative min-w-[140px] flex-1 overflow-hidden rounded-2xl px-3 py-3 ${card.tone}`}
                  >
                    <card.icon
                      size={54}
                      stroke={1.5}
                      className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 ${card.iconClassName}`}
                    />
                    <p className="text-[10px] uppercase tracking-[0.26em] opacity-55">
                      {card.label}
                    </p>
                    <p className="mt-3 font-whyte text-[2.2rem] leading-none">
                      {numberFormatter.format(card.value)}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="flex-1 overflow-hidden rounded-[1.25rem] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.03] sm:rounded-[1.5rem]">
            <div className="flex h-full flex-col lg:flex-row items-center">
              {/* Info Side */}
              <div className="flex flex-[1.4] flex-col p-6 sm:p-10 justify-center">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="rounded-md bg-black/5 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-black/60">
                    Latest Activity
                  </span>
                  <span
                    className={`rounded-md px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest ${
                      latestProject?.status === "PUBLISHED"
                        ? "bg-[#e8f5ec] text-[#1d6b3a]"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {latestProject?.status || "DRAFT"}
                  </span>
                </div>

                <h2 className="mt-6 font-whyte text-2xl font-medium leading-tight tracking-tight text-gray-900 sm:text-4xl">
                  {latestProject?.title || "No project yet"}
                </h2>

                <p className="mt-3 line-clamp-3 max-w-lg text-[13px] leading-relaxed text-gray-500">
                  {latestProject?.description ||
                    "Create your first project to start tracking publishing and website visibility from the overview."}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    href="/admin/projects"
                    className="inline-flex h-9 items-center justify-center rounded-lg bg-[#111111] px-5 text-[12.5px] font-medium text-white shadow-sm transition-all hover:bg-black focus:scale-95 active:scale-95"
                  >
                    Manage project
                  </Link>
                  {latestProject?.liveUrl ? (
                    <a
                      href={latestProject.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-black/10 bg-transparent px-5 text-[12.5px] font-medium text-gray-700 transition-colors hover:bg-black/5 focus:scale-95 active:scale-95"
                    >
                      Visit
                      <IconExternalLink size={14} stroke={1.5} />
                    </a>
                  ) : null}
                </div>
              </div>

              {/* Preview Side - Device Mockup */}
              <div className="w-full p-2 lg:p-2 lg:pl-0 lg:flex-1 lg:max-w-[600px]">
                <div className="group relative w-full overflow-hidden rounded-[0.85rem] border border-black/10 bg-[#f8f9fc] shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                  {/* Browser Window Chrome */}
                  <div className="flex h-7 items-center gap-3 border-b border-black/10 bg-white px-2.5 relative">
                    {/* Window Controls */}
                    <div className="flex items-center gap-1.5 z-10 shrink-0">
                      <div className="h-2 w-2 rounded-full bg-[#ff5f56]/90 border border-[#e0443e]/30" />
                      <div className="h-2 w-2 rounded-full bg-[#ffbd2e]/90 border border-[#dea123]/30" />
                      <div className="h-2 w-2 rounded-full bg-[#27c93f]/90 border border-[#1aab29]/30" />
                    </div>

                    {/* Simple Nav Arrows */}
                    <div className="hidden sm:flex items-center gap-3 text-gray-300 z-10">
                      <div className="flex items-center gap-1">
                        <IconChevronLeft size={10} stroke={3} />
                        <IconChevronRight size={10} stroke={3} />
                      </div>
                      <IconPlus size={10} stroke={3} />
                    </div>

                    {/* URL Bar */}
                    {latestProject?.liveUrl && (
                      <div className="flex-1 flex items-center justify-center">
                        <div className="flex items-center gap-1.5 rounded-md bg-black/[0.04] px-12 py-0.5 text-[8.5px] font-medium tracking-wide text-gray-400 group-hover:bg-black/[0.06] transition-colors">
                          <IconLock size={8} fill="currentColor" className="opacity-40" />
                          <span>{getProjectSubtitle(latestProject)}</span>
                        </div>
                      </div>
                    )}

                    <div className="w-12 shrink-0 hidden sm:block" /> 
                  </div>

                  {/* Device Screen Content */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-white">
                    {latestProject?.thumbnailUrl ? (
                      <img
                        src={latestProject.thumbnailUrl}
                        alt={latestProject.title}
                        className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-gray-300">
                        <IconPhoto size={40} stroke={1} />
                      </div>
                    )}
                    
                    {/* Subtle Inner Shadow for Realism */}
                    <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)]" />

                    {/* Freshness Badge inside the screen */}
                    {latestProject?.updatedAt && (
                      <div className="absolute bottom-2.5 right-2.5 rounded bg-black/60 px-2 py-0.5 text-[9px] font-medium text-white backdrop-blur-md opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        {getFreshnessLabel(latestProject.updatedAt)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <section className="rounded-2xl bg-[#111111] p-4 text-white shadow-[0_14px_34px_rgba(17,17,17,0.12)]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] uppercase tracking-[0.34em] text-white/38">
                Recent activity
              </p>
              <h2 className="mt-2 font-whyte text-2xl leading-none">Updated now</h2>
            </div>
            <Link
              href="/admin/projects"
              className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-white/62 transition hover:border-white/20 hover:text-white"
            >
              Library
            </Link>
          </div>

          <div className="mt-4 space-y-2">
            {recentProjects.length > 0 ? (
              recentProjects.map((project, index) => (
                <article
                  key={project.id}
                  className={`rounded-2xl px-3 py-3 ${
                    index === 0 ? "bg-white text-black" : "bg-white/6 text-white"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{project.title}</p>
                      <p
                        className={`mt-1 truncate text-xs ${
                          index === 0 ? "text-black/58" : "text-white/46"
                        }`}
                      >
                        {getProjectSubtitle(project)}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-2 py-1 text-[10px] uppercase tracking-[0.2em] ${
                        index === 0
                          ? "bg-[#eef3ff] text-[#2458cc]"
                          : getStatusTone(project.status)
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <div
                    className={`mt-3 flex items-center justify-between text-xs ${
                      index === 0 ? "text-black/58" : "text-white/46"
                    }`}
                  >
                    <span>{formatDate(project.updatedAt)}</span>
                    <span>{getFreshnessLabel(project.updatedAt)}</span>
                  </div>
                </article>
              ))
            ) : (
              <div className="rounded-2xl bg-white/6 px-3 py-4 text-sm text-white/58">
                No project activity yet.
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
