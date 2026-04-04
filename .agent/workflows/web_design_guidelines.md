---
description: "Checklist for auditing UI code for accessibility and design compliance."
---

# Web Design Guidelines Audit Workflow

When asked to audit UI code (`@[web-design-guidelines]`):

### Accessibility (a11y) Check:
- [ ] Do all images have meaningful `alt` attributes (or empty strings for decorative images)?
- [ ] Do interactive elements (buttons, links) have `aria-label`s if they lack visible text?
- [ ] Can the entire application be navigated using only the keyboard (`Tab`, `Enter`, `Space`)?
- [ ] Are custom select/dropdown components fully accessible and screen-reader friendly?

### Design Compliance Check:
- [ ] Are hover, active, and focus states clearly defined for all clickable elements?
- [ ] Are loading states (skeletons/spinners) implemented to prevent cumulative layout shift (CLS)?
- [ ] Are empty states handled gracefully with illustrations or helpful text instead of blank screens?
- [ ] Does the UI render effectively on extremely small mobile screens (e.g., 320px width) as well as ultrawide desktop monitors?
