import React from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";
import { levels } from "utils";

const useStyles = makeStyles({
  expContainer: {
    border: "1px solid #6E3ADB",
    boxShadow: "1px 2px 8px #6E3ADB",
    padding: "2vh"
  },
  languageIcon: {
    fontSize: "10vh"
  },
  level: {
    fontSize: "3vh"
  }
});

const ProfileExperience = ({ experience }) => {
  const classes = useStyles();
  return (
    <Grid
      container
      className={classes.expContainer}
      justify="center"
      spacing={4}
    >
      {Object.entries(experience).map(exp => (
        <Grid item xs={12} sm={6} md={4} lg={2} key={exp[0]}>
          <i
            className={`${
              exp[0] === "C++"
                ? `devicon-cplusplus-plain`
                : `devicon-${exp[0].toLowerCase()}-plain`
            } colored ${classes.languageIcon}`}
          ></i>
          <Typography className={classes.level}>
            {" "}
            {levels[exp[1] - 1]}{" "}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProfileExperience;
