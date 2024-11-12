// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJWmj2GPzXFPyUL1Xz91GVyG8YN_mKXRw",
  authDomain: "chatify-9fe31.firebaseapp.com",
  projectId: "chatify-9fe31",
  storageBucket: "chatify-9fe31.firebasestorage.app",
  messagingSenderId: "641460221359",
  appId: "1:641460221359:web:a139cfa877003c78c82b5a",
  measurementId: "G-YHRFPGP3FR"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);