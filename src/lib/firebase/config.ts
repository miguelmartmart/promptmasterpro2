
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
  const genericPlaceholderKey = "YOUR_API_KEY"; // A generic placeholder example

  if (!firebaseConfig.apiKey || firebaseConfig.apiKey === genericPlaceholderKey) {
    console.error(
      "🛑 FIREBASE CONFIGURATION ERROR: API Key is missing or is the generic placeholder 'YOUR_API_KEY'.\n" +
      "Please ensure you have a .env.local file in the root of your project with your actual Firebase credentials for NEXT_PUBLIC_FIREBASE_API_KEY.\n" +
      "You can find these values in your Firebase project settings (Project settings > General > Your apps > Web app > SDK setup and configuration)."
    );
    validConfig = false;
  } else if (firebaseConfig.apiKey === USER_SPECIFIC_API_KEY) {
    // This condition means the user's specific key (which they confirmed) is being used.
    // The error is likely not the key itself but permissions or other settings.
    console.warn(
      "⚠️ FIREBASE CONFIGURATION INFO: The API Key in .env.local matches 'AIzaSyAZs401-CrplcKABS__YkpTFrSo4PNx82g'.\n" +
      "If Firebase services are still failing with permission errors (like 403 errors for specific Google APIs such as firebaseinstallations.googleapis.com or identitytoolkit.googleapis.com), " +
      "ensure these APIs are ENABLED in your Google Cloud Console for project '" + (firebaseConfig.projectId || "YOUR_PROJECT_ID") + "' and that the API key has no undue restrictions."
    );
  }


  if (!firebaseConfig.projectId || firebaseConfig.projectId === "YOUR_PROJECT_ID" || firebaseConfig.projectId === "promptmasterpro-461411") {
     console.warn(
      "⚠️ FIREBASE CONFIGURATION WARNING: Project ID (NEXT_PUBLIC_FIREBASE_PROJECT_ID) in .env.local might be a placeholder or the example ID 'promptmasterpro-461411'.\n" +
      "Ensure it is set to your actual Firebase Project ID: " + firebaseConfig.projectId 
    );
     if (!firebaseConfig.apiKey || firebaseConfig.apiKey === genericPlaceholderKey) validConfig = false;
  }

  if (!firebaseConfig.measurementId && (process.env.NODE_ENV === 'production' || process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID)) {
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
  const isConfigValid = checkFirebaseConfig();

  if (isConfigValid) {
    if (!getApps().length) {
      try {
        app = initializeApp(firebaseConfig);
      } catch (e: any) {
        console.error("Error initializing Firebase app:", e);
        app = null; 
      }
    } else {
      app = getApp();
    }

    if (app) {
      try {
        auth = getAuth(app);
      } catch (e: any) {
        console.error("Error getting Firebase Auth instance:", e);
        if (e.message && (e.message.includes("identitytoolkit.googleapis.com") || e.message.includes("auth/"))) {
             console.warn(
              "⚠️ Firebase Auth initialization failed. This might be due to the 'Identity Toolkit API' not being enabled in your Google Cloud Project or API key restrictions. " +
              "Please check your GCP console for project '" + (firebaseConfig.projectId || "YOUR_PROJECT_ID") + "'."
            );
        }
        auth = null;
      }

      if (firebaseConfig.measurementId) {
        isAnalyticsSupported().then((supported) => {
          if (supported && app) {
            try {
              analytics = getAnalytics(app);
            } catch (e: any) {
              console.error("Error initializing Firebase Analytics:", e);
              if (e.message && e.message.includes("firebaseinstallations.googleapis.com")) {
                console.warn(
                  "⚠️ Firebase Analytics initialization failed. This is likely because the 'Firebase Installations API' is not enabled in your Google Cloud Project. " +
                  "Please go to the Google Cloud Console, select project '" + (firebaseConfig.projectId || "YOUR_PROJECT_ID") + "', navigate to 'APIs & Services > Library', search for 'Firebase Installations API', and ensure it is ENABLED."
                );
              }
              analytics = null;
            }
          } else if (!supported) {
            console.log("Firebase Analytics is not supported in this browser environment.");
          }
        }).catch((e: any) => {
           console.error("Error checking Analytics support:", e);
        });
      }

      try {
        perf = getPerformance(app);
      } catch (e: any) {
        console.error("Error initializing Firebase Performance Monitoring:", e);
        if (e.message && e.message.includes("firebaseinstallations.googleapis.com")) {
           console.warn(
            "⚠️ Firebase Performance Monitoring initialization failed. This may also be related to the 'Firebase Installations API' not being enabled in your Google Cloud Project. " +
            "Check the Google Cloud Console for project '" + (firebaseConfig.projectId || "YOUR_PROJECT_ID") + "' as described above for Analytics."
          );
        }
        perf = null;
      }
    }
  } else {
    console.error("Firebase initialization skipped due to configuration errors (API Key or Project ID missing/placeholder).");
  }
}


const googleAuthProvider = new GoogleAuthProvider();

export { app, auth, googleAuthProvider, analytics, perf };
