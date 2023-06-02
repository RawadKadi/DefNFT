import { firestore } from './config'; // Import the necessary Firebase configuration

export const getUserJobApplications = async (userId, jobId) => {
  console.log(`getUserJobApplications called with userId ${userId} and jobId:${jobId}`);

  const applicationsSnapshot = await firestore
    .collection("jobApplications")
    .where("userId", "==", userId)
    .where("jobId", "==", jobId)
    .get();

  let applications = [];
  applicationsSnapshot.forEach((doc) => {
    applications.push({ id: doc.id, ...doc.data() });
  });
  console.log("applications:", applications);
  // Update notifications count for the job poster
  const jobPosterId = applications[0]?.jobPosterId;
  // if (jobPosterId) {
  //   await updateNotifications(jobPosterId);
  // }

  return applications;
};
export const getAllUserJobApplications = async (userId) => {
  console.log(`getAllUserJobApplications called with userId ${userId}`);

  const userDocRef = firestore.collection("users").doc(userId);
  const userDoc = await userDocRef.get();
  const userData = userDoc.data();

  if (userData) {
    const postedJobs = userData.postedJobs || [];
    let applications = [];

    for (const jobId of postedJobs) {
      const applicationsSnapshot = await firestore
        .collection("jobApplications")
        .where("jobId", "==", jobId)
        .get();

      applicationsSnapshot.forEach((doc) => {
        const applicationData = doc.data();
        const createdAt = applicationData.createdAt?.toDate(); // Check if createdAt field exists

        applications.push({ id: doc.id, ...applicationData, createdAt });
      });
    }

    console.log("applications:", applications);

    const jobPosterIds = applications.map((application) => application.jobPosterId);
    const uniqueJobPosterIds = [...new Set(jobPosterIds)];

    for (const jobPosterId of uniqueJobPosterIds) {
      await updateNotifications(userId);
    }

    return applications;
  } else {
    throw new Error(`No user found with id: ${userId}`);
  }
};
export const updateNotifications = async (userId) => {
  const userDocRef = firestore.collection("users").doc(userId);
  const userDoc = await userDocRef.get();
  const userData = userDoc.data();

  if (userData) {
    const postedJobs = userData.postedJobs || [];
    let notificationsCount = 0;

    for (const jobId of postedJobs) {
      const jobDocRef = firestore.collection("jobs").doc(jobId);
      const jobDoc = await jobDocRef.get();
      const jobData = jobDoc.data();

      if (jobData) {
        const receivedApplications = jobData.jobApplications || [];
        notificationsCount += receivedApplications.length;
      }
    }

    // Update notifications count in the user document
    await userDocRef.update({ notificationsCount });

    return notificationsCount;
  } else {
    throw new Error(`No user found with id: ${userId}`);
  }
};






