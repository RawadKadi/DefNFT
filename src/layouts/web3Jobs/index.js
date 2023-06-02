// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useState, useEffect } from "react";
import headerBackground from "../../assets/images/wave_background.png";
import Dropzone from "react-dropzone";
import Avatar from "@material-ui/core/Avatar";
import { arrayUnion } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import RefreshIcon from "@material-ui/icons/Refresh";
import logo from "../../assets/images/logos/logoStrive.png";
import {
  Button,
  FormControl,
  InputLabel,
  Input,
  Box,
  MenuItem,
  Select,
  TextareaAutosize,
  InputAdornment,
  IconButton,
  TextField,
  Card,
  FilledInput,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Divider,
  Link,
} from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

// import { postJob } from "App";
import ViewJobModal from "./ViewJobModal";
import { useNewJobModal } from "App";
import { AttachFile, Close as CloseIcon } from "@material-ui/icons";
import Modal from "@material-ui/core/Modal";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
//importing styles here
import Styles from "C:/Users/Rawad kadi/Desktop/connectopia/soft-ui-dashboard-react-main/soft-ui-dashboard-react-main/src/layouts/web3Jobs/style.css";
import { ClassNames } from "@emotion/react";
import { Grid, Typography } from "@mui/material";
import JobCard from "layouts/jobCard/jobCard";
import JobsData from "../../../src/JobsData";
import { firestore, app, firebase, storage, jobId, getUserId } from "../../firebase/config";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import "firebase/compat/firestore";
import { getFirestore } from "firebase/firestore";
import { format } from "date-fns";
import Drawer from "@material-ui/core/Drawer";
import Backdrop from "@mui/material/Backdrop"; // import Backdrop component separately
import SoftTypography from "components/SoftTypography";

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
const initState = {
  title: "",
  type: "",
  companyName: "",
  hybridOrRemote: "",
  location: "",
  description: "",
  skills: [],
  link: "",
  jobApplications: [],
};
const Web3Jobs = (props) => {
  const [jobs, setJobs] = useState([]);
  const [successMessage, setSuccessMessage] = useState();
  const [Loading, setLoading] = useState(true);
  const [newJobModal, setNewJobModal] = useState(false);
  const [jobSearch, setJobSearch] = useState({
    type: "full-time",
    hybridOrRemote: "remote",
  });

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [cvFile, setCvFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };
  const showSuccessMessage = () => {
    setSelectedQuote(getRandomQuote());
    setSuccessMessage(true);
  };
  const hideSuccessMessage = () => {
    setSuccessMessage(false);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleDrop = (acceptedFiles) => {
    setCvFile(acceptedFiles[0]);
  };
  async function getJobById(jobId) {
    try {
      const jobDocRef = firestore.collection("jobs").doc(jobId);
      const jobDoc = await jobDocRef.get();

      if (jobDoc.exists) {
        return { id: jobDoc.id, ...jobDoc.data() };
      } else {
        throw new Error(`No job document found with jobId: ${jobId}`);
      }
    } catch (error) {
      console.error("Error retrieving job document:", error);
      throw error;
    }
  }
  const [selectedJobId, setSelectedJobId] = useState(null);
  const handleJobSelection = (jobId) => {
    setSelectedJobId(jobId);
  };
  const handleApply = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const userId = getUserId();
    const jobId = selectedJobId;

    // Upload the CV file to Firebase Storage under the jobId folder
    const storageRef = storage.ref();
    const fileRef = storageRef.child(`cvs/${jobId}/${cvFile.name}`);
    let jobApplicationId;

    try {
      const snapshot = await fileRef.put(cvFile);
      console.log("CV file uploaded successfully");
      showSuccessMessage();
      const cvUrl = await snapshot.ref.getDownloadURL();

      // Save the job application data to Firebase Firestore
      const db = firebase.firestore();
      const docRef = await db.collection("jobApplications").add({
        jobId,
        userId,
        firstName,
        lastName,
        email,
        cvUrl,
        createdAt: serverTimestamp(),
      });

      console.log("Job application data saved successfully");
      jobApplicationId = docRef.id;

      // Update the userJobs collection
      await db.collection("userJobs").add({
        userId,
        jobId,
        createdAt: serverTimestamp(),
      });

      // Update the jobApplications array in the jobs collection
      const jobRef = db.collection("jobs").doc(jobId);
      const docSnapshot = await jobRef.get();

      if (docSnapshot.exists) {
        await jobRef.update({
          jobApplications: arrayUnion(jobApplicationId),
        });

        // Get the ID of the user who posted the job
        const jobPosterId = docSnapshot.data().postedBy;

        // Update the receivedApplications array in the users collection (job poster)
        const userRef = db.collection("users").doc(jobPosterId);
        await userRef.update({
          receivedApplications: arrayUnion(jobApplicationId),
        });

        console.log("Job application ID appended to jobApplications array in jobs collection");

        setIsLoading(false);
        setIsSuccess(true);
        setIsApplyDialogOpen(false);
      } else {
        console.log("No document exists with this jobId");
      }
    } catch (error) {
      console.error("Error uploading CV file or saving job application data:", error);
      setIsLoading(false);
      setIsSuccess(false);
    }
  };

  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState("");

  const quotes = [
    '"The only way to do great work is to love what you do." - Steve Jobs',
    '"The secret of getting ahead is getting started." - Mark Twain',
    '"The best way to predict the future is to create it." - Peter Drucker',
    '"Success usually comes to those who are too busy to be looking for it." - Henry David Thoreau',
    '"Hardships often prepare ordinary people for an extraordinary destiny." - C.S. Lewis',
    '"Dream big and dare to fail." - Norman Vaughan',
    "Keep the hard work!",
    '"Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle." - Christian D. Larson',
    `"Don't let yesterday take up too much of today." - Will Rogers`,
    `"Opportunities don't happen, you create them." - Chris Grosser`,
    '"Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful." - Albert Schweitzer',
    "Believe you can and you're halfway there.",
    "Don't watch the clock; do what it does. Keep going.",
    "You are never too old to set another goal or to dream a new dream.",
  ];
  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  };
  const handleApplyClick = () => {
    setIsApplyDialogOpen(true);
  };

  const handleApplyClose = () => {
    setIsApplyDialogOpen(false);
  };
  const [customSearch, setCustomSearch] = useState(false);
  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    e.persist();
    console.log("handleChange VALUES:", name, value);

    setJobSearch((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const [link, setLink] = useState("");

  const handleLinkChange = (event) => {
    const value = event.target.value;

    // Regular expression to match a website link
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;

    // Only update the state if the input matches the regular expression
    if (regex.test(value)) {
      setLink(value);
    }
  };
  const classes = useStyles();
  const [cardData, setCardData] = useState({});
  const [viewJob, setViewJob] = useState({});
  const [jobDetails, setJobDetails] = useState(initState);

  const skills = ["Blender", "React", "Node", "Vue", "Firebase", "MongoDB", "SQL","Illustrator"];

  const [formOpen, setFormOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [jobType, setJobType] = useState("");
  const [hybridOrRemote, setHybridOrRemote] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");

  const [locations, setLocations] = useState([]);

  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");

  const [error, setError] = useState("");
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const storageRef = storage.ref();
    const fileRef = storageRef.child(`job-logos/${file.name}`);
    await fileRef.put(file);
    const url = await fileRef.getDownloadURL();

    setJobDetails((prevDetails) => ({ ...prevDetails, logo: url }));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("handleChange called with name:", name, "and value:", value);

    if (name === "logo") {
      handleImageUpload(e.target.files[0]);
    }

    setJobDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const fetchLocations = async () => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all?fields=name,alpha3Code");
      const data = await response.json();
      const formattedData = data.map((country) => ({
        countryName: country.name.common,
        countryCode: country.alpha3Code,
      }));
      setLocations(formattedData);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };
  useEffect(() => {
    fetchLocations();
  }, []);
  const closeModal = () => {
    setJobDetails(initState);
    setLoading(false);
    closeNewJobModal();
  };
  const closeApply = () => {
    setJobDetails(initState);
    setLoading(false);
    closeNewJobModal();
  };
  const addRemoveSkill = (skill) =>
    jobDetails.skills.includes(skill)
      ? setJobDetails((oldState) => ({
          ...oldState,
          skills: oldState.skills.filter((s) => s != skill),
        }))
      : setJobDetails((oldState) => ({ ...oldState, skills: oldState.skills.concat(skill) }));

  const fetchJobs = async () => {
    try {
      setCustomSearch(false);
      setLoading(true);
      const req = await firestore.collection("jobs").orderBy("postedOn", "desc").get();
      const tempJobs = req.docs.map((job) => ({
        ...job.data(),
        id: job.id,
        postedOn: job.data().postedOn.toDate(),
      }));
      setJobs(tempJobs);
      setLoading(false);
      console.log("This is the tempJobs of ALLLLLL JOBS:", tempJobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const fetchJobsCustom = async (jobSearch) => {
    setLoading(true);
    setCustomSearch(true);
    try {
      const req = await firestore
        .collection("jobs")
        .orderBy("postedOn", "desc")
        .where("hybridOrRemote", "==", jobSearch.hybridOrRemote)
        .where("type", "==", jobSearch.type)
        .get();
      const tempJobs = req.docs.map((job) => ({
        ...job.data(),
        id: job.id,
        postedOn: job.data().postedOn.toDate(),
      }));
      setJobs(tempJobs);
      console.log("type", jobSearch.type);
      console.log("hybridOrREmote", jobSearch.hybridOrRemote);
      console.log("this is the tempJobs:", tempJobs);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);
  const postJob = async (jobDetails) => {
    const userId = getUserId();
    const jobsCollection = firestore.collection("jobs");
    const usersCollection = firestore.collection("users");

    // Create a new document ID
    const newJobDoc = jobsCollection.doc();

    // Add the job to the jobs collection with the new document ID
    await newJobDoc.set({
      ...jobDetails,
      postedBy: userId,
      postedOn: app.firestore.FieldValue.serverTimestamp(),
    });

    // Add the job's id to the postedJobs array of the user who posted the job
    const userDocRef = usersCollection.doc(userId);
    await userDocRef.update({
      postedJobs: app.firestore.FieldValue.arrayUnion(newJobDoc.id),
    });

    fetchJobs();
  };
  const handleSubmit = async () => {
    // for (const field in jobDetails) {
    //   if (typeof jobDetails[field] === "string" && !jobDetails[field] ) return;
    // }

    for (const field in jobDetails) {
      if (typeof jobDetails[field] === "string" && !jobDetails[field]) return;
    }
    if (!jobDetails.skills.length) return;

    setLoading(true);
    await postJob(jobDetails);
    closeModal();
    console.log("Job posted successfully");
  };
  const createCard = (cardData) => {
    return (
      <Card>
        <Card.Content>
          <Card.Header>{cardData.title}</Card.Header>
          <Card.Meta>{cardData.jobType}</Card.Meta>
          <Card.Description>
            {cardData.hybridOrRemote === "hybrid"
              ? "Hybrid"
              : cardData.hybridOrRemote === "remote"
              ? "Remote"
              : "Onsite"}{" "}
            | {cardData.company} | {cardData.location}
          </Card.Description>
          <Card.Description>
            <a href={cardData.website}>{cardData.website}</a>
          </Card.Description>
          <Card.Description>{cardData.description}</Card.Description>
        </Card.Content>
      </Card>
    );
  };
  const openNewJobModal = () => {
    setNewJobModal(true);
  };
  const closeNewJobModal = () => {
    setNewJobModal(false);
  };
  const closeApplyModal = () => {
    setViewJob(false);
  };
  const search = async () => {
    setLoading(true);
    // const userId = getUserId(); // Get the user ID

    await fetchJobsCustom(jobSearch);
    setLoading(false);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <DashboardLayout>
      <Box>
        <Box style={{ backgroundColor: "white" }}>
          <DashboardNavbar />

          <Box position="fixed" width="80%" zIndex={1}>
            <Box color="white" ml={-3} mb={5}></Box>
            <Box p={2} mt={-5} className={classes.wrapper}>
              <Select
                onChange={handleSearchChange}
                value={jobSearch.type}
                name="type"
                disableUnderline
                variant="outlined"
                borderColor="#1CC2DD"
              >
                <MenuItem value="full-time">Full time</MenuItem>
                <MenuItem value="part-time">Part time</MenuItem>
                <MenuItem value="contract">Contract</MenuItem>
                <MenuItem value="temporary">Temporary</MenuItem>
              </Select>
              <Select
                onChange={handleSearchChange}
                name="hybridOrRemote"
                value={jobSearch.hybridOrRemote}
                disableUnderline
                variant="outlined"
              >
                <MenuItem value="remote">Remote</MenuItem>
                <MenuItem value="on-site">On-site</MenuItem>
                <MenuItem value="hybrid">Hybrid</MenuItem>
              </Select>
              <Button
                variant="contained"
                style={{ background: "linear-gradient(90deg, #430269, #0b1847)", color: "white" }}
                disabled={Loading}
                onClick={search}
              >
                {isLoading ? <CircularProgress /> : "Search"}
              </Button>
              <Button
                variant="contained"
                style={{ backgroundColor: "#ffffff" }}
                onClick={openNewJobModal}
                position="fixed"
              >
                Post a Job
              </Button>
            </Box>
          </Box>

          <Box>
            <form onSubmit={handleSubmit}>
              <Box marginTop="13vh">
                {Loading == true ? (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="30vh"
                    className="web3-jobs"
                  >
                    <CircularProgress />
                  </Box>
                ) : (
                  <>
                    {customSearch && (
                      <Box my={2} mr={3} display="flex" justifyContent="flex-start">
                        <Button
                          onClick={fetchJobs}
                          style={{ backgroundColor: "#0b1847", color: "white", marginLeft: "20px" }}
                        >
                          <ArrowBackIcon size={20} />
                          Back
                        </Button>
                      </Box>
                    )}
                    {jobs.length > 0 ? (
                      jobs.map((job) => (
                        <JobCard
                          open={() => setViewJob(job)}
                          key={job.id}
                          job={job}
                          handleJobSelection={handleJobSelection}
                        />
                      ))
                    ) : (
                      <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        minHeight="30vh"
                      >
                        <SoftTypography>No jobs found for your search</SoftTypography>
                        <Button
                          startIcon={<RefreshIcon />}
                          variant="contained"
                          onClick={search}
                          style={{ marginTop: "30px", backgroundColor: "#0b1847", color: "white" }}
                        >
                          Refresh
                        </Button>
                      </Box>
                    )}
                  </>
                )}
              </Box>
              {/* JOB CARDS */}
              {}

              {Object.keys(cardData).length > 0 && createCard(cardData)}

              {/* Job posting dialog                    */}
              <Dialog open={newJobModal} fullWidth>
                <DialogTitle>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    Post a Job
                    <IconButton onClick={closeModal}>
                      <CloseIcon />
                    </IconButton>
                  </Box>
                </DialogTitle>
                <DialogContent>
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <InputLabel htmlFor="title">Job Title*</InputLabel>
                      <Select
                        name="title"
                        value={jobDetails.title}
                        labelId="title-label"
                        id="title"
                        disableUnderline
                        style={{ minWidth: "200px", marginBottom: "10px" }}
                        onChange={handleChange}
                        required
                        variant="filled"
                        fullWidth
                      >
                        <MenuItem value="blockchain developer">Blockchain Developer</MenuItem>

                        <MenuItem value="backend developer">Back-end Developer</MenuItem>
                        <MenuItem value="frontend developer">Front-end Developer</MenuItem>
                        <MenuItem value="fullstack developer">Full-Stack Developer</MenuItem>
                        <MenuItem value="3d artist">3d/2d Artist</MenuItem>
                        <MenuItem value="graphic design">Graphic Design</MenuItem>
                        <MenuItem value="digital marketing">Digital Marketing</MenuItem>
                        <MenuItem value="social media marketing">Social media Marketing</MenuItem>


                      </Select>
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel htmlFor="title">Job Type*</InputLabel>
                      <Select
                        name="type"
                        value={jobDetails.type}
                        labelId="Job-type"
                        id="jobType"
                        disableUnderline
                        style={{ minWidth: "200px", marginBottom: "10px" }}
                        onChange={handleChange}
                        required
                        fullWidth
                        variant="filled"
                      >
                        <MenuItem value="full-time">Full-time</MenuItem>
                        <MenuItem value="part-time">Part-time</MenuItem>
                        <MenuItem value="contract">Contract</MenuItem>
                        <MenuItem value="temporary">Temporary</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel htmlFor="title">On-site/Remote*</InputLabel>
                      <Select
                        name="hybridOrRemote"
                        value={jobDetails.hybridOrRemote}
                        labelId="hybrid-Or-Remote"
                        id="hybridOrRemote"
                        disableUnderline
                        style={{ minWidth: "200px", marginBottom: "10px" }}
                        onChange={handleChange}
                        required
                        fullWidth
                        variant="filled"
                      >
                        <MenuItem value="on-site">On-site</MenuItem>
                        <MenuItem value="remote">Remote</MenuItem>
                        <MenuItem value="hybrid">Hybrid</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel htmlFor="title">Company Name*</InputLabel>
                      <FilledInput
                        name="companyName"
                        value={jobDetails.companyName}
                        autoComplete="off"
                        onChange={handleChange}
                        required
                        id="company"
                        placeholder="Full Company Name"
                        disableUnderline
                        fullWidth
                      ></FilledInput>
                    </Grid>

                    <Grid item xs={6}>
                      <InputLabel htmlFor="title">Location*</InputLabel>
                      {/* <Select
                  name="location"
                  value={jobDetails.location}
                  labelId="location-label"
                  id="location"
                  onChange={handleChange}
                  style={{ minWidth: "200px", fontSize: "20px" }}
                  disableUnderline
                  fullWidth
                  variant="filled"
                >
                  {locations.map((location) => (
                    <MenuItem key={location.countryCode} value={location.countryCode}>
                      {location.countryName}
                    </MenuItem>
                  ))}
                </Select> */}
                      <FilledInput
                        name="location"
                        value={jobDetails.location}
                        autoComplete="off"
                        onChange={handleChange}
                        required
                        id="location"
                        placeholder="Country Name"
                        disableUnderline
                        fullWidth
                      ></FilledInput>
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel htmlFor="title">Website</InputLabel>
                      <FilledInput
                        name="link"
                        value={jobDetails.link}
                        autoComplete="off"
                        id="website"
                        onChange={handleChange}
                        placeholder="https://example.com"
                        disableUnderline
                        fullWidth
                      >
                        {link && (
                          <Link href={link} target="_blank" rel="noopener">
                            {link}
                          </Link>
                        )}
                      </FilledInput>
                      {/* <FilledInput
                  name="link"
                  value={jobDetails.link}
                  autoComplete="off"
                  id="website"
                  onChange={handleChange}
                  placeholder="https://example.com"
                  disableUnderline
                  fullWidth
                ></FilledInput> */}
                    </Grid>
                    <Grid item xs={12}>
                      <FilledInput
                        name="description"
                        value={jobDetails.description}
                        autoComplete="off"
                        id="website"
                        onChange={handleChange}
                        placeholder="Job description*"
                        required
                        disableUnderline
                        fullWidth
                        multiline
                        rows={4}
                      ></FilledInput>
                    </Grid>
                    {/* <ViewJobModal /> */}
                  </Grid>
                  {/* display logo as an input code */}
                  {/* <Grid item style={{ marginTop: "30px", marginBottom: "30px" }}>
                <Box style={{ marginBottom: "10px" }}>
                  <InputLabel htmlFor="title" required>
                    Logo
                  </InputLabel>
                </Box>
                <input type="file" value={jobDetails.logo} onChange={handleChange} />
              </Grid> */}
                  <Box mr={2}>
                    <Box style={{ marginBottom: "10px" }}>
                      <InputLabel htmlFor="title">Skills*</InputLabel>
                    </Box>
                    <Box display="flex">
                      {skills.map((skill) => (
                        <Box
                          onClick={() => addRemoveSkill(skill)}
                          className={`${classes.skillChip} ${
                            jobDetails.skills.includes(skill) && classes.included
                          }`}
                          key={skill}
                        >
                          {skill}
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </DialogContent>
                <DialogActions>
                  <Box
                    color="red"
                    width="100%"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="caption">*Required fields</Typography>
                    <Button
                      variant="contained"
                      disableElevation
                      style={{ backgroundColor: "#0b1847", color: "#fff" }}
                      disabled={Loading}
                      onClick={(event) => handleSubmit(event)}
                    >
                      {Loading ? <CircularProgress /> : "Post job"}
                    </Button>
                  </Box>
                </DialogActions>
              </Dialog>
            </form>
          </Box>
        </Box>
      </Box>
      <Drawer
        anchor="right"
        variant="persistent"
        open={!!Object.keys(viewJob).length}
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
        style={{ backgroundColor: "#2b9cde" }}
        onClose={closeApplyModal}
      >
        <Backdrop
          style={{ backgroundColor: "black" }}
          sx={{ zIndex: 1 }}
          onClick={closeApplyModal}
        />
        <Box>
          <Box display="flex" justifyContent="flex-start" alignItems="center" position="relative">
            <IconButton onClick={closeApplyModal} position="fixed" top="-100px">
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
              <Typography className={classes.normalText} fontWeight="bold">
                {viewJob.title
                  ? viewJob.title.charAt(0).toUpperCase() + viewJob.title.slice(1)
                  : ""}{" "}
                at{" "}
                {viewJob.companyName
                  ? viewJob.companyName.charAt(0).toUpperCase() + viewJob.companyName.slice(1)
                  : ""}{" "}
              </Typography>
            </Box>
            <Box className={classes.onSiteBox} display="flex" alignItems="center">
              <Typography variant="caption" className={classes.onSite}>
                {viewJob.hybridOrRemote}
              </Typography>
            </Box>
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
              <Box className={classes.info}>
                <Typography className={classes.postedOn} variant="caption">
                  Posted on{" "}
                </Typography>
                <Box className={classes.info}>
                  <Typography variant="body2">
                    {viewJob.postedOn && format(viewJob.postedOn, "dd/MM/yyyy HH:MM")}
                  </Typography>
                </Box>
              </Box>
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
              <Box>
                <Divider style={{ marginTop: "5vh" }} />
                <Box className={classes.info} display="flex" justifyContent="space-between">
                  <Box>
                    <Button
                      variant="contained"
                      component="a"
                      style={{ marginTop: "2vh", backgroundColor: "white" }}
                      onClick={handleApplyClick}
                    >
                      Apply
                    </Button>
                  </Box>
                  <Box>
                    <Button
                      variant="outlined"
                      component="a"
                      style={{ marginTop: "2vh", backgroundColor: "#edf7fc" }}
                      onClick={closeApplyModal}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Dialog open={isApplyDialogOpen} onClose={handleApplyClose}>
              <DialogTitle>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item>
                    <img src={logo} alt="Logo" style={{ width: "70px", height: "70px" }} />
                    {/* Adjust size of logo as per requirement */}
                  </Grid>
                  <Grid item>
                    <Typography variant="h4">
                      Apply for{" "}
                      {viewJob.title
                        ? viewJob.title.charAt(0).toUpperCase() + viewJob.title.slice(1)
                        : ""}{" "}
                      at{" "}
                      {viewJob.companyName
                        ? viewJob.companyName.charAt(0).toUpperCase() + viewJob.companyName.slice(1)
                        : ""}{" "}
                    </Typography>
                  </Grid>
                </Grid>
              </DialogTitle>
              <Box style={{ padding: "40px" }}>
                {/* <Typography variant="h4">
                  Apply for{" "}
                  {viewJob.title
                    ? viewJob.title.charAt(0).toUpperCase() + viewJob.title.slice(1)
                    : ""}{" "}
                  at{" "}
                  {viewJob.companyName
                    ? viewJob.companyName.charAt(0).toUpperCase() + viewJob.companyName.slice(1)
                    : ""}{" "}
                </Typography>{" "} */}
                <DialogContent>
                  <form onSubmit={handleSubmit}>
                    <>
                      <TextField
                        label="First Name"
                        variant="outlined"
                        fullWidth
                        required
                        margin="normal"
                        value={firstName}
                        onChange={handleFirstNameChange}
                      />
                      <TextField
                        label="Last Name"
                        variant="outlined"
                        fullWidth
                        required
                        margin="normal"
                        value={lastName}
                        onChange={handleLastNameChange}
                      />
                      <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        required
                        margin="normal"
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                      />

                      <Box mt={4}>
                        <Dropzone onDrop={handleDrop}>
                          {({ getRootProps, getInputProps }) => (
                            <Box
                              {...getRootProps()}
                              bgcolor="#00195e"
                              p={2}
                              textAlign="center"
                              borderRadius={10}
                            >
                              <input {...getInputProps()} />
                              {cvFile ? (
                                <p style={{ cursor: "pointer", color: "white" }}>
                                  CV uploaded: {cvFile.name}
                                </p>
                              ) : (
                                <p style={{ cursor: "pointer", color: "white" }}>
                                  Drag and drop your CV here or click to select a file
                                </p>
                              )}
                            </Box>
                          )}
                        </Dropzone>
                      </Box>
                      <Divider style={{ marginTop: "5vh" }} />
                      <Box mt={3} display="flex" justifyContent="space-between">
                        <Button
                          onClick={handleApplyClose}
                          color="primary"
                          style={{ color: "#0b1847" }}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          disabled={!firstName || !lastName || !email || !cvFile || isLoading}
                          style={{ backgroundColor: "#0b1847", color: "white" }}
                          onClick={handleApply}
                        >
                          {isLoading ? "Submitting..." : "Submit"}
                        </Button>
                      </Box>
                    </>
                  </form>
                </DialogContent>
              </Box>
            </Dialog>
            <Dialog open={successMessage}>
              <Box style={{ padding: "10px", paddingBottom: "20px" }}>
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="center"
                  position="relative"
                >
                  <IconButton onClick={hideSuccessMessage} position="absolute" top="-100px">
                    <CloseIcon />
                  </IconButton>
                </Box>
                <DialogContent>
                  <Box
                    marginBottom={7}
                    cursor="pointer"
                    marginTop={3}
                    display="flex"
                    justifyContent="center"
                  >
                    <Typography variant="h4">
                      Your application was submitted successfully{" "}
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="center" marginBottom={4}>
                    <Box width="60px" alignItems="center" justifyContent="center">
                      <CheckCircleIcon className={classes.successIcon} />
                    </Box>
                  </Box>
                  <Box
                    marginBottom={3}
                    cursor="pointer"
                    display="flex"
                    justifyContent="center"
                    p={2}
                  >
                    <Typography variant="h6" textAlign="center">
                      {selectedQuote}
                    </Typography>
                  </Box>
                </DialogContent>
              </Box>
            </Dialog>
          </Box>
        </Box>
        {/* Add your sidenav content here */}
      </Drawer>

      {/* <Dialog  open={!!Object.keys(viewJob).length} fullWidth>
          <DialogTitle>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              {viewJob.title} @ {viewJob.companyName}
              <IconButton onClick={closeApplyModal}>
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Box>
              <Box>
                <Typography  variant="caption">Posted on{" "}</Typography>
                <Typography variant="caption">{viewJob.postedOn && format(viewJob.postedOn,"dd/MM/yyyy HH:MM")}</Typography>

              </Box>
            </Box>
          </DialogContent>
          <DialogActions></DialogActions>
        </Dialog> */}
    </DashboardLayout>
  );
};
export default Web3Jobs;
