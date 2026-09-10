const allowed = new Set([
  "resume_download",
  "project_open",
  "case_study_complete",
  "github_open",
  "linkedin_open",
  "contact_click",
  "recruiter_mode",
  "lab_interaction",
]);
export function track(name, properties = {}) {
  if (typeof window === "undefined" || !allowed.has(name)) return;
  // Device-local event only. Connect a consent-aware adapter here; never include contact details or search text.
  window.dispatchEvent(
    new CustomEvent("atlas:analytics", { detail: { name, properties } }),
  );
}
