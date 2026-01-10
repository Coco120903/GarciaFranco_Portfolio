# Deploying to Vercel

This guide will help you deploy your portfolio website to Vercel.

## Prerequisites

1. A GitHub account (recommended) or GitLab/Bitbucket
2. A Vercel account (free tier is fine)
3. Your project pushed to a Git repository

## Step 1: Push Your Code to GitHub

If you haven't already, push your code to GitHub:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

## Step 2: Sign Up / Log In to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up or log in (you can use your GitHub account)

## Step 3: Deploy Your Project

### Option A: Deploy via Vercel Dashboard (Recommended)

1. Click **"Add New Project"** or **"Import Project"**
2. Import your GitHub repository
3. Vercel will auto-detect your project settings:
   - **Framework Preset:** Vite
   - **Root Directory:** Leave as default (or set to `./` if needed)
   - **Build Command:** `cd client && npm install && npm run build`
   - **Output Directory:** `client/dist`
   - **Install Command:** `cd client && npm install`

4. **Important: Add Environment Variables**
   - Click on **"Environment Variables"**
   - Add the following variables:
     - `VITE_EMAILJS_SERVICE_ID` = `service_wlmvq2f`
     - `VITE_EMAILJS_TEMPLATE_ID` = `template_vlfq8oq`
     - `VITE_EMAILJS_PUBLIC_KEY` = `Usmhf55_vbV3h50WB`
   - Make sure to add them for **Production**, **Preview**, and **Development** environments

5. Click **"Deploy"**

### Option B: Deploy via Vercel CLI

1. Install Vercel CLI globally:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Navigate to your project root and deploy:
   ```bash
   vercel
   ```

4. Follow the prompts:
   - Link to existing project or create new
   - Confirm settings
   - Add environment variables when prompted

## Step 4: Configure Environment Variables in Vercel

After deployment, make sure your environment variables are set:

1. Go to your project dashboard on Vercel
2. Click **Settings** → **Environment Variables**
3. Add:
   - `VITE_EMAILJS_SERVICE_ID` = `service_wlmvq2f`
   - `VITE_EMAILJS_TEMPLATE_ID` = `template_vlfq8oq`
   - `VITE_EMAILJS_PUBLIC_KEY` = `Usmhf55_vbV3h50WB`
4. Select all environments (Production, Preview, Development)
5. Click **Save**
6. **Redeploy** your project for changes to take effect

## Step 5: Test Your Deployment

1. Visit your Vercel deployment URL (e.g., `your-project.vercel.app`)
2. Test the contact form to ensure EmailJS is working
3. Check the browser console for any errors

## Troubleshooting

### Build Fails
- Make sure all dependencies are in `client/package.json`
- Check that the build command is correct
- Review build logs in Vercel dashboard

### Environment Variables Not Working
- Ensure variables start with `VITE_` prefix
- Redeploy after adding/changing environment variables
- Check that variables are added to all environments

### Contact Form Not Working
- Verify EmailJS environment variables are set correctly
- Check browser console for errors
- Ensure EmailJS service and template are active

### 404 Errors on Routes
- The `vercel.json` includes a rewrite rule for SPA routing
- If issues persist, check the rewrite configuration

## Custom Domain (Optional)

1. Go to **Settings** → **Domains**
2. Add your custom domain
3. Follow DNS configuration instructions
4. Wait for DNS propagation (can take up to 48 hours)

## Continuous Deployment

Vercel automatically deploys:
- **Production:** When you push to `main` branch
- **Preview:** When you push to other branches or create pull requests

## Need Help?

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Discord](https://vercel.com/discord)
- Check build logs in Vercel dashboard for specific errors
