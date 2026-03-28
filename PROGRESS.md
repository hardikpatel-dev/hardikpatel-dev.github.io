# Progress

## Last Updated
- 2026-03-27

## Current Status
- Frontend portfolio is present and working with static data sources
- Contact form API exists and sends email via Resend
- Dynamic backend, database models, admin panel, blogs, and case studies are not implemented yet
- Persistent context system for future chats is now being established with this file and `AI_CONTEXT.md`
- Local PostgreSQL and Prisma foundation setup is now partially complete

## Locked Decisions
- Backend should be built in a learn-first way, not as a black-box managed CMS
- Core app architecture should remain Next.js full-stack
- Database choice is PostgreSQL
- ORM choice is Prisma
- Hosting direction is Vercel for dynamic deployment
- Teaching preference is: explain concepts while implementing and correct mistakes actively
- Initial dynamic content focus should be `projects`
- Local PostgreSQL is being used for development/learning right now

## What Has Been Clarified
- ORM is not mandatory, but recommended for this project
- Best learning path is Prisma plus SQL/database fundamentals
- Static content currently lives in repo data files and should later be migrated into database-backed models
- User may use local PostgreSQL for learning instead of starting with Neon
- PostgreSQL 18 is acceptable for this project
- Prisma requires a modern Node version; local Node has been updated successfully

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
- Persistent chat-context plan has now been implemented
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

## What Is Pending
- Update `.env` with the correct `DATABASE_URL`
- Create first database model for `projects`
- Run first Prisma migration
- Seed current static projects into database
- Switch public projects section from static file to DB-backed reads
- Scaffold admin area

## Immediate Next Step
- Finish local DB connection setup:
  - set `DATABASE_URL` in `.env`
  - verify Prisma can connect to `portfolio_db`
  - create first `Project` model
  - run first migration

## Open Issues / Notes
- GitHub Pages export setup still exists in the repo but should stop being treated as the primary deployment path once backend work starts
- Existing secrets in local env should be reviewed carefully before any public sharing or repo changes
- Media storage strategy is planned as URL-based, not binary-in-database
- Current local Postgres password includes `@`, so it must be URL-encoded in `.env` as `%40`

## How To Continue In A New Chat
- Send:
  - `Read AI_CONTEXT.md and PROGRESS.md, then continue`
- If implementation should continue immediately, add:
  - `Continue from DATABASE_URL setup`
