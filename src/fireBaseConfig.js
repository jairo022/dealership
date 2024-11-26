// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { getFunctions } from "firebase/functions"; // Import Firebase Functions

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDr0e9_H7P-sooH8HmuA-sebVBdN9jgaWk",
  authDomain: "dealershipcmt.firebaseapp.com",
  databaseURL: "https://dealershipcmt-default-rtdb.firebaseio.com",
  projectId: "dealershipcmt",
  storageBucket: "dealershipcmt.appspot.com",
  messagingSenderId: "672877366418",
  appId: "1:672877366418:web:9c98f07a13509b16b32a4b",
  measurementId: "G-BPGS2PJW7B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const storage = getStorage(app);
export const analytics = typeof window !== 'undefined' && getAnalytics(app);
export const database = getDatabase(app);

// Initialize Firebase Functions (for Stripe)
export const functions = getFunctions(app);
