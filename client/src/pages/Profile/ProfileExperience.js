import React from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";
import { levels } from "utils";
import IndeterminateCheckBoxRoundedIcon from "@material-ui/icons/IndeterminateCheckBoxRounded";
import AddBoxRoundedIcon from "@material-ui/icons/AddBoxRounded";
import SingleProfileLanguage from "./SingleProfileLanguage";

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

const ProfileExperience = ({ experience, isEditing }) => {
  const classes = useStyles();

  console.log(experience);

  const isEditingExperience = () => {
    if (isEditing) {
      return (
        <Grid
          container
          className={classes.expContainer}
          justify="center"
          spacing={4}
        >
          {Object.entries(experience).map(exp => {
            return (
              <SingleProfileLanguage exp={exp} key={exp} classes={classes} />
            );
          })}
        </Grid>
      );
    } else {
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
    }
  };

  return isEditingExperience();
};

export default ProfileExperience;
