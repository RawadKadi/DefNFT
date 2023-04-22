// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import app from "firebase/compat/app";
import "firebase/compat/storage";

import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyATDNNTQvteUnUebNz7f9Jfpo_8MU7cTvc",
  authDomain: "job-listing-senior.firebaseapp.com",
  projectId: "job-listing-senior",
  storageBucket: "job-listing-senior.appspot.com",
  messagingSenderId: "767497473548",
  appId: "1:767497473548:web:cb254bb4f39f5e424ca829",
  measurementId: "G-NQCGZ178Z0",
};

// Initialize Firebase
const firebase = app.initializeApp(firebaseConfig);
let storageRef = firebase.storage().ref();

let data = { name: "John", age: 30 };
let blob = new Blob([JSON.stringify(data)], { type: "application/json" });
let fileRef = storageRef.child("data.json");
fileRef
  .put(blob)
  .then(function (snapshot) {
    console.log("Data saved to Firebase Storage");
  })
  .catch(function (error) {
    console.error("Error saving data to Firebase Storage:", error);
  });

const firestore = firebase.firestore();
const storage = firebase.storage();

export { firestore, app, firebase, storage };
