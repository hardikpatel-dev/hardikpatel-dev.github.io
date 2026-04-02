import {
  createAdminProject,
  listAdminProjects,
} from "@/app/admin/_server/projects";

export const GET = listAdminProjects;
export const POST = createAdminProject;
