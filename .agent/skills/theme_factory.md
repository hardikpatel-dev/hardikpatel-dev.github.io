---
name: "Theme Factory"
description: "Generates consistent themes for HTML, documents, and slides."
---

# Theme Factory Skill

When asked to create or update themes (`@[theme-factory]`):

## 1. CSS Variable Generation
- Output comprehensive CSS token sets covering backgrounds, foregrounds, muted text, borders, and brand colors.
- Define explicit `--radius` variables to enforce consistent rounding across cards, buttons, and inputs.

## 2. Light & Dark Mode Compatibility
- Always generate symmetrical dark mode overrides inside a `.dark` selector or `@media (prefers-color-scheme: dark)`.
- Re-balance shadow intensities for dark mode (shadows need to be darker/hued, or borders need to replace shadows).

## 3. Theming Extensibility
- Ensure that the primary brand color is easily swappable (e.g., `theme('colors.primary.DEFAULT')`) without breaking the contrast of text resting on it (`theme('colors.primary.foreground')`).
