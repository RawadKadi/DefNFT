import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import app from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/firestore";
import "firebase/compat/auth"; // add this line to import the auth module
import { FieldValue, arrayUnion, serverTimestamp } from "firebase/compat/firestore";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate  } from "react-router-dom"; // Import the navigate function

const firebaseConfig = {
  apiKey: "AIzaSyCvTgAB2Ihb4mYFsvwywsx0jGgc85uBxJ4",
  authDomain: "finalstrive.firebaseapp.com",
  projectId: "finalstrive",
  storageBucket: "finalstrive.appspot.com",
  messagingSenderId: "592370581309",
  appId: "1:592370581309:web:7a971a8939604125574f54",
  measurementId: "G-WX0C7BT5Q2"
};

const firebase = app.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const storage = firebase.storage();
const auth = getAuth(firebase);


// Example usage of generating jobId and userId
const jobsCollection = firestore.collection("jobs");
const newJobDoc = jobsCollection.doc(); // Generates a new document ID
const jobId = newJobDoc.id;


// const user = auth.currentUser;
//  // Generates a new document ID
// const userId = user ? user.uid : null;

const getUserId = () => {
  const user = auth.currentUser;
  return user ? user.uid : null;
};

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
  const getAllPostedJobs = async (userId) => {
    const userDocRef = doc(firestore, "users", userId);
    const userDoc = await getDoc(userDocRef);
    const userData = userDoc.data();
  
    console.log("userData:", userData); // Log the value of userData
  
    if (userData) {
      const postedJobs = userData.postedJobs || []; // get the postedJobs list of a user
  
      console.log("postedJobs:", postedJobs); // Log the value of postedJobs
  
      return postedJobs;
    } else {
      throw new Error(`No user found with id: ${userId}`);
    }
  };
  const getPostedJobs = async (userId) => {
    const userDocRef = doc(firestore, "users", userId);
    const userDoc = await getDoc(userDocRef);
    const userData = userDoc.data();
  
    if (userData) {
      const postedJobs = userData.postedJobs; // get the postedJobs list of a user
  
      let jobs = [];
      for (const jobId of postedJobs) {
        const jobDocRef = doc(firestore, "jobs", jobId);
        const jobDoc = await getDoc(jobDocRef);
        const jobData = jobDoc.data();
  
        if (jobData) {
          const applicationsSnapshot = await firestore
            .collection("jobApplications")
            .where("jobId", "==", jobId)
            .get();
  
          let applications = [];
          applicationsSnapshot.forEach((doc) => {
            applications.push({ id: doc.id, ...doc.data() });
          });
  
          jobs.push({ id: jobDoc.id, ...jobData, receivedApplications: applications });
        }
      }
  
      return jobs;
    } else {
      throw new Error(`No user found with id: ${userId}`);
    }
  };
 const notifyUser = async (userId, jobId) => {
  try {
    const userDocRef = firestore.collection("users").doc(userId);
    const userDoc = await userDocRef.get();
    const userData = userDoc.data();

    const jobDocRef = firestore.collection("jobs").doc(jobId);
    const jobDoc = await jobDocRef.get();
    const jobData = jobDoc.data();

    if (userData && jobData) {
      const notification = {
        jobId: jobDoc.id,
        jobTitle: jobData.title,
        message: "You have a new job application",
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      };

      await userDocRef.update({
        notifications: firebase.firestore.FieldValue.arrayUnion(notification),
      });

      console.log("Notification added to user's notifications array");
    }
  } catch (error) {
    console.error("Error notifying user:", error);
  }
};
  const createJob = async (jobDetails) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.error('User is not authenticated');
        return;
      }
    
      const userId = user.uid;
    
      // Create a new job document
      const jobDocRef = await firestore.collection("jobs").add({
        ...jobDetails,
        postedBy: userId,
        postedOn: firebase.firestore.FieldValue.serverTimestamp(),
      });
    
      // Update the user's postedJobs array
      const userDocRef = firestore.collection("users").doc(userId);
      await userDocRef.update({
        postedJobs: firebase.firestore.FieldValue.arrayUnion(jobDocRef.id),
      });
  
      // Notify the user
      const jobTitle = jobDetails.title;
      const notificationMessage = `Your job "${jobTitle}" has been successfully posted.`;
      notifyUser(userId, notificationMessage);
    
      console.log('Job created successfully!');
    } catch (error) {
      console.error('Error creating job:', error);
    }
  };
  



  
  async function getUserJobApplications(userId, jobId) {
    console.log("getUserJobApplications called with userId and jobId:", userId, jobId);
  
    // Fetch user document
    const userDoc = await firebase.firestore().collection('users').doc(userId).get();
  
    // Check if the user document exists
    if (!userDoc.exists) {
      console.error("No such user!");
      return [];
    }
  
    // Extract the receivedApplications array
    const { receivedApplications } = userDoc.data();
  
    console.log("receivedApplications:", receivedApplications);
  
    // Filter the receivedApplications array to only include applications for the current job
    const jobApplications = receivedApplications.filter(application => application.jobId === jobId);
  
    console.log("jobApplications:", jobApplications);
  
    // Fetch the application details
    const applicationDetails = await Promise.all(jobApplications.map(async (application) => {
      const applicationDoc = await firebase.firestore().collection('jobApplications').doc(application).get();
      return { id: applicationDoc.id, ...applicationDoc.data() };
    }));
  
    console.log("applicationDetails:", applicationDetails);
  
    return applicationDetails;
  }
  

export { firestore, app, firebase, storage, auth, jobId,getPostedJobs,createJob,getUserJobApplications,getUserId,getAllPostedJobs  };