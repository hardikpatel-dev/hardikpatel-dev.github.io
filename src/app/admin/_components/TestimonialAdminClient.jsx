"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  IconAlertTriangle,
  IconBrandLinkedinFilled,
  IconCheck,
  IconMessageCircle2,
  IconPencil,
  IconPhoto,
  IconPlus,
  IconQuote,
  IconTrash,
  IconUpload,
  IconUserCircle,
  IconX,
} from "@tabler/icons-react";
import toast from "react-hot-toast";

const emptyForm = {
  name: "",
  designation: "",
  imageUrl: "",
  feedback: "",
  linkedinUrl: "",
  sortOrder: "0",
  status: "DRAFT",
};

function getFormState(testimonial) {
  if (!testimonial) {
    return emptyForm;
  }

  return {
    name: testimonial.name || "",
    designation: testimonial.designation || "",
    imageUrl: testimonial.imageUrl || "",
    feedback: testimonial.feedback || "",
    linkedinUrl: testimonial.linkedinUrl || "",
    sortOrder: String(testimonial.sortOrder ?? 0),
    status: testimonial.status || "DRAFT",
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

function validateTestimonialForm(formState) {
  const errors = {};

  if (!formState.name.trim()) {
    errors.name = "Name is required.";
  }

  if (!formState.designation.trim()) {
    errors.designation = "Designation is required.";
  }

  if (!formState.feedback.trim()) {
    errors.feedback = "Feedback is required.";
  }

  if (!/^-?\d+$/.test(String(formState.sortOrder).trim())) {
    errors.sortOrder = "Sort order must be a whole number.";
  }

  if (formState.linkedinUrl && !isValidOptionalUrl(formState.linkedinUrl)) {
    errors.linkedinUrl = "Use a valid http or https URL.";
  }

  if (
    formState.imageUrl &&
    !formState.imageUrl.startsWith("/") &&
    !isValidOptionalUrl(formState.imageUrl)
  ) {
    errors.imageUrl = "Use an absolute URL or a local /assets path.";
  }

  return errors;
}

function sanitizeAssetKey(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "testimonial";
}

function AssetUploadField({ value, assetKey, onUploaded, error }) {
  const [isUploading, setIsUploading] = useState(false);

  async function handleChange(event) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("assetType", "thumbnail");
    formData.append("projectSlug", assetKey);
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
      toast.success("Photo uploaded.");
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
      <span className="text-sm">Profile photo</span>
      <label className="block cursor-pointer rounded-2xl bg-[#f5f6f8] p-4 ring-1 ring-black/6 transition hover:bg-[#eff1f4]">
        <input
          type="file"
          accept=".png,.jpg,.jpeg,.webp,.avif,image/*"
          className="hidden"
          onChange={handleChange}
        />
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-black shadow-[0_8px_18px_rgba(17,17,17,0.06)]">
              <IconPhoto size={18} stroke={1.8} />
            </div>
            <div>
              <p className="text-sm font-medium text-text-heading">
                {isUploading ? "Uploading..." : "Upload testimonial image"}
              </p>
              <p className="mt-1 text-xs text-text-muted">PNG, JPG, WEBP, AVIF</p>
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
              Photo linked
            </div>
            <p className="mt-2 break-all text-sm text-text">{value}</p>
            <div className="mt-3 overflow-hidden rounded-2xl bg-[#f3f4f6]">
              <img src={value} alt="Testimonial preview" className="h-40 w-full object-cover" />
            </div>
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
      <div className="w-full max-w-4xl overflow-hidden rounded-2xl bg-[linear-gradient(180deg,#ffffff,#f5f6f8)] text-text shadow-[0_28px_80px_rgba(17,17,17,0.14)] ring-1 ring-black/6">
        <div className="flex items-center justify-between border-b border-black/6 px-6 py-5 sm:px-7">
          <div>
            <p className="text-[11px] uppercase tracking-[0.34em] text-text-muted">
              Testimonials
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

function TestimonialFormModal({
  testimonial,
  statusOptions,
  onClose,
  onSubmit,
  isPending,
}) {
  const [formState, setFormState] = useState(getFormState(testimonial));
  const [fieldErrors, setFieldErrors] = useState({});
  const isEditing = Boolean(testimonial);

  useEffect(() => {
    setFormState(getFormState(testimonial));
    setFieldErrors({});
  }, [testimonial]);

  function updateField(name, value) {
    setFormState((currentState) => ({
      ...currentState,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const clientErrors = validateTestimonialForm(formState);

    if (Object.keys(clientErrors).length > 0) {
      setFieldErrors(clientErrors);
      toast.error("Fix the highlighted fields.");
      return;
    }

    const serverErrors = await onSubmit(formState, testimonial?.id);

    if (serverErrors) {
      setFieldErrors(serverErrors);
    }
  }

  return (
    <ModalShell
      onClose={onClose}
      title={isEditing ? "Edit testimonial" : "Create testimonial"}
    >
      <div className="flex flex-col max-h-[85vh]">
        <form id="testimonial-form" onSubmit={handleSubmit} className="overflow-y-auto px-6 py-6 sm:px-7 flex-1">
          <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-5">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-3 text-sm">
                  <span>Name</span>
                  <input
                    value={formState.name}
                    onChange={(event) => updateField("name", event.target.value)}
                    className="w-full rounded-2xl bg-white px-4 py-3.5 text-text outline-none ring-1 ring-black/6 transition focus:ring-black/16"
                  />
                  {fieldErrors.name ? <p className="text-xs text-red-500">{fieldErrors.name}</p> : null}
                </label>

                <label className="space-y-3 text-sm">
                  <span>Designation</span>
                  <input
                    value={formState.designation}
                    onChange={(event) => updateField("designation", event.target.value)}
                    className="w-full rounded-2xl bg-white px-4 py-3.5 text-text outline-none ring-1 ring-black/6 transition focus:ring-black/16"
                  />
                  {fieldErrors.designation ? (
                    <p className="text-xs text-red-500">{fieldErrors.designation}</p>
                  ) : null}
                </label>
              </div>

              <label className="block space-y-3 text-sm">
                <span>Feedback</span>
                <textarea
                  value={formState.feedback}
                  onChange={(event) => updateField("feedback", event.target.value)}
                  rows={7}
                  className="w-full rounded-2xl bg-white px-4 py-3.5 text-text outline-none ring-1 ring-black/6 transition focus:ring-black/16"
                />
                {fieldErrors.feedback ? (
                  <p className="text-xs text-red-500">{fieldErrors.feedback}</p>
                ) : null}
              </label>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-3 text-sm">
                  <span>LinkedIn URL</span>
                  <input
                    value={formState.linkedinUrl}
                    onChange={(event) => updateField("linkedinUrl", event.target.value)}
                    className="w-full rounded-2xl bg-white px-4 py-3.5 text-text outline-none ring-1 ring-black/6 transition focus:ring-black/16"
                  />
                  {fieldErrors.linkedinUrl ? (
                    <p className="text-xs text-red-500">{fieldErrors.linkedinUrl}</p>
                  ) : null}
                </label>

                <label className="space-y-3 text-sm">
                  <span>Sort Order</span>
                  <input
                    value={formState.sortOrder}
                    onChange={(event) => updateField("sortOrder", event.target.value)}
                    className="w-full rounded-2xl bg-white px-4 py-3.5 text-text outline-none ring-1 ring-black/6 transition focus:ring-black/16"
                  />
                  {fieldErrors.sortOrder ? (
                    <p className="text-xs text-red-500">{fieldErrors.sortOrder}</p>
                  ) : null}
                </label>
              </div>

              <label className="space-y-3 text-sm">
                <span>Status</span>
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
                {fieldErrors.status ? <p className="text-xs text-red-500">{fieldErrors.status}</p> : null}
              </label>
            </div>

            <div className="space-y-5">
              <AssetUploadField
                value={formState.imageUrl}
                assetKey={sanitizeAssetKey(formState.name)}
                onUploaded={(url) => updateField("imageUrl", url)}
                error={fieldErrors.imageUrl}
              />

              <div className="rounded-2xl bg-white p-5 ring-1 ring-black/6">
                <p className="text-[11px] uppercase tracking-[0.3em] text-text-muted">Preview</p>
                <div className="mt-4 flex items-center gap-3">
                  {formState.imageUrl ? (
                    <img
                      src={formState.imageUrl}
                      alt={formState.name || "Testimonial"}
                      className="h-16 w-16 rounded-2xl object-cover"
                    />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#111111] text-white">
                      <IconUserCircle size={24} stroke={1.8} />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="truncate font-medium text-text-heading">
                      {formState.name || "Testimonial name"}
                    </p>
                    <p className="mt-1 truncate text-sm text-text-muted">
                      {formState.designation || "Role or designation"}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-text">
                  {formState.feedback || "Feedback preview will appear here."}
                </p>
              </div>
            </div>
          </div>
        </form>

        <div className="border-t border-black/6 bg-white px-6 py-5 sm:px-7 flex flex-wrap gap-3">
          <button
            type="submit"
            form="testimonial-form"
            disabled={isPending}
            className="rounded-2xl bg-[#111111] px-5 py-3 text-sm font-medium text-white transition hover:bg-black disabled:opacity-60"
          >
            {isPending ? "Saving..." : isEditing ? "Update testimonial" : "Create testimonial"}
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

function DeleteTestimonialModal({ testimonial, onClose, onConfirm, isPending }) {
  return (
    <ModalShell onClose={onClose} title="Delete testimonial">
      <div className="flex flex-col max-h-[85vh]">
        <div className="overflow-y-auto px-6 py-6 sm:px-7 flex-1">
          <div className="rounded-2xl bg-[#fff4f3] p-5 ring-1 ring-[#f2d4d1]">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#d15b52] shadow-[0_10px_24px_rgba(17,17,17,0.06)]">
                <IconAlertTriangle size={20} />
              </div>
              <div>
                <h3 className="font-whyte text-3xl leading-none text-text-heading">{testimonial?.name}</h3>
                <p className="mt-4 max-w-xl text-sm leading-7 text-text-muted">
                  This action removes the testimonial record from the database. Public testimonial listings will update after deletion.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-black/6 bg-white px-6 py-5 sm:px-7 flex flex-wrap gap-3">
          <button
            type="button"
            disabled={isPending}
            onClick={() => onConfirm(testimonial.id)}
            className="rounded-2xl bg-[#d15b52] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#bf4d45] disabled:opacity-60"
          >
            {isPending ? "Deleting..." : "Delete testimonial"}
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

function getStatusTone(status) {
  if (status === "PUBLISHED") {
    return "bg-[#e8f5ec] text-[#1d6b3a]";
  }

  if (status === "DRAFT") {
    return "bg-[#fff3dd] text-[#8a5a00]";
  }

  return "bg-[#eceef2] text-[#4b515d]";
}

export default function TestimonialAdminClient({ testimonials, statusOptions }) {
  const router = useRouter();
  const [modalState, setModalState] = useState({ type: null, testimonialId: null });
  const [isPending, startTransition] = useTransition();

  const selectedTestimonial =
    testimonials.find((testimonial) => testimonial.id === modalState.testimonialId) || null;

  const metrics = useMemo(() => {
    const published = testimonials.filter(
      (testimonial) => testimonial.status === "PUBLISHED"
    ).length;
    const linked = testimonials.filter((testimonial) => Boolean(testimonial.linkedinUrl)).length;
    const drafts = testimonials.filter((testimonial) => testimonial.status === "DRAFT").length;

    return [
      { label: "Total", value: testimonials.length, icon: IconQuote, tone: "bg-[#121212] text-white", iconClassName: "text-white/10" },
      { label: "Published", value: published, icon: IconCheck, tone: "bg-white text-text-heading shadow-[0_10px_30px_rgba(17,17,17,0.05)]", iconClassName: "text-[#111111]/10" },
      { label: "LinkedIn", value: linked, icon: IconBrandLinkedinFilled, tone: "bg-white text-text-heading shadow-[0_10px_30px_rgba(17,17,17,0.05)]", iconClassName: "text-[#111111]/10" },
      { label: "Drafts", value: drafts, icon: IconMessageCircle2, tone: "bg-white text-text-heading shadow-[0_10px_30px_rgba(17,17,17,0.05)]", iconClassName: "text-[#111111]/10" },
    ];
  }, [testimonials]);

  async function handleSave(formState, testimonialId) {
    const isEditing = Boolean(testimonialId);
    const endpoint = isEditing
      ? `/api/admin/testimonials/${testimonialId}`
      : "/api/admin/testimonials";
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
      toast.error(result.error || "Testimonial save failed.");
      return result.fieldErrors || {};
    }

    toast.success(isEditing ? "Testimonial updated." : "Testimonial created.");
    setModalState({ type: null, testimonialId: null });
    startTransition(() => {
      router.refresh();
    });

    return null;
  }

  async function handleDelete(testimonialId) {
    const response = await fetch(`/api/admin/testimonials/${testimonialId}`, {
      method: "DELETE",
    });

    const result = await response.json();

    if (!response.ok) {
      toast.error(result.error || "Testimonial delete failed.");
      return;
    }

    toast.success("Testimonial deleted.");
    setModalState({ type: null, testimonialId: null });
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
              Testimonials
            </h1>
          </div>
          <button
            type="button"
            onClick={() => setModalState({ type: "create", testimonialId: null })}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#111111] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-black"
          >
            <IconPlus size={16} stroke={1.8} />
            Add testimonial
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

        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.length > 0 ? (
            testimonials.map((testimonial) => (
              <article
                key={testimonial.id}
                className="rounded-2xl bg-white p-4 shadow-[0_12px_40px_rgba(17,17,17,0.05)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {testimonial.imageUrl ? (
                      <img
                        src={testimonial.imageUrl}
                        alt={testimonial.name}
                        className="h-14 w-14 rounded-2xl object-cover"
                      />
                    ) : (
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#111111] text-white">
                        <IconUserCircle size={22} stroke={1.8} />
                      </div>
                    )}
                    <div className="min-w-0">
                      <h3 className="truncate font-whyte text-[1.55rem] leading-none text-text-heading">
                        {testimonial.name}
                      </h3>
                      <p className="mt-1 truncate text-xs text-text-muted">
                        {testimonial.designation}
                      </p>
                    </div>
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-[9px] uppercase tracking-[0.2em] ${getStatusTone(testimonial.status)}`}>
                    {testimonial.status}
                  </span>
                </div>

                <p className="mt-4 line-clamp-5 text-sm leading-6 text-text">
                  &quot;{testimonial.feedback}&quot;
                </p>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <div className="text-xs text-text-muted">
                    Order: <span className="text-text">{testimonial.sortOrder}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      type="button"
                      onClick={() =>
                        setModalState({ type: "edit", testimonialId: testimonial.id })
                      }
                      className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-[#eef4ff] text-[#3f6fd8] transition hover:bg-[#dfeaff]"
                      aria-label={`Edit ${testimonial.name}`}
                      title="Edit testimonial"
                    >
                      <IconPencil size={14} stroke={1.8} />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setModalState({ type: "delete", testimonialId: testimonial.id })
                      }
                      className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-[#fff1f0] text-[#d15b52] transition hover:bg-[#ffe4e1]"
                      aria-label={`Delete ${testimonial.name}`}
                      title="Delete testimonial"
                    >
                      <IconTrash size={14} stroke={1.8} />
                    </button>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="rounded-2xl bg-white px-4 py-8 text-center text-sm text-text-muted md:col-span-2 xl:col-span-3">
              No testimonials found.
            </div>
          )}
        </div>
      </section>

      {(modalState.type === "create" || modalState.type === "edit") && (
        <TestimonialFormModal
          testimonial={modalState.type === "edit" ? selectedTestimonial : null}
          statusOptions={statusOptions}
          onClose={() => setModalState({ type: null, testimonialId: null })}
          onSubmit={handleSave}
          isPending={isPending}
        />
      )}

      {modalState.type === "delete" && selectedTestimonial ? (
        <DeleteTestimonialModal
          testimonial={selectedTestimonial}
          onClose={() => setModalState({ type: null, testimonialId: null })}
          onConfirm={handleDelete}
          isPending={isPending}
        />
      ) : null}
    </>
  );
}
