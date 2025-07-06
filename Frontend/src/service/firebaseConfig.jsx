// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ai-travel-planner-9826e.firebaseapp.com",
  projectId: "ai-travel-planner-9826e",
  storageBucket: "ai-travel-planner-9826e.firebasestorage.app",
  messagingSenderId: "933874569372",
  appId: "1:933874569372:web:d4e0bb1b2839c5609bdd59",
  measurementId: "G-PHBQLYGBFF",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
