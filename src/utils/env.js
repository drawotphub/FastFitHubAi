import { config } from 'dotenv';
config();

export const ENV = {
  FIREBASE_API_KEY: process.env.FIREBASE_API_KEY || 'placeholder',
  FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN || 'placeholder',
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID || 'placeholder',
  FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET || 'placeholder',
  FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID || 'placeholder',
  FIREBASE_APP_ID: process.env.FIREBASE_APP_ID || 'placeholder',
  GOOGLE_CLOUD_PROJECT: process.env.GOOGLE_CLOUD_PROJECT || 'placeholder',
  GOOGLE_CLOUD_KEYFILE: process.env.GOOGLE_CLOUD_KEYFILE || 'placeholder',
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || 'placeholder',
  GOOGLE_VISION_API_KEY: process.env.GOOGLE_VISION_API_KEY || 'placeholder',
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || 'placeholder',
  HUGGING_FACE_API_KEY: process.env.HUGGING_FACE_API_KEY || 'placeholder',
  RAZORPAY_KEY: process.env.RAZORPAY_KEY || 'placeholder',
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || 'placeholder',
  STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY || 'placeholder',
  INSTACART_API_KEY: process.env.INSTACART_API_KEY || 'placeholder',
  SERP_API_KEY: process.env.SERP_API_KEY || 'placeholder',
  IS_MOCK: false
};
