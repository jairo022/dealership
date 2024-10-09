// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore
import { getStorage } from "firebase/storage"; // Import Storage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoFSPWaPiCg7bUuG1sqZ7Ck2VU0NEM_BU",
  authDomain: "pargolproject.firebaseapp.com",
  projectId: "pargolproject",
  storageBucket: "pargolproject.appspot.com",
  messagingSenderId: "62132971995",
  appId: "1:62132971995:web:f7db6701bf05008910dffe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app); // Firestore
export const storage = getStorage(app); // Storage
