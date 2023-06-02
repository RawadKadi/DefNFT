import { useEffect, useState } from "react";
import { storage } from "../../../../firebase/config.js";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { firestore } from "../../../../firebase/config.js";
import { updateDoc, doc, setDoc } from "firebase/firestore";
import useAuth from "user/useAuth.js";

function ProfileImage({ userName }) {
  const [imageUrl, setImageUrl] = useState("");
  const defaultAvatar = "https://via.placeholder.com/56x56.png?text=Avatar";
  const [avatarUrl, setAvatarUrl] = useState("");
  const { currentUser } = useAuth() ?? {};
  const [image, setImage] = useState("");

  useEffect(() => {
    async function getProfileImageUrl() {
      const storageRef = storage.ref(`avatars/${userName}/profilePicture.jpg`);
      const url = await storageRef.getDownloadURL();
      setImageUrl(url);
    }
    getProfileImageUrl();
  }, [userName]);
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const storageRef = storage.ref(`avatars/${currentUser?.uid}/${file.name}`);
    const snapshot = await storageRef.put(file);
    const url = await snapshot.ref.getDownloadURL();
    setImage(url);

    const userDocRef = doc(firestore, "users", currentUser?.uid);
    await setDoc(userDocRef, { avatarUrl: url }, { merge: true });
    setAvatarUrl(url); // Update avatarUrl state with the new URL
  };
return(
  <Box position="relative">
              
              <Avatar
                alt="Profile picture"
                src={avatarUrl || defaultAvatar}
                sx={{ width: 100, height: 100 }}
              />
                {/* <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                  sx={{
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                  }}
                  style={{color:"#0b1847"}}
                >
                  <PhotoCameraIcon />
                </IconButton> */}
              
              
            </Box>
            );
}

export default ProfileImage;