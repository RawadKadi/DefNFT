import { auth } from "../firebase/config.js"; // Import auth from your Firebase configuration

export const getCurrentUserId = () => {
  const user = auth.currentUser;

  if (user) {
    return user.uid; // The user is logged in, return the userId
  } else {
    return null; // No user is logged in
  }
};