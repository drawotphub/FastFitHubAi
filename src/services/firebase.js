import firebase from 'firebase/app';
import 'firebase/auth';
import { ENV } from '../utils/env';

const firebaseConfig = {
  apiKey: ENV.FIREBASE_API_KEY,
  authDomain: ENV.FIREBASE_AUTH_DOMAIN,
  projectId: ENV.FIREBASE_PROJECT_ID,
  storageBucket: ENV.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: ENV.FIREBASE_MESSAGING_SENDER_ID,
  appId: ENV.FIREBASE_APP_ID
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const login = async (email, password) => {
  return await firebase.auth().signInWithEmailAndPassword(email, password);
};

export const register = async (email, password) => {
  return await firebase.auth().createUserWithEmailAndPassword(email, password);
};
