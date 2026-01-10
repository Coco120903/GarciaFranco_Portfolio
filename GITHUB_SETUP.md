# How to Push Your Website to GitHub

This guide will walk you through uploading your portfolio website to GitHub step by step.

## Prerequisites

1. **Git installed** on your computer
   - Check if installed: Open PowerShell/Command Prompt and type `git --version`
   - If not installed, download from: https://git-scm.com/downloads

2. **GitHub account**
   - Sign up at: https://github.com (it's free!)

## Step 1: Create a GitHub Repository

1. Go to [github.com](https://github.com) and log in
2. Click the **"+"** icon in the top right → **"New repository"**
3. Fill in the details:
   - **Repository name:** `GarciaFranco_Portfolio` (or any name you like)
   - **Description:** "My Portfolio Website" (optional)
   - **Visibility:** Choose **Public** (free) or **Private**
   - **DO NOT** check "Initialize with README" (we already have files)
4. Click **"Create repository"**

## Step 2: Initialize Git in Your Project

Open PowerShell/Command Prompt in your project folder and run these commands:

### 2.1. Navigate to your project folder
```bash
cd E:\GarciaFranco_Portfolio
```

### 2.2. Initialize Git
```bash
git init
```

### 2.3. Add all files to Git
```bash
git add .
```

### 2.4. Create your first commit
```bash
git commit -m "Initial commit: Portfolio website"
```

## Step 3: Connect to GitHub

### 3.1. Get your repository URL
After creating the repository on GitHub, you'll see a page with setup instructions. Copy the repository URL:
- It will look like: `https://github.com/yourusername/GarciaFranco_Portfolio.git`
- Or: `git@github.com:yourusername/GarciaFranco_Portfolio.git`

### 3.2. Add GitHub as remote
```bash
git remote add origin https://github.com/yourusername/GarciaFranco_Portfolio.git
```
*(Replace `yourusername` with your actual GitHub username)*

### 3.3. Rename branch to main (if needed)
```bash
git branch -M main
```

## Step 4: Push to GitHub

```bash
git push -u origin main
```

You'll be prompted to enter your GitHub username and password (or personal access token).

## Step 5: Verify

1. Go to your GitHub repository page
2. You should see all your files there!

---

## Troubleshooting

### "Git is not recognized"
- Install Git from https://git-scm.com/downloads
- Restart your terminal after installation

### Authentication Issues

If you get authentication errors, you have two options:

#### Option A: Use Personal Access Token (Recommended)
1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a name (e.g., "Portfolio Project")
4. Select scopes: Check `repo` (full control of private repositories)
5. Click "Generate token"
6. **Copy the token** (you won't see it again!)
7. When prompted for password, paste the token instead

#### Option B: Use GitHub Desktop (Easier for beginners)
1. Download GitHub Desktop: https://desktop.github.com
2. Sign in with your GitHub account
3. File → Add Local Repository → Select your project folder
4. Click "Publish repository" button

### "Remote origin already exists"
If you already added a remote, remove it first:
```bash
git remote remove origin
git remote add origin https://github.com/yourusername/GarciaFranco_Portfolio.git
```

### Files not showing up
Make sure you:
1. Ran `git add .` to stage files
2. Ran `git commit` to commit them
3. Ran `git push` to upload them

---

## Future Updates

After making changes to your website, update GitHub with these commands:

```bash
git add .
git commit -m "Description of your changes"
git push
```

---

## Quick Reference Commands

```bash
# Check status
git status

# See what files changed
git diff

# Add all files
git add .

# Commit changes
git commit -m "Your message here"

# Push to GitHub
git push

# Pull latest changes (if working on multiple computers)
git pull
```

---

## Need Help?

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Help](https://docs.github.com)
- [GitHub Desktop](https://desktop.github.com) - GUI alternative
