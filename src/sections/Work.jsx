import React from "react";
import projects from "@/data/projects";
import { IconCircleArrowDownRight, IconCopyright } from "@tabler/icons-react";
import WorkTile from "@/components/WorkTile";

const Work = () => {
  return (
    <>
      <section
        id="work"
        className="opacity-100 work-section bg-primary mt-10 lg:mt-30 min-h-screen  section-clip border-y-2 z-1 relative"
      >
        <div className="pt-20 container-fluid">
          <IconCircleArrowDownRight
            stroke={1}
            size={50}
            className="text-text-muted lg:translate-x-[-60px]"
          />
          <div className="flex items-end justify-between ">
            <div className="heading mt-8 lg:mt-4 text-text-heading">
              Selected Works
            </div>
            <div className="text-md flex items-center justify-center gap-1 text-text-muted">
              <IconCopyright stroke={2} />
              {new Date().getFullYear()}
            </div>
          </div>
          {/* work listing */}
          <div className="wrapper grid grid-cols-1 gap-12">
            {projects
              .sort((a, b) => a.order - b.order)
              .map((project) => (
                <WorkTile key={project.id} project={project} />
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Work;
