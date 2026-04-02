import {
  deleteAdminProject,
  updateAdminProject,
} from "@/app/admin/_server/projects";

export const PATCH = updateAdminProject;
export const DELETE = deleteAdminProject;
