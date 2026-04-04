# 🌐 Hardik Patel - Portfolio

[![Deploy Next.js site to GitHub Pages](https://github.com/hardikpatel-dev/hardikpatel-dev.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/hardikpatel-dev/hardikpatel-dev.github.io/actions/workflows/deploy.yml)

This is my personal portfolio website built using **Next.js**, **TailwindCSS**, and **GSAP animations**.  
It showcases my projects, skills, and experience, and is automatically deployed with **GitHub Actions** on **GitHub Pages**.

---

## 🚀 Live Demo

🔗 [https://hardikpatel-dev.github.io](https://hardikpatel-dev.github.io)

---

## 🛠 Tech Stack

- [Next.js](https://nextjs.org/) – React framework
- [Tabler.io](https://tabler.io/icons) – Icon pack
- [TailwindCSS](https://tailwindcss.com/) – Styling
- [GSAP](https://greensock.com/gsap/) – Animations
- [GitHub Actions](https://github.com/features/actions) – CI/CD
- [GitHub Pages](https://pages.github.com/) – Hosting

---

## 📦 Installation & Setup

````bash
# Clone the repository
git clone https://github.com/hardikpatel-dev/hardikpatel-dev.github.io.git

# Navigate to project
cd hardikpatel-dev.github.io

# Install dependencies
npm install

# Run dev server
npm run dev

# Build and export static site
npm run build && npm run export



## 🚀 Deployment

### Vercel (Main Branch)
- Runs `npm run build`
- Uses full Next.js features (Image Optimization, ISR, SSR)

### GitHub Pages (gh-pages Branch)
- Runs `npm run build:export`
- Generates static `out/` folder
- Limited features (no image optimization, no SSR)

---

## 📊 Database Management (Prisma + Neon PostgreSQL)

### Overview
This project uses **Prisma** ORM with **Neon** PostgreSQL for database management.
- **Schema**: `prisma/schema.prisma`
- **Migrations**: `prisma/migrations/`
- **Seed Script**: `prisma/seed.cjs`
- **Database**: Production uses Neon, Local uses PostgreSQL@localhost

### Step-by-Step: Creating Tables & Seeding

#### 1️⃣ **Create New Table in Schema**
Edit `prisma/schema.prisma` and add your model:
```prisma
model YourTable {
  id        Int     @id @default(autoincrement())
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
````

#### 2️⃣ **Generate Migration (Local)**

```bash
npm run db:migrate
# This creates a new migration file in prisma/migrations/
# Name your migration descriptively (e.g., "add_your_table")
```

#### 3️⃣ **Add Seed Data**

Edit `prisma/seed.cjs` and add data for your new table:

```javascript
const newTableData = [{ name: "Item 1" }, { name: "Item 2" }];

// Add to seed function:
for (const item of newTableData) {
  await prisma.yourTable.create({ data: item });
}
```

#### 4️⃣ **Test Locally**

```bash
# Seed local database
npm run db:seed

# Verify in your app
npm run dev
```

#### 5️⃣ **Push to Production (Vercel/Neon)**

**Option A: Automatic (Recommended)**

```bash
# Commit and push to GitHub main branch
git add .
git commit -m "feat: add new table and seed data"
git push origin main

# Vercel automatically:
# 1. Deploys new code
# 2. Runs migrations via Prisma
# 3. Seeds database (if configured)
```

**Option B: Manual Production Seeding**
If Vercel doesn't run seeding automatically:

1. Get Neon DATABASE_URL from Vercel Environment Variables
2. Create `.env.production` (or use temporary .env):
   ```
   DATABASE_URL="postgresql://user:password@host/database?schema=public"
   ```
3. Run seed against production:
   ```bash
   DATABASE_URL="your_neon_url" npm run db:seed
   ```
4. Revert `.env` back to local database

#### 6️⃣ **If Migration Fails in Production**

**Issue**: "Type already exists" or duplicate enum errors

**Solution**:

```bash
# 1. Update migration SQL file to handle duplicates:
# In prisma/migrations/{timestamp}_migration_name/migration.sql
# Wrap CREATE TYPE with:
DO $$ BEGIN
  CREATE TYPE "EnumName" AS ENUM (...);
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

# 2. Push fix:
git add prisma/migrations/
git commit -m "fix: handle duplicate enum in production"
git push origin main

# 3. Redeploy in Vercel (trigger redeployment)
```

### Useful Commands

```bash
# Database operations
npm run db:migrate          # Create migration locally (interactive)
npm run db:migrate:deploy   # Apply migrations to production
npm run db:seed             # Seed current database with data
npm run prisma:generate     # Regenerate Prisma Client

# Check schema
npx prisma studio          # Launch Prisma Studio (visual DB explorer)
npx prisma db pull         # Sync schema from existing database
```

### Environment Variables

**Local** (`.env`):

```
DATABASE_URL="postgresql://postgres:password@localhost:5432/portfolio_db?schema=public"
```

**Production** (Vercel):

- Set in Vercel Dashboard → Project Settings → Environment Variables
- Contains Neon PostgreSQL connection string
- Automatically available during builds

# How to Push Changes (Quick Note for README)

# Edit files in your local folder (e.g., E:\Personal Work\hardikportfolio).

# Test locally:

Run npm run dev or npm run build + npx serve out.

# Stage changes:

git add .

# Commit changes:

git commit -m "Describe your changes, e.g., 'Add about page'"
#Push to GitHub:
git push origin main

# --Wait for GitHub Actions to deploy (check Actions tab).

# --Verify live site: Visit https://hardikpatel-dev.github.io/.

# --Note: If build fails, check Actions logs or test locally.
