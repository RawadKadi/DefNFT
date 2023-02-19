// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useState, useEffect } from "react";
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
} from "@material-ui/core";

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
import  firestore  from "../../firebase/config";
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
}));

const Web3Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const fetchJobs = async () => {
    const req = await firestore.collection("jobs").orderBy("postedOn", "desc").get();
    console.log(req);
  };
  useEffect(() => {
    fetchJobs();
  }, [])
  const classes = useStyles();
  const [cardData, setCardData] = useState({});

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   try {

  //     setCardData({
  //       title,
  //       company,
  //       description,
  //       location,
  //       website,
  //       jobType,
  //       hybridOrRemote,
  //     });
  //     setMessage("Job listing submitted successfully");
  //   } catch (error) {
  //     setMessage("Error submitting job listing");
  //   }
  //   setFormOpen(false);
  // };

  const skills = ["Javascript", "React", "Node", "Vue", "Firebase", "MongoDB", "SQL"];

  const [formOpen, setFormOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [jobType, setJobType] = useState("");
  const [hybridOrRemote, setHybridOrRemote] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");

  const [location, setLocation] = useState("");
  const [locations, setLocations] = useState([]);

  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("/submit-job-listing", {
        title,
        company,
        description,
        location,
        website,
        jobType,
        hybridOrRemote,
      })
      .then((response) => {
        // Update the message state with a success message
        setMessage("Job listing submitted successfully");
        console.log("Success SUBMISSION");
      })
      .catch((error) => {
        // Update the message state with an error message
        setMessage("Error submitting job listing");
      });
  };
  useEffect(() => {
    axios
      .get("http://localhost:3001/web3-jobs")
      .then((response) => {
        console.log(response.data);
        // Do something with the data
      })
      .catch((error) => console.error(error));
  }, []);
  useEffect(() => {
    axios
      .get("http://api.geonames.org/countryInfoJSON", {
        params: {
          username: "rawadkadi", // Replace with your GeoNames API username
        },
      })
      .then((response) => {
        setLocations(response.data.geonames);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <>
        <Box py={10} bgcolor="#0b1847" color="white" ml={-3}>
          <Grid container justify="center" marginLeft={10}>
            <Grid item xs={10}>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="h4" color="#ffffff">
                  Web3 Job Listing
                </Typography>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#ffffff" }}
                  onClick={() => setFormOpen(false)}
                >
                  Post a Job
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box p={2} mt={-5} className={classes.wrapper}>
          <Select
            disableUnderline
            defaultValue="Full time"
            variant="outlined"
            borderColor="#1CC2DD"
          >
            <MenuItem value="Full time">Full time</MenuItem>
            <MenuItem value="Part time">Part time</MenuItem>
            <MenuItem value="Contract">Contract</MenuItem>
            <MenuItem value="Temporary">Temporary</MenuItem>
          </Select>
          <Select disableUnderline defaultValue="Remote" variant="outlined">
            <MenuItem value="Remote">Remote</MenuItem>
            <MenuItem value="On-site">On-site</MenuItem>
            <MenuItem value="Hybrid">Hybrid</MenuItem>
          </Select>
          <Button
            variant="contained"
            style={{ backgroundColor: "#1CC2DD", color: "white" }}
            onClick={() => setFormOpen(false)}
          >
            Search
          </Button>
        </Box>

        {/* JOB CARDS */}
        {JobsData.map((job) => (
          <JobCard key={job.id} {...job} />
        ))}

        {Object.keys(cardData).length > 0 && createCard(cardData)}
        <Dialog open={false} fullWidth>
          <DialogTitle>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              Post a Job
              <IconButton>
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <InputLabel htmlFor="title">Job Title*</InputLabel>
                <Select
                  labelId="title-label"
                  id="title"
                  disableUnderline
                  style={{ minWidth: "200px", marginBottom: "10px" }}
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
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
                  labelId="Job-type"
                  id="jobType"
                  disableUnderline
                  style={{ minWidth: "200px", marginBottom: "10px" }}
                  value={jobType}
                  onChange={(event) => setJobType(event.target.value)}
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
                  labelId="hybrid-Or-Remote"
                  id="hybridOrRemote"
                  disableUnderline
                  style={{ minWidth: "200px", marginBottom: "10px" }}
                  value={hybridOrRemote}
                  onChange={(event) => setHybridOrRemote(event.target.value)}
                  required
                  fullWidth
                  variant="filled"
                >
                  <MenuItem value="on-site">On-site</MenuItem>
                  <MenuItem value="remote">remote</MenuItem>
                  <MenuItem value="hybrid">Hybrid</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={6}>
                <InputLabel htmlFor="title">Company Name*</InputLabel>
                <FilledInput
                  onChange={(event) => setCompany(event.target.value)}
                  required
                  id="company"
                  placeholder="Full Company Name"
                  disableUnderline
                  fullWidth
                ></FilledInput>
              </Grid>
              <Grid item xs={6}>
                <InputLabel id="location-label">Location*</InputLabel>
                <Select
                  labelId="location-label"
                  id="location"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
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
                </Select>
              </Grid>
              <Grid item xs={6}>
                <InputLabel htmlFor="title">Website</InputLabel>
                <FilledInput
                  id="website"
                  onChange={(event) => setWebsite(event.target.value)}
                  placeholder="https://example.com"
                  disableUnderline
                  fullWidth
                ></FilledInput>
              </Grid>
              <Grid item xs={12}>
                <FilledInput
                  id="website"
                  onChange={(event) => setWebsite(event.target.value)}
                  placeholder="Job description*"
                  required
                  disableUnderline
                  fullWidth
                  multiline
                  rows={4}
                ></FilledInput>
              </Grid>
            </Grid>
            <Box mr={2}>
              <Typography>Skills</Typography>
              <Box display="flex">
                {skills.map((skill) => (
                  <Box className={classes.skillChip} key={skill}>
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
              >
                Post Job
              </Button>
            </Box>
          </DialogActions>
        </Dialog>
        {/* <Modal open={formOpen} onClose={() => setFormOpen(false)}>
          <Box className={Styles.formBox}>
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "white",
                padding: "20px",
                position: "absolute",
                top: "50%",
                left: "50%",
                minWidth: "35%",
                width: "auto",
                height: "auto",
                transform: "translate(-50%, -50%)",
              }}
              onSubmit={handleSubmit}
            >
              <h3 style={{ margin: "30px 0px 40px 0px" }}>Create Job</h3>
              <div style={{ display: "flex" }}>
                <FormControl style={{ marginLeft: "30px" }}>
                  <InputLabel htmlFor="title">Job Title*</InputLabel>
                  <Select
                    labelId="title-label"
                    id="title"
                    style={{ minWidth: "200px", marginBottom: "10px" }}
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    required
                  >
                    <MenuItem value="blockchain developer">Blockchain Developer</MenuItem>
                    <MenuItem value="web3 development">Web3 Development</MenuItem>
                    <MenuItem value="graphic design">Graphic Design</MenuItem>
                  </Select>
                </FormControl>
                <FormControl style={{ marginLeft: "30px" }}>
                  <InputLabel htmlFor="jobType">Job Type*</InputLabel>
                  <Select
                    labelId="Job-type"
                    id="jobType"
                    style={{ minWidth: "200px", marginBottom: "10px" }}
                    value={jobType}
                    onChange={(event) => setJobType(event.target.value)}
                    required
                  >
                    <MenuItem value="full-time">Full-time</MenuItem>
                    <MenuItem value="part-time">Part-time</MenuItem>
                    <MenuItem value="contract">Contract</MenuItem>
                    <MenuItem value="temporary">Temporary</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>
                <FormControl style={{ marginLeft: "30px", marginRight: "30px" }}>
                  <InputLabel htmlFor="hybridOrRemote">On-site/Remote*</InputLabel>
                  <Select
                    labelId="hybrid-Or-Remote"
                    id="hybridOrRemote"
                    style={{ minWidth: "200px", marginBottom: "10px" }}
                    value={hybridOrRemote}
                    onChange={(event) => setHybridOrRemote(event.target.value)}
                    required
                  >
                    <MenuItem value="on-site">On-site</MenuItem>
                    <MenuItem value="remote">remote</MenuItem>
                    <MenuItem value="hybrid">Hybrid</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <br />
              <div style={{ display: "flex" }}>
                <FormControl style={{ marginRight: "30px", marginLeft: "30px" }}>
                  <InputLabel htmlFor="company">Company Name*</InputLabel>
                  <Input
                    id="company"
                    type="text"
                    value={company}
                    required
                    onChange={(event) => setCompany(event.target.value)}
                    style={{ minWidth: "200px" }}
                  />
                </FormControl>
                <FormControl style={{ marginBottom: "40px" }}>
                  <InputLabel id="location-label">Location*</InputLabel>
                  <Select
                    labelId="location-label"
                    id="location"
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    style={{ minWidth: "200px", fontSize: "20px" }}
                  >
                    {locations.map((location) => (
                      <MenuItem key={location.countryCode} value={location.countryCode}>
                        {location.countryName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl style={{ marginLeft: "30px", marginRight: "30px" }}>
                  <InputLabel htmlFor="company">Website</InputLabel>
                  <Input
                    id="website"
                    type="text"
                    placeholder="https://example.com"
                    value={website}
                    onChange={(event) => setWebsite(event.target.value)}
                    style={{ minWidth: "200px" }}
                  />
                </FormControl>
              </div>

              <Input
                type="file"
                style={{ marginBottom: "30px" }}
                onChange={(event) => setAttachments(event.target.files)}
                multiple
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton>
                      <AttachFile onClick={(event) => setAttachments(event.target.files)} />
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormControl>
                <h6 htmlFor="description">Job Description</h6>
                <TextareaAutosize
                  id="description"
                  rowsMin={10}
                  placeholder="Job Description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  style={{ minWidth: "300px" }}
                  required
                >
                  Job Description*
                </TextareaAutosize>
              </FormControl>
              <br />

              <Button type="submit" onClick={handleSubmit}>
                Submit
              </Button>
            </form>
            {message && <p>{message}</p>}
            <Button onClick={() => setFormOpen(false)}>Close</Button>
          </Box>
        </Modal> */}
      </>
    </DashboardLayout>
  );
};
export default Web3Jobs;
