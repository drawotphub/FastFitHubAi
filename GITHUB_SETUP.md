# GitHub Actions & Deployment Setup Guide

This guide helps you set up GitHub Actions for automated CI/CD and resolve deployment issues.

## Quick Start

### 1. Grant GitHub App Workflow Permissions

**Problem:** `GitHub App to create or update workflow without 'workflows' permission`

**Solution:**

1. Go to your repository: `https://github.com/drawotphub/FastFitHubAi`
2. Click **Settings** (top right)
3. Navigate to **Actions** → **General** (left sidebar)
4. Under **Workflow permissions**, select:
   - ✅ **Read and write permissions**
   - ✅ **Allow GitHub Actions to create and approve pull requests**
5. Click **Save**

### 2. Add Required Secrets

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret** and add:

| Secret Name | Value | How to Get |
|------------|-------|-----------|
| `EXPO_TOKEN` | Your Expo token | Run `eas secret create` locally |
| `FIREBASE_API_KEY` | Firebase API key | From Firebase Console |
| `FIREBASE_PROJECT_ID` | Firebase project ID | From Firebase Console |

3. Click **Add secret** for each

### 3. Enable Dependabot

1. Go to **Settings** → **Code security and analysis**
2. Enable **Dependabot alerts**
3. Enable **Dependabot security updates**
4. Enable **Dependabot version updates** (optional)

## Workflow Files

### CI/CD Pipeline (`.github/workflows/ci.yml`)

Runs on every push and pull request:

- ✅ Install dependencies
- ✅ Run linter
- ✅ Type checking
- ✅ Security audit
- ✅ Expo validation

**View Status:** Go to **Actions** tab → **CI/CD Pipeline**

### Expo Build (`.github/workflows/expo-build.yml`)

Runs on push to main branch:

- ✅ Build web version
- ✅ Upload artifacts
- ✅ Notify on completion

**View Status:** Go to **Actions** tab → **Expo Build**

## Troubleshooting

### Workflow Permission Error

**Error:** `refusing to allow a GitHub App to create or update workflow`

**Fix:** Follow "Grant GitHub App Workflow Permissions" section above

### Workflow Not Running

**Possible Causes:**

1. **Workflows not enabled**
   - Go to **Settings** → **Actions** → **General**
   - Ensure "Actions permissions" is set to "Allow all actions and reusable workflows"

2. **Branch protection rules blocking**
   - Go to **Settings** → **Branches**
   - Check if branch protection requires status checks
   - Add workflows to required checks

3. **Secrets not set**
   - Go to **Settings** → **Secrets and variables** → **Actions**
   - Verify all required secrets are present

### Build Failures

**Check Logs:**

1. Go to **Actions** tab
2. Click on the failed workflow run
3. Click on the failed job
4. Review the error messages

**Common Issues:**

| Error | Solution |
|-------|----------|
| `npm: not found` | Node.js not installed in runner |
| `EXPO_TOKEN not set` | Add secret to GitHub (see section above) |
| `TypeScript error` | Fix type errors in source files |
| `Dependency conflict` | Run `npm install` locally and commit lock file |

## Manual Workflow Triggers

### Using GitHub CLI

```bash
# List available workflows
gh workflow list

# Trigger CI workflow
gh workflow run ci.yml

# Trigger Expo build
gh workflow run expo-build.yml

# View recent runs
gh run list

# View specific run details
gh run view <run_id>

# View run logs
gh run view <run_id> --log
```

### Using GitHub Web UI

1. Go to **Actions** tab
2. Select workflow from left sidebar
3. Click **Run workflow** dropdown
4. Select branch
5. Click **Run workflow**

## Setting Up Auto-Deployment

### Deploy on Release

To automatically deploy when you create a release:

1. Create a release on GitHub
2. The workflow will automatically:
   - Build the app
   - Generate changelog
   - Upload artifacts

**Create Release:**

```bash
gh release create v1.0.0 --title "Version 1.0.0" --notes "Release notes here"
```

### Deploy on Tag

To deploy when you push a tag:

```bash
git tag v1.0.0
git push origin v1.0.0
```

## Monitoring & Notifications

### Email Notifications

GitHub automatically sends emails for:
- Workflow failures
- Workflow completions (if configured)

**Configure:** Go to **Settings** → **Notifications**

### Slack Integration

To get Slack notifications:

1. Install [GitHub Slack App](https://slack.github.com/)
2. Run `/github subscribe drawotphub/FastFitHubAi workflows`
3. Choose which events to notify

### Discord Integration

To get Discord notifications:

1. Create Discord webhook
2. Add GitHub bot integration
3. Configure channel

## Best Practices

### Commit Messages

Use conventional commits for better workflow tracking:

```
feat: add new feature
fix: fix bug
docs: update documentation
ci: update CI/CD configuration
```

### Branch Strategy

- **main** - Production-ready code
- **develop** - Development branch
- **feature/*** - Feature branches
- **hotfix/*** - Hotfix branches

### Pull Request Process

1. Create feature branch from `develop`
2. Make changes and commit
3. Push to GitHub
4. Create Pull Request to `develop`
5. Wait for CI checks to pass
6. Get code review approval
7. Merge to `develop`
8. Create PR from `develop` to `main`
9. Merge to `main` (triggers deployment)

## Advanced Configuration

### Custom Environment Variables

Add to workflow file:

```yaml
env:
  NODE_ENV: production
  EXPO_DEBUG: false
```

### Matrix Builds

Test across multiple Node versions:

```yaml
strategy:
  matrix:
    node-version: [18.x, 20.x]
```

### Conditional Steps

Run steps only on specific conditions:

```yaml
- name: Deploy
  if: github.ref == 'refs/heads/main'
  run: npm run deploy
```

## Useful Links

- **GitHub Actions Docs:** https://docs.github.com/en/actions
- **Workflow Syntax:** https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions
- **Expo CI/CD:** https://docs.expo.dev/build/setup/
- **EAS Secrets:** https://docs.expo.dev/build/secrets/

## Support

If you encounter issues:

1. Check workflow logs in **Actions** tab
2. Review this guide's troubleshooting section
3. Check GitHub Actions documentation
4. Open an issue on the repository

---

**Last Updated:** February 2026
**Version:** 1.0.0
