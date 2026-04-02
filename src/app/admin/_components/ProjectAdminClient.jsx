"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  IconAlertTriangle,
  IconCheck,
  IconExternalLink,
  IconFileText,
  IconFolders,
  IconPlanet,
  IconSparkles,
  IconMovie,
  IconPhoto,
  IconPencil,
  IconPlus,
  IconTrash,
  IconUpload,
  IconX,
} from "@tabler/icons-react";
import toast from "react-hot-toast";
import { slugify } from "@/app/admin/_lib/projects";

const emptyForm = {
  title: "",
  slug: "",
  description: "",
  liveUrl: "",
  faviconUrl: "",
  thumbnailUrl: "",
  videoUrl: "",
  industry: "",
  publishedYear: "",
  sortOrder: "0",
  featured: false,
  status: "DRAFT",
};

function getFormState(project) {
  if (!project) {
    return emptyForm;
  }

  return {
    title: project.title || "",
    slug: project.slug || "",
    description: project.description || "",
    liveUrl: project.liveUrl || "",
    faviconUrl: project.faviconUrl || "",
    thumbnailUrl: project.thumbnailUrl || "",
    videoUrl: project.videoUrl || "",
    industry: project.industry || "",
    publishedYear: project.publishedYear ? String(project.publishedYear) : "",
    sortOrder: String(project.sortOrder ?? 0),
    featured: Boolean(project.featured),
    status: project.status || "DRAFT",
  };
}

function isValidOptionalUrl(value) {
  if (!value) {
    return true;
  }

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function validateProjectForm(formState) {
  const errors = {};

  if (!formState.title.trim()) {
    errors.title = "Title is required.";
  }

  if (!formState.description.trim()) {
    errors.description = "Description is required.";
  }

  if (formState.slug.trim() && !slugify(formState.slug)) {
    errors.slug = "Slug can only contain letters, numbers, and hyphens.";
  }

  if (formState.publishedYear && !/^\d{4}$/.test(formState.publishedYear)) {
    errors.publishedYear = "Use a 4-digit year.";
  }

  if (!/^-?\d+$/.test(String(formState.sortOrder).trim())) {
    errors.sortOrder = "Sort order must be a whole number.";
  }

  if (!isValidOptionalUrl(formState.liveUrl)) {
    errors.liveUrl = "Use a valid http or https URL.";
  }

  ["faviconUrl", "thumbnailUrl", "videoUrl"].forEach((field) => {
    const value = formState[field];
    if (value && !value.startsWith("/") && !isValidOptionalUrl(value)) {
      errors[field] = "Use an absolute URL or a local /assets path.";
    }
  });

  return errors;
}

function AssetUploadField({
  assetType,
  label,
  accept,
  value,
  projectSlug,
  onUploaded,
  error,
}) {
  const [isUploading, setIsUploading] = useState(false);

  const isImageAsset = assetType !== "video";

  async function handleChange(event) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("assetType", assetType);
    formData.append("projectSlug", projectSlug || "project");
    formData.append("file", file);

    setIsUploading(true);

    try {
      const response = await fetch("/api/admin/uploads", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.error || "Upload failed.");
        return;
      }

      onUploaded(result.url);
      toast.success(`${label} uploaded.`);
    } catch (uploadError) {
      console.error(uploadError);
      toast.error("Upload failed.");
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  }

  return (
    <div className="space-y-2">
      <span className="text-sm">{label}</span>
      <label className="block cursor-pointer rounded-2xl bg-[#f5f6f8] p-4 ring-1 ring-black/6 transition hover:bg-[#eff1f4]">
        <input type="file" accept={accept} className="hidden" onChange={handleChange} />
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-black shadow-[0_8px_18px_rgba(17,17,17,0.06)]">
              {isImageAsset ? <IconPhoto size={18} stroke={1.8} /> : <IconMovie size={18} stroke={1.8} />}
            </div>
            <div>
              <p className="text-sm font-medium text-text-heading">
                {isUploading ? "Uploading..." : `Upload ${label.toLowerCase()}`}
              </p>
              <p className="mt-1 text-xs text-text-muted">
                {assetType === "video" ? "MP4, WEBM, MOV" : "PNG, JPG, WEBP, AVIF, SVG"}
              </p>
            </div>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-text shadow-[0_8px_18px_rgba(17,17,17,0.06)]">
            <IconUpload size={16} stroke={1.8} />
          </div>
        </div>

        {value ? (
          <div className="mt-4 rounded-2xl bg-white p-3 shadow-[0_10px_24px_rgba(17,17,17,0.05)] ring-1 ring-black/5">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-text-muted">
              <IconCheck size={14} stroke={2} />
              Asset linked
            </div>
            <p className="mt-2 break-all text-sm text-text">{value}</p>
            {isImageAsset ? (
              <div className="mt-3 overflow-hidden rounded-2xl bg-[#f3f4f6]">
                <img src={value} alt={label} className="h-32 w-full object-cover" />
              </div>
            ) : (
              <div className="mt-3 rounded-2xl bg-[#f3f4f6] px-3 py-3 text-sm text-text-muted">
                Video file ready
              </div>
            )}
          </div>
        ) : null}
      </label>
      {error ? <p className="text-xs text-red-500">{error}</p> : null}
    </div>
  );
}

function ModalShell({ children, onClose, title }) {
  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(247,248,250,0.74)] p-3 backdrop-blur-md">
      <div className="w-full max-w-5xl overflow-hidden rounded-2xl bg-[linear-gradient(180deg,#ffffff,#f5f6f8)] text-text shadow-[0_28px_80px_rgba(17,17,17,0.14)] ring-1 ring-black/6">
        <div className="flex items-center justify-between border-b border-black/6 px-6 py-5 sm:px-7">
          <div>
            <p className="text-[11px] uppercase tracking-[0.34em] text-text-muted">
              Projects
            </p>
            <h2 className="mt-2 font-whyte text-3xl leading-none text-text-heading">{title}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-text shadow-[0_8px_22px_rgba(17,17,17,0.06)] transition hover:bg-[#f1f3f6]"
          >
            <IconX size={18} stroke={1.8} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function ProjectFormModal({
  project,
  statusOptions,
  onClose,
  onSubmit,
  isPending,
}) {
  const [formState, setFormState] = useState(getFormState(project));
  const [fieldErrors, setFieldErrors] = useState({});
  const [activeTab, setActiveTab] = useState("basic");
  const isEditing = Boolean(project);
  const previewSlug = useMemo(() => slugify(formState.slug || formState.title), [formState.slug, formState.title]);

  useEffect(() => {
    setFormState(getFormState(project));
    setFieldErrors({});
    setActiveTab("basic");
  }, [project]);

  function updateField(name, value) {
    setFormState((currentState) => ({
      ...currentState,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const clientErrors = validateProjectForm(formState);

    if (Object.keys(clientErrors).length > 0) {
      setFieldErrors(clientErrors);
      toast.error("Fix the highlighted fields.");
      return;
    }

    const serverErrors = await onSubmit(formState, project?.id);

    if (serverErrors) {
      setFieldErrors(serverErrors);
    }
  }

  const tabs = [
    { id: "basic", label: "Basic info" },
    { id: "files", label: "Files" },
    { id: "publishing", label: "Publishing" },
  ];

  return (
    <ModalShell
      onClose={onClose}
      title={isEditing ? "Edit project" : "Create project"}
    >
      <form onSubmit={handleSubmit} className="max-h-[85vh] overflow-y-auto px-6 py-6 sm:px-7">
        <div className="flex flex-wrap gap-2 border-b border-black/6 pb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-2xl px-4 py-2 text-sm transition ${
                activeTab === tab.id
                  ? "bg-[#111111] text-white shadow-[0_12px_24px_rgba(17,17,17,0.14)]"
                  : "bg-white text-text-muted ring-1 ring-black/6 hover:bg-[#f3f4f6]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-5 space-y-5">
          {activeTab === "basic" ? (
            <>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-3 text-sm">
                  <span>Title</span>
                  <input
                    value={formState.title}
                    onChange={(event) => updateField("title", event.target.value)}
                    className="w-full rounded-2xl bg-white px-4 py-3.5 text-text outline-none ring-1 ring-black/6 transition focus:ring-black/16"
                  />
                  {fieldErrors.title ? (
                    <p className="text-xs text-red-500">{fieldErrors.title}</p>
                  ) : null}
                </label>

                <label className="space-y-3 text-sm">
                  <span>Slug</span>
                  <input
                    value={formState.slug}
                    onChange={(event) => updateField("slug", event.target.value)}
                    className="w-full rounded-2xl bg-white px-4 py-3.5 text-text outline-none ring-1 ring-black/6 transition focus:ring-black/16"
                    placeholder="Leave empty to auto-generate"
                  />
                  <p className="text-xs text-text-muted">
                    Final slug: <span className="text-text">{previewSlug || "-"}</span>
                  </p>
                  {fieldErrors.slug ? (
                    <p className="text-xs text-red-500">{fieldErrors.slug}</p>
                  ) : null}
                </label>
              </div>

              <label className="block space-y-3 text-sm">
                <span>Description</span>
                <textarea
                  value={formState.description}
                  onChange={(event) => updateField("description", event.target.value)}
                  rows={6}
                  className="w-full rounded-2xl bg-white px-4 py-3.5 text-text outline-none ring-1 ring-black/6 transition focus:ring-black/16"
                />
                {fieldErrors.description ? (
                  <p className="text-xs text-red-500">{fieldErrors.description}</p>
                ) : null}
              </label>

              <div className="grid gap-4 md:grid-cols-2">
                {[
                  ["liveUrl", "Live URL"],
                  ["industry", "Industry"],
                ].map(([field, label]) => (
                  <label key={field} className="space-y-3 text-sm">
                    <span>{label}</span>
                    <input
                      value={formState[field]}
                      onChange={(event) => updateField(field, event.target.value)}
                      className="w-full rounded-2xl bg-white px-4 py-3.5 text-text outline-none ring-1 ring-black/6 transition focus:ring-black/16"
                    />
                    {fieldErrors[field] ? (
                      <p className="text-xs text-red-500">{fieldErrors[field]}</p>
                    ) : null}
                  </label>
                ))}
              </div>
            </>
          ) : null}

          {activeTab === "files" ? (
            <>
              <div className="grid gap-4 md:grid-cols-2">
                <AssetUploadField
                  assetType="favicon"
                  label="Favicon"
                  accept=".png,.jpg,.jpeg,.webp,.svg,.ico,image/*"
                  value={formState.faviconUrl}
                  projectSlug={previewSlug}
                  onUploaded={(url) => updateField("faviconUrl", url)}
                  error={fieldErrors.faviconUrl}
                />
                <AssetUploadField
                  assetType="thumbnail"
                  label="Thumbnail"
                  accept=".png,.jpg,.jpeg,.webp,.avif,image/*"
                  value={formState.thumbnailUrl}
                  projectSlug={previewSlug}
                  onUploaded={(url) => updateField("thumbnailUrl", url)}
                  error={fieldErrors.thumbnailUrl}
                />
              </div>

              <AssetUploadField
                assetType="video"
                label="Video"
                accept=".mp4,.webm,.mov,video/*"
                value={formState.videoUrl}
                projectSlug={previewSlug}
                onUploaded={(url) => updateField("videoUrl", url)}
                error={fieldErrors.videoUrl}
              />
            </>
          ) : null}

          {activeTab === "publishing" ? (
            <div className="grid gap-4 xl:grid-cols-[minmax(0,1.1fr)_280px]">
              <div className="rounded-2xl bg-[#f5f6f8] p-5 ring-1 ring-black/6">
                <p className="text-[11px] uppercase tracking-[0.3em] text-text-muted">
                  Record settings
                </p>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <label className="space-y-3 text-sm">
                    <span className="text-text/88">Published Year</span>
                    <input
                      value={formState.publishedYear}
                      onChange={(event) => updateField("publishedYear", event.target.value)}
                      className="w-full rounded-2xl bg-white px-4 py-3.5 outline-none ring-1 ring-black/6 transition focus:ring-black/16"
                    />
                    {fieldErrors.publishedYear ? (
                      <p className="text-xs text-red-500">{fieldErrors.publishedYear}</p>
                    ) : null}
                  </label>

                  <label className="space-y-3 text-sm">
                    <span className="text-text/88">Sort Order</span>
                    <input
                      value={formState.sortOrder}
                      onChange={(event) => updateField("sortOrder", event.target.value)}
                      className="w-full rounded-2xl bg-white px-4 py-3.5 outline-none ring-1 ring-black/6 transition focus:ring-black/16"
                    />
                    {fieldErrors.sortOrder ? (
                      <p className="text-xs text-red-500">{fieldErrors.sortOrder}</p>
                    ) : null}
                  </label>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-[minmax(0,1fr)_220px]">
                  <label className="space-y-3 text-sm">
                    <span className="text-text/88">Status</span>
                    <select
                      value={formState.status}
                      onChange={(event) => updateField("status", event.target.value)}
                      className="w-full rounded-2xl bg-white px-4 py-3.5 outline-none ring-1 ring-black/6 transition focus:ring-black/16"
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status} className="text-black">
                          {status}
                        </option>
                      ))}
                    </select>
                    {fieldErrors.status ? (
                      <p className="text-xs text-red-500">{fieldErrors.status}</p>
                    ) : null}
                  </label>

                  <div className="space-y-3 text-sm">
                    <span className="text-text/88">Feature</span>
                    <label className="flex h-[50px] items-center gap-3 rounded-2xl bg-white px-4 ring-1 ring-black/6">
                      <input
                        type="checkbox"
                        checked={formState.featured}
                        onChange={(event) => updateField("featured", event.target.checked)}
                        className="h-4 w-4 rounded border border-black/10"
                      />
                      <span>Featured project</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl bg-white p-5 ring-1 ring-black/6">
                <p className="text-[11px] uppercase tracking-[0.3em] text-text-muted">
                  Visibility
                </p>
                <p className="mt-3 text-sm leading-6 text-text">
                  {formState.status === "PUBLISHED"
                    ? "Published projects will appear on the public site."
                    : "Draft and archived records stay hidden from public sections."}
                </p>
              </div>
            </div>
          ) : null}
        </div>

        <div className="mt-6 flex flex-wrap gap-3 border-t border-black/6 pt-5">
          <button
            type="submit"
            disabled={isPending}
            className="rounded-2xl bg-[#111111] px-5 py-3 text-sm font-medium text-white transition hover:bg-black disabled:opacity-60"
          >
            {isPending ? "Saving..." : isEditing ? "Update project" : "Create project"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl bg-white px-5 py-3 text-sm text-text transition ring-1 ring-black/6 hover:bg-[#f3f4f6]"
          >
            Cancel
          </button>
        </div>
      </form>
    </ModalShell>
  );
}

function DeleteProjectModal({ project, onClose, onConfirm, isPending }) {
  return (
    <ModalShell onClose={onClose} title="Delete project">
      <div className="px-6 py-6 sm:px-7">
        <div className="rounded-2xl bg-[#fff4f3] p-5 ring-1 ring-[#f2d4d1]">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#d15b52] shadow-[0_10px_24px_rgba(17,17,17,0.06)]">
              <IconAlertTriangle size={20} />
            </div>
            <div>
              <h3 className="font-whyte text-3xl leading-none text-text-heading">{project?.title}</h3>
              <p className="mt-4 max-w-xl text-sm leading-7 text-text-muted">
                This action removes the project record from the database. Public work listings will update after deletion.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            disabled={isPending}
            onClick={() => onConfirm(project.id)}
            className="rounded-2xl bg-[#d15b52] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#bf4d45] disabled:opacity-60"
          >
            {isPending ? "Deleting..." : "Delete project"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl bg-white px-5 py-3 text-sm text-text transition ring-1 ring-black/6 hover:bg-[#f3f4f6]"
          >
            Cancel
          </button>
        </div>
      </div>
    </ModalShell>
  );
}

function formatDate(value) {
  if (!value) {
    return "-";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
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

function getStatusTone(status) {
  if (status === "PUBLISHED") {
    return "bg-[#e8f5ec] text-[#1d6b3a]";
  }

  if (status === "DRAFT") {
    return "bg-[#fff3dd] text-[#8a5a00]";
  }

  return "bg-[#eceef2] text-[#4b515d]";
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

export default function ProjectAdminClient({ projects, statusOptions }) {
  const router = useRouter();
  const [modalState, setModalState] = useState({ type: null, projectId: null });
  const [isPending, startTransition] = useTransition();

  const selectedProject =
    projects.find((project) => project.id === modalState.projectId) || null;

  const metrics = useMemo(() => {
    const published = projects.filter((project) => project.status === "PUBLISHED").length;
    const live = projects.filter((project) => Boolean(project.liveUrl)).length;
    const featured = projects.filter((project) => project.featured).length;

    return [
      {
        label: "Total",
        value: projects.length,
        tone: "bg-[#121212] text-white",
        icon: IconFolders,
        iconClassName: "text-white/10",
      },
      {
        label: "Published",
        value: published,
        tone: "bg-white text-text-heading shadow-[0_10px_30px_rgba(17,17,17,0.05)]",
        icon: IconFileText,
        iconClassName: "text-[#111111]/10",
      },
      {
        label: "Live URLs",
        value: live,
        tone: "bg-white text-text-heading shadow-[0_10px_30px_rgba(17,17,17,0.05)]",
        icon: IconPlanet,
        iconClassName: "text-[#111111]/10",
      },
      {
        label: "Featured",
        value: featured,
        tone: "bg-white text-text-heading shadow-[0_10px_30px_rgba(17,17,17,0.05)]",
        icon: IconSparkles,
        iconClassName: "text-[#111111]/10",
      },
    ];
  }, [projects]);

  async function handleSave(formState, projectId) {
    const isEditing = Boolean(projectId);
    const endpoint = isEditing
      ? `/api/admin/projects/${projectId}`
      : "/api/admin/projects";
    const method = isEditing ? "PATCH" : "POST";

    const response = await fetch(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formState),
    });

    const result = await response.json();

    if (!response.ok) {
      toast.error(result.error || "Project save failed.");
      return result.fieldErrors || {};
    }

    toast.success(isEditing ? "Project updated." : "Project created.");
    setModalState({ type: null, projectId: null });
    startTransition(() => {
      router.refresh();
    });

    return null;
  }

  async function handleDelete(projectId) {
    const response = await fetch(`/api/admin/projects/${projectId}`, {
      method: "DELETE",
    });

    const result = await response.json();

    if (!response.ok) {
      toast.error(result.error || "Project delete failed.");
      return;
    }

    toast.success("Project deleted.");
    setModalState({ type: null, projectId: null });
    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <>
      <section className="overflow-hidden rounded-2xl bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(240,241,244,0.95))] px-5 py-4 shadow-[0_12px_40px_rgba(17,17,17,0.05)] sm:px-6 sm:py-5">
        <div className="flex items-start justify-between gap-3">
          <div className="max-w-4xl">
            <p className="text-[10px] uppercase tracking-[0.42em] text-text-muted">
              Website Admin
            </p>
            <h1 className="mt-2 font-whyte text-[clamp(2.1rem,3vw,3rem)] leading-[0.94] text-text-heading">
              Project Library
            </h1>
          </div>
          <button
            type="button"
            onClick={() => setModalState({ type: "create", projectId: null })}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#111111] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-black"
          >
            <IconPlus size={16} stroke={1.8} />
            Add project
          </button>
        </div>
      </section>

      <section>
        <div className="flex flex-wrap gap-2">
          {metrics.map((metric) => (
            <article
              key={metric.label}
              className={`relative min-w-[140px] flex-1 overflow-hidden rounded-2xl px-3 py-2.5 ${metric.tone}`}
            >
              <metric.icon
                size={54}
                stroke={1.5}
                className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 ${metric.iconClassName}`}
              />
              <p className="text-[10px] uppercase tracking-[0.26em] opacity-55">
                {metric.label}
              </p>
              <p className="mt-2 font-whyte text-[2rem] leading-none">{metric.value}</p>
            </article>
          ))}
        </div>

        <div className="mt-4 rounded-2xl bg-white shadow-[0_12px_40px_rgba(17,17,17,0.05)]">
          <div className="hidden overflow-x-auto lg:block">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="border-b border-black/6 text-left">
                  {["Project", "Visibility", "Website", "Order", "Updated", "Actions"].map((column) => (
                    <th
                      key={column}
                      className="px-4 py-2.5 text-[10px] font-medium uppercase tracking-[0.28em] text-text-muted"
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {projects.length > 0 ? (
                  projects.map((project) => (
                    <tr key={project.id} className="border-b border-black/6 last:border-b-0">
                      <td className="px-4 py-3 align-top">
                        <div className="min-w-[260px]">
                          <div className="min-w-0">
                            <p className="flex items-center gap-2 truncate font-whyte text-[1.45rem] leading-none text-text-heading">
                              <span className="truncate">{project.title}</span>
                              {project.featured ? (
                                <IconSparkles
                                  size={16}
                                  stroke={1.8}
                                  className="shrink-0 text-text-heading/55"
                                />
                              ) : null}
                            </p>
                            <p className="mt-1 truncate text-xs text-text-muted">
                              {getProjectSubtitle(project)}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 align-top">
                        <div className="flex min-w-[150px] flex-wrap gap-1.5">
                          <span className={`rounded-full px-2.5 py-1 text-[9px] uppercase tracking-[0.2em] ${getStatusTone(project.status)}`}>
                            {project.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 align-top">
                        <div className="min-w-[190px]">
                          {project.liveUrl ? (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="group inline-flex max-w-full items-center gap-2 rounded-full bg-[#e8f2ff] px-2.5 py-1 text-[10px] text-[#1f5fbf] transition hover:bg-[#dce9ff]"
                              title={project.liveUrl}
                            >
                              <IconExternalLink size={13} stroke={1.8} />
                              <span className="truncate">{project.liveUrl}</span>
                            </a>
                          ) : (
                            <span className="inline-flex rounded-full bg-[#eef0f3] px-2.5 py-1 text-[9px] uppercase tracking-[0.18em] text-[#7a808a]">
                              No website
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 align-top">
                        <div className="min-w-[72px]">
                          <p className="text-sm font-medium text-text">{project.sortOrder}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 align-top">
                        <div className="min-w-[110px]">
                          <p className="text-sm text-text">{formatDate(project.updatedAt)}</p>
                          <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-text-muted">
                            {getFreshnessLabel(project.updatedAt)}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3 align-top">
                        <div className="flex flex-wrap gap-1.5">
                          <button
                            type="button"
                            onClick={() =>
                              setModalState({ type: "edit", projectId: project.id })
                            }
                            className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-[#eef4ff] text-[#3f6fd8] transition hover:bg-[#dfeaff]"
                            aria-label={`Edit ${project.title}`}
                            title="Edit project"
                          >
                            <IconPencil size={14} stroke={1.8} />
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setModalState({ type: "delete", projectId: project.id })
                            }
                            className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-[#fff1f0] text-[#d15b52] transition hover:bg-[#ffe4e1]"
                            aria-label={`Delete ${project.title}`}
                            title="Delete project"
                          >
                            <IconTrash size={14} stroke={1.8} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-4 py-10 text-center text-sm text-text-muted">
                      No projects found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="grid gap-2 p-2 lg:hidden">
            {projects.length > 0 ? (
              projects.map((project) => (
                <article key={project.id} className="rounded-2xl bg-white px-3 py-3 shadow-[0_1px_0_rgba(0,0,0,0.04)]">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="flex items-center gap-2 truncate font-whyte text-[1.45rem] leading-none text-text-heading">
                        <span className="truncate">{project.title}</span>
                        {project.featured ? (
                          <IconSparkles
                            size={16}
                            stroke={1.8}
                            className="shrink-0 text-text-heading/55"
                          />
                        ) : null}
                      </h3>
                      <p className="mt-1 truncate text-xs text-text-muted">
                        {getProjectSubtitle(project)}
                      </p>
                    </div>
                    <span className={`shrink-0 rounded-full px-2.5 py-1 text-[9px] uppercase tracking-[0.2em] ${getStatusTone(project.status)}`}>
                      {project.status}
                    </span>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <div className="rounded-2xl bg-[#f1f2f5] px-3 py-2.5">
                      <p className="text-[10px] uppercase tracking-[0.24em] text-text-muted">
                        Website
                      </p>
                      {project.liveUrl ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-2 inline-flex max-w-full items-center gap-2 rounded-full bg-[#e8f2ff] px-2.5 py-1 text-[10px] text-[#1f5fbf]"
                          title={project.liveUrl}
                        >
                          <IconExternalLink size={13} stroke={1.8} />
                          <span className="truncate">{project.liveUrl}</span>
                        </a>
                      ) : (
                        <span className="mt-2 inline-flex rounded-full bg-[#eef0f3] px-2.5 py-1 text-[9px] uppercase tracking-[0.18em] text-[#7a808a]">
                          No website
                        </span>
                      )}
                    </div>
                    <div className="rounded-2xl bg-[#f1f2f5] px-3 py-2.5">
                      <p className="text-[10px] uppercase tracking-[0.24em] text-text-muted">
                        Order
                      </p>
                      <p className="mt-2 text-sm text-text">{project.sortOrder}</p>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-[0.22em] text-text-muted">
                        Updated
                      </p>
                      <p className="mt-1 text-xs text-text">{formatDate(project.updatedAt)}</p>
                      <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-text-muted">
                        {getFreshnessLabel(project.updatedAt)}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <button
                        type="button"
                        onClick={() =>
                          setModalState({ type: "edit", projectId: project.id })
                        }
                        className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-[#eef4ff] text-[#3f6fd8] transition hover:bg-[#dfeaff]"
                        aria-label={`Edit ${project.title}`}
                        title="Edit project"
                      >
                        <IconPencil size={14} stroke={1.8} />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setModalState({ type: "delete", projectId: project.id })
                        }
                        className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-[#fff1f0] text-[#d15b52] transition hover:bg-[#ffe4e1]"
                        aria-label={`Delete ${project.title}`}
                        title="Delete project"
                      >
                        <IconTrash size={14} stroke={1.8} />
                      </button>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="rounded-2xl bg-white px-4 py-8 text-center text-sm text-text-muted">
                No projects found.
              </div>
            )}
          </div>
        </div>
      </section>

      {(modalState.type === "create" || modalState.type === "edit") && (
        <ProjectFormModal
          project={modalState.type === "edit" ? selectedProject : null}
          statusOptions={statusOptions}
          onClose={() => setModalState({ type: null, projectId: null })}
          onSubmit={handleSave}
          isPending={isPending}
        />
      )}

      {modalState.type === "delete" && selectedProject ? (
        <DeleteProjectModal
          project={selectedProject}
          onClose={() => setModalState({ type: null, projectId: null })}
          onConfirm={handleDelete}
          isPending={isPending}
        />
      ) : null}
    </>
  );
}
