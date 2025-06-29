// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; 
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBc7fYeTEQQ0Bh8P5BUPrh3C5opOqsu1ek",
  authDomain: "abbas-plan.firebaseapp.com",
  projectId: "abbas-plan",
  storageBucket: "abbas-plan.firebasestorage.app",
  messagingSenderId: "610964805311",
  appId: "1:610964805311:web:b2b29c4c2d1dee954d580a",
  measurementId: "G-2ZE91F8EV8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app); 