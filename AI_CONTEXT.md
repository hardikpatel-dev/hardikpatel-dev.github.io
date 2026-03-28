# AI Context

## Project Summary
- Personal portfolio website for Hardik Patel.
- Built with Next.js App Router and currently focused on frontend presentation, animations, and a contact form.
- Current goal is to evolve this project into a dynamic portfolio with a backend and admin panel.

## Current Stack
- Next.js 16
- React 19
- Tailwind CSS 4
- GSAP
- Resend for contact email sending
- Deployed mindset currently includes Vercel and an older GitHub Pages static-export setup

## Current Repo Facts
- Main app lives in `src/app`
- Static content currently comes from:
  - `src/data/projects.js`
  - `src/data/testimonials.js`
  - `src/data/contact.json`
  - `src/data/tech-stack.js`
- Contact form page exists at `src/app/contact/page.jsx`
- Contact API route exists at `src/app/api/send-email/route.js`
- Home page currently renders static sections and hardcoded portfolio data
- Blogs, case studies, and admin dashboard are not implemented yet

## Main Goal
Build an industry-standard but beginner-friendly backend so the portfolio becomes dynamic and can be updated from an admin panel. Target content types:
- Projects
- Blogs
- Case studies
- Testimonials
- Tech stack
- Site settings
- Contact messages

## Chosen Technical Direction
- App architecture: Next.js full-stack app
- Database: PostgreSQL
- ORM: Prisma
- Auth: Auth.js / NextAuth-style setup
- Hosting: Vercel
- Media storage: Cloudinary or similar URL-based storage
- Validation: Zod

## Why This Direction Was Chosen
- User wants to learn backend properly, not only assemble tools
- User wants modern and industry-standard practices
- User wants an admin panel that is easy to use
- User wants database design to be strong and optimized, while still understandable

## Backend Build Priorities
1. Setup foundation first
2. Make `projects` dynamic first
3. Then add `blogs`
4. Then add `case studies`
5. Then expand to testimonials, settings, and contact-message storage
6. Then polish caching, security, uploads, and production readiness

## Database Learning Notes
- User is a backend beginner
- Teaching style should be example-driven
- Concepts should be explained while building
- Mistakes should be corrected explicitly
- Do not assume prior backend knowledge

## Important Constraints
- Keep architecture modern, lightweight, and not outdated
- Prefer practical industry-standard techniques over unnecessary complexity
- Do not jump into advanced abstractions before fundamentals are clear
- Use simple explanations with portfolio-specific examples
- Keep the workflow manageable for a beginner

## Deployment Assumptions
- Dynamic backend means GitHub Pages static export is no longer the primary deployment target
- Vercel should become the primary deployment target for the app
- PostgreSQL may be local during learning/development and managed later in production

## Current Local Backend Setup State
- PostgreSQL 18 is installed locally on Windows
- Local database `portfolio_db` has already been created in pgAdmin
- Prisma has been installed and initialized in the repo
- Generated Prisma files now exist:
  - `prisma/schema.prisma`
  - `prisma.config.ts`
  - `.env`
- Current blocker before first schema migration:
  - `DATABASE_URL` in `.env` must be updated with the real local Postgres connection string
- Current local Postgres username is `postgres`
- Current local database name is `portfolio_db`
- If password contains special characters, it must be URL-encoded in `DATABASE_URL`

## Working Rules For Future Chats
- On a new chat, first read this file and `PROGRESS.md`
- Continue from current project state without asking for already-answered context
- Explain backend concepts in Hinglish when teaching
- Prefer implementing and teaching together
- If a decision is already locked here, do not reopen it unless the user asks to change it

## Suggested New Chat Prompt
`Read AI_CONTEXT.md and PROGRESS.md, then continue.`
