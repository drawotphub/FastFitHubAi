// User Types
export interface User {
  id: string;
  email: string;
  fullName: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Health Data Types
export interface DailyMetrics {
  date: string;
  steps: number;
  calories: number;
  water: number; // in ml
  sleep: number; // in hours
  heartRate: number;
  distance: number; // in km
}

export interface Activity {
  id: string;
  userId: string;
  type: 'running' | 'cycling' | 'gym' | 'walking' | 'swimming' | 'yoga';
  duration: number; // in minutes
  calories: number;
  distance: number; // in km
  intensity: 'low' | 'medium' | 'high';
  startTime: Date;
  endTime: Date;
  notes?: string;
  verified: boolean; // blockchain verified
}

export interface Meal {
  id: string;
  userId: string;
  name: string;
  calories: number;
  protein: number; // in grams
  carbs: number; // in grams
  fat: number; // in grams
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  timestamp: Date;
  verified: boolean; // blockchain verified
}

export interface NutritionGoals {
  dailyCalories: number;
  protein: number; // in grams
  carbs: number; // in grams
  fat: number; // in grams
  water: number; // in ml
}

// Blockchain/Crypto Types
export interface Wallet {
  id: string;
  userId: string;
  address: string;
  balance: number; // in HCH tokens
  usdValue: number;
  createdAt: Date;
  lastUpdated: Date;
}

export interface Transaction {
  id: string;
  walletId: string;
  type: 'reward' | 'transfer' | 'swap';
  amount: number;
  fromAddress: string;
  toAddress: string;
  status: 'pending' | 'completed' | 'failed';
  transactionHash?: string;
  timestamp: Date;
  description: string;
}

export interface Reward {
  id: string;
  userId: string;
  activityId?: string;
  mealId?: string;
  amount: number; // in HCH tokens
  reason: string;
  claimedAt: Date;
  claimed: boolean;
}

// Achievement Types
export interface Achievement {
  id: string;
  userId: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  progress: number; // 0-100
}

// Settings Types
export interface UserSettings {
  userId: string;
  theme: 'light' | 'dark' | 'auto';
  notifications: boolean;
  pushNotifications: boolean;
  emailNotifications: boolean;
  language: string;
  currency: string;
  privacyLevel: 'public' | 'friends' | 'private';
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Navigation Types
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Dashboard: undefined;
  Activities: undefined;
  Nutrition: undefined;
  Wallet: undefined;
  Profile: undefined;
  ActivityDetail: { activityId: string };
  MealDetail: { mealId: string };
  TransactionDetail: { transactionId: string };
};

// Chart Data Types
export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface WeeklyStats {
  date: string;
  steps: number;
  calories: number;
  activities: number;
  meals: number;
}

// Auth Types
export interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'achievement' | 'reward' | 'reminder' | 'alert';
  read: boolean;
  timestamp: Date;
  actionUrl?: string;
}
