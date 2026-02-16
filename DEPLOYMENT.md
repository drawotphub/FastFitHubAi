# FastFitHub AI - Deployment Guide

This guide helps you deploy FastFitHub AI to production and troubleshoot deployment issues.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Building for Production](#building-for-production)
4. [Deploying to App Stores](#deploying-to-app-stores)
5. [Troubleshooting](#troubleshooting)
6. [GitHub Actions Setup](#github-actions-setup)

## Prerequisites

Before deploying, ensure you have:

- **Node.js** 18+ and npm/pnpm installed
- **Expo Account** - Sign up at [expo.dev](https://expo.dev)
- **EAS CLI** - Install with `npm install -g eas-cli`
- **Apple Developer Account** (for iOS deployment)
- **Google Play Developer Account** (for Android deployment)
- **GitHub Account** with repository access

## Environment Setup

### 1. Configure Environment Variables

Create a `.env.local` file in the project root with your production credentials:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=your_production_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_production_auth_domain
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_production_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_production_storage_bucket
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_production_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_production_app_id
EXPO_PUBLIC_ENV_MODE=production
```

### 2. Update app.json

Ensure your `app.json` has correct production settings:

```json
{
  "expo": {
    "name": "FastFitHub AI",
    "version": "1.0.0",
    "owner": "your_expo_username",
    "extra": {
      "eas": {
        "projectId": "your_eas_project_id"
      }
    }
  }
}
```

### 3. Login to Expo

```bash
expo login
# or
eas login
```

## Building for Production

### Option 1: Using EAS Build (Recommended)

**Step 1: Initialize EAS**

```bash
eas build:configure
```

**Step 2: Build for iOS**

```bash
eas build --platform ios --auto-submit
```

**Step 3: Build for Android**

```bash
eas build --platform android --auto-submit
```

**Step 4: Monitor Build Status**

```bash
eas build:list
```

### Option 2: Local Build

**For iOS:**

```bash
npm run ios
# Then use Xcode to build and archive
```

**For Android:**

```bash
npm run android
# Then use Android Studio to build APK/AAB
```

## Deploying to App Stores

### iOS App Store

1. **Prepare App Store Connect**
   - Create app in App Store Connect
   - Configure bundle identifier matching `app.json`
   - Set up app signing certificates

2. **Build and Submit**
   ```bash
   eas build --platform ios --auto-submit
   ```

3. **Review and Release**
   - Go to App Store Connect
   - Review build details
   - Submit for review
   - Wait for Apple's approval

### Google Play Store

1. **Prepare Google Play Console**
   - Create app in Google Play Console
   - Configure package name matching `app.json`
   - Set up signing key

2. **Build and Submit**
   ```bash
   eas build --platform android --auto-submit
   ```

3. **Review and Release**
   - Go to Google Play Console
   - Review build details
   - Submit for review
   - Wait for Google's approval

## Troubleshooting

### Build Failures

**Error: "Missing environment variables"**

**Solution:** Ensure all required `.env` variables are set:
```bash
npm run check-env
```

**Error: "TypeScript compilation failed"**

**Solution:** Check for type errors:
```bash
npx typescript --noEmit
```

**Error: "Dependency conflicts"**

**Solution:** Clear cache and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Deployment Failures

**Error: "GitHub App workflow permission denied"**

**Solution:** Grant workflow permissions to GitHub App:
1. Go to Settings → Developer settings → GitHub Apps
2. Select the app being used
3. Enable `workflows` permission
4. Save and retry

**Error: "App signing failed"**

**Solution:** Verify signing certificates:
```bash
# For iOS
eas credentials
```

**Error: "Build timeout"**

**Solution:** Increase build timeout or split into smaller builds:
```bash
eas build --platform ios --timeout 3600
```

### Common Issues

**Issue: App crashes on startup**

**Solution:**
1. Check Firebase configuration in `.env`
2. Verify all required permissions in `app.json`
3. Check console logs: `npm start -- --verbose`

**Issue: Authentication not working**

**Solution:**
1. Verify Firebase credentials are correct
2. Check Firebase security rules allow your app
3. Test Firebase connection: `npm run test:firebase`

**Issue: Performance issues**

**Solution:**
1. Profile with React DevTools
2. Optimize images and assets
3. Lazy load components
4. Check for memory leaks

## GitHub Actions Setup

### Enabling CI/CD Workflows

1. **Grant Workflow Permissions**
   - Go to repository Settings
   - Navigate to Actions → General
   - Under "Workflow permissions", select "Read and write permissions"
   - Enable "Allow GitHub Actions to create and approve pull requests"

2. **Add Secrets**
   - Go to Settings → Secrets and variables → Actions
   - Add required secrets:
     - `EXPO_TOKEN` - Get from `eas secret create`
     - `FIREBASE_CONFIG` - Your Firebase config
     - Any other API keys

3. **Monitor Workflows**
   - Go to Actions tab
   - View workflow runs
   - Check logs for any failures

### Manual Workflow Trigger

```bash
# Trigger build workflow
gh workflow run expo-build.yml

# Check status
gh run list --workflow=expo-build.yml
```

## Production Checklist

Before releasing to production:

- [ ] All environment variables configured
- [ ] Firebase security rules reviewed
- [ ] App version bumped in `app.json`
- [ ] Build tested on physical devices
- [ ] Performance profiled and optimized
- [ ] Security audit completed
- [ ] Analytics configured
- [ ] Error tracking (Sentry) set up
- [ ] Crash reporting enabled
- [ ] Privacy policy updated
- [ ] Terms of service reviewed
- [ ] App store listings prepared
- [ ] Screenshots and descriptions ready
- [ ] Beta testing completed
- [ ] Rollback plan documented

## Monitoring Production

### Set Up Error Tracking

```bash
npm install @sentry/react-native
```

### Configure Analytics

```bash
npm install firebase-analytics
```

### Monitor Performance

- Use Firebase Performance Monitoring
- Set up custom metrics
- Track user engagement

## Rollback Procedures

If deployment fails:

1. **Immediate Rollback**
   ```bash
   eas build:list
   eas submit --id <previous_build_id>
   ```

2. **Hotfix Deployment**
   - Create hotfix branch
   - Fix critical issues
   - Test thoroughly
   - Deploy as patch version

3. **Communication**
   - Notify users of issues
   - Provide ETA for fix
   - Update status page

## Support & Resources

- **Expo Documentation:** https://docs.expo.dev/
- **EAS Build:** https://docs.expo.dev/build/introduction/
- **Firebase Deployment:** https://firebase.google.com/docs/hosting/deploying
- **App Store Guide:** https://developer.apple.com/app-store/
- **Google Play Guide:** https://developer.android.com/distribute/play-console

## Getting Help

If you encounter deployment issues:

1. Check this guide's troubleshooting section
2. Review Expo documentation
3. Check GitHub issues for similar problems
4. Ask in Expo forums or Discord
5. Contact support@expo.dev

---

**Last Updated:** February 2026
**Version:** 1.0.0
