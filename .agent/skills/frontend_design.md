---
name: "Frontend Design Specialist"
description: "Guidelines and instructions for creating high-quality, production-grade web components."
---

# Frontend Design Extension 

When asked to create frontend components (`@[frontend-design]`):

1. **Component Architecture:**
   - Always decouple logic from presentation where possible.
   - Use atomic design principles (Atoms, Molecules, Organisms).
   - Ensure components accept standard HTML attributes (e.g., passing `className` down, `...props`).

2. **Production-Grade Quality:**
   - Handle loading, error, empty, and success states explicitly.
   - Use `useMemo` and `useCallback` appropriately to prevent unnecessary React re-renders.
   - Avoid prop drilling by using Composition or Context API for deeply nested components.
   - Add proper PropType comments or TypeScript interfaces whenever possible.

3. **Motion and Micro-Interactions:**
   - Implement subtle hover, focus, and active states.
   - Ensure interactive elements provide immediate visual feedback (e.g., standard transitions `transition-all duration-200 ease-in-out`).
