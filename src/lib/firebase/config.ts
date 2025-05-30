import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, type Auth } from 'firebase/auth';
// import { getFirestore, type Firestore } from 'firebase/firestore'; // Example for Firestore
// import { getAnalytics, type Analytics } from "firebase/analytics"; // Example for Analytics

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID, // Optional
};

let app: FirebaseApp;
let auth: Auth;
// let db: Firestore; // Example for Firestore
// let analytics: Analytics | null = null; // Example for Analytics

if (typeof window !== 'undefined' && !getApps().length) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  // db = getFirestore(app); // Example for Firestore
  // if (firebaseConfig.measurementId) { // Example for Analytics
  //   analytics = getAnalytics(app);
  // }
} else if (typeof window !== 'undefined') {
  app = getApp();
  auth = getAuth(app);
  // db = getFirestore(app); // Example for Firestore
  // if (firebaseConfig.measurementId) { // Example for Analytics
  //   analytics = getAnalytics(app);
  // }
} else {
  // Handle server-side if needed, though auth is primarily client-side
  // For server-side Admin SDK, setup is different. This config is for client SDK.
}

const googleAuthProvider = new GoogleAuthProvider();

// @ts-ignore
export { app, auth, googleAuthProvider /*, db, analytics */ };
