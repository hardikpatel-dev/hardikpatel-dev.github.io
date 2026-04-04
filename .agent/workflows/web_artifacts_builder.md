---
description: "Instructions for building complex React/Tailwind/Shadcn UI applications."
---

# Web Artifacts Builder Workflow

When building comprehensive web apps or features (`@[web-artifacts-builder]`):

1. **Tech Stack Alignment:**
   - Assume Next.js/React environment with Tailwind CSS.
   - If generating Shadcn UI style components, ensure they use `clsx` and `tailwind-merge` for robust class conflict resolution.

2. **File Structure Strategy:**
   - Place reusable UI components in `src/components/ui/`.
   - Feature-specific components belong in local `_components` directories near the routes that use them.
   - Maintain a centralized `lib/utils` for helper functions.

3. **Styling Standards:**
   - Use utility-first CSS via Tailwind.
   - Avoid creating custom CSS unless doing complex animations or overrides that Tailwind doesn't support easily.
   - Use CSS variables for theming to allow easy dark mode toggling.
