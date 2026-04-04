---
name: "Design Systems and Consistency"
description: "Guidelines for implementing and adhering to design systems, defining color palettes, typography, and component libraries."
---

# Design Systems and Consistency Skill

When extending the UI or creating new features:

## 1. Adhere strictly to the existing Design System
Before introducing any new styles, colors, or typography:
- Check `globals.css` or the main Tailwind configuration for existing CSS variables (e.g., `--bg-primary`, `--text-muted`).
- Always use the predefined design tokens instead of hardcoding hex values or arbitrary font sizes.

## 2. Maintain Brand Compliance
- Ensure padding, border-radius (e.g., `rounded-2xl`, `rounded-[1.5rem]`), and shadow properties match the "premium" feel established in the project.
- Consistency is key. A button in the admin panel should share the same interaction states and base styling as a button on the public site, unless explicitly designed otherwise.

## 3. Creating New Components
- Build components to be modular and reusable.
- If a new CSS variable or token is absolutely necessary, add it to the global scope (`globals.css`) and document it, rather than keeping it isolated to a single component.
