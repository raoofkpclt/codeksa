import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// -------------------------
// Admin App
// -------------------------
export const adminApp = initializeApp(firebaseConfig, "admin");

export const adminAuth = getAuth(adminApp);
export const adminStorage = getStorage(adminApp);

// -------------------------
// Client App
// -------------------------
export const clientApp = initializeApp(firebaseConfig, "client");

export const clientAuth = getAuth(clientApp);
export const db = getFirestore(adminApp);
export const clientStorage = getStorage(clientApp);

// Analytics
isSupported().then((supported) => {
  if (supported) {
    getAnalytics(adminApp);
  }
});