/*import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, RecaptchaVerifier,signInWithPhoneNumber } from "firebase/auth"; 

const firebaseConfig = {
  apiKey: "AIzaSyAC0Pyn_AA8myG3m2yK7sHQ28mGy06Arv0",
  authDomain: "kidsmart-89826.firebaseapp.com",
  projectId: "kidsmart-89826",
  storageBucket: "kidsmart-89826.firebasestorage.app",
  messagingSenderId: "407722370044",
  appId: "1:407722370044:web:b076c8380c4d73d0250879",
  measurementId: "G-ZCFPB2JY91"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); 
const googleProvider = new GoogleAuthProvider(); 

export { app, analytics, auth, googleProvider, RecaptchaVerifier,signInWithPhoneNumber }; */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";  // ✅ Firestore import
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, GoogleAuthProvider } from "firebase/auth"; // ✅ if you plan to use Auth

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAC0Pyn_AA8myG3m2yK7sHQ28mGy06Arv0",
  authDomain: "kidsmart-89826.firebaseapp.com",
  projectId: "kidsmart-89826",
  storageBucket: "kidsmart-89826.firebasestorage.app",
  messagingSenderId: "407722370044",
  appId: "1:407722370044:web:b076c8380c4d73d0250879",
  measurementId: "G-ZCFPB2JY91"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

// ✅ Firestore
export const db = getFirestore(app);

// ✅ Auth (optional, if you need login/OTP)
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export { RecaptchaVerifier, signInWithPhoneNumber };

