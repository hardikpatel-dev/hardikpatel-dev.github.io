---
description: Establish a loop for iterative prototyping and visual feedback using browser tools.
---

# Iterative Prototyping and Feedback Workflow

When refining UI components visually:

1. **Implement Initial Prototype:**
   - Write the React/Next.js code for the component based on requirements.
   - Run the development server if not already running.

2. **Visual Verification (Agent Self-Check):**
   - Use the `browser_subagent` to navigate to the specific page or component.
   - Capture screenshots of the implementation.
   - Compare the screenshot against standard design principles or the user's original mockup.

3. **Iterative Refinement:**
   - If spacing is off, typography is too small, or colors clash, make targeted adjustments to the code.
   - Repeat the visual verification step.

4. **User Feedback Loop:**
   - Present the final screenshot/walkthrough to the user.
   - Ask for specific feedback on visual elements (e.g., "Does this padding feel right?", "Is the primary button prominent enough?").
   - Iterate immediately based on visual feedback rather than making the user guess the code changes.
