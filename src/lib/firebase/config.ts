
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

// Your specific API key, if this is the one you intend to use.
const USER_SPECIFIC_API_KEY = "AIzaSyAZs401-CrplcKABS__YkpTFrSo4PNx82g";

const checkFirebaseConfig = (): boolean => {
  let validConfig = true;
  const genericPlaceholderKey = "YOUR_API_KEY";

  if (!firebaseConfig.apiKey || firebaseConfig.apiKey === genericPlaceholderKey) {
    console.error(
      "🛑 FIREBASE CONFIGURATION ERROR: API Key is missing or is the generic placeholder 'YOUR_API_KEY'.\n" +
      "Please ensure you have a .env.local file in the root of your project with your actual Firebase credentials for NEXT_PUBLIC_FIREBASE_API_KEY.\n" +
      "You can find these values in your Firebase project settings (Project settings > General > Your apps > Web app > SDK setup and configuration)."
    );
    validConfig = false;
  } else if (firebaseConfig.apiKey === USER_SPECIFIC_API_KEY) {
    // This condition means the user's specific key is being treated as a placeholder by the previous check.
    // This is a special case warning. If this key IS correct, then the issue might be elsewhere (e.g. not enabled in Firebase console).
    console.warn(
      "⚠️ FIREBASE CONFIGURATION INFO: The API Key in .env.local matches 'AIzaSyAZs401-CrplcKABS__YkpTFrSo4PNx82g'.\n" +
      "If this is your correct and active Firebase Web API Key, this part of the configuration is likely correct.\n" +
      "Ensure this key is enabled for your web app in the Firebase console and that there are no restrictions preventing its use.\n"+
      "If Firebase services still fail, the issue might be with other Firebase settings or project configuration."
    );
    // We assume it's valid if it's this specific key, and let Firebase initialization proceed to see if it throws its own errors.
  }


  if (!firebaseConfig.projectId || firebaseConfig.projectId === "YOUR_PROJECT_ID" || firebaseConfig.projectId === "promptmasterpro-461411") {
     console.warn(
      "⚠️ FIREBASE CONFIGURATION WARNING: Project ID (NEXT_PUBLIC_FIREBASE_PROJECT_ID) in .env.local might be a placeholder or the example ID 'promptmasterpro-461411'.\n" +
      "Ensure it is set to your actual Firebase Project ID."
    );
     // Not setting validConfig to false for projectId, as apiKey is the primary blocker for init,
     // but if API key is present and projectID is wrong, Firebase will fail init.
     if (!firebaseConfig.apiKey) validConfig = false; // If API key is also missing, definitely invalid.
  }

  if (!firebaseConfig.measurementId && (process.env.NODE_ENV === 'production' || process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID)) {
    // Only warn if NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID was explicitly set (even if empty) or in production
    // This avoids warning if the user intentionally omits it for dev and hasn't set the var at all.
    if (process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID !== undefined || process.env.NODE_ENV === 'production') {
        console.warn(
        "⚠️ FIREBASE ANALYTICS WARNING: NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID is missing or empty in your .env.local file.\n" +
        "Firebase Analytics will not be initialized. This ID is required if you intend to use Firebase Analytics as declared in your privacy policy.\n" +
        "You can find this in Firebase project settings > General > Your apps > Web app > SDK setup and configuration."
        );
    }
  }
  return validConfig;
};

if (typeof window !== 'undefined') {
  const isConfigValid = checkFirebaseConfig(); // Check config first

  if (isConfigValid) { // Only proceed if config is deemed valid enough to try
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
      } else {
        // console.log("Firebase Measurement ID is not provided. Firebase Analytics will not be initialized.");
      }

      try {
        perf = getPerformance(app);
      } catch (e) {
        console.error("Error initializing Firebase Performance Monitoring:", e);
        perf = null;
      }
    }
  } else {
    console.error("Firebase initialization skipped due to configuration errors.");
  }
}


const googleAuthProvider = new GoogleAuthProvider();

export { app, auth, googleAuthProvider, analytics, perf };
