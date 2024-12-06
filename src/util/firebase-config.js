

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4zzA1nq_JCTV6wZl4FkSCukZ_fod5iXc",
  authDomain: "employees-project-79f09.firebaseapp.com",
  projectId: "employees-project-79f09",
  storageBucket: "employees-project-79f09.firebasestorage.app",
  messagingSenderId: "889218581932",
  appId: "1:889218581932:web:5d6149b68b706238f56609",
  measurementId: "G-LGHJE19E78"
};

// Initialize Firebase
const firebaseConfigApp = initializeApp(firebaseConfig);
export default firebaseConfigApp