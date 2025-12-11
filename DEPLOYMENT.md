# GitHub Pages Deployment Guide

Your Gypsy Service Dog Training Application is now live on GitHub Pages!

## Live Site URL
🌐 **https://paulmmoore3416.github.io/gypsy-service-dog-training/**

## Repository URL
📦 **https://github.com/paulmmoore3416/gypsy-service-dog-training**

## How It Works

This application uses a static site generator to convert the Express.js/EJS templates into static HTML files that can be hosted on GitHub Pages.

### Deployment Process

1. **Build Static Site**: Run `node build-static.js` to generate static HTML files
2. **Output Directory**: Static files are generated in the `/docs` folder
3. **GitHub Pages Source**: Configured to serve from the `/docs` folder on the `main` branch
4. **Automatic Deployment**: Push changes to GitHub, and Pages will update automatically

### Making Updates

To update the live site:

```bash
# 1. Make your changes to the source files (views, CSS, JS, etc.)

# 2. Build the static site
node build-static.js

# 3. Commit and push to GitHub
git add -A
git commit -m "Update site content"
git push origin main

# 4. Wait 1-2 minutes for GitHub Pages to rebuild
# Your changes will be live at https://paulmmoore3416.github.io/gypsy-service-dog-training/
```

### Local Development

Run the Express.js server locally to preview changes:

```bash
npm start
# Visit http://localhost:3500
```

## Features Available on GitHub Pages

✅ Complete training guide with 18 sections
✅ Training logs and progress tracking
✅ Task management system
✅ Milestone tracking
✅ Analytics dashboard with charts
✅ Professional certificate generation
✅ Resources and references

## Important Notes

- **Data Persistence**: The GitHub Pages version uses the demo data from `data/training-data.json`. User data is not saved on the static site.
- **Interactive Features**: Forms and data entry work locally but won't persist on the static GitHub Pages version.
- **Local Use**: For full functionality with data persistence, run the Express.js server locally.
- **GitHub Pages**: Best used as a reference guide and documentation site.

## Sharing Your Site

Share the live link with:
- Fellow veterans training service dogs
- Service dog training communities
- Friends and family who want to follow Gypsy's progress

## Technical Details

- **Static Generator**: Custom Node.js script (`build-static.js`)
- **Template Engine**: EJS (Embedded JavaScript)
- **CSS Framework**: Custom CSS with CSS Grid and Flexbox
- **JavaScript Libraries**: Chart.js v4.4.0 for analytics
- **Hosting**: GitHub Pages (free tier)
- **HTTPS**: Automatically enabled by GitHub Pages

---

Built with ❤️ for Gypsy and all service dogs in training.
Semper Fi! 🇺🇸🐕‍🦺
