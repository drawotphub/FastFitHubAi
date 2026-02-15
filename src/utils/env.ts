/**
 * Environment configuration for FastFitHub AI
 * Uses Expo's built-in environment variable support
 */

export const ENV = {
  // Firebase Configuration
  FIREBASE_API_KEY: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || '',
  FIREBASE_AUTH_DOMAIN: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  FIREBASE_PROJECT_ID: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || '',
  FIREBASE_STORAGE_BUCKET: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  FIREBASE_MESSAGING_SENDER_ID: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  FIREBASE_APP_ID: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || '',

  // AI & ML APIs
  GEMINI_API_KEY: process.env.EXPO_PUBLIC_GEMINI_API_KEY || '',
  OPENAI_API_KEY: process.env.EXPO_PUBLIC_OPENAI_API_KEY || '',
  HUGGING_FACE_API_KEY: process.env.EXPO_PUBLIC_HUGGING_FACE_API_KEY || '',

  // Payment APIs
  STRIPE_PUBLISHABLE_KEY: process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
  RAZORPAY_KEY: process.env.EXPO_PUBLIC_RAZORPAY_KEY || '',

  // Other APIs
  GOOGLE_VISION_API_KEY: process.env.EXPO_PUBLIC_GOOGLE_VISION_API_KEY || '',
  SERP_API_KEY: process.env.EXPO_PUBLIC_SERP_API_KEY || '',

  // App Configuration
  API_BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:3000',
  ENV_MODE: process.env.EXPO_PUBLIC_ENV_MODE || 'development',
  IS_MOCK: process.env.EXPO_PUBLIC_IS_MOCK === 'true' || false,
};

/**
 * Validate that required environment variables are set
 */
export const validateEnv = () => {
  const required = ['FIREBASE_PROJECT_ID', 'FIREBASE_API_KEY'];

  for (const key of required) {
    if (!ENV[key as keyof typeof ENV]) {
      console.warn(`⚠️ Missing environment variable: ${key}`);
    }
  }
};
