import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'; // Import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyCXWmyPGwRje1GEN1jQnWHnXuJx1RNt4f0",
  authDomain: "user-authentication-cf7dc.firebaseapp.com",
  projectId: "user-authentication-cf7dc",
  storageBucket: "user-authentication-cf7dc.firebasestorage.app",
  messagingSenderId: "371077615230",
  appId: "1:371077615230:web:1b19e74d9612629982122f",
  measurementId: "G-4EPW5YLDWS"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

// Initialize Firestore
export const db = firebase.firestore(); // Add this export

export default app;
