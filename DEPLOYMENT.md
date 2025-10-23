# Deployment Guide

This document describes the deployment process for the GDC25 website.

## Hosting Platform

The website is hosted on **Netlify** and is connected to the GitHub repository for continuous deployment.

## Branching Strategy

We use a simple two-branch workflow:

- **`main`** - Production branch (deployed to live site)
- **`dev`** - Development branch (for staging changes)

We do not use feature branches in this workflow.

## Deployment Process

### 1. Development Phase

All changes are committed directly to the `dev` branch:

```bash
git checkout dev
# Make your changes
git add .
git commit -m "Your commit message"
git push origin dev
```

### 2. Creating a Pull Request

When changes on `dev` are ready for production, create a pull request to merge into `main`:

```bash
gh pr create --base main --head dev --title "Your PR title" --body "Description of changes"
```

Or use the GitHub web interface to create a pull request from `dev` to `main`.

### 3. Netlify Preview Deployment

Once the pull request is created, Netlify automatically:

- Detects the pull request
- Builds the site from the PR branch
- Generates a **preview deployment link**
- Posts the preview link as a comment on the pull request

Use this preview link to review and test changes before merging to production.

### 4. Merging to Production

After reviewing the preview deployment:

1. Approve the pull request (if using review workflows)
2. Merge the pull request into `main`
3. Delete the `dev` branch reference in the PR (optional)

```bash
# Or merge via command line
git checkout main
git pull origin main
git merge dev
git push origin main
```

### 5. Production Deployment

When the merge to `main` is complete, Netlify automatically:

- Detects the change to the `main` branch
- Builds the production site
- Deploys to the live URL
- Typically completes within 2-5 minutes

## Build Configuration

Netlify build settings are configured in the Netlify dashboard.

## Environment Variables

Required environment variables must be configured in the Netlify dashboard:

- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key

Access environment variables at: **Netlify Dashboard → Site Settings → Environment Variables**

## Deployment Status

Monitor deployment status:

- **Netlify Dashboard** - View build logs and deployment history
- **GitHub PR Checks** - See Netlify deployment status on pull requests
- **Netlify Deploy Notifications** - Configure notifications in Netlify settings

## Rollback Process

If a deployment introduces issues:

1. Go to **Netlify Dashboard → Deploys**
2. Find the previous successful deployment
3. Click **"Publish deploy"** to rollback

Alternatively, revert the commit on `main` and push:

```bash
git checkout main
git revert <commit-hash>
git push origin main
```

## Build Times

Typical build times:
- **Development preview**: 2-3 minutes
- **Production deployment**: 3-5 minutes

## Troubleshooting

### Build Failures

If a build fails on Netlify:

1. Check the build logs in Netlify Dashboard
2. Verify environment variables are set correctly
3. Ensure `npm run build` succeeds locally
4. Check for TypeScript errors: `npm run lint`

### Deploy Preview Not Generating

If Netlify doesn't generate a preview for a PR:

1. Verify the Netlify GitHub integration is active
2. Check that the PR is from `dev` to `main`
3. Review Netlify's GitHub app permissions

## Quick Reference

| Action | Command |
|--------|---------|
| Push to dev | `git push origin dev` |
| Create PR | `gh pr create --base main --head dev` |
| Merge PR | Via GitHub UI or `git merge dev` on main |
| Check build status | Netlify Dashboard or GitHub PR checks |
| Rollback | Netlify Dashboard → Publish previous deploy |

## Support

For deployment issues:
- Check Netlify build logs for error details
- Review Netlify documentation: https://docs.netlify.com
- Contact repository maintainer for access issues
