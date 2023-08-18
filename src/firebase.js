import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCu_qjDIk2XebaIMT3RD59B14IPeHy3GTE",
  authDomain: "chat-654f0.firebaseapp.com",
  projectId: "chat-654f0",
  storageBucket: "chat-654f0.appspot.com",
  messagingSenderId: "756692926753",
  appId: "1:756692926753:web:a9918fa87ed43a88a33e60",
  measurementId: "G-DRRXQ6MSPE",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
