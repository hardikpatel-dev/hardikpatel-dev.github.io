const PROJECT_STATUSES = ["DRAFT", "PUBLISHED", "ARCHIVED"];

export function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function normalizeOptionalString(value) {
  if (typeof value !== "string") {
    return null;
  }

  const trimmedValue = value.trim();
  return trimmedValue ? trimmedValue : null;
}

function normalizeInteger(value, fieldName, errors, { allowNull = false } = {}) {
  if (value === "" || value === null || value === undefined) {
    return allowNull ? null : 0;
  }

  const parsedValue = Number.parseInt(String(value), 10);

  if (Number.isNaN(parsedValue)) {
    errors[fieldName] = `${fieldName} must be a valid number.`;
    return allowNull ? null : 0;
  }

  return parsedValue;
}

export function normalizeProjectPayload(payload) {
  const errors = {};
  const title = String(payload?.title || "").trim();
  const description = String(payload?.description || "").trim();
  const rawSlug = normalizeOptionalString(payload?.slug);
  const status = String(payload?.status || "DRAFT").toUpperCase();

  if (!title) {
    errors.title = "Title is required.";
  }

  if (!description) {
    errors.description = "Description is required.";
  }

  if (!PROJECT_STATUSES.includes(status)) {
    errors.status = "Status must be DRAFT, PUBLISHED, or ARCHIVED.";
  }

  const slug = slugify(rawSlug || title);

  if (!slug) {
    errors.slug = "Slug could not be generated. Add a title or custom slug.";
  }

  const data = {
    title,
    slug,
    description,
    liveUrl: normalizeOptionalString(payload?.liveUrl),
    faviconUrl: normalizeOptionalString(payload?.faviconUrl),
    thumbnailUrl: normalizeOptionalString(payload?.thumbnailUrl),
    videoUrl: normalizeOptionalString(payload?.videoUrl),
    industry: normalizeOptionalString(payload?.industry),
    publishedYear: normalizeInteger(payload?.publishedYear, "publishedYear", errors, {
      allowNull: true,
    }),
    sortOrder: normalizeInteger(payload?.sortOrder, "sortOrder", errors),
    featured: Boolean(payload?.featured),
    status,
  };

  return {
    data,
    errors,
    isValid: Object.keys(errors).length === 0,
  };
}

export function getProjectStatusOptions() {
  return PROJECT_STATUSES;
}
