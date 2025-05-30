
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

const USER_SPECIFIC_API_KEY = "AIzaSyAZs401-CrplcKABS__YkpTFrSo4PNx82g"; // User confirmed this key

const GCLOUD_CONSOLE_LINK = "https://console.cloud.google.com/";
const PROJECT_ID = firebaseConfig.projectId || "YOUR_PROJECT_ID (check .env.local)";

const CRITICAL_API_INSTRUCTIONS = (apiName: string, originalError: any) =>
`🆘 CRITICAL FIREBASE SETUP ISSUE: The '${apiName}' is likely NOT ENABLED for your project '${PROJECT_ID}'.
This is essential for Firebase to work correctly.
ACTION REQUIRED:
1. Go to the Google Cloud Console: ${GCLOUD_CONSOLE_LINK}
2. Select project: ${PROJECT_ID}
3. Navigate to 'APIs & Services' > 'Library'.
4. Search for '${apiName}' and ENABLE it.
5. If the problem persists, also ensure your API key has no undue restrictions for this API.
Original error: ${originalError.message || originalError}`;

const checkFirebaseConfig = (): boolean => {
  let validConfig = true;
  const genericPlaceholderKey = "YOUR_API_KEY";

  if (!firebaseConfig.apiKey || firebaseConfig.apiKey === genericPlaceholderKey) {
    console.error(
      "🛑 FIREBASE CONFIGURATION ERROR: API Key (NEXT_PUBLIC_FIREBASE_API_KEY) is missing or is the generic placeholder 'YOUR_API_KEY' in your .env.local file.\n" +
      "Please ensure you have a .env.local file in the root of your project with your actual Firebase credentials.\n" +
      `You can find these values in your Firebase project settings for project '${PROJECT_ID}' (Project settings > General > Your apps > Web app > SDK setup and configuration).`
    );
    validConfig = false;
  } else if (firebaseConfig.apiKey === USER_SPECIFIC_API_KEY) {
    // This key was confirmed by the user.
    // If it's failing, it's highly likely API enablement or restrictions.
    console.warn(
      `⚠️ FIREBASE CONFIGURATION INFO: The API Key in .env.local matches the one you confirmed ('${USER_SPECIFIC_API_KEY}').\n` +
      `If Firebase services are still failing with permission errors (like 403 errors for APIs such as firebaseinstallations.googleapis.com or identitytoolkit.googleapis.com), ` +
      `this strongly suggests the APIs are NOT ENABLED in your Google Cloud Console for project '${PROJECT_ID}' or the API key has restrictions preventing their use. Please check API enablement and key restrictions in GCP.`
    );
  }

  if (!firebaseConfig.projectId || firebaseConfig.projectId === "YOUR_PROJECT_ID" || firebaseConfig.projectId === "promptmasterpro-461411") {
     console.warn(
      `⚠️ FIREBASE CONFIGURATION WARNING: Project ID (NEXT_PUBLIC_FIREBASE_PROJECT_ID) in .env.local might be a placeholder or the example ID 'promptmasterpro-461411'.\n` +
      `Ensure it is set to your actual Firebase Project ID: ${firebaseConfig.projectId}`
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
        if (e.message && e.message.includes("firebaseinstallations.googleapis.com")) {
          console.error(CRITICAL_API_INSTRUCTIONS("Firebase Installations API", e));
        }
        app = null; // Ensure app is null if initialization fails
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
             console.error(CRITICAL_API_INSTRUCTIONS("Identity Toolkit API", e));
        }
        // Auth can also fail due to installations API not being enabled
        if (e.message && e.message.includes("firebaseinstallations.googleapis.com")) {
          console.error(CRITICAL_API_INSTRUCTIONS("Firebase Installations API", e) + "\n(This API is also a dependency for Firebase Authentication)");
        }
        auth = null; // Ensure auth is null if it fails
      }

      if (firebaseConfig.measurementId) {
        isAnalyticsSupported().then((supported) => {
          if (supported && app) { // Double check app is not null
            try {
              analytics = getAnalytics(app);
            } catch (e: any) {
              console.error("Error initializing Firebase Analytics:", e);
              if (e.message && e.message.includes("firebaseinstallations.googleapis.com")) {
                 console.error(CRITICAL_API_INSTRUCTIONS("Firebase Installations API", e)  + "\n(This API is also a dependency for Firebase Analytics)");
              }
              analytics = null;
            }
          } else if (!supported) {
            console.log("Firebase Analytics is not supported in this browser environment.");
          }
        }).catch((e: any) => {
           console.error("Error checking Firebase Analytics support:", e);
        });
      } else {
        console.log("Firebase Analytics not initialized because NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID is not set in .env.local.");
      }

      if (app) { // Double check app is not null
        try {
          perf = getPerformance(app);
        } catch (e: any) {
          console.error("Error initializing Firebase Performance Monitoring:", e);
          if (e.message && e.message.includes("firebaseinstallations.googleapis.com")) {
             console.error(CRITICAL_API_INSTRUCTIONS("Firebase Installations API", e) + "\n(This API is also a dependency for Firebase Performance)");
          }
          perf = null;
        }
      }
    }
  } else {
    console.error(
        "⛔️ Firebase initialization SKIPPED due to critical configuration errors (API Key or Project ID missing/placeholder in .env.local).\n" +
        "Please check your .env.local file and ensure all NEXT_PUBLIC_FIREBASE_... variables are correctly set."
      );
  }
}

const googleAuthProvider = new GoogleAuthProvider();

export { app, auth, googleAuthProvider, analytics, perf };
    