import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDcWHuPrg1dlj8L-Ymnz1cYFn-Smal0pgM",
  authDomain: "arclenime.firebaseapp.com",
  projectId: "anipulse-e3979",
  storageBucket: "arclenime.firebasestorage.app",
  messagingSenderId: "729271912399",
  appId: "1:729271912399:web:25d4ce93023bcfd530f4ba",
  measurementId: "G-VQWX87M1XQ",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
