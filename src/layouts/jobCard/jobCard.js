import React from "react";
import { Box, Grid, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { whitespace } from "stylis";
import { differenceInMinutes, differenceInHours, differenceInDays } from "date-fns";
import Avatar from "@material-ui/core/Avatar";
import { firestore, app, firebase, storage } from "../../firebase/config";

const useStyles = makeStyles((theme) => ({
  button: {
    borderRadius: "25px",
    borderWidth: "2px",
    borderColor: "#0b1847",
    color: "#0b1847",
  },
  wrapper: {
    border: "1px solid #e8e8e8",
    width: "98%",
    transition: ".3s",
    cursor: "pointer",
    "&:hover": {
      boxShadow: "0px 5px 25px rgba(0,0,0,0.1)",
      borderLeft: "6px solid #1b1774",
    },
  },
  companyName: {
    fontSize: "13.5px",
    background: "linear-gradient(90deg, #05cff7, #1b1774)",
    color: "#ffffff", // Change text color to white
    padding: theme.spacing(0.15),
    paddingLeft: theme.spacing(1.2),
    paddingRight: theme.spacing(1.2),
    borderRadius: "5px",
    display: "inline-block",
    fontWeight: 600,
  },
  skillChip: {
    margin: theme.spacing(0.5),
    padding: theme.spacing(0.65),
    paddingLeft: theme.spacing(1.2),
    paddingRight: theme.spacing(1.2),
    fontSize: "14.5px",
    borderRadius: "5px",
    transition: ".3s",

    fontWeight: 500,
    background: "linear-gradient(45deg, #160233, #1b1774)",
    color: "#fff",
  },
}));
export default ({ job, open, handleJobSelection }) => {
  const classes = useStyles();
  const minutes = differenceInMinutes(Date.now(), job.postedOn);
  const hours = differenceInHours(Date.now(), job.postedOn);
  const days = differenceInDays(Date.now(), job.postedOn);
  const handleApplyClick = () => {
    handleJobSelection(job.id);
    open();
    // ...
  };
  let timeString;
  if (days >= 1) {
    timeString = `${days} day${days > 1 ? "s" : ""}`;
  } else if (hours >= 1) {
    timeString = `${hours} hour${hours > 1 ? "s" : ""}`;
  } else {
    timeString = `${minutes+2} minute${minutes > 1 ? "s" : ""}`;
  }
  return (
    <Box p={2} className={classes.wrapper} onClick={handleApplyClick}>
      
      <Grid container alignItems="center">
      <Grid item>
          {/* {job.logo && (
            <Avatar
              alt="Logo"
              src={job.logo.startsWith("http")
                ? job.logo // If the logo URL is already an HTTP URL, use it directly
                : storage.refFromURL(job.logo).getDownloadURL()} // Otherwise, retrieve the download URL from Firebase Storage
              style={{ width: "50px", height: "50px", marginRight: "10px" }}
            />
          )} */}
        </Grid>
        <Grid item xs>
          <Typography variant="subtitle1">
            {" "}
            {job.title ? job.title.charAt(0).toUpperCase() + job.title.slice(1) : ""}{" "}
          </Typography>
          <Typography className={classes.companyName} variant="outlined">
            {job.companyName
              ? job.companyName.charAt(0).toUpperCase() + job.companyName.slice(1)
              : ""}{" "}
          </Typography>
        </Grid>
        <Grid item container xs>
          {job.skills &&
            Array.isArray(job.skills) &&
            job.skills.map((skill) => (
              <Grid key={skill} className={classes.skillChip} item>
                {skill}
              </Grid>
            ))}
        </Grid>
        <Grid item container direction="column" alignItems="flex-end" xs>
          <Grid item>
            <Typography variant="caption">
              {timeString} ago | {job.type} | {job.location} | {job.hybridOrRemote}
            </Typography>
          </Grid>
          <Grid item>
            <Box mt={2}>
              <Button
                onClick={handleApplyClick}
                className={classes.button}
                variant="outlined"
                borderRadius="50%"
              >
                Check
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
