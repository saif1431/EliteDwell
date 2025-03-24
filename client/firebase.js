// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "elite-dwell.firebaseapp.com",
  projectId: "elite-dwell",
  storageBucket: "elite-dwell.firebasestorage.app",
  messagingSenderId: "148955730872",
  appId: "1:148955730872:web:d05b55c9ebe5ace5de754d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);