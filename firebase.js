import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "twitter-clone-nextjs-ea2a3.firebaseapp.com",
  projectId: "twitter-clone-nextjs-ea2a3",
  storageBucket: "twitter-clone-nextjs-ea2a3.appspot.com",
  messagingSenderId: "28014025389",
  appId: "1:28014025389:web:214322bc0874190f650424",
};

// Initialize Firebase
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
