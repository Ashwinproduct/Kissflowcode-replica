# 🚀 Deployment Guide - Vercel

## Prerequisites
- Vercel account (sign up at https://vercel.com/signup)
- GitHub account (optional but recommended)

## Option 1: Deploy via CLI (Quick)

### Step 1: Login to Vercel
```bash
vercel login
```
Follow the prompts to authenticate.

### Step 2: Deploy
```bash
cd D:\ML\papaboynethran\workflow-saas
vercel
```

Answer the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Your username
- **Link to existing project?** → No
- **Project name?** → workflow-saas (or your choice)
- **Directory?** → ./ (current directory)
- **Override settings?** → No

### Step 3: Set up Database (Vercel Postgres)

1. Go to your project dashboard: https://vercel.com/dashboard
2. Click on your "workflow-saas" project
3. Go to **Storage** tab
4. Click **Create Database** → **Postgres**
5. Copy the DATABASE_URL
6. Go to **Settings** → **Environment Variables**
7. Add: `DATABASE_URL` = [your postgres URL]

### Step 4: Push Database Schema
```bash
npm run db:push
npm run db:seed
```

### Step 5: Deploy Production
```bash
vercel --prod
```

## Option 2: Deploy via GitHub (Recommended)

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit: Workflow SaaS"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/workflow-saas.git
git push -u origin main
```

### Step 2: Import on Vercel
1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your GitHub repo
4. Click "Deploy"

### Step 3: Add Database
Follow steps from Option 1, Step 3

---

## Alternative: Use Supabase (More Features, Still Free)

### Step 1: Create Supabase Project
1. Go to https://supabase.com
2. Sign up (free)
3. Create new project
4. Copy connection string

### Step 2: Update Prisma Schema
Change datasource in `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"  // Change from sqlite
  url      = env("DATABASE_URL")
}
```

### Step 3: Update DATABASE_URL
In `.env` and Vercel environment variables:
```
DATABASE_URL="postgresql://postgres:[password]@[host]:5432/postgres"
```

### Step 4: Deploy
```bash
npm run db:push
npm run db:seed
vercel --prod
```

---

## Post-Deployment

Your app will be live at: `https://workflow-saas-[random].vercel.app`

### Custom Domain (Optional)
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records

### Monitor
- View logs: `vercel logs`
- View analytics: Vercel Dashboard → Analytics

---

## Troubleshooting

**Build Error?**
- Check `npm run build` locally first
- Review build logs in Vercel dashboard

**Database Connection Error?**
- Verify DATABASE_URL in environment variables
- Ensure Prisma schema matches database provider

**API Routes Not Working?**
- Check API route files are in `app/api/`
- Verify routes export proper HTTP methods
