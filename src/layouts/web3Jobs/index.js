// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useState, useEffect } from "react";
import headerBackground from "../../assets/images/headerBackground.png"
import Dropzone from "react-dropzone";
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
import { firestore, app, firebase, storage } from "../../firebase/config";
import "firebase/compat/firestore";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { format } from "date-fns";
import Drawer from "@material-ui/core/Drawer";
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
  },
  included: {
    backgroundColor: "#0b1847",
    color: "#fff",
  },
  drawer: {
    width: 1500,
    backgroundColor: "red",
  },
  drawerPaper: {
    width: 400,

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
    backgroundImage:headerBackground
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
    backgroundColor: "#0b1847",
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
};
const Web3Jobs = (props) => {
  const [jobs, setJobs] = useState([]);
  const [successMessage, setSuccessMessage] = useState();
  const [Loading, setLoading] = useState(true);
  const [newJobModal, setNewJobModal] = useState(false);
  const [jobSearch, setJobSearch] = useState({
    type: "Full time",
    hybridOrRemote: "Remote",
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

  const handleApply = (event) => {
    event.preventDefault();
    setIsLoading(true);

    // Upload the CV file to Firebase Storage
    const storageRef = storage.ref();
    const fileRef = storageRef.child(`cvs/${cvFile.name}`);
    fileRef
      .put(cvFile)
      .then((snapshot) => {
        console.log("CV file uploaded successfully");
        showSuccessMessage();
        return snapshot.ref.getDownloadURL();
        setIsApplyDialogOpen(false);
      })
      .then((cvUrl) => {
        // Save the job application data to Firebase Firestore
        const db = firebase.firestore();
        return db.collection("jobApplications").add({
          firstName,
          lastName,
          email,
          cvUrl,
          createdAt: serverTimestamp(),
        });
      })
      .then(() => {
        console.log("Job application data saved successfully");
        setIsLoading(false);
        setIsSuccess(true);
        setIsApplyDialogOpen(false);
      })
      .catch((error) => {
        console.error("Error uploading CV file or saving job application data:", error);
        setIsLoading(false);
        setIsSuccess(false);
      });
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

  const skills = ["Javascript", "React", "Node", "Vue", "Firebase", "MongoDB", "SQL"];

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

  const handleChange = (e) => {
    const { name, value } = e.target;

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
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };
  const fetchJobsCustom = async (jobSearch) => {
    setLoading(true);
    setCustomSearch(true);
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
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, []);
  const postJob = async (jobDetails) => {
    await firestore
      .collection("jobs")
      .add({ ...jobDetails, postedOn: app.firestore.FieldValue.serverTimestamp() });
    fetchJobs();
  };
  const handleSubmit = async () => {
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
      <Box position="fixed" width="80vw" zIndex={1}>
        <Box py={10} style={{ backgroundImage: `url(${headerBackground})`,backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',}} color="white" ml={-3}>
          <Grid container justify="center" marginLeft={10}>
            <Grid item xs={10}>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="h4" color="#ffffff">
                  Web3 Job Listing
                </Typography>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#ffffff" }}
                  onClick={openNewJobModal}
                >
                  Post a Job
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box p={2} mt={-5} className={classes.wrapper}>
          <Select
            onChange={handleSearchChange}
            value={jobSearch.type}
            name="type"
            disableUnderline
            variant="outlined"
            borderColor="#1CC2DD"
          >
            <MenuItem value="Full time">Full time</MenuItem>
            <MenuItem value="Part time">Part time</MenuItem>
            <MenuItem value="Contract">Contract</MenuItem>
            <MenuItem value="Temporary">Temporary</MenuItem>
          </Select>
          <Select
            onChange={handleSearchChange}
            value={jobSearch.hybridOrRemote}
            disableUnderline
            variant="outlined"
          >
            <MenuItem value="Remote">Remote</MenuItem>
            <MenuItem value="On-site">On-site</MenuItem>
            <MenuItem value="Hybrid">Hybrid</MenuItem>
          </Select>
          <Button
            variant="contained"
            style={{ backgroundColor: "#0b1847", color: "white" }}
            disabled={Loading}
            onClick={search}
          >
            {Loading ? <CircularProgress /> : "Search"}
          </Button>
        </Box>
      </Box>
      <Box>
        <form onSubmit={handleSubmit}>
          <Box marginTop="30vh">
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
                  <Box my={2} mr={3} display="flex" justifyContent="flex-end">
                    <Button onClick={fetchJobs}>
                      <CloseIcon size={20} />
                      Custom Search
                    </Button>
                  </Box>
                )}
                {jobs.map((job) => (
                  <JobCard open={() => setViewJob(job)} key={job.id} job={job} />
                ))}
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
                    <MenuItem value="web3 development">Web3 Development</MenuItem>
                    <MenuItem value="graphic design">Graphic Design</MenuItem>
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
              <Box mr={2}>
                <Typography>Skills*</Typography>
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
      <Drawer
        anchor="left"
        variant="persistent"
        open={!!Object.keys(viewJob).length}
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Box >
        <Box display="flex" justifyContent="flex-end" alignItems="center" position="relative">
          <IconButton onClick={closeApplyModal} position="absolute" top="-100px">
            <CloseIcon />
          </IconButton>
        </Box>
        <Box display="flex" justifyContent="row" p={3} style={{ backgroundImage: `url(${headerBackground})`}}>
          <Typography className={classes.normalText} fontWeight="bold">
            {viewJob.title} @ {viewJob.companyName}
          </Typography>
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
                {viewJob.link}
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
            <Box >
              <Divider style={{ marginTop: "5vh" }} />
              <Box
                className={classes.info}
                display="flex"
                flexDirection="flex-end"
                justifyContent="right"
              >
                <Button
                  variant="outlined"
                  component="a"
                  style={{ marginTop: "2vh" }}
                  onClick={handleApplyClick}
                >
                  Apply
                </Button>
              </Box>
            </Box>
          </Box>
          <Dialog open={isApplyDialogOpen} onClose={handleApplyClose}>
            <Box style={{ padding: "40px" }}>
              <Typography variant="h4">Apply for {viewJob.title}</Typography>
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
              <Box display="flex" justifyContent="flex-end" alignItems="center" position="relative">
                <IconButton onClick={hideSuccessMessage} position="absolute" top="-100px">
                  <CloseIcon />
                </IconButton>
              </Box>
              <DialogContent>
                
                <Box marginBottom={7} cursor="pointer" marginTop={3}>
                  <Typography variant="h4">Your application was submitted successfully{" "}</Typography>
                </Box>
                <Box display="flex" justifyContent="center" marginBottom={4} >
                  <Box width="60px" alignItems="center" justifyContent="center"><CheckCircleIcon className={classes.successIcon} /></Box>
                  
                </Box>
                <Box marginBottom={3} cursor="pointer" display="flex" justifyContent="center">
                  <Typography variant="h6" textAlign="center">{selectedQuote}</Typography>
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
