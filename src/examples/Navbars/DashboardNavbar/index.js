/**
=========================================================
* Soft UI Dashboard React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import { app, firestore, auth, getAllPostedJobs } from "../../../firebase/config.js";
import { doc, getDoc } from "firebase/firestore";
import useAuth from "user/useAuth.js";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow, parseISO } from "date-fns";
import { getAllUserJobApplications } from "../../../firebase/firebaseUtils.js";
import { getUserId } from "../../../firebase/config.js";
import "firebase/firestore";
import firebase from "firebase/app";
import logo from "../../../assets/images/logos/logoStrive.png";
import striveOnly from "../../../assets/images/logos/striveOnly.png";

import { useState, useEffect } from "react";
import { grid } from "@mui/system";
import IconButton from "@material-ui/core/IconButton";
import ProfileImage from "layouts/dashboard/components/ProfileImage/profileImage";
// react-router components
import { useLocation, Link } from "react-router-dom";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { getAuth, signOut } from "firebase/auth";
import { MenuItem, ListItemIcon, ListItemText, Avatar } from "@material-ui/core";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @material-ui core components
//
import { connectWallet } from "../../../App";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { Button, Menu, Toolbar, AppBar, Icon, Typography } from "@mui/material";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import Badge from "@material-ui/core/Badge";
import SettingsIcon from "@material-ui/icons/Settings";
import Box from "@mui/material/Box";

// Soft UI Dashboard React examples
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/Items/NotificationItem";

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";

// Soft UI Dashboard React context
import {
  useSoftUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";

// Images
import team2 from "assets/images/team-2.jpg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

import { getCurrentUserId } from "user/currentUser.js";
const providerOptions = {
  coinbasewallet: {
    package: CoinbaseWalletSDK,
    options: {
      appName: "Web3Modal Demo",
      infureId: { 3: "https://ropsten.infura.io/v3/fefnefnesfe" },
    },
  },
};
function DashboardNavbar({ absolute, light, isMini, avatarUrl }) {
  const formatRelativeTime = (date) => {
    const formattedDate = formatDistanceToNow(date, { addSuffix: true });
    console.log("This is the formatted date: ", formattedDate);

    return formattedDate;
  };
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);
  const [web3Provider, setWeb3Provider] = useState(null);
  const [userName, setUserName] = useState("");
  const [jobApplications, setJobApplications] = useState([]);
  useEffect(() => {
    const fetchJobApplications = async () => {
      try {
        const userId = getUserId(); // Get the user's ID
        const postedJobs = await getAllPostedJobs(userId); // Get the array of posted jobs

        const jobApplicationsArray = [];

        for (const job of postedJobs) {
          const jobId = job.id;
          const jobApplications = await getAllUserJobApplications(userId);
          jobApplicationsArray.push({ jobId, applications: jobApplications });
        }

        setJobApplications(jobApplicationsArray);
      } catch (error) {
        console.error("Error fetching job applications:", error);
      }
    };

    fetchJobApplications();
  }, []);
  useEffect(() => {
    async function getUserData() {
      // Get the currently logged in user's UID
      const userId = app.auth().currentUser.uid;

      // Get the user's document from Firestore
      const userDocRef = doc(firestore, "users", userId);
      const userDocSnapshot = await getDoc(userDocRef);

      // Get the user's display name from the document
      const userData = userDocSnapshot.data();
      setUserName(userData.displayName);
    }

    getUserData();
  }, []);
  async function connectWallet() {
    try {
      let web3Modal = new Web3Modal({
        cacheProvider: false,
        providerOptions,
      });
      const web3ModalInstance = await web3Modal.connect();
      const web3ModalProvider = new ethers.providers.Web3Provider(web3ModalInstance);
      if (web3ModalProvider) {
        setWeb3Provider(web3ModalProvider);
      }
      console.log(web3ModalProvider);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);
  const userId = getUserId();
  const fetchPostedJobIds = async () => {
    try {
      const userId = getUserId(); // Get the user's ID
      const postedJobs = await getAllPostedJobs(userId); // Get the array of posted jobs

      const jobIds = postedJobs.map((job) => job.id); // Extract the job IDs from the array

      // console.log("Job IDs of posted jobs:", jobIds);
    } catch (error) {
      console.error("Error fetching posted job IDs:", error);
    }
  };

  fetchPostedJobIds();
  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  const handleOpenMenu = async (event) => {
    setOpenMenu(event.currentTarget);

    try {
      const userId = getCurrentUserId(); // Get the user's ID
      const applications = await getAllUserJobApplications(userId);
      setJobApplications(applications);
    } catch (error) {
      console.error("Error fetching job applications:", error);
    }
  };
  const handleCloseMenu = () => setOpenMenu(false);

  // const handleSignOut = async () => {
  //   try {
  //     await signOut(auth); // Assuming `auth` is properly initialized
  //     navigate("/authentication/sign-in", { replace: true });
  //     window.history.replaceState(null, '', '/authentication/sign-in');
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // Render the notifications menu
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/authentication/sign-in", { replace: true });
      window.history.replaceState(null, "", "/authentication/sign-in");
    } catch (error) {
      console.error(error);
    }
  };
  const uploadcv = (application) => {
    window.open(application.cvUrl, "_blank");
  };
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference="anchorEl"
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      {jobApplications.length === 0 ? (
        <MenuItem disabled>No new job applications</MenuItem>
      ) : (
        jobApplications.map((application) => (
          <MenuItem key={application.id} onClick={() => uploadcv(application)}>
            {/* <ListItemIcon>
           <Typography>{application.lastName}</Typography>
          </ListItemIcon> */}
            <Box style={{ backgroundColor: "#E2E2E2", padding: "10px", borderRadius: "10px" }}>
              <ListItemText primary={application.firstName} secondary={application.lastName} />
            </Box>
            <Box style={{ marginLeft: "8px" }}>
              <ListItemText secondary={"Applied to your job"} />
            </Box>

            {/* <Typography variant="caption" className="job-title">
            {formatRelativeTime(application.createdAt.toDate())}                    
          </Typography> */}
          </MenuItem>
        ))
      )}
    </Menu>
  );

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <SoftBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          {/* <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} /> */}
          <img src={logo} style={{ width: "40px", height: "40px" }}></img>
          {/* <img src={striveOnly} style={{width:"100%",height:"40px"}}></img> */}
        </SoftBox>
        {isMini ? null : (
          <SoftBox sx={(theme) => navbarRow(theme, { isMini })}>
            {/* <SoftBox pr={1}>
              <SoftInput
                placeholder="Type here..."
                icon={{ component: "search", direction: "left" }}
              />
            </SoftBox> */}
            <SoftBox color={light ? "white" : "inherit"} sx={{ gridColumn: "1 / 4" }}>
              <Link to="/authentication/sign-in">
                {/* <IconButton sx={navbarIconButton} size="small" onClick={() => signOut()}> */}
                <Button
                 
                  size="small"
                  onClick={handleSignOut}
                  style={{
                    color: "white",
                    background: "linear-gradient(45deg, #05cff7, #1b1774)",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    marginRight: "8px",
                  }}
                >
                  Sign out
                </Button>
                {/* </IconButton> */}
              </Link>
              <IconButton
                size="small"
                color="inherit"
                sx={navbarIconButton}
                onClick={handleConfiguratorOpen}
              >
                <SettingsIcon />
              </IconButton>
              <IconButton
                size="small"
                color="inherit"
                sx={navbarIconButton}
                aria-controls="notification-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={handleOpenMenu} // Pass the jobId here
              >
                <Badge badgeContent={jobApplications.length} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>{" "}
              {renderMenu()}
              {/* put the commented code at the end for the connect wallet button */}
              {/* connect wallet</div> */}
            </SoftBox>
          </SoftBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
//
//               {web3Provider == null ? (
//                 <Button
//                   variant="contained"
//                   size="small"
//                   mx={50}
//                   style={{ backgroundColor: "#1b1774", textColor: "white",marginLeft:"10px"}}
//                   onClick={connectWallet}
//                 >
//                   <Typography variant="none" color="common.white">
//                     Connect Wallet
//                   </Typography>
//                 </Button>
//               ) : (
//                 <div>
//                   <Button
//                     variant="contained"
//                     size="small"
//                     mx={50}
//                     style={{ backgroundColor: "#1e88e5", textColor: "white",marginLeft:"10px" }}
//                     onClick={connectWallet}
//                   >
//                     <Typography variant="none" color="common.white">
//                       Connected
//                     </Typography>
//                   </Button>
//                   {/* <p>Address: {web3Provider.provider.selectedAddress}</p> */}
//                 </div>
//               )}
