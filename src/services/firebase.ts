import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration - Replace with your config
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || '',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Auth functions
export const login = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const register = async (
  email: string,
  password: string,
  fullName: string
) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;

    // Create user profile in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: email,
      fullName: fullName,
      createdAt: new Date(),
      updatedAt: new Date(),
      profile: {
        avatar: '',
        bio: '',
        fitnessGoal: '',
        experience: 'beginner',
      },
      stats: {
        totalWorkouts: 0,
        totalCalories: 0,
        totalDuration: 0,
        streak: 0,
      },
    });

    return user;
  } catch (error) {
    console.error('Register error:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

// User profile functions
export const getUserProfile = async (uid: string) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return userDoc.data();
    }
    return null;
  } catch (error) {
    console.error('Get user profile error:', error);
    throw error;
  }
};

export const updateUserProfile = async (
  uid: string,
  data: Record<string, unknown>
) => {
  try {
    await updateDoc(doc(db, 'users', uid), {
      ...data,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error('Update user profile error:', error);
    throw error;
  }
};

// Workout functions
export const addWorkout = async (
  uid: string,
  workoutData: Record<string, unknown>
) => {
  try {
    const workoutsRef = collection(db, 'users', uid, 'workouts');
    const docRef = doc(workoutsRef);
    await setDoc(docRef, {
      ...workoutData,
      createdAt: new Date(),
      id: docRef.id,
    });
    return docRef.id;
  } catch (error) {
    console.error('Add workout error:', error);
    throw error;
  }
};

export const getUserWorkouts = async (uid: string, limit: number = 10) => {
  try {
    const workoutsRef = collection(db, 'users', uid, 'workouts');
    const q = query(workoutsRef);
    const querySnapshot = await getDocs(q);
    const workouts: unknown[] = [];
    querySnapshot.forEach((doc) => {
      workouts.push(doc.data());
    });
    return workouts.slice(0, limit);
  } catch (error) {
    console.error('Get user workouts error:', error);
    throw error;
  }
};

// Auth state listener
export const onAuthChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};
