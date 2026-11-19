# Cloudflare Pages Deployment Guide

## 🚀 Deployment Steps

### 1. Connect GitHub Repository to Cloudflare Pages

1. **Login to Cloudflare:**
   - Go to https://dash.cloudflare.com
   - Login with your account

2. **Create New Project:**
   - Click on "Workers & Pages" in the left sidebar
   - Click "Create application"
   - Select "Pages" tab
   - Click "Connect to Git"

3. **Connect Repository:**
   - Select "GitHub" as your Git provider
   - Authorize Cloudflare to access your GitHub
   - Select repository: `hamzagithameed/cozy-tiny-space`

### 2. Configure Build Settings

Use these exact settings:

```
Project name: cozy-tiny-space
Production branch: main
Build command: npm run build
Build output directory: dist
Root directory: (leave empty)
```

### 3. Environment Variables (Optional)

If you need environment variables, add them in Cloudflare dashboard:
- Go to Settings > Environment variables
- Add variables as needed

### 4. Deploy!

- Click "Save and Deploy"
- Cloudflare will build and deploy automatically
- Your site will be live at: `https://cozy-tiny-space.pages.dev`

## 🔄 Automatic Deployments

Every time you push to `main` branch:
- Cloudflare automatically rebuilds
- New version goes live in ~2-3 minutes

## 🌐 Custom Domain Setup

To use `cozytinyspace.com`:

1. In Cloudflare Pages project:
   - Go to "Custom domains"
   - Click "Set up a custom domain"
   - Enter: `cozytinyspace.com`
   - Follow DNS configuration steps

2. Add these DNS records in your domain registrar:
   ```
   Type: CNAME
   Name: cozytinyspace.com (or @)
   Value: cozy-tiny-space.pages.dev
   ```

## 📊 Build Configuration

- **Framework:** Astro v4
- **Node Version:** 18
- **Build Time:** ~2-3 minutes
- **Static Site:** Yes

## 🔍 After Deployment

Your site will be available at:
- Production: `https://cozy-tiny-space.pages.dev`
- Or: `https://cozytinyspace.com` (after custom domain setup)

## 📝 Notes

- Keystatic admin will work at: `/keystatic`
- RSS feed: `/rss.xml`
- Sitemap: `/sitemap-index.xml`
- Search: `/search`
