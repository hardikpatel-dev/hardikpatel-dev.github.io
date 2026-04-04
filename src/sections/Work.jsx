import React from "react";
import { IconCircleArrowDownRight, IconCopyright } from "@tabler/icons-react";
import WorkTile from "@/components/WorkTile";
import FadeUpTextScroll from "@/app/animations/FadeUpTextScroll";
import FlipOnScroll from "@/app/animations/FlipOnScroll";
import { unstable_noStore as noStore } from "next/cache";
import { prisma } from "@/lib/prisma";
import fallbackProjects from "@/data/projects";

const Work = async () => {
  const isExport = process.env.EXPORT === "true";

  const projects = isExport
    ? fallbackProjects
        .slice()
        .sort((a, b) => a.order - b.order)
        .map((project) => ({
          id: project.id,
          sortOrder: project.order,
          title: project.name,
          liveUrl: project.link,
          faviconUrl: project.favicon,
          thumbnailUrl: project.thumbnail,
          videoUrl: project.video,
          industry: project.industry,
          publishedYear: Number(project.published),
          description: project.description,
        }))
    : await (async () => {
        try {
          noStore();
          return await prisma.project.findMany({
            where: {
              status: "PUBLISHED",
            },
            orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
          });
        } catch (error) {
          console.error("Prisma error in Work section:", error.message);
          return fallbackProjects
            .slice()
            .sort((a, b) => a.order - b.order)
            .map((project) => ({
              id: project.id,
              sortOrder: project.order,
              title: project.name,
              liveUrl: project.link,
              faviconUrl: project.favicon,
              thumbnailUrl: project.thumbnail,
              videoUrl: project.video,
              industry: project.industry,
              publishedYear: Number(project.published),
              description: project.description,
            }));
        }
      })();

  const sortedProjects = projects.map((project) => ({
    id: project.id,
    order: project.sortOrder,
    name: project.title,
    link: project.liveUrl || "#",
    favicon: project.faviconUrl || "/assets/hardik-ai.png",
    thumbnail: project.thumbnailUrl || "/assets/hero-demo.png",
    video: project.videoUrl,
    industry: project.industry || "Not specified",
    published: project.publishedYear ? String(project.publishedYear) : "N/A",
    description: project.description,
  }));

  return (
    <>
      <section
        id="work"
        data-cursor=""
        className="opacity-100 work-section bg-primary mt-10 lg:mt-30 min-h-screen  section-clip border-y-2 z-1 relative"
      >
        <div className="pt-20 container-fluid">
          <FlipOnScroll delay={0.5}>
          <IconCircleArrowDownRight
            stroke={1}
            size={50}
            className="text-text-muted lg:translate-x-[-60px]"
            />
            </FlipOnScroll>
          <div className="flex items-end justify-between ">
            <div className="heading mt-8 lg:mt-4 text-text-heading">
              <FadeUpTextScroll delay={0.5}>Selected Works</FadeUpTextScroll>
            </div>
            <div className="text-md flex items-center justify-center gap-1 text-text-muted">
              <IconCopyright stroke={2} />
              {new Date().getFullYear()}
            </div>
          </div>
          {/* work listing */}
          <div className="wrapper grid grid-cols-1 gap-12">
            {sortedProjects.length > 0 ? (
              sortedProjects.map((project) => (
                <WorkTile key={project.id} project={project} />
              ))
            ) : (
              <p className="text-sm text-text-muted">No projects found.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Work;
