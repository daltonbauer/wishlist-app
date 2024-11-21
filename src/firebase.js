// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import { useEffect, useState, useContext, createContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

// Replace with your Firebase config object
const firebaseConfig = {
  apiKey: "AIzaSyCjmSOvvHR09TgycmmKyvQJ-Enb_iJ6hNM",
  authDomain: "wishlist-app-43377.firebaseapp.com",
  projectId: "wishlist-app-43377",
  storageBucket: "wishlist-app-43377.firebasestorage.app",
  messagingSenderId: "168246814085",
  appId: "1:168246814085:web:d8449af8353aa79a4890ec",
  measurementId: "G-WZE1TV9CV3"
};  

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Sign up with email and password
export const signUpWithEmailPassword = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Sign in with email and password
export const loginWithEmailPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Phone number verification
export const verifyPhoneNumber = (phoneNumber, recaptchaContainerId) => {
  const recaptchaVerifier = new RecaptchaVerifier(recaptchaContainerId, {}, auth);
  return signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
};

// Sign out
export const signOutUser = () => {
  return signOut(auth);
};

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user); // Updates user whenever authentication state changes
    });
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  return (
    <AuthContext.Provider value={currentUser}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export { auth, db, signInWithPhoneNumber, RecaptchaVerifier, signOut };