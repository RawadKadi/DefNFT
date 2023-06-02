import React, { useEffect, useState } from "react";
import { doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { firestore, firebase } from "../../firebase/config.js";
import { getCurrentUserId } from "../../user/currentUser.js";
import { formatDistanceToNow } from "date-fns";
import style from "./style.css";
import moment from "moment";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import Tooltip from "@material-ui/core/Tooltip";

import CloseIcon from "@mui/icons-material/Close";
import logo from "../../assets/images/logos/logoStrive.png";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import headerBackground from "../../assets/images/wave_background.png";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import { getPostedJobs, getUserId } from "../../firebase/config.js";
import { getUserJobApplications } from "../../firebase/firebaseUtils.js";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Backdrop from "@mui/material/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
import { Divider, Link } from "@mui/material";
import { format } from "date-fns";
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";
import profilesListData from "layouts/profile/data/profilesListData";

const drawerWidth = 500;

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: "98%",
    backgroundColor: "#fff",
    display: "flex",
    boxShadow: "0px 1px 5px rgba(0,0,0,0.1)",
    borderRadius: "5px",
    "& > *": {
      flex: 1,

      height: "45px",
      margin: "8px",
    },
  },
  linkStyle: {
    marginLeft: "9px",
    marginBottom: "20px",
  },
  skillChip: {
    margin: theme.spacing(0.5),
    padding: theme.spacing(0.75),
    fontSize: "14.5px",
    borderRadius: "5px",
    fontWeight: 600,
    border: "1px solid",
    borderColor: "#0b1847",
    color: "#0b1847",
    cursor: "pointer",
    transition: "0.35s",
    "&:hover": {
      backgroundColor: "#0b1847",
      color: "#fff",
    },
  },
  normalText: {
    color: "white",
    fontWeight: "bold",
    fontSize: "20px",
  },
  included: {
    backgroundColor: "#0b1847",
    color: "#fff",
  },
  drawer: {
    width: 1600,
    backgroundColor: "#2b9cde",
  },
  drawerPaper: {
    width: 500,
    backgroundColor: "#edf7fc",
    "&::-webkit-scrollbar": {
      width: "6px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "#f1f1f1",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#0b1847",
      borderRadius: "4px",
    },
    // Override any conflicting styles with !important
    // "& .MuiPaper-root": {
    //   width: "400px ",
    // },
  },
  postedOn: {
    padding: theme.spacing(0.75),
    fontSize: "14.5px",
    borderRadius: "5px",
    fontWeight: 600,
    border: "1px solid",
    borderColor: "#0b1847",
    color: "#0b1847",
    cursor: "default",
    transition: "0.35s",
  },
  headerBox: {
    backgroundImage: headerBackground,
  },
  skillCheck: {
    marginLeft: "10px",
    padding: theme.spacing(0.55),
    paddingLeft: theme.spacing(0.85),
    paddingRight: theme.spacing(0.95),
    fontSize: "14.5px",
    borderRadius: "5px",
    fontWeight: 600,
    border: "1px solid",
    background: "linear-gradient(45deg, #160233, #1b1774)",
    color: "white",
    cursor: "default",
    transition: "0.35s",
  },

  button: {
    margin: "10px",
  },
  box: {
    cursor: "default",
  },

  info: {
    "& > *": {
      margin: "5px",
    },
  },
  onSite: {
    padding: theme.spacing(0.55),
    paddingLeft: theme.spacing(0.75),
    paddingRight: theme.spacing(0.75),
    fontSize: "14.5px",
    borderRadius: "5px",
    fontWeight: 600,
    border: "1px solid",
    backgroundColor: "#0b1847",
    color: "white",
    cursor: "default",
    transition: "0.35s",
  },
  onSiteBox: {
    width: "160px",
    marginLeft: "20px",
  },
  JobTitle: {
    fontWeight: "bold",
  },
  successIcon: {
    fontSize: "60px",
    color: "green",
    animation: "$success-animation 2s infinite",
    transformOrigin: "center",
  },
  "@keyframes success-animation": {
    "0%": {
      transform: "rotate(0deg)",
    },
    "50%": {
      transform: "rotate(360deg)",
    },
    "100%": {
      transform: "rotate(0deg)",
    },
  },
}));

function Overview() {
  const [userName, setUserName] = useState("");
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [viewJob, setViewJob] = useState({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const userId = getUserId();
  const classes = useStyles();
  const formatRelativeTime = (date) => {
    const formattedDate = formatDistanceToNow(date, { addSuffix: true });
    return formattedDate;
  };
  const openDrawer = (job) => {
    setViewJob(job);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  useEffect(() => {
    const fetchUserName = async () => {
      const userId = getCurrentUserId();
      if (userId) {
        const userDocRef = doc(firestore, "users", userId);
        const userDoc = await getDoc(userDocRef);
        const userData = userDoc.data();
        if (userData) {
          setUserName(userData.name);
        }
      }
    };

    fetchUserName();
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      console.log("Fetching jobs...");
      if (!userId) {
        console.error("User ID is not defined");
        return;
      }

      try {
        const postedJobs = await getPostedJobs(userId);
        console.log("Fetched jobs:", postedJobs);
        setJobs(postedJobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, [userId]);

  const handleViewDetails = async (jobId) => {
    if (selectedJob === jobId) {
      setSelectedJob(null); // Close the details section
    } else {
      const jobApplications = await getUserJobApplications(userId, jobId);
      console.log("getUserJobApplications returned:", jobApplications);
      setSelectedJob(jobId); // Expand the card
    }
  };

  console.log("Jobs:", jobs);
  const [openDialog, setOpenDialog] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const openDeleteDialog = (jobId) => {
    setJobToDelete(jobId);
    setOpenDialog(true);
  };

  // Close dialog function
  const closeDeleteDialog = () => {
    setJobToDelete(null);
    setOpenDialog(false);
  };
  const handleDeleteJob = async () => {
    try {
      const jobId = jobToDelete;

      const userId = getUserId();
      const userDocRef = doc(firestore, "users", userId);
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data();

      if (userData) {
        const updatedPostedJobs = userData.postedJobs.filter((id) => id !== jobId);
        await updateDoc(userDocRef, { postedJobs: updatedPostedJobs });

        const jobDocRef = doc(firestore, "jobs", jobId);
        await deleteDoc(jobDocRef);

        console.log("Job deleted successfully");

        // Fetch the updated posted jobs
        const updatedPostedJobsData = await getPostedJobs(userId);
        setJobs(updatedPostedJobsData);
        closeDeleteDialog(); // close the dialog
      }
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };
  return (
    <DashboardLayout>
      <Header userName={userName} />

      <SoftBox mt={3}>
        <Card>
          <SoftBox pt={2} px={2}>
            <SoftBox mb={0.5}>
              <SoftTypography variant="h6" fontWeight="medium">
                Posted Jobs
              </SoftTypography>
            </SoftBox>
            <SoftBox mb={1}>
              <SoftTypography variant="button" fontWeight="regular" color="text">
                View who applied
              </SoftTypography>
            </SoftBox>
            {jobs.map((job) => (
              <Card
                key={job.id}
                className={style.card}
                sx={{
                  mb: 2,
                  transition: "1s",
                  "&:hover": {
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    background: "linear-gradient(45deg, #05cff7, #1b1774)",
                    transition: "0.6s",
                    "& .job-title": {
                      color: "#ffffff",
                    },
                    "& .viewBtn": {
                      color: "#1b1774",
                      backgroundColor: "#ffffff",
                    },
                  },
                  "& .viewBtn": {
                    color: "#ffffff",
                    backgroundColor: "#1b1774",
                  },
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleViewDetails(job.id);
                }}
              >
                <CardContent
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ mt: 2 }}
                >
                  <Grid container alignItems="center">
                    <Grid item xs={8}>
                      <Typography variant="h5" className="job-title">
                        {job.title ? job.title.charAt(0).toUpperCase() + job.title.slice(1) : ""} |{" "}
                        {job.type ? job.type.charAt(0).toUpperCase() + job.type.slice(1) : ""}
                      </Typography>
                      <Typography variant="caption" className="job-title">
                        {moment(job.postedOn.toDate()).subtract(3, "minutes").fromNow()}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Grid container justifyContent="flex-end" spacing={2}>
                        <Grid item>
                          <Button
                            className="viewBtn"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewDetails(job.id);
                            }}
                            style={{ padding: "10px", borderRadius: "10px" }}
                          >
                            View Application
                          </Button>
                        </Grid>
                        <Grid item>
                          <Button
                            style={{ padding: "10px", borderRadius: "10px" }}
                            className="viewBtn"
                            onClick={() => openDrawer(job)}
                          >
                            View Job
                          </Button>
                        </Grid>
                        <Grid item>
                          <Tooltip title="Delete Job">
                            <Button
                              variant="contained"
                              style={{
                                color: "white",
                                background: "linear-gradient(45deg, #f44336, #fcb3a9)",
                                borderRadius: "50%",
                                minWidth: "unset",
                                width: "40px", // Adjust these values to your needs
                                height: "40px", // Adjust these values to your needs
                                padding: 0,
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                openDeleteDialog(job.id); // Open the delete dialog
                              }}
                            >
                              <CloseIcon />
                            </Button>
                          </Tooltip>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
                {selectedJob === job.id && (
                  <div
                    style={{
                      
                      marginBottom: "10%",
                    }}
                  >
                    {job.receivedApplications.length === 0 ? (
                      <Typography
                        variant="body1"
                        style={{
                          marginTop: "1rem",
                          color: "#f74307",
                          transition: "color 0.3s",
                          cursor: "pointer",
                          alignItems:"center",
                          marginLeft:"40%"
                        }}
                        onMouseEnter={() => setSelectedJob(job.id)}
                        onMouseLeave={() => setSelectedJob(null)}
                      >
                        No applicants applied yet
                      </Typography>
                    ) : (
                      job.receivedApplications.map((application) => (
                        <Card
                          key={application.id}
                          sx={{
                            bgcolor: "#1b1774",
                            mt: 3,
                            mb: 2,
                            ml:2,
                            mr:2,
                            transition: "box-shadow 0.6s ease",
                            "&:hover": {
                              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                              bgcolor: "#05cff7",
                              transition: "0.6s",
                              color: "#1b1774",
                            },
                            cursor: "pointer",
                          }}
                          onClick={() => window.open(application.cvUrl, "_blank")}
                        >
                          <CardContent
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              mt: 2,
                            }}
                          >
                            <div>
                              <Typography variant="body1" style={{ color: "white" }}>
                                Name: {application.firstName} {application.lastName}
                              </Typography>
                              <Typography variant="body1" style={{ color: "white" }}>
                                Email: {application.email}
                              </Typography>
                            </div>
                            <Button
                              variant="contained"
                              style={{
                                color: "#1b1774",
                                backgroundColor: "white",
                                borderRadius: "30px",
                              }}
                              size="small"
                              sx={{ ml: 2 }}
                              href={application.cvUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View CV
                            </Button>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                )}
              </Card>
            ))}
            <Dialog
              open={openDialog}
              onClose={closeDeleteDialog}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item>
                    <img src={logo} alt="Logo" style={{ width: "50px", height: "50px" }} />
                    {/* Adjust size of logo as per requirement */}
                  </Grid>
                  <Grid item>
                    <Typography variant="h5">{"Are you sure?"}</Typography>
                  </Grid>
                </Grid>
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Deleting this job will remove it permanently from your records. This action cannot
                  be undone. Do you wish to proceed?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={closeDeleteDialog}
                  color="secondary"
                  variant="outlined"
                  style={{
                    textTransform: "none",
                    fontSize: "15px",

                    borderRadius: "10px",
                  }}
                >
                  No
                </Button>
                <Button
                  onClick={handleDeleteJob}
                  style={{
                    color: "#ffffff",
                    backgroundColor: "#1b1774",
                    padding: "10px",
                    borderRadius: "10px",
                  }}
                >
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
          </SoftBox>
        </Card>
      </SoftBox>

      <Drawer
        anchor="right"
        variant="persistent"
        open={isDrawerOpen}
        // className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
        style={{ backgroundColor: "#2b9cde" }}
        onClose={closeDrawer}
        sx={{ width: drawerWidth, flexShrink: 0, "& .MuiDrawer-paper": { width: drawerWidth } }}
      >
        <Backdrop style={{ backgroundColor: "black" }} sx={{ zIndex: 1 }} onClick={closeDrawer} />
        <Box>
          <Box display="flex" justifyContent="flex-start" alignItems="center" position="relative">
            <IconButton onClick={closeDrawer}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box
            display="flex"
            justifyContent="row"
            p={3}
            height="150px"
            style={{ backgroundImage: `url(${headerBackground})` }}
          >
            <Box display="flex" alignItems="center">
              <Typography
                className={classes.normalText}
                fontWeight="bold"
                style={{ color: "white" }}
              >
                {viewJob.title
                  ? viewJob.title.charAt(0).toUpperCase() + viewJob.title.slice(1)
                  : ""}{" "}
                at{" "}
                {viewJob.companyName
                  ? viewJob.companyName.charAt(0).toUpperCase() + viewJob.companyName.slice(1)
                  : ""}{" "}
              </Typography>
            </Box>
            {/* <Box  display="flex" alignItems="center" style={{backgroundColor:"white", borderRadius:"10px" ,height:"auto"}}>
              <Typography variant="caption" className={classes.onSite}>
                {viewJob.hybridOrRemote}
              </Typography>
            </Box> */}
          </Box>
          <Divider />
          <Box padding="30px" className={classes.box}>
            <Box display="flex" style={{ marginBottom: "15px" }}>
              <Typography variant="subtitle2">
                Website{" "}
                <Link
                  href={viewJob.link}
                  className={classes.linkStyle}
                  variant="subtitle2"
                  rel="noopener"
                >
                  {viewJob.companyName}
                </Link>
              </Typography>
            </Box>
            <Box>
              <Box className={classes.info}></Box>
              <Box className={classes.info}>
                <Typography className={classes.postedOn} variant="caption">
                  Job Type{" "}
                </Typography>
                <Box className={classes.info}>
                  <Typography variant="body2">{viewJob.type}</Typography>
                </Box>
              </Box>
              <Box className={classes.info}>
                <Typography className={classes.postedOn} variant="caption">
                  Company Name{" "}
                </Typography>
                <Box className={classes.info}>
                  <Typography variant="body2">{viewJob.companyName}</Typography>
                </Box>
              </Box>
              <Box className={classes.info}>
                <Typography className={classes.postedOn} variant="caption">
                  Location{" "}
                </Typography>
                <Box className={classes.info}>
                  <Typography variant="body2">{viewJob.location}</Typography>
                </Box>
              </Box>
              <Box className={classes.info}>
                <Typography className={classes.postedOn} variant="caption">
                  Description{" "}
                </Typography>
                <Box className={classes.info}>
                  <Typography variant="body2">{viewJob.description}</Typography>
                </Box>
              </Box>
              <Box>
                <Divider style={{ marginTop: "5vh" }} />
                <Box className={classes.info} style={{ marginTop: "3vh" }}>
                  <Typography variant="h6">Skills: </Typography>
                  <Grid container alignItems="center">
                    {viewJob.skills &&
                      viewJob.skills.map((skill) => (
                        <Grid item key={skill} className={classes.skillCheck}>
                          {skill}
                        </Grid>
                      ))}
                  </Grid>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        {/* Add your sidenav content here */}
      </Drawer>
    </DashboardLayout>
  );
}

export default Overview;
