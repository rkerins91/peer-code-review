import React from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";
import { levels } from "utils";
import EditIcon from "@material-ui/icons/Edit";
import { Link } from "react-router-dom";

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
  },
  link: {
    color: "#888888"
  }
});

const ProfileExperience = ({ experience, editable }) => {
  const classes = useStyles();
  return (
    <Grid
      container
      className={classes.expContainer}
      justify="center"
      spacing={1}
    >
      <Grid container item>
        <Grid item xs={11} />
        {editable ? (
          <Grid item xs={1}>
            <Link to="/experience" className={classes.link}>
              <EditIcon />
            </Link>
          </Grid>
        ) : (
          <div></div>
        )}
      </Grid>
      <Grid container item spacing={4} justify="center">
        {experience.map(exp => (
          <Grid item xs={12} sm={6} md={4} lg={2} key={exp[0]}>
            <i
              className={`${
                Object.keys(exp)[0] === "C++"
                  ? `devicon-cplusplus-plain`
                  : `devicon-${Object.keys(exp)[0].toLowerCase()}-plain`
              } colored ${classes.languageIcon}`}
            ></i>
            <Typography className={classes.level}>
              {levels[exp[Object.keys(exp)[0]] - 1]}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default ProfileExperience;
