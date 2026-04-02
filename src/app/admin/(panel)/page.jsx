import Link from "next/link";
import {
  IconArrowUpRight,
  IconClockHour4,
  IconExternalLink,
  IconFolders,
  IconPhoto,
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
    recentProjects,
  ] = await Promise.all([
    prisma.project.count(),
    prisma.project.count({ where: { status: "PUBLISHED" } }),
    prisma.project.count({ where: { featured: true } }),
    prisma.project.count({ where: { liveUrl: { not: null } } }),
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
  const liveRatio = totalProjects ? Math.round((liveProjects / totalProjects) * 100) : 0;
  const featuredRatio = totalProjects ? Math.round((featuredProjects / totalProjects) * 100) : 0;

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
  ];

  return (
    <>
      <AdminTopbar title="Overview" meta={todayLabel} />

      <div className="grid gap-3 xl:grid-cols-[minmax(0,1.18fr)_360px]">
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

      <section className="overflow-hidden rounded-2xl bg-[#111111] text-white shadow-[0_14px_34px_rgba(17,17,17,0.12)]">
        <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="p-4 sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] uppercase tracking-[0.34em] text-white/38">
                  Latest project
                </p>
                <h2 className="mt-2 font-whyte text-[clamp(2rem,3vw,3rem)] leading-none">
                  {latestProject?.title || "No project yet"}
                </h2>
              </div>
              {latestProject?.featured ? (
                <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-white/70">
                  Featured
                </span>
              ) : null}
            </div>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/62">
              {latestProject?.description ||
                "Create your first project to start tracking publishing and website visibility from the overview."}
            </p>

            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              <div className="rounded-2xl bg-white/6 px-3 py-3">
                <p className="text-[10px] uppercase tracking-[0.24em] text-white/38">Status</p>
                <p className="mt-2 text-sm">{latestProject?.status || "-"}</p>
              </div>
              <div className="rounded-2xl bg-white/6 px-3 py-3">
                <p className="text-[10px] uppercase tracking-[0.24em] text-white/38">Website</p>
                <p className="mt-2 truncate text-sm">{getProjectSubtitle(latestProject)}</p>
              </div>
              <div className="rounded-2xl bg-white/6 px-3 py-3">
                <p className="text-[10px] uppercase tracking-[0.24em] text-white/38">Updated</p>
                <p className="mt-2 text-sm">
                  {latestProject?.updatedAt ? formatDate(latestProject.updatedAt) : "-"}
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href="/admin/projects"
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-3 py-2 text-sm font-medium text-black transition hover:bg-[#eef1f5]"
              >
                Manage projects
                <IconArrowUpRight size={16} stroke={1.8} />
              </Link>
              {latestProject?.liveUrl ? (
                <a
                  href={latestProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl bg-[#eef3ff] px-3 py-2 text-sm font-medium text-[#2458cc] transition hover:bg-[#dfe8ff]"
                >
                  Open live site
                  <IconExternalLink size={16} stroke={1.8} />
                </a>
              ) : null}
            </div>
          </div>

          <div className="border-t border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-4 lg:border-l lg:border-t-0">
            <div className="rounded-2xl bg-white/6 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[10px] uppercase tracking-[0.28em] text-white/40">Snapshot</p>
                {latestProject?.featured ? (
                  <IconSparkles size={16} stroke={1.8} className="text-white/52" />
                ) : null}
              </div>

              {latestProject?.thumbnailUrl ? (
                <div className="mt-4 overflow-hidden rounded-2xl bg-white/10">
                  <img
                    src={latestProject.thumbnailUrl}
                    alt={latestProject.title}
                    className="h-40 w-full object-cover"
                  />
                </div>
              ) : (
                <div className="mt-4 flex h-40 items-center justify-center rounded-2xl bg-white text-black">
                  <span className="font-whyte text-5xl leading-none">
                    {latestProject?.title?.[0]?.toUpperCase() || "P"}
                  </span>
                </div>
              )}

              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between rounded-2xl bg-black/18 px-3 py-2 text-sm text-white/72">
                  <span>Website</span>
                  <span className="max-w-[9rem] truncate text-right text-white">
                    {getProjectSubtitle(latestProject)}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-black/18 px-3 py-2 text-sm text-white/72">
                  <span>Freshness</span>
                  <span className="text-white">
                    {latestProject?.updatedAt ? getFreshnessLabel(latestProject.updatedAt) : "-"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
