import React from "react";
import { Box, Grid, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { whitespace } from "stylis";
import { differenceInMinutes } from "date-fns";

const useStyles = makeStyles((theme) => ({
  button: {
    borderRadius: "25px",
    borderWidth: "2px",
    borderColor: "#0b1847",
    color: "#0b1847",
  },
  wrapper:{
    border: '1px solid #e8e8e8',
    width:'98%',
    transition:'.3s',
    cursor:"pointer",
    "&:hover":{
      boxShadow: "0px 5px 25px rgba(0,0,0,0.1)",
      borderLeft:"6px solid #1CC2DD",
    }
  },
  companyName:{
        fontSize:"13.5px",
        backgroundColor:'#0b1847',
        padding: theme.spacing(0.75),
        borderRadius:"5px",
        display:"inline-block",
        fontWeight:600,
        color:"white",
  },
  skillChip:{
    margin: theme.spacing(0.5),
    padding: theme.spacing(0.75),
    fontSize:"14.5px",
    borderRadius:"5px",
    transition:".3s",
    
    fontWeight:500,
    backgroundColor:"#CFD4D1",
    color:"#fff",

  }
}));
export default (props)=> {
  const classes = useStyles();
  return (
    <Box p={2} className={classes.wrapper}>
      <Grid container alignItems="center">
        <Grid item xs>
          <Typography variant="subtitle1">{props.title}</Typography>
          <Typography className={classes.companyName} variant="outlined">{props.companyName}</Typography>
        </Grid>
        <Grid item container xs>
          {props.skills.map((skill) => (
            <Grid key={skill} className={classes.skillChip} item>
              {skill}
            </Grid>
          ))}
        </Grid>
        <Grid item container direction="column" alignItems="flex-end" xs>
          <Grid item>
            <Typography variant="caption">{differenceInMinutes(Date.now(), props.postedOn)} min ago | {props.type} | {props.location}</Typography>
          </Grid>
          <Grid item>
            <Box mt={2}>
              <Button className={classes.button} variant="outlined" borderRadius="50%">
                Check
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

