// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

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

export { db };