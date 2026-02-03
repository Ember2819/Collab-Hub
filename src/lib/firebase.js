import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// This is the config you got from the Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyDpt_DfGDLH_lxEk-gb7SweT7mRP6Dut0Y",
  authDomain: "collab-hub-c3a2c.firebaseapp.com",
  projectId: "collab-hub-c3a2c",
  storageBucket: "collab-hub-c3a2c.firebasestorage.app",
  messagingSenderId: "758652214920",
  appId: "1:758652214920:web:8259e85e142c9c31b7493d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the services so you can use them in your components
export const auth = getAuth(app);
export const db = getFirestore(app);