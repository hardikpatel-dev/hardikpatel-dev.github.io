# AI Context

## Project Summary
- Personal portfolio website for Hardik Patel.
- Built with Next.js App Router.
- The project now includes a working admin system for managing portfolio projects.
- Current focus is evolving this into a broader dynamic portfolio system while preserving a polished frontend and a clean internal architecture.

## Current Stack
- Next.js 16
- React 19
- Tailwind CSS 4
- GSAP
- Prisma ORM with PostgreSQL
- Resend for contact email sending
- Vercel for deployment
- Neon for managed production PostgreSQL

## Current Repo Facts
- Main app lives in `src/app`
- Public site wrapper lives in `src/components/AppChrome.jsx`
- Shared DB client lives in `src/lib/prisma.js`
- Shared suspense loader lives in `src/components/Loader.jsx`
- Home page `Work` section supports DB-backed reads through Prisma
- Home page `Testimonial` section supports DB-backed reads through Prisma
- `src/sections/Work.jsx` uses Prisma in normal runtime and falls back to `src/data/projects.js` only when `EXPORT=true`
- `src/sections/Testimonial.jsx` uses Prisma in normal runtime and falls back to `src/data/testimonials.js` only when `EXPORT=true`
- Static content still exists in:
  - `src/data/projects.js`
  - `src/data/testimonials.js`
  - `src/data/contact.json`
  - `src/data/tech-stack.js`

## Admin Architecture
- Admin routes live under `src/app/admin`
- Admin UI components live in `src/app/admin/_components`
- Admin-only helper logic lives in `src/app/admin/_lib`
- Admin server-side handlers now live in `src/app/admin/_server`

## Admin Component Layer
- `src/app/admin/_components/AdminAuthForm.jsx`
- `src/app/admin/_components/AdminBrandMark.jsx`
- `src/app/admin/_components/AdminLogoutButton.jsx`
- `src/app/admin/_components/AdminShell.jsx`
- `src/app/admin/_components/AdminSidebar.jsx`
- `src/app/admin/_components/AdminTopbar.jsx`
- `src/app/admin/_components/ProjectAdminClient.jsx`
- `src/app/admin/_components/TestimonialAdminClient.jsx`

## Admin Helper Layer
- `src/app/admin/_lib/auth.js`
- `src/app/admin/_lib/projects.js`

## Admin Server Layer
- `src/app/admin/_server/auth.js`
- `src/app/admin/_server/projects.js`
- `src/app/admin/_server/testimonials.js`
- `src/app/admin/_server/uploads.js`

## Shared Infrastructure That Intentionally Remains Outside Admin
- `src/lib/prisma.js`
- Public site components and wrappers
- Shared data files and non-admin sections

## Admin Routes
- Admin auth pages:
  - `src/app/admin/(auth)/login/page.jsx`
  - `src/app/admin/(auth)/signup/page.jsx`
- Admin panel pages:
  - `src/app/admin/(panel)/layout.jsx`
  - `src/app/admin/(panel)/page.jsx`
- `src/app/admin/(panel)/projects/page.jsx`
- `src/app/admin/(panel)/testimonials/page.jsx`

## Admin API Routes
- Route entry files must remain in `src/app/api/admin/*` because Next.js routing depends on that structure
- Existing admin API routes:
  - `src/app/api/admin/auth/login/route.js`
  - `src/app/api/admin/auth/logout/route.js`
  - `src/app/api/admin/auth/signup/route.js`
- `src/app/api/admin/projects/route.js`
- `src/app/api/admin/projects/[id]/route.js`
- `src/app/api/admin/testimonials/route.js`
- `src/app/api/admin/testimonials/[id]/route.js`
- `src/app/api/admin/uploads/route.js`
- These route files are now intentionally thin and forward to handlers in `src/app/admin/_server`

## Auth State
- Admin auth is custom and cookie-based
- Session helper lives in `src/app/admin/_lib/auth.js`
- Session cookie name is `hp_admin_session`
- Auth is enforced server-side with `getAdminSession()` and `requireAdminSession()`
- Session signing uses `ADMIN_SESSION_SECRET` env var (required in production, throws if missing)
- Rate limiting is applied to login/signup routes (5 attempts per 15 minutes per IP)
- Signup is disabled in production unless `ADMIN_ALLOW_SIGNUP=true`
- Upload route validates both MIME type and file extension independently
- This project is not currently using Auth.js / NextAuth

## Project CRUD State
- Project admin CRUD is live
- Testimonial admin CRUD is live
- Admin project table UI is powered by `src/app/admin/_components/ProjectAdminClient.jsx`
- Project validation and normalization helper lives in `src/app/admin/_lib/projects.js`
- Testimonial validation and normalization helper lives in `src/app/admin/_lib/testimonials.js`
- Project records can be created, updated, and deleted from `/admin/projects`
- Testimonial records can be created, updated, and deleted from `/admin/testimonials`
- Project ordering in DB-backed mode is controlled by `sortOrder`
- Asset uploads for project files go through `/api/admin/uploads`

## UI / Design State
- Admin UI follows a dense minimal design language
- Admin shell is responsive, with a mobile slide-over sidebar
- Mobile admin top nav is sticky
- Admin auth pages have their own dedicated visual system and remain separate from the public site wrapper
- Admin brand mark uses the animated asset at `/public/assets/emoji.webm`
- Auth forms include password visibility toggle
- Project create/edit modal has been redesigned into a lighter tabbed flow:
  - `Basic info`
  - `Files`
  - `Publishing`
- The previous preview panel was removed from the project modal
- Modal surfaces and controls now consistently prefer `rounded-2xl`
- Shared suspense loader has been redesigned into a lighter, premium minimal loading screen

## Main Goal
Build a practical dynamic portfolio system with a clean admin experience. Target content types:
- Projects
- Blogs
- Case studies
- Testimonials
- Tech stack
- Site settings
- Contact messages

## Technical Direction Actually In Use
- App architecture: Next.js full-stack app
- Database: PostgreSQL
- ORM: Prisma
- Admin auth: custom cookie-based auth
- Hosting: Vercel
- Production database: Neon PostgreSQL
- Media uploads: current local/public upload flow through admin upload route

## Backend Build Priorities
1. Keep `projects` stable and production-safe
2. Extend admin structure cleanly for future modules
3. Add blogs
4. Add case studies
5. Add testimonials, settings, and contact-message storage
6. Then improve auth hardening, uploads, and production polish

## Database Learning Notes
- User is a backend beginner
- Teaching style should be example-driven
- Concepts should be explained while building
- Mistakes should be corrected explicitly
- Do not assume prior backend knowledge

## Important Constraints
- Keep architecture modern and understandable
- Prefer practical industry-standard techniques over unnecessary abstraction
- Do not move genuinely shared infra into admin just for folder purity
- Keep admin-specific code isolated when it is truly admin-only
- Preserve Next.js routing constraints when reorganizing files
- Explain backend concepts in Hinglish when teaching

## Deployment Assumptions
- Vercel is the primary deployment target
- Local PostgreSQL is used for development
- Neon-hosted PostgreSQL is used for production
- Production app should use `DATABASE_URL` in Vercel env vars
- `EXPORT` should remain unset in Vercel so the app reads from production DB instead of static fallback

## Current Local Backend Setup State
- PostgreSQL 18 is installed locally on Windows
- Local database `portfolio_db` already exists
- Prisma is installed and initialized
- Generated Prisma/config files exist:
  - `prisma/schema.prisma`
  - `prisma.config.ts`
  - `.env`
- Current local Postgres username is `postgres`
- Current local database name is `portfolio_db`
- If password contains special characters, it must be URL-encoded in `DATABASE_URL`

## Current Production Backend State
- Vercel project is connected and deploying
- Production `DATABASE_URL` is configured in Vercel
- Managed production PostgreSQL exists on Neon
- Production Prisma migration has already been run successfully
- Production seed data has already been inserted successfully

## Current Working Data Flow
- Local development reads from local PostgreSQL through Prisma
- Production reads from Neon PostgreSQL through Prisma
- Static `src/data/projects.js` remains only as export-mode fallback support
- Public site project reads are DB-backed in normal runtime
- Admin panel access uses cookie-based login/signup with server-side session checks
- Admin project management uses internal API routes under `/api/admin/*`
- Thin admin API routes now delegate to `src/app/admin/_server`

## Working Rules For Future Chats
- On a new chat, first read this file and `PROGRESS.md`
- Continue from current project state without asking for already-answered context
- If a decision is already locked here, do not reopen it unless the user asks to change it
- When reorganizing folders, preserve Next.js routing constraints instead of forcing everything under one folder blindly

## Suggested New Chat Prompt
`Read AI_CONTEXT.md and PROGRESS.md, then continue.`
