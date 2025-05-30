
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, type Auth } from 'firebase/auth';
import { getAnalytics, isSupported as isAnalyticsSupported, type Analytics } from "firebase/analytics";
import { getPerformance, type FirebasePerformance } from "firebase/performance";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let analytics: Analytics | null = null;
let perf: FirebasePerformance | null = null;


const checkFirebaseConfig = () => {
  let validConfig = true;
  if (!firebaseConfig.apiKey || firebaseConfig.apiKey === "YOUR_API_KEY" || firebaseConfig.apiKey === "AIzaSyAZs401-CrplcKABS__YkpTFrSo4PNx82g") { // Added your specific placeholder to catch it
    console.error(
      "🛑 FIREBASE CONFIGURATION ERROR: API Key is missing or is still a placeholder.\n" +
      "Please ensure you have a .env.local file in the root of your project with your actual Firebase credentials for NEXT_PUBLIC_FIREBASE_API_KEY.\n" +
      "You can find these values in your Firebase project settings (Project settings > General > Your apps > Web app > SDK setup and configuration)."
    );
    validConfig = false;
  }
  // Check for other critical placeholder values if needed
  if (!firebaseConfig.projectId || firebaseConfig.projectId === "YOUR_PROJECT_ID" || firebaseConfig.projectId === "promptmasterpro-461411") {
     console.warn(
      "⚠️ FIREBASE CONFIGURATION WARNING: Project ID might be a placeholder (YOUR_PROJECT_ID or the example ID promptmasterpro-461411).\n" +
      "Ensure NEXT_PUBLIC_FIREBASE_PROJECT_ID in .env.local is set to your actual Firebase Project ID."
    );
    // Not setting validConfig to false for projectId, as apiKey is the primary blocker for init
  }

  if (!firebaseConfig.measurementId && (process.env.NODE_ENV === 'production' || process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID)) {
    console.warn(
      "⚠️ FIREBASE ANALYTICS WARNING: NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID is missing in your .env.local file.\n" +
      "Firebase Analytics will not be initialized. This ID is required if you intend to use Firebase Analytics as declared in your privacy policy.\n" +
      "You can find this in Firebase project settings > General > Your apps > Web app > SDK setup and configuration."
    );
  }
  return validConfig;
};

if (typeof window !== 'undefined' && checkFirebaseConfig()) {
  if (!getApps().length) {
    try {
      app = initializeApp(firebaseConfig);
    } catch (e) {
      console.error("Error initializing Firebase app:", e);
      app = null; // Ensure app is null if initialization fails
    }
  } else {
    app = getApp();
  }

  if (app) {
    try {
      auth = getAuth(app);
    } catch (e) {
      console.error("Error getting Firebase Auth instance:", e);
      auth = null;
    }

    if (firebaseConfig.measurementId) {
      isAnalyticsSupported().then((supported) => {
        if (supported && app) {
          try {
            analytics = getAnalytics(app);
          } catch (e) {
            console.error("Error initializing Firebase Analytics:", e);
            analytics = null;
          }
        } else if (!supported) {
          console.log("Firebase Analytics is not supported in this browser environment.");
        }
      }).catch(e => {
         console.error("Error checking Analytics support:", e);
      });
    }

    try {
      perf = getPerformance(app);
    } catch (e) {
      console.error("Error initializing Firebase Performance Monitoring:", e);
      perf = null;
    }
  }
}


const googleAuthProvider = new GoogleAuthProvider();

export { app, auth, googleAuthProvider, analytics, perf };
