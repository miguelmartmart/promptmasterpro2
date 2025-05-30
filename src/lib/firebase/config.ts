
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

const checkFirebaseConfig = () => {
  if (!firebaseConfig.apiKey || firebaseConfig.apiKey === "YOUR_API_KEY") {
    console.error(
      "🛑 FIREBASE CONFIGURATION ERROR: API Key is missing or is still a placeholder.\n" +
      "Please ensure you have a .env.local file in the root of your project with your actual Firebase credentials.\n" +
      "Example .env.local content:\n" +
      "NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyB... (your actual key)\n" +
      "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com\n" +
      "NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id\n" +
      "...\n" +
      "You can find these values in your Firebase project settings."
    );
    // Firebase will throw its own error, but this provides more specific guidance.
    return false;
  }
  return true;
};

if (typeof window !== 'undefined' && !getApps().length) {
  if (checkFirebaseConfig()) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    // db = getFirestore(app); // Example for Firestore
    // if (firebaseConfig.measurementId) { // Example for Analytics
    //   analytics = getAnalytics(app);
    // }
  } else {
    // Prevent further Firebase calls if config is invalid
    // @ts-ignore
    app = null; 
    // @ts-ignore
    auth = null;
  }
} else if (typeof window !== 'undefined') {
  // This case implies app was already initialized, but good to be safe.
  if (checkFirebaseConfig()) {
    app = getApp();
    auth = getAuth(app);
    // db = getFirestore(app); // Example for Firestore
    // if (firebaseConfig.measurementId) { // Example for Analytics
    //   analytics = getAnalytics(app);
    // }
  } else {
    // @ts-ignore
    app = null;
    // @ts-ignore
    auth = null;
  }
} else {
  // Handle server-side if needed, though auth is primarily client-side
  // For server-side Admin SDK, setup is different. This config is for client SDK.
}

const googleAuthProvider = new GoogleAuthProvider();

// @ts-ignore
export { app, auth, googleAuthProvider /*, db, analytics */ };
