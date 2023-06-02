import React, { useState, useEffect, useRef } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { storage } from "../../../../firebase/config.js";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import IconButton from "@mui/material/IconButton";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import {firestore} from "../../../../firebase/config.js"
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Cube from "examples/Icons/Cube";
import Document from "examples/Icons/Document";
import Settings from "examples/Icons/Settings";
import useAuth from "user/useAuth.js";

import curved0 from "assets/images/wave_background.png";

function Header({ userName }) {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  const defaultAvatar = "https://via.placeholder.com/56x56.png?text=Avatar";
  const inputRef = useRef(null);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [image, setImage] = useState(""); // Added setImage function

  useEffect(() => {
    function handleTabsOrientation() {
      return window.innerWidth < 600 ? setTabsOrientation("vertical") : setTabsOrientation("horizontal");
    }

    window.addEventListener("resize", handleTabsOrientation);
    handleTabsOrientation();

    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, []);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);
  const { currentUser } = useAuth() ?? {};

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, `avatars/${currentUser?.uid}/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    setImage(url);

    const userDocRef = doc(firestore, "users", currentUser?.uid);
    await setDoc(userDocRef, { avatarUrl: url }, { merge: true });
    setAvatarUrl(url);
  };

  useEffect(() => {
    const fetchAvatarUrl = async () => {
      const userDocRef = doc(firestore, "users", currentUser?.uid);
      const userDocSnapshot = await getDoc(userDocRef);
      const userData = userDocSnapshot.data();
      if (userData && userData.avatarUrl) {
        setAvatarUrl(userData.avatarUrl);
      }
    };

    if (currentUser) {
      fetchAvatarUrl();
    }
  }, [currentUser]);

  return (
    <SoftBox position="relative">
      <DashboardNavbar absolute light avatarUrl={avatarUrl} />
      <SoftBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="18.75rem"
        borderRadius="xl"
        sx={{
          backgroundImage: `url(${curved0})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
        }}
      />
      <Card
        sx={{
          backdropFilter: `saturate(200%) blur(30px)`,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
          position: "relative",
          mt: -8,
          mx: 3,
          py: 2,
          px: 2,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Box position="relative">
              <label htmlFor="avatar-input">
                <Avatar alt="Profile picture" src={avatarUrl || defaultAvatar} sx={{ width: 100, height: 100 }} />
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                  sx={{
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                  }}
                  style={{ color: "#0b1847" }}
                >
                  <PhotoCameraIcon />
                </IconButton>
              </label>
              <input accept="image/*" id="avatar-input" type="file" onChange={handleImageUpload} hidden />
            </Box>
          </Grid>
          <Grid item>
            <SoftBox height="100%" mt={0.5} lineHeight={1}>
              <SoftTypography variant="h5" fontWeight="medium">
                {userName}
              </SoftTypography>
            </SoftBox>
          </Grid>
          {/* <Grid item xs={12} md={6} lg={4} sx={{ ml: "auto" }}>
            <AppBar position="static">
              <Tabs
                orientation={tabsOrientation}
                value={tabValue}
                onChange={handleSetTabValue}
                sx={{ background: "transparent" }}
              >
                <Tab label="App" icon={<Cube />} />
                <Tab label="Message" icon={<Document />} />
                <Tab label="Settings" icon={<Settings />} />
              </Tabs>
            </AppBar>
          </Grid> */}
        </Grid>
      </Card>
    </SoftBox>
  );
}

export default Header;