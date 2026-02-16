# GitHub Build Trigger Failure - Resolution Guide

## Error Details

```
GITHUB_NOT_FOUND_ERROR: Failed to read "/https:/github.com/drawotphub/FastFitHubAi/tree/main/package.json".
Check your GitHub app installation settings and your Expo project's GitHub settings to make sure you've configured everything correctly.
```

## Root Cause Analysis

This error occurs when:

1. **GitHub App Permissions Issue** - The GitHub app doesn't have proper access to the repository
2. **Expo Project Configuration** - The Expo project isn't properly linked to GitHub
3. **Repository Access** - The app can't authenticate or read the repository
4. **EAS Configuration** - EAS Build can't access the GitHub repository

## Solution Steps

### Step 1: Verify GitHub App Installation

1. Go to your GitHub account settings: https://github.com/settings/apps/authorizations
2. Find the Expo app or relevant GitHub app
3. Click on it and verify:
   - ✅ Repository access is granted to `drawotphub/FastFitHubAi`
   - ✅ Permissions include `contents` (read/write)
   - ✅ Permissions include `workflows` (read/write)
4. If not granted, click **Grant** or **Update permissions**

### Step 2: Check Expo Project Connection

**Option A: Using EAS CLI**

```bash
# Login to Expo
eas login

# Link project to Expo
eas project:info

# Verify GitHub connection
eas build:list
```

**Option B: Manual Configuration**

1. Go to https://expo.dev/projects
2. Find your project: `fastfithubai`
3. Click on project settings
4. Go to **GitHub** section
5. Click **Connect GitHub Repository**
6. Select `drawotphub/FastFitHubAi`
7. Grant permissions

### Step 3: Update app.json

Ensure your `app.json` has the correct Expo configuration:

```json
{
  "expo": {
    "name": "FastFitHub AI",
    "slug": "fastfithubai",
    "version": "1.0.0",
    "owner": "fastfithub",
    "extra": {
      "eas": {
        "projectId": "aafad975-3aa7-4740-bbd9-3ca0abeeb306"
      }
    }
  }
}
```

**Key fields:**
- `owner` - Your Expo username
- `projectId` - Get from `eas project:info`

### Step 4: Verify Repository Access

Run these commands locally:

```bash
# Check if you can access the repo
git remote -v

# Should output:
# origin  https://github.com/drawotphub/FastFitHubAi.git (fetch)
# origin  https://github.com/drawotphub/FastFitHubAi.git (push)

# Verify package.json exists
ls -la package.json

# Verify it's valid JSON
node -e "console.log(JSON.stringify(require('./package.json'), null, 2))"
```

### Step 5: Reconnect GitHub to Expo

1. **Disconnect Current Connection**
   ```bash
   eas build:configure --clear
   ```

2. **Reconnect Repository**
   ```bash
   eas build:configure
   ```

3. **Select GitHub when prompted**

4. **Grant all permissions**

### Step 6: Test Build Trigger

```bash
# Test local build first
npm install
npm run lint

# Then trigger EAS build
eas build --platform ios --dry-run

# Or for Android
eas build --platform android --dry-run
```

## Advanced Troubleshooting

### Check EAS Build Configuration

```bash
# View current configuration
eas build:list

# View build configuration
cat eas.json
```

### Create eas.json if Missing

```json
{
  "build": {
    "development": {
      "distribution": "internal",
      "android": {
        "gradleCommand": ":app:assembleDebug"
      },
      "ios": {
        "buildConfiguration": "Debug"
      }
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {
      "distribution": "store"
    }
  },
  "submit": {
    "production": {
      "ios": true,
      "android": true
    }
  }
}
```

### Verify GitHub Credentials

```bash
# Check if GitHub credentials are cached
gh auth status

# If not authenticated, login
gh auth login

# Verify access to repo
gh repo view drawotphub/FastFitHubAi
```

### Check Expo Token

```bash
# View current Expo token
eas whoami

# If not authenticated, login
eas login

# Create new token if needed
eas secret create --scope project --name EXPO_TOKEN
```

## GitHub App Permissions Checklist

The GitHub app needs these permissions:

| Permission | Scope | Required |
|-----------|-------|----------|
| `contents` | Read/Write | ✅ Yes |
| `workflows` | Read/Write | ✅ Yes |
| `pull-requests` | Read/Write | ✅ Yes |
| `statuses` | Read/Write | ✅ Yes |
| `checks` | Read/Write | ✅ Yes |
| `deployments` | Read/Write | ⚠️ Optional |

**To Update Permissions:**

1. Go to https://github.com/settings/apps
2. Find the app (usually "Expo" or similar)
3. Click **Edit**
4. Go to **Permissions** section
5. Update as needed
6. Click **Save**

## Common Scenarios

### Scenario 1: First Time Setup

1. Create Expo account at https://expo.dev
2. Create new project: `eas project:create`
3. Link GitHub: `eas build:configure`
4. Grant all permissions when prompted
5. Test build: `eas build --platform ios --dry-run`

### Scenario 2: Migrating Repository

1. Update `app.json` with new repository info
2. Disconnect old GitHub connection: `eas build:configure --clear`
3. Reconnect to new repository
4. Test build

### Scenario 3: Multiple Team Members

1. All members should use same Expo account
2. Or create organization account
3. Grant repository access to all members
4. Share `projectId` in `app.json`

## Prevention Tips

1. **Keep app.json Updated**
   - Always commit `app.json` changes
   - Use version control for configuration

2. **Regular Permission Audits**
   - Monthly check GitHub app permissions
   - Verify Expo project settings

3. **Documentation**
   - Document your Expo setup
   - Keep credentials secure

4. **Testing**
   - Test builds locally first
   - Use dry-run before production builds

## Support Resources

- **Expo Documentation:** https://docs.expo.dev/
- **EAS Build:** https://docs.expo.dev/build/introduction/
- **GitHub App Setup:** https://docs.github.com/en/apps/using-github-apps
- **Troubleshooting:** https://docs.expo.dev/build/troubleshooting/

## Still Having Issues?

If the above steps don't work:

1. **Check Expo Status:** https://status.expo.dev/
2. **Review Logs:** `eas build:list --verbose`
3. **Contact Expo Support:** https://expo.dev/contact
4. **GitHub Support:** https://support.github.com/

---

**Last Updated:** February 2026
**Version:** 1.0.0

## Quick Reference Commands

```bash
# Login to Expo
eas login

# Check Expo authentication
eas whoami

# View project info
eas project:info

# Configure build
eas build:configure

# Test build (dry-run)
eas build --platform ios --dry-run

# View build history
eas build:list

# View build logs
eas build:view <build-id>

# Check GitHub connection
gh auth status

# Verify repository access
gh repo view drawotphub/FastFitHubAi
```
