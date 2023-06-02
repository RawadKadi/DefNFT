import { useEffect, useState } from "react";
import { auth } from "../firebase/config.js";

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      console.log("User in useAuth:", user);
    });
  
    return unsubscribe;
  }, []);

    

  return { currentUser };
};

export default useAuth;