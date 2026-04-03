const TESTIMONIAL_STATUSES = ["DRAFT", "PUBLISHED", "ARCHIVED"];

function normalizeOptionalString(value) {
  if (typeof value !== "string") {
    return null;
  }

  const trimmedValue = value.trim();
  return trimmedValue ? trimmedValue : null;
}

function normalizeInteger(value, fieldName, errors) {
  if (value === "" || value === null || value === undefined) {
    return 0;
  }

  const parsedValue = Number.parseInt(String(value), 10);

  if (Number.isNaN(parsedValue)) {
    errors[fieldName] = `${fieldName} must be a valid number.`;
    return 0;
  }

  return parsedValue;
}

export function normalizeTestimonialPayload(payload) {
  const errors = {};
  const name = String(payload?.name || "").trim();
  const designation = String(payload?.designation || "").trim();
  const feedback = String(payload?.feedback || "").trim();
  const status = String(payload?.status || "DRAFT").toUpperCase();

  if (!name) {
    errors.name = "Name is required.";
  }

  if (!designation) {
    errors.designation = "Designation is required.";
  }

  if (!feedback) {
    errors.feedback = "Feedback is required.";
  }

  if (!TESTIMONIAL_STATUSES.includes(status)) {
    errors.status = "Status must be DRAFT, PUBLISHED, or ARCHIVED.";
  }

  const data = {
    name,
    designation,
    imageUrl: normalizeOptionalString(payload?.imageUrl),
    feedback,
    linkedinUrl: normalizeOptionalString(payload?.linkedinUrl),
    sortOrder: normalizeInteger(payload?.sortOrder, "sortOrder", errors),
    status,
  };

  return {
    data,
    errors,
    isValid: Object.keys(errors).length === 0,
  };
}

export function getTestimonialStatusOptions() {
  return TESTIMONIAL_STATUSES;
}
