import { prisma } from "@/lib/prisma";
import { getProjectStatusOptions } from "@/app/admin/_lib/projects";
import { requireAdminSession } from "@/app/admin/_lib/auth";
import ProjectAdminClient from "@/app/admin/_components/ProjectAdminClient";

export const metadata = {
  title: "Projects Admin | Hardik Patel",
  description: "Manage portfolio projects stored in PostgreSQL.",
};

export default async function AdminProjectsPage() {
  await requireAdminSession();
  const projects = await prisma.project.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return (
    <>
      <ProjectAdminClient
        projects={projects}
        statusOptions={getProjectStatusOptions()}
      />
    </>
  );
}
