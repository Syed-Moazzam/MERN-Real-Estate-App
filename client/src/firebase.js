import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-app-mern-3eacf.firebaseapp.com",
  projectId: "real-estate-app-mern-3eacf",
  storageBucket: "real-estate-app-mern-3eacf.appspot.com",
  messagingSenderId: "817330562974",
  appId: "1:817330562974:web:bcbf5af507de64e41b188f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);