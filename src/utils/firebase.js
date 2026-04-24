import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC69iejq4hlUR1ac2pdNOOxPtrstDevPeU",
  authDomain: "resume-45a3c.firebaseapp.com",
  projectId: "resume-45a3c",
  storageBucket: "resume-45a3c.firebasestorage.app",
  messagingSenderId: "103130983949",
  appId: "1:103130983949:web:e343d497b794cba7e9ef44",
  measurementId: "G-0VJ0J8BKPV"
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);