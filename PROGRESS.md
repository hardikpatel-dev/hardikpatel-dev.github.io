# Progress

## Last Updated
- 2026-04-04

## Current Status
- Frontend portfolio is working
- Contact form API exists and sends email via Resend
- `Project` content is connected to PostgreSQL through Prisma
- Admin login/signup, protected dashboard shell, and project CRUD are working
- Testimonial model, public DB-backed testimonial section, and admin testimonial CRUD are working
- Production deployment is running on Vercel with Neon PostgreSQL
- Admin architecture has been reorganized into `_components`, `_lib`, and `_server`
- Admin API route files are now thin and delegate to server handlers
- Dynamic backend expansion beyond `projects`, broader admin coverage, blogs, and case studies are still not implemented
- Blogs, case studies, settings, and contact-message storage are still not implemented

## Locked Decisions
- Backend should be built in a learn-first way, not as a black-box managed CMS
- Core app architecture should remain Next.js full-stack
- Database choice is PostgreSQL
- ORM choice is Prisma
- Hosting direction is Vercel for dynamic deployment
- Managed production database direction is Neon PostgreSQL
- Teaching preference is: explain concepts while implementing and correct mistakes actively
- Initial dynamic content focus should be `projects`
- Local PostgreSQL is being used for development/learning right now
- Shared infra like `prisma` should remain shared when it is genuinely used outside admin

## What Has Been Clarified
- ORM is not mandatory, but recommended for this project
- Best learning path is Prisma plus SQL/database fundamentals
- Static content currently lives in repo data files and should later be migrated into database-backed models
- User may use local PostgreSQL for learning instead of starting with Neon
- PostgreSQL 18 is acceptable for this project
- Prisma requires a modern Node version; local Node was updated successfully
- GitHub Pages deployment workflow should not be used for publishing this project
- GitHub Actions should remain for build/check purposes only
- Vercel should not have `EXPORT=true` because production should read from DB
- Next.js route entry files under `src/app/api/admin/*` should stay there for routing, even if logic moves elsewhere

## What Is Done
- Repo structure and current frontend/data flow were reviewed
- Backend direction and stack recommendations were defined
- Basic database concepts were introduced:
  - table
  - row
  - column
  - primary key
  - foreign key
  - one-to-many relation
- Persistent chat-context plan was implemented
- PostgreSQL was installed locally
- `portfolio_db` database was created in pgAdmin
- Postgres user password was updated to a simpler value for local setup
- Node.js was updated to a compatible modern version
- Prisma packages were installed in the project
- Prisma was initialized in the repo
- Generated files now exist:
  - `prisma/schema.prisma`
  - `prisma.config.ts`
  - `.env`
- `Project` Prisma model exists and is queried from `src/sections/Work.jsx`
- Local project ordering issue was debugged and traced correctly to DB values
- Production Vercel environment variables were reviewed
- Managed Neon PostgreSQL database was created for production
- Production `DATABASE_URL` was configured
- Production migration was run
- Production seed was run
- First live DB-backed deployment path was established
- GitHub Pages deployment workflow was replaced with a non-pages build/check workflow while preserving the expected workflow naming
- Admin project management page exists at `src/app/admin/(panel)/projects/page.jsx`
- Admin auth routes exist:
  - `src/app/api/admin/auth/login/route.js`
  - `src/app/api/admin/auth/signup/route.js`
  - `src/app/api/admin/auth/logout/route.js`
- Admin project routes exist:
  - `src/app/api/admin/projects/route.js`
  - `src/app/api/admin/projects/[id]/route.js`
- Admin uploads route exists:
  - `src/app/api/admin/uploads/route.js`
- `AdminUser` Prisma model exists and local migration for it was applied
- `Testimonial` Prisma model exists and local migration for it was applied
- Protected admin dashboard shell exists with overview and projects sections
- Protected admin testimonials section exists
- Admin-specific route proxy exists at `src/proxy.js`
- Homepage invalidation after admin writes is handled with `revalidatePath`
- Production build succeeds with the admin scaffold
- Testimonial section now reads from PostgreSQL in normal runtime and uses static fallback only for export mode
- Auth hardening: `ADMIN_SESSION_SECRET` is now enforced (throws in production if missing)
- Auth hardening: rate limiting added to login/signup (5 attempts per 15 minutes per IP)
- Auth hardening: upload route now validates file extensions independently of MIME types

## Recent Structural Changes
- Admin-only UI components were moved into:
  - `src/app/admin/_components`
- Admin-only helper logic was moved into:
  - `src/app/admin/_lib`
- Admin server-side route logic was extracted into:
  - `src/app/admin/_server`
- Thin route-entry pattern is now used for:
  - auth routes
  - project routes
  - testimonial routes
  - uploads route

## Recent UI / UX Changes
- Admin sidebar was redesigned into a denser minimal layout
- Admin shell is responsive with a mobile slide-over menu
- Mobile admin top nav is sticky
- Admin auth pages were redesigned and narrowed for better balance
- Admin auth forms now include:
  - animated brand mark
  - password visibility toggle
  - improved label/input spacing
  - bottom CTA pinned within the card
- Project library was redesigned with:
  - responsive table/cards
  - better badges
  - icon-only row actions
  - live website links
- Project create/edit modal was redesigned into a lighter, tabbed form flow
- Project modal preview panel was removed
- Shared suspense loader was redesigned into a lighter premium loading surface
- Admin sidebar and overview now include testimonial management entry points

## What Is Pending
- Decide whether export-only fallback should remain in `Work.jsx` or be removed now that production is DB-backed
- Add a safer production workflow for migrations/seeding
- Expand dynamic models beyond `projects` and `testimonials`
- Expand admin beyond the current `projects` and `testimonials` scaffold
- Harden validation with a dedicated schema layer such as Zod
- Move richer admin route logic patterns to future modules as blogs/case studies are added
- Add CSRF token protection for state-changing admin operations

## Immediate Next Step
- Set `ADMIN_SESSION_SECRET` in Vercel env vars (generate with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
- Verify live Vercel app is reading the production Neon DB correctly
- Confirm production project ordering/content from DB after admin-side edits
- Decide the next content model after `projects`

## Open Issues / Notes
- Existing secrets in local env should be reviewed carefully before any public sharing or repo changes
- Media storage strategy is currently local/public upload-based, not binary-in-database
- Current local Postgres password includes `@`, so it must be URL-encoded in `.env` as `%40`
- Production DB exists separately from local DB, so future debugging must always confirm which DB is being queried
- Vercel runtime errors should be checked in deployment logs first when production data does not render
- Current auth is functional but still needs stronger production hardening

## How To Continue In A New Chat
- Send:
  - `Read AI_CONTEXT.md and PROGRESS.md, then continue`
- If implementation should continue immediately, add:
  - `Continue from current admin architecture and DB-backed project system`
