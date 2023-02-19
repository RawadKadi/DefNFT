// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import app from "firebase/app";
import "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATDNNTQvteUnUebNz7f9Jfpo_8MU7cTvc",
  authDomain: "job-listing-senior.firebaseapp.com",
  projectId: "job-listing-senior",
  storageBucket: "job-listing-senior.appspot.com",
  messagingSenderId: "767497473548",
  appId: "1:767497473548:web:cb254bb4f39f5e424ca829",
  measurementId: "G-NQCGZ178Z0"
};

// Initialize Firebase

const firebase =initializeApp(firebaseConfig);
const firestore = firebase.firestore;

export default {firestore, firebase};